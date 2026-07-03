"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const CATEGORIES = ["streetlight", "drainage", "road", "water", "garbage", "other"] as const;

export function CivicIssueForm() {
  const t = useTranslations();
  const [state, setState] = useState<"idle" | "busy" | "error">("idle");
  const [token, setToken] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("busy");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/civic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          phone: fd.get("phone"),
          category: fd.get("category"),
          area: fd.get("area"),
          details: fd.get("details"),
        }),
      });
      if (!res.ok) throw new Error();
      setToken((await res.json()).token);
    } catch {
      setState("error");
    }
  }

  if (token) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-sm font-medium text-emerald-800">{t("documents.yourToken")}</p>
        <p className="mt-2 font-mono text-3xl font-bold tracking-wider text-emerald-700">{token}</p>
        <p className="mt-3 text-sm text-emerald-800/80">{t("documents.keepToken")}</p>
      </div>
    );
  }

  const inputCls = "w-full rounded-xl border border-ink-800/20 bg-white px-4 py-2.5 outline-none focus:border-gold-500";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink-800">{t("common.name")}</span>
          <input required name="name" maxLength={80} className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink-800">{t("common.phone")}</span>
          <input required name="phone" inputMode="tel" pattern="[0-9+ ]{10,15}" className={inputCls} />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink-800">{t("corporator.category")}</span>
          <select name="category" required className={inputCls}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{t(`corporator.cat.${c}` as never)}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink-800">{t("corporator.areaLabel")}</span>
          <input required name="area" maxLength={120} className={inputCls} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink-800">{t("corporator.describe")}</span>
        <textarea required name="details" rows={3} maxLength={800} className={inputCls} />
      </label>
      <button
        type="submit"
        disabled={state === "busy"}
        data-track-cta="civic-issue-submit"
        className="w-full rounded-full bg-saffron-500 px-6 py-3 font-semibold text-white hover:bg-saffron-600 disabled:opacity-60 sm:w-auto"
      >
        {state === "busy" ? t("common.submitting") : t("common.submit")}
      </button>
      {state === "error" && <p className="text-sm text-red-600">{t("common.error")}</p>}
    </form>
  );
}
