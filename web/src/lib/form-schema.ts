import type { Sector } from "./types";

export type OwnershipType = "SOE" | "private" | "FDI" | "joint-stock";
export type ActivityType =
  | "production"
  | "electricity"
  | "coal"
  | "gas"
  | "oil"
  | "biomass"
  | "RDF";
export type EmissionScope = "scope-1" | "scope-2" | "scope-3";
export type EmissionMethod = "calculated" | "measured" | "verified-inventory";
export type CreditType = "domestic" | "international-COR" | "CORSIA" | "VCM";
export type DecisionChoice =
  | "buy-credits"
  | "invest-green"
  | "combine"
  | "no-action"
  | "undecided";

export interface CompanyForm {
  name: string;
  taxId: string;
  sector: Sector;
  ownershipType: OwnershipType | "";
}

export interface FacilityForm {
  facilityName: string;
  registryId: string;
  province: string;
  productMain: string;
  capacity: number | "";
  productUnit: string;
}

export interface ActivityRow {
  id: string;
  month: string;
  activityType: ActivityType;
  quantity: number | "";
  unit: string;
  ncv: number | "";
}

export interface EmissionsForm {
  period: string;
  scope: EmissionScope;
  emissionsTco2e: number | "";
  method: EmissionMethod;
  confidenceScore: number | "";
  productionPlanned: number | "";
  productionFactor: number | "";
}

export interface AllowanceForm {
  allocated2025: number | "";
  allocated2026: number | "";
  balance: number | "";
  surrenderDeadline: string;
  borrowedPct: number | "";
}

export interface CreditRow {
  id: string;
  creditType: CreditType;
  creditVintage: number | "";
  creditVolume: number | "";
  creditEligible: boolean;
}

export interface GreenProjectForm {
  id: string;
  projectName: string;
  capex: number | "";
  abatementPct: number | "";
  abatementTco2eYear: number | "";
  payback: number | "";
  opexDelta: number | "";
  energySavings: number | "";
  startDate: string;
  implementationLag: number | "";
  lifetime: number | "";
  taxonomyMatch: boolean;
}

export interface MarketForm {
  priceLow: number | "";
  priceBase: number | "";
  priceHigh: number | "";
  feeRate: number | "";
  budget: number | "";
}

export interface FuelSwitchForm {
  altFuelPct: number | "";
  altFuelCost: number | "";
}

export interface ActualDecisionForm {
  chosen: DecisionChoice | "";
  note: string;
}

export interface EsgForm {
  hasEsgReport: boolean;
  esgScore: number | "";
  netZeroCommitment: boolean;
  netZeroRoadmap: string;
}

export interface IngestFormData {
  company: CompanyForm;
  facility: FacilityForm;
  activityData: ActivityRow[];
  emissions: EmissionsForm;
  allowance: AllowanceForm;
  credits: CreditRow[];
  greenProjects: GreenProjectForm[];
  market: MarketForm;
  fuelSwitch: FuelSwitchForm;
  actualDecision: ActualDecisionForm;
  esg: EsgForm;
}

export const emptyFormData: IngestFormData = {
  company: { name: "", taxId: "", sector: "cement", ownershipType: "" },
  facility: {
    facilityName: "",
    registryId: "",
    province: "",
    productMain: "",
    capacity: "",
    productUnit: "tấn xi măng",
  },
  activityData: [],
  emissions: {
    period: "",
    scope: "scope-1",
    emissionsTco2e: "",
    method: "calculated",
    confidenceScore: "",
    productionPlanned: "",
    productionFactor: "",
  },
  allowance: {
    allocated2025: "",
    allocated2026: "",
    balance: "",
    surrenderDeadline: "2027-12-31",
    borrowedPct: "",
  },
  credits: [],
  greenProjects: [],
  market: {
    priceLow: "",
    priceBase: "",
    priceHigh: "",
    feeRate: "",
    budget: "",
  },
  fuelSwitch: {
    altFuelPct: "",
    altFuelCost: "",
  },
  actualDecision: {
    chosen: "",
    note: "",
  },
  esg: {
    hasEsgReport: false,
    esgScore: "",
    netZeroCommitment: false,
    netZeroRoadmap: "",
  },
};

export interface StepDef {
  id: number;
  title: string;
  description: string;
  requiredFields: string[];
}

