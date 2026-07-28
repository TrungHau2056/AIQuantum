export type Role = "enterprise" | "investor" | "bank" | "regulator";

export type Sector = "thermal-power" | "steel" | "cement";

export interface Facility {
  name: string;
  taxCode: string;
  sector: Sector;
  registryId: string;
  province?: string;
  productionVolume: number; // tấn/năm (sản lượng chính)
  productUnit: string; // vd: "tấn xi măng"
}

export interface EmissionForecast {
  allowance: number; // tCO2e allocated for the period
  actualCumulative: number; // emissions to date
  plannedRemaining: number; // forecast remaining emissions
  forecastEndOfPeriod: number; // total forecast emissions (BAU)
  surplusDeficit: number; // negative = deficit (Compliance Gap)
  emissionFactor: number; // tCO2e per unit product
  creditsOwned: number; // carbon credits owned
  complianceBudget: number; // VND max willing to spend
  carbonPriceAssumption: number; // VND/tCO2e
}

export interface AbatementOption {
  id: string;
  name: string;
  capex: number; // VND
  opex: number; // VND/year
  reductionPct: number; // % emission reduction
  reductionTco2e: number; // absolute tCO2e reduced
  energySavings?: number; // VND/year (tiết kiệm năng lượng)
  paybackYears: number;
  roi: number; // %
  npv: number; // VND
  irr: number; // %
  esgImpact: number; // 0-100
  timeline: string;
  taxonomyMatch?: boolean; // QĐ 21/2025 Green Taxonomy
  isOptimal?: boolean;
}

export interface ComplianceRule {
  label: string;
  value: string;
  source: string;
}

export interface WhatIfScenario {
  carbonPrice: number; // VND/tCO2e (thousand VND for display)
  buyCreditsCost: number; // VND
  investTechCost: number; // VND
  totalCost: number; // VND
  isThreshold?: boolean;
}

export interface ESGProfile {
  esgScore: number; // /100
  overallScore: number; // /100
  esgThreshold: number; // 82
  overallThreshold: number; // 80
  netZeroRoadmap: { phase: string; year: number; target: string; feasibility: number }[];
  reductionTrend: { period: string; emissions: number; intensity: number }[];
  hasEsgReport: boolean;
  hasNetZeroCommitment: boolean;
}

export interface BankAppraisal {
  riskLevel: "Low" | "Medium" | "High";
  shortfallPct: number; // % short of allowance
  complianceLevel: number; // % at end of period
  reductionTrend: { period: string; emissions: number }[];
  dataVerification: { metric: string; completeness: number; traceable: boolean; verified: boolean }[];
}

export interface SectorStat {
  sector: string;
  facilities: number;
  emissions: number; // MtCO2e
  allowance: number; // MtCO2e
  shortfall: number; // MtCO2e
}

export interface RegulatorOverview {
  totalFacilities: number;
  totalEmissions: number; // MtCO2e
  totalAllowance: number; // MtCO2e
  allowance2025: number; // MtCO2e
  allowance2026: number; // MtCO2e
  buyDemand: number; // MtCO2e
  sellDemand: number; // MtCO2e
  sectors: SectorStat[];
  complianceStats: { status: string; count: number; pct: number }[];
  greenTransition: { metric: string; pct: number }[];
  surrenderDeadline: string;
}

// Synthetic enterprise for MVP demo (10 enterprises: 4 cement, 3 thermal-power, 3 steel)
export interface EnterpriseSummary {
  id: string;
  name: string;
  sector: Sector;
  province: string;
  productionVolume: number; // tấn/năm
  forecastEmissions: number; // tCO2e (BAU)
  allowance: number; // tCO2e
  deficit: number; // tCO2e (negative = deficit)
  creditsOwned: number; // tCO2e
  esgScore: number; // /100
  hasNetZeroCommitment: boolean;
}
