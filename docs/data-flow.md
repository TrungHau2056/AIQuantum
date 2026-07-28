# Data Flow — Inputs → Outputs (CarbonPilot)

Spec tham chiếu cho ranh giới mô hình dữ liệu và logic suy ra output. Tham chiếu bởi [CLAUDE.md](../CLAUDE.md). Giữ nguyên các văn bản pháp lý và ngưỡng khi triển khai. Đồng bộ với [docs/project-context.md](project-context.md) (đề án đầy đủ).

## Định vị

CarbonPilot là lớp **Carbon & Green Finance Decision Infrastructure** — không thay thế sàn giao dịch carbon, mà bổ sung lớp dữ liệu và trí tuệ ra quyết định cho doanh nghiệp, ngân hàng, nhà đầu tư, cơ quan quản lý. Output trọng tâm: **Carbon Digital Twin** (cấp cơ sở), **Compliance Gap**, **Scenario Recommendation**, **Green Finance Profile**.

## Input sources (4 categories)

### A. Input từ doanh nghiệp (Enterprise)

| Nhóm | Dữ liệu | Ghi chú |
|---|---|---|
| 1. Thông tin chung | Tên DN, mã số thuế, ngành (nhiệt điện / sắt thép / xi măng), danh sách cơ sở/nhà máy trực thuộc, mã cơ sở theo Hệ thống đăng ký quốc gia (nếu có) | Bảng `company`, `facility` |
| 2. Hạn ngạch & phát thải | Hạn ngạch được cấp trong kỳ (tấn CO₂e); phát thải thực tế lũy kế; sản lượng đã sản xuất; sản lượng kế hoạch còn lại; hệ số phát thải/đơn vị sản phẩm; lượng tín chỉ carbon đang sở hữu | Bảng `allowance_position`, `emissions`, `activity_data`, `carbon_credit` |
| 3. Tối ưu phương án | Danh sách phương án đầu tư công nghệ; CAPEX, OPEX, % giảm phát thải, thời gian hoàn vốn, NPV, IRR; khả năng chuyển đổi nhiên liệu; ngân sách tuân thủ tối đa; giá carbon giả định; **quyết định lựa chọn phương án trên thực tế** | Bảng `green_project`, `market_scenario`, `decision_scenario`. ⚠️ Open question — see below |
| 4. ESG / phi tài chính | Báo cáo ESG (nếu có); cam kết Net Zero / mục tiêu môi trường tự nguyện; lộ trình đạt Net Zero | Optional input. Trích bằng AI/NLP |

### B. Input từ khung pháp lý (Legal framework)

| Nhóm | Dữ liệu | Nguồn |
|---|---|---|
| 1. Hạn ngạch phát thải | Quy định xử lý khi vượt hạn ngạch; chu kỳ kiểm kê, báo cáo và nộp kết quả | NĐ 119/2025, QĐ 263/QĐ-TTg |
| 2. Tín chỉ carbon | Tỷ lệ tối đa bù trừ (30%); loại tín chỉ được phép; lộ trình vận hành thị trường; danh mục ngành/lĩnh vực phải kiểm kê & tham gia ETS; danh mục cơ sở phát thải lớn | NĐ 119/2025, QĐ 13/2024, QĐ 699/QĐ-BNNMT |
| 3. Công nghệ giảm phát thải | Danh mục công nghệ giảm phát thải theo từng ngành | Bộ Công Thương, Bộ Xây dựng, IEA, IFC, World Bank, GIZ |
| 4. Chính sách tài chính xanh | Tín dụng xanh, trái phiếu xanh, ưu đãi tài chính; phân loại xanh | QĐ 21/2025/QĐ-TTg (Green Taxonomy), Bộ Tài chính |
| 5. Quy định cập nhật | Thay đổi chính sách về hạn ngạch, tín chỉ, MRV, ESG | Cổng TTĐT Chính phủ, Bộ NN&MT, Bộ Tài chính |

### C. Input từ thị trường carbon (Carbon market)

| Dữ liệu | Nguồn |
|---|---|
| Giá tín chỉ carbon trong nước (khi hình thành) | Sàn giao dịch carbon Việt Nam (NĐ 29/2026) |
| Giá tham chiếu quốc tế (EU ETS, CORSIA, VCM...) | ICE, EEX, World Bank Carbon Pricing Dashboard [R10] |
| Biến động giá, thanh khoản, khối lượng giao dịch | Sàn giao dịch / nguồn dữ liệu thị trường |
| Scenario giá (low/base/high) | MVP dùng mock — không tuyên bố là giá giao dịch thực tế |

### D. Input từ ngân hàng (Bank)

- Chính sách, bộ tiêu chuẩn thẩm định tín dụng xanh.
- Tham khảo: IFC Performance Standards, hướng dẫn tín dụng xanh của NHNN, QĐ 21/2025 (Taxonomy Xanh).

