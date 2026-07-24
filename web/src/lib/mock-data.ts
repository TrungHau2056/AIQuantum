import type {
  Facility,
  EmissionForecast,
  AbatementOption,
  ComplianceRule,
  WhatIfScenario,
  ESGProfile,
  BankAppraisal,
  RegulatorOverview,
} from "./types";

export const facility: Facility = {
  name: "Công ty CP Xi măng VICEM Hà Tiên",
  taxCode: "0301234567",
  sector: "cement",
  registryId: "VN-ETS-CMT-0042",
};

// Enterprise: 1 cement facility, 1 compliance period
// Allowance set below expected emissions (proposal: allocations < expected emissions)
export const forecast: EmissionForecast = {
  allowance: 2_400_000, // tCO2e allocated
  actualCumulative: 1_580_000, // emissions to date
  plannedRemaining: 1_020_000, // forecast remaining
  forecastEndOfPeriod: 2_600_000, // total forecast = 2.6M
  surplusDeficit: -200_000, // 2.4M - 2.6M = -200k deficit
  emissionFactor: 0.85, // tCO2e per ton clinker
  creditsOwned: 35_000, // carbon credits owned
  complianceBudget: 4_500_000, // USD max willing to spend
};

export const abatementOptions: AbatementOption[] = [
  {
    id: "ABT-01",
    name: "Thay thế một phần clinker bằng xỉ hạt lò cao (GGBFS)",
    capex: 1_200_000,
    opex: 80_000,
    reductionPct: 12,
    reductionTco2e: 312_000,
    paybackYears: 4.2,
    roi: 18.5,
    npv: 980_000,
    irr: 21.3,
    esgImpact: 78,
    timeline: "6 tháng",
  },
  {
    id: "ABT-02",
    name: "Nâng cấp bộ trao nhiệt tháp sơ cấp",
    capex: 850_000,
    opex: 45_000,
    reductionPct: 7,
    reductionTco2e: 182_000,
    paybackYears: 3.1,
    roi: 24.0,
    npv: 720_000,
    irr: 28.1,
    esgImpact: 65,
    timeline: "4 tháng",
    isOptimal: true,
  },
  {
    id: "ABT-03",
    name: "Chuyển đổi nhiên liệu: đồng xử lý rác thải (RDF)",
    capex: 2_400_000,
    opex: 150_000,
    reductionPct: 18,
    reductionTco2e: 468_000,
    paybackYears: 6.8,
    roi: 11.2,
    npv: 540_000,
    irr: 13.5,
    esgImpact: 88,
    timeline: "12 tháng",
  },
  {
    id: "ABT-04",
    name: "Lắp máy nghiền đứng thay máy nghiền bi",
    capex: 1_800_000,
    opex: 60_000,
    reductionPct: 9,
    reductionTco2e: 234_000,
    paybackYears: 5.0,
    roi: 15.0,
    npv: 610_000,
    irr: 17.8,
    esgImpact: 70,
    timeline: "8 tháng",
  },
  {
    id: "ABT-05",
    name: "Tối ưu vận hành: AI điều khiển lò nung",
    capex: 320_000,
    opex: 24_000,
    reductionPct: 4,
    reductionTco2e: 104_000,
    paybackYears: 2.2,
    roi: 32.0,
    npv: 420_000,
    irr: 41.2,
    esgImpact: 60,
    timeline: "3 tháng",
  },
  {
    id: "ABT-06",
    name: "Hệ thống thu hồi nhiệt thải (WHR)",
    capex: 3_100_000,
    opex: 120_000,
    reductionPct: 11,
    reductionTco2e: 286_000,
    paybackYears: 7.5,
    roi: 9.5,
    npv: 210_000,
    irr: 11.8,
    esgImpact: 82,
    timeline: "14 tháng",
  },
];

export const complianceRules: ComplianceRule[] = [
  {
    label: "Bù trừ tối đa bằng tín chỉ carbon",
    value: "30% nghĩa vụ nộp trả",
    source: "Nghị định 119/2025/NĐ-CP",
  },
  {
    label: "Vay trước hạn ngạch kỳ kế tiếp",
    value: "Tối đa 15% hạn ngạch kỳ sau",
    source: "Nghị định 119/2025/NĐ-CP",
  },
  {
    label: "Hậu quả thiếu hạn ngạch",
    value: "Khấu trừ vào hạn ngạch kỳ tiếp theo",
    source: "Nghị định 119/2025/NĐ-CP",
  },
  {
    label: "Hạn nộp trả hạn ngạch",
    value: "31/12/2027",
    source: "Quyết định 263/QĐ-TTg",
  },
];

// What-if: carbon price vs total compliance cost
// Decision threshold where buying credits vs investing in tech flips
export const whatIfScenarios: WhatIfScenario[] = [
  { carbonPrice: 5, buyCreditsCost: 1_000_000, investTechCost: 3_200_000, totalCost: 1_000_000 },
  { carbonPrice: 8, buyCreditsCost: 1_600_000, investTechCost: 3_200_000, totalCost: 1_600_000 },
  { carbonPrice: 10, buyCreditsCost: 2_000_000, investTechCost: 3_200_000, totalCost: 2_000_000, isThreshold: true },
  { carbonPrice: 12, buyCreditsCost: 2_400_000, investTechCost: 3_200_000, totalCost: 2_400_000 },
  { carbonPrice: 15, buyCreditsCost: 3_000_000, investTechCost: 3_200_000, totalCost: 3_000_000 },
  { carbonPrice: 18, buyCreditsCost: 3_600_000, investTechCost: 3_200_000, totalCost: 3_200_000 },
  { carbonPrice: 20, buyCreditsCost: 4_000_000, investTechCost: 3_200_000, totalCost: 3_200_000 },
  { carbonPrice: 25, buyCreditsCost: 5_000_000, investTechCost: 3_200_000, totalCost: 3_200_000 },
];

