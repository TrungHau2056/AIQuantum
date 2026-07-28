import type {
  Facility,
  EmissionForecast,
  AbatementOption,
  ComplianceRule,
  WhatIfScenario,
  ESGProfile,
  BankAppraisal,
  RegulatorOverview,
  EnterpriseSummary,
} from "./types";

// Cơ sở demo chính: xi măng A (synthetic, theo logic ngành — docs Phần V.3)
// Sản lượng 3M tấn/năm, BAU 2,4M tCO2e, hạn ngạch 2,2M, thiếu 200k, giá 250.000 VND/tCO2e
export const facility: Facility = {
  name: "Nhà máy xi măng A (synthetic)",
  taxCode: "0300000001",
  sector: "cement",
  registryId: "VN-ETS-CMT-0001",
  province: "Kiên Giang",
  productionVolume: 3_000_000, // tấn xi măng/năm
  productUnit: "tấn xi măng",
};

// Enterprise: 1 cement facility, 1 compliance period
// Allowance (2,2M) set below BAU emissions (2,4M) → Compliance Gap = -200k
export const forecast: EmissionForecast = {
  allowance: 2_200_000, // tCO2e allocated
  actualCumulative: 1_440_000, // emissions to date (60% of BAU)
  plannedRemaining: 960_000, // forecast remaining
  forecastEndOfPeriod: 2_400_000, // total forecast BAU = 2.4M
  surplusDeficit: -200_000, // 2.2M - 2.4M = -200k deficit (Compliance Gap)
  emissionFactor: 0.8, // tCO2e per ton cement (2.4M / 3M)
  creditsOwned: 50_000, // carbon credits owned
  complianceBudget: 80_000_000_000, // 80 tỷ VND
  carbonPriceAssumption: 250_000, // VND/tCO2e
};

