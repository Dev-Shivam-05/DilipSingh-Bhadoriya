"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { premiumEstimate, endowmentMaturityEstimate, humanLifeValue, formatINR } from "@/lib/calculators";
import { wa } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui";
import { Icon } from "@/components/ui/icons";

const inputCls = "w-full rounded-xl border border-ink-800/20 bg-white px-4 py-2.5 outline-none focus:border-gold-500";
const boxCls = "rounded-2xl border border-ink-800/10 bg-paper p-6 shadow-sm";

export function LicTools() {
  return (
    <div className="space-y-8">
      <PlanQuiz />
      <div className="grid gap-6 lg:grid-cols-3">
        <PremiumCalc />
        <MaturityCalc />
        <HlvCalc />
      </div>
    </div>
  );
}

/* ── 3-question plan finder ─────────────────────────────── */
function PlanQuiz() {
  const t = useTranslations("lic");
  const tc = useTranslations("common");
  const [age, setAge] = useState(30);
  const [goal, setGoal] = useState("protect");
  const [budget, setBudget] = useState(3000);
  const [done, setDone] = useState(false);

  const GOALS = [
    { id: "protect", label: t("goalProtect"), plan: "LIC Term Assurance (Jeevan Amar / Digi Term)", why: "Maximum cover at minimum premium — pure family protection." },
    { id: "save", label: t("goalSave"), plan: "LIC Jeevan Anand / Jeevan Labh", why: "Savings + life cover together, with bonus additions." },
    { id: "child", label: t("goalChild"), plan: "LIC Jeevan Tarun / Child Money Back", why: "Payouts timed to education and marriage milestones." },
    { id: "pension", label: t("goalPension"), plan: "LIC Jeevan Umang / New Pension Plus", why: "Lifelong income after retirement, guaranteed additions." },
  ];
  const chosen = GOALS.find((g) => g.id === goal)!;
  const waMsg = `${t("waQuiz")}${chosen.plan} (age ${age}, budget ₹${budget}/month)`;

  return (
    <div className={boxCls} data-track-section="lic-quiz">
      <h2 className="flex items-center gap-3 font-display text-2xl font-bold text-ink-800">
        <Icon name="target" className="h-7 w-7 text-saffron-500" /> {t("quizTitle")}
      </h2>
      <p className="mt-1 text-sm text-ink-700/70">{t("quizSub")}</p>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink-800">{t("age")}: <b className="text-gold-600">{age}</b></span>
          <input type="range" min={18} max={65} value={age} onChange={(e) => { setAge(+e.target.value); setDone(false); }} className="w-full accent-saffron-500" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink-800">{t("goal")}</span>
          <select value={goal} onChange={(e) => { setGoal(e.target.value); setDone(false); }} className={inputCls}>
            {GOALS.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink-800">{t("budgetMonthly")}: <b className="text-gold-600">₹{budget.toLocaleString("en-IN")}</b></span>
          <input type="range" min={500} max={25000} step={500} value={budget} onChange={(e) => { setBudget(+e.target.value); setDone(false); }} className="w-full accent-saffron-500" />
        </label>
      </div>

      {!done ? (
        <button
          onClick={() => setDone(true)}
          data-track-cta="lic-quiz-submit"
          className="mt-5 rounded-full bg-ink-800 px-6 py-3 text-sm font-semibold text-paper hover:bg-ink-700"
        >
          {t("quizResult")} →
        </button>
      ) : (
        <div className="mt-5 rounded-2xl border border-gold-500/40 bg-gold-100/60 p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-gold-600">{t("quizResult")}</p>
          <p className="mt-1 font-display text-xl font-bold text-ink-800">{chosen.plan}</p>
          <p className="mt-1 text-sm text-ink-700/85">{chosen.why}</p>
          <a
            href={wa(waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            data-track-cta="lic-quiz-whatsapp"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white"
          >
            <WhatsAppIcon /> {t("quizCta")}
          </a>
          <p className="mt-3 text-xs text-ink-700/60">{tc("estimate")}</p>
        </div>
      )}
    </div>
  );
}

/* ── Calculators ────────────────────────────────────────── */
function PremiumCalc() {
  const t = useTranslations("lic");
  const tc = useTranslations("common");
  const [sum, setSum] = useState(1000000);
  const [age, setAge] = useState(30);
  const [term, setTerm] = useState(20);

  return (
    <div className={boxCls} data-track-section="calc-premium">
      <h3 className="flex items-center gap-2.5 font-display text-lg font-bold text-ink-800">
        <Icon name="chartBar" className="h-5 w-5 text-gold-600" /> {t("calcPremium")}
      </h3>
      <div className="mt-4 space-y-3 text-sm">
        <NumField label={t("sumAssured")} value={sum} set={setSum} />
        <NumField label={t("age")} value={age} set={setAge} />
        <NumField label={t("term")} value={term} set={setTerm} />
      </div>
      <ResultBox label={t("estPremium")} value={formatINR(premiumEstimate(sum, age, term))} note={tc("estimate")} />
    </div>
  );
}

function MaturityCalc() {
  const t = useTranslations("lic");
  const tc = useTranslations("common");
  const [sum, setSum] = useState(1000000);
  const [term, setTerm] = useState(20);

  return (
    <div className={boxCls} data-track-section="calc-maturity">
      <h3 className="flex items-center gap-2.5 font-display text-lg font-bold text-ink-800">
        <Icon name="sprout" className="h-5 w-5 text-gold-600" /> {t("calcMaturity")}
      </h3>
      <div className="mt-4 space-y-3 text-sm">
        <NumField label={t("sumAssured")} value={sum} set={setSum} />
        <NumField label={t("term")} value={term} set={setTerm} />
      </div>
      <ResultBox label={t("estMaturity")} value={formatINR(endowmentMaturityEstimate(sum, term))} note={tc("estimate")} />
    </div>
  );
}

function HlvCalc() {
  const t = useTranslations("lic");
  const tc = useTranslations("common");
  const [income, setIncome] = useState(500000);
  const [age, setAge] = useState(30);
  const [cover, setCover] = useState(0);

  return (
    <div className={boxCls} data-track-section="calc-hlv">
      <h3 className="flex items-center gap-2.5 font-display text-lg font-bold text-ink-800">
        <Icon name="calculator" className="h-5 w-5 text-gold-600" /> {t("calcHlv")}
      </h3>
      <div className="mt-4 space-y-3 text-sm">
        <NumField label={t("annualIncome")} value={income} set={setIncome} />
        <NumField label={t("age")} value={age} set={setAge} />
        <NumField label={t("existingCover")} value={cover} set={setCover} />
      </div>
      <ResultBox label={t("recommendedCover")} value={formatINR(humanLifeValue(income, age, 60, cover))} note={tc("estimate")} />
    </div>
  );
}

function NumField({ label, value, set }: { label: string; value: number; set: (n: number) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block font-medium text-ink-800">{label}</span>
      <input type="number" value={value} min={0} onChange={(e) => set(Number(e.target.value) || 0)} className={inputCls} />
    </label>
  );
}

function ResultBox({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="mt-4 rounded-xl border-t-2 border-gold-500 bg-gold-100/50 p-4 text-center">
      <p className="text-[11px] uppercase tracking-wide text-ink-700/70">{label}</p>
      <p className="mt-1 text-2xl font-bold text-saffron-600">{value}</p>
      <p className="mt-1 text-[10px] text-ink-700/60">{note}</p>
    </div>
  );
}