---

## Minimum Data Model (MVP)

Đầy đủ trường tối thiểu tại [docs/project-context.md §Phần VI.5](project-context.md). Tóm tắt:

| Bảng | Khóa chính | Mục đích |
|---|---|---|
| `company` | company_id | Nhận diện doanh nghiệp, phân ngành |
| `facility` | facility_id | Cấp cơ sở/nhà máy — đơn vị của Carbon Digital Twin |
| `activity_data` | facility_id + month + activity_type | Điện, nhiên liệu, sản lượng, nguyên liệu + evidence_id |
| `emission_factor` | factor_id | Hệ số phát thải có version + source |
| `emissions` | facility_id + period + scope | Phát thải Scope 1/2 + confidence_score |
| `allowance_position` | facility_id + period | Hạn ngạch được cấp + balance + surrender_deadline |
| `carbon_credit` | credit_id | Tín chỉ đang có: type, vintage, volume, status |
| `market_scenario` | scenario_id | Giá low/base/high + fee_rate |
| `green_project` | project_id | Phương án đầu tư xanh: CAPEX, OPEX, abatement, lifetime, taxonomy_match |
| `decision_scenario` | scenario_id | Kết quả mô phỏng/tối ưu: actions, total_cost, emissions_after, compliance_status, npv |
| `evidence_file` | evidence_id | Evidence vault + audit trail (hash, upload_time, approved_by) |

Mỗi bản ghi gắn: nguồn, thời gian cập nhật, đơn vị đo, trạng thái xác minh, điểm tin cậy (confidence score).

---

## Outputs by stakeholder (with derivation)

### Doanh nghiệp (Enterprise) — Carbon Digital Twin + Compliance Gap + Scenario Recommendation

| Output | Suy ra từ input/fact nào |
|---|---|
| Carbon Digital Twin (hồ sơ phát thải, hạn ngạch, tín chỉ, ESG, chứng từ nguồn cấp cơ sở) | activity_data + emission_factor → emissions; allowance_position + carbon_credit + ESG |
| Compliance Gap (cảnh báo thiếu/dư hạn ngạch, lượng tín chỉ cần mua, rủi ro vượt cuối kỳ) | phát thải dự báo − hạn ngạch − tín chỉ/hạn ngạch khả dụng; quy định bù trừ tối đa 30%, vay tối đa 15% kỳ sau (NĐ 119/2025) |
| Scenario Recommendation (khuyến nghị mua tín chỉ/đầu tư công nghệ/mua điện xanh/kết hợp; chi phí + tác động tCO₂e) | green_project + market_scenario + ràng buộc (ngân sách, pháp lý, tiến độ) → optimization (MILP/QUBO) |
| What-if theo kịch bản giá tín chỉ biến động (ngưỡng giá quyết định) | market_scenario sensitivity |
| Green Finance Profile (hồ sơ chia sẻ với ngân hàng/nhà đầu tư) | emissions + allowance_position + green_project + confidence_score + NPV sơ bộ |
| Báo cáo tự động (PDF/DOCX/Excel) + Chatbot tư vấn | Tổng hợp từ các output trên; LLM chỉ diễn giải, KHÔNG sinh số liệu |

### Nhà đầu tư (Investor) — Green Finance Profile

Dashboard đánh giá đầu tư xanh:
- ESG Score, Overall Score
- Lộ trình đạt Net Zero theo từng giai đoạn (Optional) → mức độ khả thi
- Xu hướng giảm thải carbon theo kỳ/năm
- Dữ liệu carbon, dự án xanh, NPV sơ bộ, điểm tin cậy dữ liệu

- **Đầu vào**: báo cáo ESG, activity data, dự án xanh + LLM extraction
- **Ngưỡng**: ESG Score ≥ 82/100, Overall Score ≥ 80/100
- **Tham khảo**: MSCI ESG Ratings, Sustainalytics, quỹ ESG ASEAN

### Ngân hàng (Bank) — Thẩm định tín dụng xanh

Dashboard thẩm định tín dụng xanh:
- Lộ trình đạt Net Zero theo từng giai đoạn (Optional) → mức độ khả thi
- Mức độ tuân thủ (cuối kỳ) — Compliance Gap
- Xu hướng giảm phát thải carbon theo kỳ/năm
- Điểm tin cậy dữ liệu + evidence vault

- **Đầu vào**: dữ liệu DN upload (Green Finance Profile doanh nghiệp chủ động chia sẻ)
- **Tham khảo**: IFC Performance Standards & hướng dẫn tín dụng xanh của NHNN
- **Policy rule**:
  - Quyết định 263/QĐ-TTg (hạn ngạch)
  - Quyết định 13/2024/QĐ-TTg (đối tượng phải kiểm kê)
  - Quy định tối đa 30% bù trừ bằng tín chỉ carbon
  - **Quyết định 21/2025/QĐ-TTg (Taxonomy Xanh)**