export const esgProfile: ESGProfile = {
  esgScore: 85,
  overallScore: 81,
  esgThreshold: 82,
  overallThreshold: 80,
  netZeroRoadmap: [
    { phase: "Giai đoạn 1", year: 2026, target: "Giảm 5% phát thải", feasibility: 92 },
    { phase: "Giai đoạn 2", year: 2028, target: "Giảm 15% phát thải", feasibility: 78 },
    { phase: "Giai đoạn 3", year: 2032, target: "Giảm 35% phát thải", feasibility: 61 },
    { phase: "Giai đoạn 4", year: 2040, target: "Giảm 70% phát thải", feasibility: 45 },
    { phase: "Net Zero", year: 2050, target: "Phát thải ròng = 0", feasibility: 38 },
  ],
  reductionTrend: [
    { period: "Q1/2025", emissions: 720_000, intensity: 0.92 },
    { period: "Q2/2025", emissions: 690_000, intensity: 0.89 },
    { period: "Q3/2025", emissions: 660_000, intensity: 0.86 },
    { period: "Q4/2025", emissions: 640_000, intensity: 0.83 },
    { period: "Q1/2026", emissions: 610_000, intensity: 0.80 },
    { period: "Q2/2026", emissions: 580_000, intensity: 0.77 },
  ],
  hasEsgReport: true,
  hasNetZeroCommitment: true,
};

export const bankAppraisal: BankAppraisal = {
  riskLevel: "Low",
  shortfallPct: 7.7, // 200k / 2.6M = 7.7% < 10% → Low
  complianceLevel: 92.3, // % compliance at end of period
  reductionTrend: [
    { period: "Q1/2025", emissions: 720_000 },
    { period: "Q2/2025", emissions: 690_000 },
    { period: "Q3/2025", emissions: 660_000 },
    { period: "Q4/2025", emissions: 640_000 },
    { period: "Q1/2026", emissions: 610_000 },
    { period: "Q2/2026", emissions: 580_000 },
  ],
  dataVerification: [
    { metric: "Sản lượng", completeness: 98, traceable: true, verified: true },
    { metric: "Tiêu thụ năng lượng", completeness: 96, traceable: true, verified: true },
    { metric: "Phát thải", completeness: 94, traceable: true, verified: false },
    { metric: "Hạn ngạch", completeness: 100, traceable: true, verified: true },
    { metric: "Tín chỉ carbon", completeness: 88, traceable: false, verified: false },
    { metric: "Báo cáo ESG", completeness: 82, traceable: true, verified: false },
  ],
};

// Regulator: national totals from proposal (verbatim numbers)
export const regulatorOverview: RegulatorOverview = {
  totalFacilities: 110,
  totalEmissions: 511.47, // MtCO2e (243.08 + 268.39)
  totalAllowance: 511.47,
  allowance2025: 243.08,
  allowance2026: 268.39,
  buyDemand: 38.6, // MtCO2e (allowances < emissions)
  sellDemand: 12.2,
  sectors: [
    { sector: "Nhiệt điện", facilities: 34, emissions: 298.5, allowance: 285.2, shortfall: 13.3 },
    { sector: "Sắt thép", facilities: 25, emissions: 112.8, allowance: 108.4, shortfall: 4.4 },
    { sector: "Xi măng", facilities: 51, emissions: 100.2, allowance: 117.9, shortfall: -17.7 },
  ],
  complianceStats: [
    { status: "Đạt hạn ngạch", count: 42, pct: 38.2 },
    { status: "Thiếu hạn ngạch", count: 51, pct: 46.4 },
    { status: "Nguy cơ vượt", count: 17, pct: 15.4 },
  ],
  greenTransition: [
    { metric: "Có báo cáo ESG", pct: 34 },
    { metric: "Cam kết Net Zero", pct: 28 },
    { metric: "Đầu tư công nghệ giảm phát thải", pct: 41 },
    { metric: "Có thể dùng nhiên liệu thay thế", pct: 23 },
    { metric: "Xu hướng chuyển đổi xanh", pct: 37 },
  ],
  surrenderDeadline: "31/12/2027",
};

// Cost impact from proposal: credit offset cuts 3-sector cost from ~USD 420.5M to ~68.9M
export const costImpact = {
  withoutOffset: 420.5, // million USD
  withOffset: 68.9, // million USD
  reduction: 351.6, // million USD saved
  offsetCap: 30, // %
};

export const roleLabels: Record<string, { label: string; short: string; desc: string }> = {
  enterprise: { label: "Doanh nghiệp", short: "DN", desc: "Dự báo, cảnh báo, tối ưu phương án tuân thủ" },
  investor: { label: "Nhà đầu tư", short: "ĐT", desc: "Đánh giá đầu tư xanh, ESG, lộ trình Net Zero" },
  bank: { label: "Ngân hàng", short: "NH", desc: "Thẩm định tín dụng xanh, rủi ro tuân thủ" },
  regulator: { label: "Cơ quan quản lý", short: "CQ", desc: "Tổng quan thị trường, cảnh báo tuân thủ" },
};