// 6 phương án giảm phát thải (CAPEX/OPEX bằng VND)
// WHR = dự án ví dụ trong docs (CAPEX 70 tỷ, giảm 120k tCO2e/năm, tiết kiệm 12 tỷ/năm)
export const abatementOptions: AbatementOption[] = [
  {
    id: "ABT-01",
    name: "Thay thế một phần clinker bằng xỉ hạt lò cao (GGBFS)",
    capex: 28_800_000_000, // ~1.2M USD → VND
    opex: 1_920_000_000,
    reductionPct: 12,
    reductionTco2e: 288_000,
    energySavings: 0,
    paybackYears: 4.2,
    roi: 18.5,
    npv: 23_520_000_000,
    irr: 21.3,
    esgImpact: 78,
    timeline: "6 tháng",
    taxonomyMatch: true,
  },
  {
    id: "ABT-02",
    name: "Nâng cấp bộ trao nhiệt tháp sơ cấp",
    capex: 20_400_000_000,
    opex: 1_080_000_000,
    reductionPct: 7,
    reductionTco2e: 168_000,
    energySavings: 0,
    paybackYears: 3.1,
    roi: 24.0,
    npv: 17_280_000_000,
    irr: 28.1,
    esgImpact: 65,
    timeline: "4 tháng",
    taxonomyMatch: true,
  },
  {
    id: "ABT-03",
    name: "Chuyển đổi nhiên liệu: đồng xử lý rác thải (RDF)",
    capex: 57_600_000_000,
    opex: 3_600_000_000,
    reductionPct: 18,
    reductionTco2e: 432_000,
    energySavings: 0,
    paybackYears: 6.8,
    roi: 11.2,
    npv: 12_960_000_000,
    irr: 13.5,
    esgImpact: 88,
    timeline: "12 tháng",
    taxonomyMatch: true,
  },
  {
    id: "ABT-04",
    name: "Lắp máy nghiền đứng thay máy nghiền bi",
    capex: 43_200_000_000,
    opex: 1_440_000_000,
    reductionPct: 9,
    reductionTco2e: 216_000,
    energySavings: 0,
    paybackYears: 5.0,
    roi: 15.0,
    npv: 14_640_000_000,
    irr: 17.8,
    esgImpact: 70,
    timeline: "8 tháng",
    taxonomyMatch: true,
  },
  {
    id: "ABT-05",
    name: "Tối ưu vận hành: AI điều khiển lò nung",
    capex: 7_680_000_000,
    opex: 576_000_000,
    reductionPct: 4,
    reductionTco2e: 96_000,
    energySavings: 0,
    paybackYears: 2.2,
    roi: 32.0,
    npv: 10_080_000_000,
    irr: 41.2,
    esgImpact: 60,
    timeline: "3 tháng",
    taxonomyMatch: false,
  },
  {
    id: "ABT-06",
    name: "Hệ thống thu hồi nhiệt thải (WHR)",
    capex: 70_000_000_000, // 70 tỷ VND (theo docs)
    opex: 2_880_000_000,
    reductionPct: 5,
    reductionTco2e: 120_000, // giảm 120k tCO2e/năm (theo docs)
    energySavings: 12_000_000_000, // tiết kiệm 12 tỷ VND/năm (theo docs)
    paybackYears: 5.8,
    roi: 14.5,
    npv: 18_400_000_000,
    irr: 17.2,
    esgImpact: 82,
    timeline: "14 tháng",
    taxonomyMatch: true,
    isOptimal: true,
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
  {
    label: "Phân loại xanh (Green Taxonomy)",
    value: "Tiêu chí môi trường dự án xanh",
    source: "Quyết định 21/2025/QĐ-TTg",
  },
];

// What-if: giá carbon (nghìn VND/tCO2e) vs tổng chi phí tuân thủ (tỷ VND)
// Ngưỡng quyết định tại 250.000 VND/tCO2e (250 nghìn) — dưới thì mua tín chỉ, trên thì đầu tư công nghệ
export const whatIfScenarios: WhatIfScenario[] = [
  { carbonPrice: 150, buyCreditsCost: 22_500_000_000, investTechCost: 70_000_000_000, totalCost: 22_500_000_000 },
  { carbonPrice: 200, buyCreditsCost: 30_000_000_000, investTechCost: 70_000_000_000, totalCost: 30_000_000_000 },
  { carbonPrice: 250, buyCreditsCost: 37_500_000_000, investTechCost: 70_000_000_000, totalCost: 37_500_000_000, isThreshold: true },
  { carbonPrice: 300, buyCreditsCost: 45_000_000_000, investTechCost: 70_000_000_000, totalCost: 45_000_000_000 },
  { carbonPrice: 350, buyCreditsCost: 52_500_000_000, investTechCost: 70_000_000_000, totalCost: 52_500_000_000 },
  { carbonPrice: 400, buyCreditsCost: 60_000_000_000, investTechCost: 70_000_000_000, totalCost: 60_000_000_000 },
  { carbonPrice: 450, buyCreditsCost: 67_500_000_000, investTechCost: 70_000_000_000, totalCost: 67_500_000_000 },
  { carbonPrice: 500, buyCreditsCost: 75_000_000_000, investTechCost: 70_000_000_000, totalCost: 70_000_000_000 },
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
    { period: "Q1/2025", emissions: 660_000, intensity: 0.88 },
    { period: "Q2/2025", emissions: 630_000, intensity: 0.84 },
    { period: "Q3/2025", emissions: 605_000, intensity: 0.81 },
    { period: "Q4/2025", emissions: 590_000, intensity: 0.79 },
    { period: "Q1/2026", emissions: 570_000, intensity: 0.76 },
    { period: "Q2/2026", emissions: 545_000, intensity: 0.73 },
  ],
  hasEsgReport: true,
  hasNetZeroCommitment: true,
};

