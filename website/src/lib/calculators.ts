/**
 * Financial calculators — pure functions, unit tested.
 * All money values in whole rupees unless noted.
 */

/** Standard reducing-balance EMI. rate = annual %, months = tenure */
export function emi(principal: number, annualRatePct: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRatePct / 12 / 100;
  if (r === 0) return Math.round(principal / months);
  const e = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  return Math.round(e);
}

export function emiBreakdown(principal: number, annualRatePct: number, months: number) {
  const m = emi(principal, annualRatePct, months);
  const total = m * months;
  return { emi: m, totalPayment: total, totalInterest: total - principal };
}

/**
 * Gujarat stamp duty & registration (2025-26 rates):
 * - Stamp duty: 4.9% of consideration (basic 3.5% + 40% surcharge).
 * - Registration fee: 1% — WAIVED for property registered in a woman's sole name.
 */
export function gujaratStampDuty(value: number, femaleOwner: boolean) {
  const stamp = Math.round(value * 0.049);
  const registration = femaleOwner ? 0 : Math.round(value * 0.01);
  return { stamp, registration, total: stamp + registration };
}

/**
 * Human Life Value — simple income-replacement method:
 * cover ≈ annual income × years to retirement, discounted lightly, minus existing cover.
 */
export function humanLifeValue(
  annualIncome: number,
  age: number,
  retirementAge = 60,
  existingCover = 0,
) {
  const years = Math.max(0, retirementAge - age);
  // rule-of-thumb multiplier tapering with age
  const multiplier = age < 30 ? 20 : age < 40 ? 15 : age < 50 ? 12 : 8;
  const byIncome = annualIncome * Math.min(multiplier, years);
  return Math.max(0, Math.round(byIncome - existingCover));
}

/**
 * Endowment maturity ESTIMATE (illustrative only — actual LIC values depend on
 * declared bonuses). sumAssured + simple reversionary bonus accrual + FAB approximation.
 */
export function endowmentMaturityEstimate(sumAssured: number, termYears: number) {
  const bonusPerThousand = 45; // conservative historical average
  const bonus = (sumAssured / 1000) * bonusPerThousand * termYears;
  const fab = termYears >= 15 ? (sumAssured / 1000) * 20 : 0;
  return Math.round(sumAssured + bonus + fab);
}

/** Very rough annual premium estimate for an endowment-type plan. Illustrative. */
export function premiumEstimate(sumAssured: number, age: number, termYears: number) {
  const base = sumAssured / termYears; // saving component
  const riskLoad = sumAssured * (0.0025 + Math.max(0, age - 25) * 0.00012);
  return Math.round((base + riskLoad) * 1.045); // + GST approx
}

export function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}
