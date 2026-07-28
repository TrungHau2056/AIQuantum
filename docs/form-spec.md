# Form Spec — Enterprise Data Ingestion (CarbonPilot)

Spec tham chiếu cho form nhập dữ liệu doanh nghiệp, gom theo **4 nhóm**. Map thẳng vào [Minimum Data Model 11 bảng](data-flow.md#minimum-data-model-mvp). Mỗi trường ghi: tên (camelCase), label tiếng Việt, kiểu, đơn vị, kỳ, required, validation, maps-to bảng.

## Nguyên tắc

- **Cấp cơ sở (facility-level)**: Carbon Digital Twin ở cấp nhà máy. Doanh nghiệp đa cơ sở lặp Nhóm 1 per cơ sở.
- **Chuỗi theo tháng**: dữ liệu hoạt động (sản lượng, nhiên liệu) theo tháng/quý (12–24 tháng) để Forecasting Engine dự báo BAU chính xác. Hỗ trợ upload Excel/CSV (map trường tự động, xác nhận trước khi lưu).
- **Required vs Optional**: required = gì cần cho MILP (hạn ngạch, dự báo, ngân sách, CAPEX/abatement, giá carbon). Optional = ESG, Net Zero roadmap, quyết định thực tế.
- **"Chưa biết" được phép**: để trống → hệ thống dùng default/ước lượng + gắn confidence thấp + flag "cần xác minh". Không chặn nhập.
- **Evidence + confidence**: mỗi số liệu có file chứng từ tùy chọn + mức kiểm định (tự khai / có chứng từ / bên thứ 3 xác minh).
- **Auto-calc**: phát thải = (sản lượng thực tế + kế hoạch) × hệ số; Compliance Gap = dự báo − hạn ngạch − tín chỉ. Doanh nghiệp nhập raw, hệ thống tính derived.
- **Abatement — cả % và absolute**: mỗi phương án giảm phát thải thu cả `% giảm so BAU` và `tCO₂e/năm` (absolute) — % alone không đủ tính Compliance Gap.

## Data completeness tiers

| Tier | Ý nghĩa | Có thể optimize? |
|---|---|---|
| **Đầy đủ** | Có hạn ngạch + dự báo + ≥1 phương án (CAPEX/abatement) + ngân sách + giá carbon | Có — chạy MILP |
| **Benchmark** | Có sản lượng + phát thải nhưng thiếu hạn ngạch/CAPEX | Không — chỉ dự báo thô |
| **Mảnh** | Thiếu nhiều trường cốt lõi | Không — flag cần bổ sung |

---

## Nhóm 1: Thông tin chung về doanh nghiệp → `company` + `facility`

| Field | Label | Type | Unit | Required | Validation | Maps to |
|---|---|---|---|---|---|---|
| `company.name` | Tên doanh nghiệp | text | — | yes | không rỗng | `company.name` |
| `company.taxId` | Mã số thuế | text | — | yes | 10–13 số | `company.tax_id` |
| `company.sector` | Ngành | select (thermal-power/steel/cement) | — | yes | enum | `company.sector` |
| `company.ownershipType` | Loại sở hữu | select (SOE/private/FDI/joint-stock) | — | no | — | `company.ownership_type` |
| `facility.facilityName` | Tên cơ sở/nhà máy | text | — | yes | không rỗng | `facility.facility_id` (tên) |
| `facility.registryId` | Mã cơ sở (Hệ thống đăng ký quốc gia) | text | — | no | — | `facility.facility_id` |
| `facility.province` | Tỉnh/TP | text | — | yes | — | `facility.province` |
| `facility.productMain` | Sản phẩm chính | text | — | yes | — | `facility.product_main` |
| `facility.capacity` | Công suất thiết kế | number | tấn/năm hoặc MW | yes | > 0 | `facility.capacity` |
| `facility.productUnit` | Đơn vị sản phẩm | select (tấn xi măng/tấn clinker/tấn thép/MWh) | — | yes | — | `facility.product_unit` |

> Doanh nghiệp đa cơ sở (tập đoàn): lặp Nhóm 1 per cơ sở. Prototype MVP xử lý 1 cơ sở chính.

## Nhóm 2: Hạn ngạch & phát thải → `allowance_position` + `activity_data` + `emissions` + `carbon_credit`

⚠️ **Nhóm quan trọng nhất** — input cốt lõi cho Compliance Gap.

| Field | Label | Type | Unit | Required | Validation | Maps to |
|---|---|---|---|---|---|---|
| `allowance.allocated2025` | Hạn ngạch được cấp 2025 | number | tCO₂e | yes | ≥ 0 | `allowance_position.allocated_tco2e` |
| `allowance.allocated2026` | Hạn ngạch được cấp 2026 | number | tCO₂e | yes | ≥ 0 | `allowance_position.allocated_tco2e` |
| `allowance.surrenderDeadline` | Hạn nộp trả | date | — | yes | default 2027-12-31 | `allowance_position.surrender_deadline` |
| `allowance.borrowedPct` | Đã vay kỳ sau | number | % | no | 0–15 | `allowance_position` (mở rộng) |
| `allowance.balance` | Số dư hiện tại | number | tCO₂e | no | — | `allowance_position.balance_tco2e` |
| `emissions.emissionsTco2e` | Phát thải thực tế lũy kế (từ báo cáo kiểm kê KNK) | number | tCO₂e | no | ≥ 0 | `emissions.emissions_tco2e` |
| `activityData` | Sản lượng đã sản xuất (chuỗi theo tháng) | table (upload Excel) | theo đơn vị | yes | ≥ 1 row | `activity_data` |
| `emissions.productionPlanned` | Sản lượng kế hoạch còn lại | number | theo đơn vị | yes | ≥ 0 | `activity_data` (planned) |
| `emissions.productionFactor` | Hệ số phát thải/đơn vị sản phẩm (theo CN hiện dùng) | number | tCO₂e/đơn vị | yes | > 0 | `emission_factor.factor_value` |
| `emissions.scope` | Phạm vi phát thải | select (scope-1/2/3) | — | no | enum | `emissions.scope` |
| `emissions.method` | Phương pháp kiểm kê | select (calculated/measured/verified-inventory) | — | no | — | `emissions.method` |
| `emissions.confidenceScore` | Điểm tin cậy | number | 0–100 | no | 0–100 | `emissions.confidence_score` |
| `credits` | Lượng tín chỉ carbon đang sở hữu | table (type/vintage/volume/eligible) | tCO₂e | no | — | `carbon_credit` |

> **Forecast logic**: phát thải dự báo = `emissionsTco2e` (nếu có báo cáo kiểm kê) else `(sumProductionActual + productionPlanned) × productionFactor`.
>
> **Compliance Gap** = tổng hạn ngạch − phát thải dự báo − tín chỉ.

## Nhóm 3: Phương án tối ưu → `green_project` + `market_scenario` + `fuelSwitch` + `actualDecision`

| Field | Label | Type | Unit | Required | Validation | Maps to |
|---|---|---|---|---|---|---|
| `greenProjects` | Danh sách phương án đầu tư công nghệ | table (lặp per phương án) | — | yes | ≥ 1 | `green_project` |
| `greenProjects[].projectName` | Tên phương án | text | — | yes | không rỗng | `green_project.project_id` |
| `greenProjects[].capex` | Vốn đầu tư (CAPEX) | number | VND | yes | > 0 | `green_project.capex` |
| `greenProjects[].abatementPct` | % giảm phát thải kì vọng | number | % | no | 0–100 | `green_project` (mở rộng) |
| `greenProjects[].abatementTco2eYear` | Lượng giảm (absolute) | number | tCO₂e/năm | yes | > 0 | `green_project.abatement_tco2e_year` |
| `greenProjects[].payback` | Thời gian hoàn vốn | number | năm | no | > 0 | `green_project` (mở rộng) |
| `greenProjects[].energySavings` | Tiết kiệm năng lượng | number | VND/năm | no | — | `green_project` (mở rộng) |
| `greenProjects[].opexDelta` | OPEX thay đổi | number | VND/năm | no | — | `green_project.opex_delta` |
| `greenProjects[].startDate` | Ngày bắt đầu | date | — | no | — | `green_project.start_date` |
| `greenProjects[].implementationLag` | Thời gian triển khai | number | tháng | no | — | `green_project` (mở rộng) |
| `greenProjects[].lifetime` | Tuổi thọ dự án | number | năm | no | — | `green_project.lifetime` |
| `greenProjects[].taxonomyMatch` | Phù hợp QĐ 21/2025 (Green Taxonomy)? | boolean | — | no | — | `green_project.taxonomy_match` |
| `fuelSwitch.altFuelPct` | % công suất tối đa áp dụng nhiên liệu thay thế | number | % | no | 0–100 | `green_project` (fuel-switch) |
| `fuelSwitch.altFuelCost` | Chi phí chuyển đổi nhiên liệu | number | VND | no | — | `green_project` (fuel-switch) |
| `market.priceLow` | Giá carbon (thấp) | number | VND/tCO₂e | no | > 0 | `market_scenario.price_low` |
| `market.priceBase` | Giá carbon (cơ sở) | number | VND/tCO₂e | yes | > 0 | `market_scenario.price_base` |
| `market.priceHigh` | Giá carbon (cao) | number | VND/tCO₂e | no | > 0 | `market_scenario.price_high` |
| `market.feeRate` | Phí giao dịch | number | % | no | 0–100 | `market_scenario.fee_rate` |
| `market.budget` | Ngân sách tuân thủ tối đa | number | VND | yes | > 0 | (decision constraint) |
| `actualDecision.chosen` | Quyết định lựa chọn phương án thực tế | select (buy-credits/invest-green/combine/no-action/undecided) | — | no | enum | `decision_scenario.actual_choice` |
| `actualDecision.note` | Ghi chú quyết định | textarea | — | no | — | `decision_scenario.note` |

> **`actualDecision` là OPTIONAL** trong wizard nhập liệu ban đầu — doanh nghiệp nhập dữ liệu TRƯỚC khi quyết định (optimizer mới đưa ra khuyến nghị). Thiết kế để doanh nghiệp quay lại cập nhật sau khi quyết định. Giá trị cho regulator: so sánh quyết định thực tế vs khuyến nghị optimizer → metric "tỷ lệ chấp nhận xanh" (adoption rate).

## Nhóm 4: ESG / phi tài chính → ESG profile

Optional — phục vụ Green Finance Profile (ngân hàng/nhà đầu tư thẩm định tín dụng xanh).

| Field | Label | Type | Unit | Required | Validation | Maps to |
|---|---|---|---|---|---|---|
| `esg.hasEsgReport` | Có báo cáo ESG? | boolean | — | no | — | ESG profile |
| `esg.esgScore` | ESG Score | number | /100 | no | 0–100 | ESG profile |
| `esg.netZeroCommitment` | Cam kết Net Zero? | boolean | — | no | — | ESG profile |
| `esg.netZeroRoadmap` | Lộ trình đạt Net Zero (mốc trung gian) | textarea | — | no | — | ESG profile |

---

## Validation tổng hợp

- **Step validation**: không cho next nếu thiếu required field trong nhóm hiện tại. Hiển thị lỗi cụ thể.
- **Cross-field**: `priceLow ≤ priceBase ≤ priceHigh`; `borrowedPct ≤ 15`; `creditVolume` dùng bù trừ ≤ 30% nghĩa vụ (cảnh báo nếu vượt).
- **Data completeness bar**: % = (số required field đã nhập) / (tổng required). Tier tự động: ≥80% → "Đầy đủ", 40–79% → "Benchmark", <40% → "Mảnh".

## Output sau submit

Lưu form data vào state (Stage 1, mock). Hiển thị summary + Compliance Gap auto-calc + data completeness tier. Stage 2: POST tới API ingest (F11) → Carbon Data Ledger.
