"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Result = { token: string; docType: string; status: string; note: string | null; updatedAt: string };

export function SevaTracker() {
  const t = useTranslations("documents");
  const [token, setToken] = useState("");
  const [result, setResult] = useState<Result | null | "notfound">(null);
  const [busy, setBusy] = useState(false);

  async function check(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch(`/api/seva?token=${encodeURIComponent(token.trim().toUpperCase())}`);
      setResult(res.ok ? await res.json() : "notfound");
    } catch {
      setResult("notfound");
    } finally {
      setBusy(false);
    }
  }

  const STATUS_COLOR: Record<string, string> = {
    received: "bg-ink-100 text-ink-800",
    in_progress: "bg-gold-100 text-gold-600",
    ready: "bg-emerald-100 text-emerald-700",
    done: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div>
      <form onSubmit={check} className="flex gap-3">
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="DSB-1234"
          required
          pattern="[Dd][Ss][Bb]-?[0-9]{3,6}"
          className="flex-1 rounded-full border border-paper/30 bg-ink-800 px-5 py-3 text-paper outline-none placeholder:text-paper/40 focus:border-gold-400"
        />
        <button
          type="submit"
          disabled={busy}
          data-track-cta="seva-track"
          className="rounded-full bg-gold-500 px-6 py-3 font-semibold text-ink-900 hover:bg-gold-400 disabled:opacity-60"
        >
          {t("trackBtn")}
        </button>
      </form>

      {result === "notfound" && <p className="mt-4 text-sm text-red-300">{t("notFound")}</p>}
      {result && result !== "notfound" && (
        <div className="mt-5 rounded-2xl border border-gold-500/30 bg-ink-800 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-lg font-bold text-gold-300">{result.token}</p>
            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${STATUS_COLOR[result.status] ?? ""}`}>
              {t(`status.${result.status}` as never)}
            </span>
          </div>
          <p className="mt-2 text-sm text-ink-100/80">{result.docType}</p>
          {result.note && <p className="mt-2 text-sm italic text-ink-100/70">“{result.note}”</p>}
        </div>
      )}
    </div>
  );
}