export const STEPS: StepDef[] = [
  {
    id: 0,
    title: "Thông tin doanh nghiệp",
    description: "Nhận diện DN + cơ sở/nhà máy (Carbon Digital Twin cấp cơ sở)",
    requiredFields: [
      "company.name",
      "company.taxId",
      "company.sector",
      "facility.facilityName",
      "facility.province",
      "facility.productMain",
      "facility.capacity",
      "facility.productUnit",
    ],
  },
  {
    id: 1,
    title: "Hạn ngạch & phát thải",
    description: "Compliance Gap — input cốt lõi: hạn ngạch, sản lượng, hệ số, tín chỉ",
    requiredFields: [
      "allowance.allocated2025",
      "allowance.allocated2026",
      "allowance.surrenderDeadline",
      "activityData",
      "emissions.productionPlanned",
      "emissions.productionFactor",
    ],
  },
  {
    id: 2,
    title: "Phương án tối ưu",
    description: "Đầu tư xanh + chuyển đổi nhiên liệu + ngân sách + thị trường",
    requiredFields: ["greenProjects", "market.priceBase", "market.budget"],
  },
  {
    id: 3,
    title: "ESG & cam kết",
    description: "Optional — hồ sơ tài chính xanh (Green Finance Profile)",
    requiredFields: [],
  },
];

// Tính % hoàn thành (required fields)
export function calcCompleteness(data: IngestFormData): {
  pct: number;
  tier: "Đầy đủ" | "Benchmark" | "Mảnh";
  filledRequired: number;
  totalRequired: number;
} {
  const checks: boolean[] = [
    !!data.company.name,
    !!data.company.taxId,
    !!data.company.sector,
    !!data.facility.facilityName,
    !!data.facility.province,
    !!data.facility.productMain,
    data.facility.capacity !== "" && data.facility.capacity > 0,
    !!data.facility.productUnit,
    data.allowance.allocated2025 !== "" && data.allowance.allocated2025 >= 0,
    data.allowance.allocated2026 !== "" && data.allowance.allocated2026 >= 0,
    !!data.allowance.surrenderDeadline,
    data.activityData.length > 0,
    data.emissions.productionPlanned !== "" && data.emissions.productionPlanned >= 0,
    data.emissions.productionFactor !== "" && data.emissions.productionFactor > 0,
    data.greenProjects.length > 0,
    data.market.priceBase !== "" && data.market.priceBase > 0,
    data.market.budget !== "" && data.market.budget > 0,
  ];
  const filledRequired = checks.filter(Boolean).length;
  const totalRequired = checks.length;
  const pct = Math.round((filledRequired / totalRequired) * 100);
  const tier = pct >= 80 ? "Đầy đủ" : pct >= 40 ? "Benchmark" : "Mảnh";
  return { pct, tier, filledRequired, totalRequired };
}

// Auto-calc Compliance Gap
// Forecast = emissions.emissionsTco2e (nếu có) else (productionActual + productionPlanned) × productionFactor
export function calcComplianceGap(data: IngestFormData): {
  forecastEmissions: number | null;
  totalAllowance: number | null;
  gap: number | null;
  creditsOwned: number;
} {
  const a2025 =
    data.allowance.allocated2025 !== "" ? Number(data.allowance.allocated2025) : 0;
  const a2026 =
    data.allowance.allocated2026 !== "" ? Number(data.allowance.allocated2026) : 0;
  const totalAllowance = a2025 + a2026;
  const creditsOwned = data.credits.reduce(
    (sum, c) => sum + (c.creditVolume !== "" ? Number(c.creditVolume) : 0),
    0
  );

  let forecastEmissions: number | null = null;
  if (data.emissions.emissionsTco2e !== "") {
    forecastEmissions = Number(data.emissions.emissionsTco2e);
  } else {
    const prodActual = data.activityData
      .filter((r) => r.activityType === "production" && r.quantity !== "")
      .reduce((sum, r) => sum + Number(r.quantity), 0);
    const planned =
      data.emissions.productionPlanned !== ""
        ? Number(data.emissions.productionPlanned)
        : 0;
    const factor =
      data.emissions.productionFactor !== ""
        ? Number(data.emissions.productionFactor)
        : 0;
    if ((prodActual > 0 || planned > 0) && factor > 0) {
      forecastEmissions = (prodActual + planned) * factor;
    }
  }

  if (forecastEmissions === null) {
    return {
      forecastEmissions: null,
      totalAllowance: totalAllowance || null,
      gap: null,
      creditsOwned,
    };
  }
  const gap = totalAllowance - forecastEmissions - creditsOwned;
  return { forecastEmissions, totalAllowance, gap, creditsOwned };
}
