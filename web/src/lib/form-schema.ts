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

export interface AllowancePeriod {
  id: string;
  period: string;
  allocatedTco2e: number | "";
}

export interface AllowanceForm {
  periods: AllowancePeriod[];
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

export interface FacilityEntry {
  id: string;
  facility: FacilityForm;
  activityData: ActivityRow[];
  emissions: EmissionsForm;
  allowance: AllowanceForm;
  credits: CreditRow[];
  greenProjects: GreenProjectForm[];
  market: MarketForm;
  fuelSwitch: FuelSwitchForm;
  actualDecision: ActualDecisionForm;
}

export interface IngestFormData {
  company: CompanyForm;
  facilities: FacilityEntry[];
  esg: EsgForm;
}

let idCounter = 0;
export const genId = () => `id-${++idCounter}`;

export function createEmptyFacility(productUnit = "tấn xi măng"): FacilityEntry {
  return {
    id: genId(),
    facility: {
      facilityName: "",
      registryId: "",
      province: "",
      productMain: "",
      capacity: "",
      productUnit,
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
      periods: [{ id: genId(), period: "2025", allocatedTco2e: "" }],
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
  };
}

export const emptyFormData: IngestFormData = {
  company: { name: "", taxId: "", sector: "cement", ownershipType: "" },
  facilities: [createEmptyFacility()],
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
    description: "Nhận diện DN + danh sách cơ sở (Carbon Digital Twin cấp cơ sở)",
    requiredFields: ["company.name", "company.taxId", "company.sector", "facilities"],
  },
  {
    id: 1,
    title: "Hạn ngạch & phát thải",
    description: "Theo cơ sở — hạn ngạch theo giai đoạn + sản lượng + hệ số + tín chỉ",
    requiredFields: ["facility.facilityName", "allowance.periods", "activityData", "emissions.productionPlanned", "emissions.productionFactor"],
  },
  {
    id: 2,
    title: "Phương án tối ưu",
    description: "Theo cơ sở — đầu tư xanh + chuyển đổi nhiên liệu + ngân sách + thị trường",
    requiredFields: ["greenProjects", "market.priceBase", "market.budget"],
  },
  {
    id: 3,
    title: "ESG & cam kết",
    description: "Cấp doanh nghiệp (tùy chọn) — hồ sơ tài chính xanh",
    requiredFields: [],
  },
];

// Tính % hoàn thành (required fields) — company + tất cả cơ sở
export function calcCompleteness(data: IngestFormData): {
  pct: number;
  tier: "Đầy đủ" | "Benchmark" | "Mảnh";
  filledRequired: number;
  totalRequired: number;
} {
  const companyChecks: boolean[] = [
    !!data.company.name,
    !!data.company.taxId,
    !!data.company.sector,
  ];
  const facilityChecks: boolean[] = data.facilities.flatMap((f) => [
    !!f.facility.facilityName,
    !!f.facility.province,
    !!f.facility.productMain,
    f.facility.capacity !== "" && f.facility.capacity > 0,
    !!f.facility.productUnit,
    f.allowance.periods.length > 0,
    f.activityData.length > 0,
    f.emissions.productionPlanned !== "" && f.emissions.productionPlanned >= 0,
    f.emissions.productionFactor !== "" && f.emissions.productionFactor > 0,
    f.greenProjects.length > 0,
    f.market.priceBase !== "" && f.market.priceBase > 0,
    f.market.budget !== "" && f.market.budget > 0,
  ]);
  const checks = [...companyChecks, ...facilityChecks];
  const filledRequired = checks.filter(Boolean).length;
  const totalRequired = checks.length;
  const pct = totalRequired === 0 ? 0 : Math.round((filledRequired / totalRequired) * 100);
  const tier = pct >= 80 ? "Đầy đủ" : pct >= 40 ? "Benchmark" : "Mảnh";
  return { pct, tier, filledRequired, totalRequired };
}

export interface FacilityGap {
  facilityId: string;
  facilityName: string;
  forecastEmissions: number | null;
  totalAllowance: number | null;
  gap: number | null;
  creditsOwned: number;
}

// Auto-calc Compliance Gap — per cơ sở + tổng
export function calcComplianceGap(data: IngestFormData): {
  perFacility: FacilityGap[];
  total: {
    forecastEmissions: number | null;
    totalAllowance: number | null;
    gap: number | null;
    creditsOwned: number;
  };
} {
  const perFacility: FacilityGap[] = data.facilities.map((f) => {
    const totalAllowance = f.allowance.periods.reduce(
      (sum, p) => sum + (p.allocatedTco2e !== "" ? Number(p.allocatedTco2e) : 0),
      0
    );
    const creditsOwned = f.credits.reduce(
      (sum, c) => sum + (c.creditVolume !== "" ? Number(c.creditVolume) : 0),
      0
    );

    let forecastEmissions: number | null = null;
    if (f.emissions.emissionsTco2e !== "") {
      forecastEmissions = Number(f.emissions.emissionsTco2e);
    } else {
      const prodActual = f.activityData
        .filter((r) => r.activityType === "production" && r.quantity !== "")
        .reduce((sum, r) => sum + Number(r.quantity), 0);
      const planned =
        f.emissions.productionPlanned !== ""
          ? Number(f.emissions.productionPlanned)
          : 0;
      const factor =
        f.emissions.productionFactor !== ""
          ? Number(f.emissions.productionFactor)
          : 0;
      if ((prodActual > 0 || planned > 0) && factor > 0) {
        forecastEmissions = (prodActual + planned) * factor;
      }
    }

    const gap =
      forecastEmissions !== null ? totalAllowance - forecastEmissions - creditsOwned : null;
    return {
      facilityId: f.id,
      facilityName: f.facility.facilityName || "(chưa đặt tên)",
      forecastEmissions,
      totalAllowance: totalAllowance || null,
      gap,
      creditsOwned,
    };
  });

  const totalAllowance = perFacility.reduce(
    (s, f) => s + (f.totalAllowance ?? 0),
    0
  );
  const totalCredits = perFacility.reduce((s, f) => s + f.creditsOwned, 0);
  const withForecast = perFacility.filter((f) => f.forecastEmissions !== null);
  if (withForecast.length === 0) {
    return {
      perFacility,
      total: {
        forecastEmissions: null,
        totalAllowance: totalAllowance || null,
        gap: null,
        creditsOwned: totalCredits,
      },
    };
  }
  const totalForecast = withForecast.reduce(
    (s, f) => s + (f.forecastEmissions ?? 0),
    0
  );
  const totalGap = totalAllowance - totalForecast - totalCredits;
  return {
    perFacility,
    total: {
      forecastEmissions: totalForecast,
      totalAllowance: totalAllowance || null,
      gap: totalGap,
      creditsOwned: totalCredits,
    },
  };
}