- **Ngưỡng rủi ro**: Thiếu hạn ngạch < 10% → Low

### Cơ quan quản lý (Regulator)

**Dashboard dữ liệu tổng quan**:
- Tổng lượng phát thải, hạn ngạch đã cấp, nhu cầu mua/bán tín chỉ carbon toàn quốc → theo ngành, lĩnh vực, địa phương
- Bảng so sánh dữ liệu theo ngành / lĩnh vực / địa phương
- Tổng hợp phát thải, hạn ngạch, nhu cầu mua/bán tín chỉ DN cung cấp toàn quốc → phân loại ngành (xi măng, thép...), lĩnh vực (công nghiệp...), địa phương

**Báo cáo cảnh báo tuân thủ & mức độ chuyển đổi xanh**:
- Số lượng, % DN đáp ứng hạn ngạch (hiện tại) / thiếu hạn ngạch (hiện tại) / có thể vượt (cuối kỳ)
- Mức tăng/giảm phát thải theo quý/tháng/năm của từng ngành, lĩnh vực, địa phương
- Số lượng, % DN có báo cáo ESG, cam kết Net Zero, đầu tư công nghệ giảm phát thải, có thể dùng nhiên liệu thay thế
- **Xu hướng lựa chọn chuyển đổi xanh thay vì mua tín chỉ** (suy ra từ "quyết định lựa chọn phương án trên thực tế" của DN)

**Dữ liệu Opt-in View** (nếu DN đồng ý chia sẻ): ESG, tiến độ giảm phát thải

- **Derivation**: tổng hợp dữ liệu phát thải/hạn ngạch/nhu cầu mua-bán của DN → tính %; so sánh theo thời gian; tổng hợp % DN có ESG/Net Zero (DN chọn Có/Không)/đầu tư công nghệ; thống kê theo lựa chọn DN.

---

## Luồng xử lý (7 bước)

1. **Thu thập dữ liệu**: doanh nghiệp nhập/upload (Excel/CSV/PDF) — sản lượng, điện, nhiên liệu, phát thải, hạn ngạch, tín chỉ, ngân sách, phương án đầu tư xanh, ESG.
2. **AI chuẩn hóa + kiểm tra chất lượng**: đồng bộ đơn vị đo, kỳ báo cáo, nguồn chứng từ, độ đầy đủ, điểm tin cậy; phát hiện thiếu/trùng/sai lệch/bất thường.
3. **Emission engine**: tính phát thải hiện tại và dự báo BAU cuối kỳ (GHG Protocol/IPCC; Scope 1/2 ở MVP).
4. **Compliance engine**: tính chênh lệch hạn ngạch = phát thải dự báo − hạn ngạch − tín chỉ/hạn ngạch khả dụng.
5. **Scenario engine**: sinh kịch bản — mua tín chỉ, đầu tư công nghệ xanh, mua điện xanh, vay mượn/điều chuyển hạn ngạch, hoặc kết hợp.
6. **Quantum-inspired optimizer**: chọn phương án tổng chi phí thấp nhất hoặc điểm tổng hợp tốt nhất (MILP/QUBO) dưới ràng buộc pháp lý, ngân sách, tiến độ, ESG.
7. **Dashboard + output**: xuất khuyến nghị, cảnh báo rủi ro, báo cáo tuân thủ và Green Finance Profile.

Hàm mục tiêu: `Minimize Total Cost = Cost_credit + CAPEX + OPEX_delta − Energy_savings − Avoided_future_carbon_cost`

Ràng buộc:
- `Emissions_after_actions <= Allowance + eligible_credits + other_allowed_mechanisms`
- `CAPEX <= Budget`
- `Offset/credit usage <= legal_limit(versioned policy rule)` (30% bù trừ, 15% vay kỳ sau)
- `Project_start_date, implementation_lag, project_lifetime` được tôn trọng

---

## Open questions / team notes

- **"Quyết định lựa chọn phương án trên thực tế" (Nhóm 3, input doanh nghiệp)** — output cho Cơ quan quản lý về xu hướng chuyển đổi xanh thay vì chỉ mua tín chỉ. **Cần chốt: required hay optional.** Ảnh hưởng đến: (1) dữ liệu model nhận, (2) khả năng tổng hợp xu hướng cho regulator.
- **Scope 3**: MVP chỉ tính Scope 1/2; Scope 3 để giai đoạn sau khi đủ dữ liệu chuỗi cung ứng.
- **Registry/exchange API**: MVP thiết kế data model tương thích; tích hợp API/file secure ở giai đoạn sau (đang khảo sát).
