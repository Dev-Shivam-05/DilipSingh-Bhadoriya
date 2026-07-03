"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";

type Props = {
  kind: string;
  meta?: Record<string, string>;
  listingId?: string;
  /** Extra fields rendered inside the form (selects etc. with name attrs) */
  children?: ReactNode;
  messageLabel?: string;
  ctaLabel?: string;
};

/** Reusable lead-capture form → /api/inquiries → admin inbox. */
export function InquiryForm({ kind, meta, listingId, children, messageLabel, ctaLabel }: Props) {
  const t = useTranslations("common");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("busy");
    const fd = new FormData(e.currentTarget);
    const extra: Record<string, string> = { ...meta };
    fd.forEach((v, k) => {
      if (!["name", "phone", "message"].includes(k)) extra[k] = String(v);
    });
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          listingId,
          name: fd.get("name"),
          phone: fd.get("phone"),
          message: fd.get("message") ?? "",
          meta: Object.keys(extra).length ? extra : undefined,
        }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-2xl">🙏</p>
        <p className="mt-2 font-semibold text-emerald-800">{t("thanks")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink-800">{t("name")}</span>
          <input required name="name" maxLength={80} className="w-full rounded-xl border border-ink-800/20 bg-white px-4 py-2.5 outline-none focus:border-gold-500" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink-800">{t("phone")}</span>
          <input
            required
            name="phone"
            inputMode="tel"
            pattern="[0-9+ ]{10,15}"
            maxLength={15}
            className="w-full rounded-xl border border-ink-800/20 bg-white px-4 py-2.5 outline-none focus:border-gold-500"
          />
        </label>
      </div>
      {children}
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink-800">{messageLabel ?? t("message")}</span>
        <textarea name="message" rows={3} maxLength={1000} className="w-full rounded-xl border border-ink-800/20 bg-white px-4 py-2.5 outline-none focus:border-gold-500" />
      </label>
      <button
        type="submit"
        disabled={state === "busy"}
        data-track-cta={`form-${kind}`}
        className="w-full rounded-full bg-saffron-500 px-6 py-3 font-semibold text-white transition hover:bg-saffron-600 disabled:opacity-60 sm:w-auto"
      >
        {state === "busy" ? t("submitting") : (ctaLabel ?? t("submit"))}
      </button>
      {state === "error" && <p className="text-sm text-red-600">{t("error")}</p>}
    </form>
  );
}
