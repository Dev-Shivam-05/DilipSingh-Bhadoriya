"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";

/**
 * DPDP-friendly consent banner + first-party engagement tracker.
 * With consent it records (anonymously): pageviews, section dwell time,
 * max scroll depth, CTA clicks, device class. Never any personal data.
 */

const CONSENT_KEY = "dsb-consent";
const SID_KEY = "dsb-sid";

type Ev = { type: string; path: string; locale?: string; name?: string; value?: number };

const buffer: Ev[] = [];
let sid: string | null = null;

function flush(useBeacon = false) {
  if (!sid || buffer.length === 0) return;
  const payload = JSON.stringify({ sid, events: buffer.splice(0, buffer.length) });
  if (useBeacon && navigator.sendBeacon) {
    navigator.sendBeacon("/api/track", payload);
  } else {
    fetch("/api/track", { method: "POST", body: payload, keepalive: true }).catch(() => {});
  }
}

function track(ev: Ev) {
  if (!sid) return;
  buffer.push(ev);
  if (buffer.length >= 12) flush();
}

export function ConsentTracker() {
  const t = useTranslations("consent");
  const locale = useLocale();
  const pathname = usePathname();
  const [consent, setConsent] = useState<string | null>("pending");
  const sectionTimes = useRef<Map<string, number>>(new Map());

  // read stored consent after mount (SSR renders "pending" → no hydration mismatch)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time localStorage read, SSR-safe by design
    setConsent(localStorage.getItem(CONSENT_KEY));
  }, []);

  // start session once consented
  useEffect(() => {
    if (consent !== "yes") return;
    let stored = localStorage.getItem(SID_KEY);
    if (!stored) {
      stored = crypto.randomUUID();
      localStorage.setItem(SID_KEY, stored);
    }
    sid = stored;

    const ua = navigator.userAgent;
    const device = /Mobi|Android/i.test(ua) ? (/(iPad|Tablet)/i.test(ua) ? "tablet" : "mobile") : "desktop";
    const os = /Android/i.test(ua) ? "Android" : /iPhone|iPad|iOS/i.test(ua) ? "iOS" : /Windows/i.test(ua) ? "Windows" : /Mac/i.test(ua) ? "macOS" : /Linux/i.test(ua) ? "Linux" : "other";
    const browser = /Edg\//.test(ua) ? "Edge" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : /Firefox\//.test(ua) ? "Firefox" : "other";
    const params = new URLSearchParams(location.search);

    fetch("/api/track", {
      method: "POST",
      body: JSON.stringify({
        sid,
        session: {
          device, os, browser,
          language: navigator.language,
          referrer: document.referrer || null,
          utmSource: params.get("utm_source"),
          utmMedium: params.get("utm_medium"),
          screenW: screen.width,
        },
      }),
    }).catch(() => {});

    const onHide = () => {
      // report accumulated dwell + final scroll depth
      sectionTimes.current.forEach((ms, name) => {
        if (ms > 500) buffer.push({ type: "section_dwell", path: location.pathname, name, value: Math.round(ms) });
      });
      sectionTimes.current.clear();
      flush(true);
    };
    document.addEventListener("visibilitychange", () => document.visibilityState === "hidden" && onHide());
    window.addEventListener("pagehide", onHide);
    const interval = setInterval(() => flush(), 10000);
    return () => clearInterval(interval);
  }, [consent]);

  // per-page tracking
  useEffect(() => {
    if (consent !== "yes") return;
    const dwellBank = sectionTimes.current;
    track({ type: "pageview", path: pathname, locale });

    // scroll depth
    let maxDepth = 0;
    const onScroll = () => {
      const h = document.documentElement;
      const depth = Math.min(100, Math.round(((h.scrollTop + innerHeight) / h.scrollHeight) * 100));
      if (depth > maxDepth) maxDepth = depth;
    };
    addEventListener("scroll", onScroll, { passive: true });

    // section dwell via IntersectionObserver
    const visibleSince = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const name = (e.target as HTMLElement).dataset.trackSection!;
          if (e.isIntersecting) {
            visibleSince.set(name, performance.now());
            track({ type: "section_view", path: pathname, name });
          } else {
            const since = visibleSince.get(name);
            if (since) {
              const prev = dwellBank.get(name) ?? 0;
              dwellBank.set(name, prev + (performance.now() - since));
              visibleSince.delete(name);
            }
          }
        }
      },
      { threshold: 0.4 },
    );
    document.querySelectorAll<HTMLElement>("[data-track-section]").forEach((el) => observer.observe(el));

    // CTA clicks (delegated)
    const onClick = (e: MouseEvent) => {
      const cta = (e.target as HTMLElement).closest<HTMLElement>("[data-track-cta]");
      if (cta) track({ type: "cta_click", path: pathname, name: cta.dataset.trackCta });
    };
    document.addEventListener("click", onClick);

    return () => {
      if (maxDepth > 0) track({ type: "scroll_depth", path: pathname, value: maxDepth });
      // bank dwell for sections still visible
      visibleSince.forEach((since, name) => {
        const prev = dwellBank.get(name) ?? 0;
        dwellBank.set(name, prev + (performance.now() - since));
      });
      observer.disconnect();
      removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, [pathname, consent, locale]);

  if (consent !== null && consent !== "pending") return null;
  if (consent === "pending") return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-gold-500/40 bg-ink-900 px-4 py-4 text-paper sm:bottom-4 sm:left-4 sm:max-w-md sm:rounded-2xl sm:border"
    >
      <p className="text-sm leading-relaxed">{t("text")}</p>
      <div className="mt-3 flex gap-3">
        <button
          onClick={() => { localStorage.setItem(CONSENT_KEY, "yes"); setConsent("yes"); }}
          className="rounded-full bg-gold-500 px-5 py-2 text-sm font-semibold text-ink-900"
        >
          {t("accept")}
        </button>
        <button
          onClick={() => { localStorage.setItem(CONSENT_KEY, "no"); setConsent("no"); }}
          className="rounded-full border border-paper/30 px-5 py-2 text-sm"
        >
          {t("decline")}
        </button>
      </div>
    </div>
  );
}
