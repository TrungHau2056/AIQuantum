# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Vòng lặp Vận hành (Ops Loop)

Bạn đang làm việc trong một kho lưu trữ được thiết kế cho công việc triển khai chạy lâu. Ưu tiên hoàn thành đáng tin cậy, tính liên tục qua các phiên, và xác minh rõ ràng hơn tốc độ.

Ở đầu mỗi phiên:

1. Chạy `pwd` và xác nhận bạn đang ở trong thư mục gốc kho lưu trữ dự kiến.
2. Đọc `claude-progress.md`.
3. Đọc `feature_list.json`.
4. Xem lại các commit gần đây bằng `git log --oneline -5`.
5. Chạy `./init.sh`.
6. Kiểm tra xem đường dẫn smoke hoặc end-to-end baseline có đã bị hỏng chưa.

Sau đó chọn chính xác một tính năng chưa hoàn thành và chỉ làm việc trên tính năng đó cho đến khi bạn xác minh nó hoặc ghi lại lý do tại sao nó bị chặn.

### Quy tắc

- Một tính năng active tại một thời điểm.
- Không tuyên bố hoàn thành mà không có bằng chứng có thể chạy được.
- Không viết lại feature list để ẩn công việc chưa hoàn thành.
- Không xóa hoặc làm yếu các test chỉ để tác vụ có vẻ hoàn thành.
- Sử dụng các artifact kho lưu trữ như hệ thống ghi chép.

### Tệp bắt buộc

- `feature_list.json`
- `claude-progress.md`
- `init.sh`
- `session-handoff.md` (khi bàn giao ngắn gọn hữu ích)

> Ghi chú trạng thái: repo chưa có code — `init.sh` hiện là placeholder, chưa có smoke/e2e baseline. Vòng lặp này kích hoạt đầy đủ khi stack được chốt và có code/test. Các tệp bắt buộc đã được tạo ở dạng stub tối thiểu để vòng lặp không vỡ ngay.

### Cổng hoàn thành

Một tính năng chỉ có thể chuyển sang `passing` sau khi xác minh cần thiết thành công và kết quả được ghi lại.

### Trước khi bạn dừng

1. Cập nhật nhật ký tiến độ.
2. Cập nhật trạng thái tính năng.
3. Ghi lại những gì vẫn bị hỏng hoặc chưa được xác minh.
4. Commit khi kho lưu trữ an toàn để tiếp tục.
5. Để lại đường dẫn khởi động lại sạch sẽ cho phiên tiếp theo.

## Project Overview

**CarbonPilot** (tên đề tài: **AI + Quantum Carbon & Green Finance Decision Platform**) là lớp **Carbon & Green Finance Decision Infrastructure** cho thị trường carbon Việt Nam (ETS), xây cho cuộc thi **AI-Quantum Challenge 2026** (Vòng 1). Hệ thống không thay thế sàn giao dịch carbon mà bổ sung lớp dữ liệu và trí tuệ ra quyết định: giúp doanh nghiệp phát thải lớn (nhiệt điện, sắt thép, xi măng) biến dữ liệu phân tán thành **Carbon Digital Twin** ở cấp cơ sở, dự báo **Compliance Gap**, và chọn tổ hợp tuân thủ tối ưu (mua tín chỉ/hạn ngạch, dùng tín chỉ đang có, đầu tư công nghệ xanh, mua điện xanh, hoặc kết hợp) dưới ràng buộc pháp lý/ngân sách/tiến độ/ESG. Đồng thời tạo **Green Finance Profile** chuẩn hóa cho ngân hàng/nhà đầu tư thẩm định tín dụng xanh.

Reference docs (read before domain logic):
- [docs/project-context.md](docs/project-context.md) — mẫu hồ sơ đề xuất đầy đủ: bài toán, giải pháp, quy trình xử lý, đối thủ, data model MVP, kế hoạch 12 tuần, legal refs R1–R10 (source of truth).
- [docs/data-flow.md](docs/data-flow.md) — input sources (4 categories) → Minimum Data Model (11 bảng) → outputs by stakeholder (4) với derivation logic, ngưỡng, hàm mục tiêu, open questions.

## Status

