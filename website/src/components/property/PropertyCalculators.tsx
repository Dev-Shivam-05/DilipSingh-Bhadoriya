"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { emiBreakdown, gujaratStampDuty, formatINR } from "@/lib/calculators";

const inputCls =
  "w-full rounded-xl border border-ink-800/20 bg-white px-4 py-2.5 outline-none focus:border-gold-500";

export function PropertyCalculators() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <EmiCalc />
      <StampCalc />
    </div>
  );
}

function EmiCalc() {
  const t = useTranslations();
  const [amount, setAmount] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const r = emiBreakdown(amount, rate, years * 12);

  return (
    <div className="rounded-2xl border border-ink-800/10 bg-paper p-6 shadow-sm" data-track-section="calc-emi">
      <h3 className="font-display text-xl font-bold text-ink-800">💰 {t("property.emi")}</h3>
      <div className="mt-4 space-y-3">
        <Field label={t("property.loanAmount")} value={amount} onChange={setAmount} min={100000} max={20000000} step={50000} />
        <Field label={t("property.interestRate")} value={rate} onChange={setRate} min={6} max={15} step={0.1} />
        <Field label={t("property.tenure")} value={years} onChange={setYears} min={1} max={30} step={1} />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-gold-500/30 pt-4 text-center">
        <Result label={t("property.monthlyEmi")} value={formatINR(r.emi)} highlight />
        <Result label={t("property.totalInterest")} value={formatINR(r.totalInterest)} />
        <Result label={t("property.totalPayment")} value={formatINR(r.totalPayment)} />
      </div>
    </div>
  );
}

function StampCalc() {
  const t = useTranslations();
  const [value, setValue] = useState(3000000);
  const [female, setFemale] = useState(false);
  const r = gujaratStampDuty(value, female);

  return (
    <div className="rounded-2xl border border-ink-800/10 bg-paper p-6 shadow-sm" data-track-section="calc-stamp">
      <h3 className="font-display text-xl font-bold text-ink-800">🧾 {t("property.stamp")}</h3>
      <div className="mt-4 space-y-3">
        <Field label={t("property.propertyValue")} value={value} onChange={setValue} min={100000} max={50000000} step={100000} />
        <label className="flex items-center gap-3 rounded-xl border border-gold-500/30 bg-gold-100/50 px-4 py-3 text-sm font-medium text-ink-800">
          <input type="checkbox" checked={female} onChange={(e) => setFemale(e.target.checked)} className="h-4 w-4 accent-gold-600" />
          {t("property.femaleOwner")}
        </label>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-gold-500/30 pt-4 text-center">
        <Result label={t("property.stampDuty")} value={formatINR(r.stamp)} />
        <Result label={t("property.registrationFee")} value={female ? "₹0 ✓" : formatINR(r.registration)} />
        <Result label={t("property.totalCost")} value={formatINR(r.total)} highlight />
      </div>
      <p className="mt-3 text-xs text-ink-700/60">{t("common.estimate")}</p>
    </div>
  );
}

function Field({ label, value, onChange, min, max, step }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number }) {
  return (
    <label className="block">
      <span className="mb-1 flex justify-between text-sm font-medium text-ink-800">
        {label}
        <span className="font-bold text-gold-600">{value.toLocaleString("en-IN")}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-saffron-500" />
      <input type="number" value={value} min={min} max={max} onChange={(e) => onChange(Number(e.target.value) || min)} className={`mt-1 ${inputCls}`} />
    </label>
  );
}

function Result({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-ink-700/60">{label}</p>
      <p className={`mt-1 font-bold ${highlight ? "text-lg text-saffron-600" : "text-ink-800"}`}>{value}</p>
    </div>
  );
}
