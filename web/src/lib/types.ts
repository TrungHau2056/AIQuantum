export type Role = "enterprise" | "investor" | "bank" | "regulator";

export interface Facility {
  name: string;
  taxCode: string;
  sector: "thermal-power" | "steel" | "cement";
  registryId: string;
}

export interface EmissionForecast {
  allowance: number; // tCO2e allocated for the period
  actualCumulative: number; // emissions to date
  plannedRemaining: number; // forecast remaining emissions
  forecastEndOfPeriod: number; // total forecast emissions
  surplusDeficit: number; // negative = deficit
  emissionFactor: number; // tCO2e per unit product
  creditsOwned: number; // carbon credits owned
  complianceBudget: number; // USD max willing to spend
}

export interface AbatementOption {
  id: string;
  name: string;
  capex: number; // USD
  opex: number; // USD/year
  reductionPct: number; // % emission reduction
  reductionTco2e: number; // absolute tCO2e reduced
  paybackYears: number;
  roi: number; // %
  npv: number; // USD
  irr: number; // %
  esgImpact: number; // 0-100
  timeline: string;
  isOptimal?: boolean;
}

export interface ComplianceRule {
  label: string;
  value: string;
  source: string;
}

export interface WhatIfScenario {
  carbonPrice: number; // USD/tCO2e
  buyCreditsCost: number; // USD
  investTechCost: number; // USD
  totalCost: number; // USD
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