Demo UI (Stage 1) built in `web/` — Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui + Recharts. Uses mock data (VND, synthetic theo logic ngành — ví dụ xi măng A: hạn ngạch 2,2M tCO₂e, thiếu 200k, giá 250.000 VND/tCO₂e); no backend yet. Build passes (`npm run build` → 5 static routes). Backend (FastAPI + Pyomo/HiGHS + PostgreSQL + MinIO), real RBAC/auth, evidence vault, và local LLM là Stage 2.

## Run

All commands run from `web/` (or use `--prefix web` from repo root):

```bash
cd web
npm install      # install deps
npm run dev      # dev server at localhost:3000
npm run build    # production build (verify)
```

`./init.sh` from repo root runs `npm install` + `npm run build` in `web/`.

## Planned Architecture

CarbonPilot là lớp Decision Infrastructure nằm giữa doanh nghiệp, sàn giao dịch carbon, registry/lưu ký, ngân hàng, nhà đầu tư và cơ quan quản lý. Doanh nghiệp là trung tâm: sở hữu dữ liệu, nhập/xác nhận, ra quyết định cuối; bên ngoài chỉ xem chỉ số/hồ sơ/báo cáo doanh nghiệp chủ động chia sẻ hoặc dữ liệu nghĩa vụ báo cáo. Core engines:

- **Carbon Data Ledger** — normalized store (PostgreSQL); 11 bảng MVP (company, facility, activity_data, emission_factor, emissions, allowance_position, carbon_credit, market_scenario, green_project, decision_scenario, evidence_file). Mỗi bản ghi gắn nguồn, thời gian, đơn vị, trạng thái xác minh, confidence score. Evidence/reports trong MinIO (evidence vault + audit trail).
- **Data Ingestion & Quality** (Python, Polars/Pandas, Pydantic) — parser XLSX/CSV/PDF + OCR chọn lọc; ánh xạ trường về golden schema; rule-based validation + anomaly detection; giữ giá trị gốc + chuẩn hóa + nguồn chứng từ; gắn confidence score.
- **Emission Engine** — GHG Protocol/IPCC/local emission factors; Scope 1/2 ở MVP, Scope 3 để sau. Tính phát thải hiện tại + dự báo BAU cuối kỳ.
- **Forecasting Engine** — dự báo phát thải cuối kỳ + allowance surplus/deficit (Compliance Gap). Early: cumulative actual + planned output + emission factors + abatement. Later: time-series ML (XGBoost/LightGBM/Quantile Regression, low/base/high scenarios).
- **Policy Rule Engine** — compliance checks: obligations, max credit usage (30%), eligible credit types, shortfall warnings, 15% vay kỳ sau. Mỗi rule lưu văn bản nguồn, điều/khoản, hiệu lực, đối tượng. Output = warnings/checks, KHÔNG phải kết luận pháp lý.
- **Scenario Engine** — sinh kịch bản: mua tín chỉ, đầu tư công nghệ xanh, mua điện xanh, vay mượn/điều chuyển hạn ngạch, kết hợp; what-if theo giá carbon, sản lượng, hiệu quả công nghệ; xác định ngưỡng giá quyết định.
- **Calculation Engine** — CAPEX, OPEX, NPV, IRR, ROI, payback, lifecycle cost, marginal/average abatement cost.
- **Optimization Engine** — MILP (Pyomo + HiGHS) chọn tổ hợp tối ưu dưới ràng buộc pháp lý/ngân sách/tiến độ/sản lượng/ESG. QUBO + Simulated Annealing (quantum-inspired) so sánh; **MILP là kết quả chuẩn trong prototype**. Hàm mục tiêu: `Minimize Total Cost = Cost_credit + CAPEX + OPEX_delta − Energy_savings − Avoided_future_carbon_cost`.
- **Local LLM** — open-source 4B–9B, quantized, on-prem. Đọc báo cáo ESG/kiểm kê (NLP + information extraction), tổng hợp/diễn giải/sinh báo cáo/chatbot. **KHÔNG tự sinh số liệu tài chính, hiệu quả giảm phát thải, hoặc quy định pháp luật** — phải lấy từ nguồn đã kiểm chứng.
- **Dashboard & RBAC/ABAC** — tiers: nội bộ / chỉ số dẫn xuất / hồ sơ chia sẻ (Green Finance Profile). Access by user/purpose/scope/time; full audit trail + evidence vault.

