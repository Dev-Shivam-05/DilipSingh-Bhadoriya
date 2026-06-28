import { describe, it, expect } from "vitest";
import {
  emi, emiBreakdown, gujaratStampDuty, humanLifeValue,
  endowmentMaturityEstimate, premiumEstimate, formatINR,
} from "./calculators";

describe("emi", () => {
  it("matches the standard formula (25L @ 8.5% for 20y ≈ ₹21,696)", () => {
    expect(emi(2500000, 8.5, 240)).toBeGreaterThan(21500);
    expect(emi(2500000, 8.5, 240)).toBeLessThan(21900);
  });
  it("handles zero interest as simple division", () => {
    expect(emi(120000, 0, 12)).toBe(10000);
  });
  it("returns 0 for invalid input", () => {
    expect(emi(0, 8, 12)).toBe(0);
    expect(emi(100000, 8, 0)).toBe(0);
  });
  it("breakdown sums correctly", () => {
    const b = emiBreakdown(1000000, 9, 120);
    expect(b.totalPayment).toBe(b.emi * 120);
    expect(b.totalInterest).toBe(b.totalPayment - 1000000);
  });
});

describe("gujaratStampDuty", () => {
  it("computes 4.9% stamp + 1% registration", () => {
    const r = gujaratStampDuty(1000000, false);
    expect(r.stamp).toBe(49000);
    expect(r.registration).toBe(10000);
    expect(r.total).toBe(59000);
  });
  it("waives registration for female owners", () => {
    const r = gujaratStampDuty(1000000, true);
    expect(r.registration).toBe(0);
    expect(r.total).toBe(49000);
  });
});

describe("humanLifeValue", () => {
  it("uses age-based multiplier capped by years to retirement", () => {
    // age 25 → multiplier 20, years to retirement 35 → 20x income
    expect(humanLifeValue(500000, 25)).toBe(10000000);
    // age 58 → multiplier 8 but only 2 years left → 2x income
    expect(humanLifeValue(500000, 58)).toBe(1000000);
  });
  it("subtracts existing cover and floors at 0", () => {
    expect(humanLifeValue(500000, 25, 60, 20000000)).toBe(0);
  });
});

describe("estimators", () => {
  it("maturity estimate exceeds sum assured", () => {
    expect(endowmentMaturityEstimate(1000000, 20)).toBeGreaterThan(1000000);
  });
  it("premium grows with age", () => {
    expect(premiumEstimate(1000000, 45, 20)).toBeGreaterThan(premiumEstimate(1000000, 25, 20));
  });
});

describe("formatINR", () => {
  it("uses Indian digit grouping", () => {
    expect(formatINR(1234567)).toBe("₹12,34,567");
  });
});