export const bankAppraisal: BankAppraisal = {
  riskLevel: "Thấp",
  shortfallPct: 8.3, // 200k / 2.4M = 8.3% < 10% → Thấp
  complianceLevel: 91.7, // % compliance at end of period
  reductionTrend: [
    { period: "Q1/2025", emissions: 660_000 },
    { period: "Q2/2025", emissions: 630_000 },
    { period: "Q3/2025", emissions: 605_000 },
    { period: "Q4/2025", emissions: 590_000 },
    { period: "Q1/2026", emissions: 570_000 },
    { period: "Q2/2026", emissions: 545_000 },
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

// Cost impact from proposal: credit offset cuts 3-sector compliance cost from ~USD 420.5M to ~68.9M
// (số liệu nghiên cứu Impact Assessment ETS — giữ triệu USD; không phải số liệu VND demo)
export const costImpact = {
  withoutOffset: 420.5, // triệu USD
  withOffset: 68.9, // triệu USD
  reduction: 351.6, // triệu USD tiết kiệm
  offsetCap: 30, // %
  currency: "triệu USD",
};

// 10 doanh nghiệp synthetic cho MVP (4 xi măng, 3 nhiệt điện, 3 thép) — docs Phần VI.2
export const enterprises: EnterpriseSummary[] = [
  { id: "ENT-01", name: "Xi măng A", sector: "cement", province: "Kiên Giang", productionVolume: 3_000_000, forecastEmissions: 2_400_000, allowance: 2_200_000, deficit: -200_000, creditsOwned: 50_000, esgScore: 85, hasNetZeroCommitment: true },
  { id: "ENT-02", name: "Xi măng B", sector: "cement", province: "Hà Nam", productionVolume: 2_500_000, forecastEmissions: 2_000_000, allowance: 1_850_000, deficit: -150_000, creditsOwned: 30_000, esgScore: 78, hasNetZeroCommitment: false },
  { id: "ENT-03", name: "Xi măng C", sector: "cement", province: "Quảng Ninh", productionVolume: 2_800_000, forecastEmissions: 2_250_000, allowance: 2_100_000, deficit: -150_000, creditsOwned: 40_000, esgScore: 81, hasNetZeroCommitment: true },
  { id: "ENT-04", name: "Xi măng D", sector: "cement", province: "Bình Phước", productionVolume: 2_200_000, forecastEmissions: 1_760_000, allowance: 1_650_000, deficit: -110_000, creditsOwned: 20_000, esgScore: 72, hasNetZeroCommitment: false },
  { id: "ENT-05", name: "Nhiệt điện A", sector: "thermal-power", province: "Quảng Ninh", productionVolume: 5_500_000, forecastEmissions: 4_950_000, allowance: 4_700_000, deficit: -250_000, creditsOwned: 60_000, esgScore: 80, hasNetZeroCommitment: true },
  { id: "ENT-06", name: "Nhiệt điện B", sector: "thermal-power", province: "Trà Vinh", productionVolume: 4_800_000, forecastEmissions: 4_320_000, allowance: 4_100_000, deficit: -220_000, creditsOwned: 45_000, esgScore: 76, hasNetZeroCommitment: false },
  { id: "ENT-07", name: "Nhiệt điện C", sector: "thermal-power", province: "Hải Phòng", productionVolume: 5_000_000, forecastEmissions: 4_500_000, allowance: 4_300_000, deficit: -200_000, creditsOwned: 50_000, esgScore: 83, hasNetZeroCommitment: true },
  { id: "ENT-08", name: "Sắt thép A", sector: "steel", province: "Hà Tĩnh", productionVolume: 2_000_000, forecastEmissions: 1_800_000, allowance: 1_700_000, deficit: -100_000, creditsOwned: 25_000, esgScore: 79, hasNetZeroCommitment: true },
  { id: "ENT-09", name: "Sắt thép B", sector: "steel", province: "Bà Rịa - Vũng Tàu", productionVolume: 1_800_000, forecastEmissions: 1_620_000, allowance: 1_520_000, deficit: -100_000, creditsOwned: 20_000, esgScore: 74, hasNetZeroCommitment: false },
  { id: "ENT-10", name: "Sắt thép C", sector: "steel", province: "Đồng Nai", productionVolume: 1_500_000, forecastEmissions: 1_350_000, allowance: 1_280_000, deficit: -70_000, creditsOwned: 15_000, esgScore: 77, hasNetZeroCommitment: false },
];

export const roleLabels: Record<string, { label: string; short: string; desc: string }> = {
  enterprise: { label: "Doanh nghiệp", short: "DN", desc: "Carbon Digital Twin, Compliance Gap, tối ưu phương án tuân thủ" },
  investor: { label: "Nhà đầu tư", short: "ĐT", desc: "Green Finance Profile, ESG, lộ trình Net Zero" },
  bank: { label: "Ngân hàng", short: "NH", desc: "Thẩm định tín dụng xanh, rủi ro tuân thủ" },
  regulator: { label: "Cơ quan quản lý", short: "CQ", desc: "Tổng quan thị trường, cảnh báo tuân thủ" },
};