Processing flow (7 bước): thu thập → AI chuẩn hóa + kiểm tra chất lượng → emission engine → compliance engine → scenario engine → quantum-inspired optimizer → dashboard + output.

## Data Flow (inputs → outputs)

Bốn input source categories → 11 bảng Minimum Data Model → 4 stakeholder output views (full mapping trong [docs/data-flow.md](docs/data-flow.md)):
- **Inputs**: enterprise data · legal framework · carbon market prices/scenarios · bank standards
- **Outputs**: enterprise (Carbon Digital Twin, Compliance Gap, Scenario Recommendation, what-if, chatbot) · investor (Green Finance Profile: ESG, Net Zero roadmap) · bank (thẩm định tín dụng xanh) · regulator (overview + compliance/green-transition report)

Key thresholds & refs used in outputs:
- Investor: ESG Score ≥ 82/100, Overall Score ≥ 80/100 (refs: MSCI, Sustainalytics, ASEAN ESG funds)
- Bank: shortfall < 10% → Low risk; refs IFC Performance Standards + NHNN green credit guidance
- Green Taxonomy: **Quyết định 21/2025/QĐ-TTg** (phân loại xanh — thẩm định tín dụng xanh)

## Tech Stack

- **Language**: Python
- **DB**: PostgreSQL (structured), MinIO (reports/evidence)
- **Data**: Polars/Pandas, Pydantic
- **API**: FastAPI
- **Optimization**: Pyomo + HiGHS (MILP); Simulated Annealing for QUBO; QAOA on simulator (stretch)
- **ML**: XGBoost / LightGBM / Quantile Regression
- **LLM**: local open-source 4B–9B, quantized
- **OCR**: for unstructured ESG/report documents

## Prototype Scope

MVP: **10 doanh nghiệp synthetic** (4 xi măng, 3 nhiệt điện, 3 thép), 10–20 cơ sở, 12–24 tháng dữ liệu hoạt động theo tháng, ~1.000–5.000 bản ghi activity data, 1–3 dự án giảm phát thải/cơ sở. Use case hẹp nhưng giá trị cao: trợ lý tối ưu tuân thủ carbon cho doanh nghiệp có hạn ngạch — upload dữ liệu → chuẩn hóa → dự báo compliance gap → khuyến nghị tổ hợp tối ưu. Kế hoạch 4 giai đoạn / 12 tuần (xem [docs/project-context.md §Phần VIII](docs/project-context.md)).

Ví dụ minh họa (xi măng A, synthetic): sản lượng 3M tấn/năm, BAU 2,4M tCO₂e, hạn ngạch 2,2M, thiếu 200k, tín chỉ 50k, giá 250.000 VND/tCO₂e, ngân sách 80 tỷ VND, dự án WHR CAPEX 70 tỷ giảm 120k tCO₂e/năm.

## Key Domain Facts

- Vietnam ETS pilot 2025–2026; domestic carbon exchange launched 2026-06-29 (NĐ 29/2026).
- 110 facilities (thermal power 34, steel 25, cement 51) under Decision 699/QĐ-BNNMT.
- Total pilot allowance >511M tCO₂e (243.08M in 2025, 268.39M in 2026); surrender deadline 2027-12-31.
- Allowances set below expected emissions → most facilities face a shortfall from the start.
- Compliance levers: invest in abatement, buy allowances, use carbon credits (max 30% of obligation), borrow up to 15% of next period's allowance.
- Credit offset (30%) could cut 3-sector compliance cost from ~USD 420.5M to ~USD 68.9M.
- Legal refs (R1–R10 đầy đủ trong [docs/project-context.md §Phụ lục C](docs/project-context.md)): QĐ 13/2024, QĐ 263/QĐ-TTg, QĐ 699/QĐ-BNNMT, NĐ 29/2026, TT 11/2026, NĐ 119/2025 (sửa đổi NĐ 06/2022), **QĐ 21/2025/QĐ-TTg (Green Taxonomy)**, GHG Protocol, World Bank CCDR + Carbon Pricing Dashboard.
