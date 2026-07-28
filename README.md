# CarbonPilot — AI + Quantum Carbon & Green Finance Decision Platform

Lớp **Carbon & Green Finance Decision Infrastructure** cho thị trường carbon Việt Nam (ETS) — xây cho cuộc thi **AI-Quantum Challenge 2026** (Vòng 1). Hệ thống không thay thế sàn giao dịch carbon mà bổ sung lớp dữ liệu và trí tuệ ra quyết định: giúp doanh nghiệp phát thải lớn (nhiệt điện, sắt thép, xi măng) biến dữ liệu phân tán thành **Carbon Digital Twin** ở cấp cơ sở, dự báo **Compliance Gap**, và chọn tổ hợp tuân thủ tối ưu (mua tín chỉ/hạn ngạch, dùng tín chỉ đang có, đầu tư công nghệ xanh, mua điện xanh, hoặc kết hợp) dưới ràng buộc pháp lý/ngân sách/tiến độ/ESG. Đồng thời tạo **Green Finance Profile** chuẩn hóa cho ngân hàng/nhà đầu tư thẩm định tín dụng xanh.

## Bài toán

Dữ liệu carbon của doanh nghiệp (hóa đơn điện, nhiên liệu, ERP, SCADA, báo cáo ESG, hạn ngạch/tín chỉ) đang phân tán, thiếu chuẩn hóa và khó kiểm chứng → doanh nghiệp khó ra quyết định nên mua tín chỉ, đầu tư công nghệ xanh hay kết hợp; ngân hàng/nhà đầu tư khó thẩm định tín dụng xanh; cơ quan quản lý khó giám sát.

**Phát biểu bài toán**: Làm thế nào để biến dữ liệu sản xuất, năng lượng, phát thải, hạn ngạch, tín chỉ carbon và ESG đang phân tán của doanh nghiệp thành một Carbon Digital Twin đủ tin cậy, nhằm giúp doanh nghiệp mô phỏng và lựa chọn phương án tuân thủ carbon tối ưu về chi phí, đồng thời tạo hồ sơ dữ liệu đủ chuẩn cho ngân hàng, nhà đầu tư và cơ quan quản lý?

## Trạng thái

- **Stage 1 — Demo UI** đã xong trong [web/](web/): Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui + Recharts. Mock data (VND, synthetic theo logic ngành). Build PASS — 5 route static.
- 4 dashboard theo vai trò: **Doanh nghiệp** (Carbon Digital Twin, Compliance Gap, so sánh phương án, what-if giá carbon, chatbot), **Nhà đầu tư** (Green Finance Profile: ESG, Net Zero roadmap), **Ngân hàng** (thẩm định tín dụng xanh, risk level), **Cơ quan quản lý** (KPI quốc gia, phân tích ngành).
- **Stage 2 chưa bắt đầu**: backend FastAPI + Pyomo/HiGHS (MILP) + PostgreSQL + MinIO + QUBO/SA + local LLM 4B–9B + RBAC/ABAC thật + evidence vault.

## Chạy nhanh

```bash
cd web
npm install      # cài deps
npm run dev      # dev server tại localhost:3000
npm run build    # production build (verify)
```

Hoặc từ repo root: `./init.sh` (chạy `npm install` + `npm run build` trong `web/`).

## MVP scope

- **10 doanh nghiệp synthetic** (4 xi măng, 3 nhiệt điện, 3 thép), 10–20 cơ sở, 12–24 tháng dữ liệu theo tháng.
- Use case hẹp nhưng giá trị cao: trợ lý tối ưu tuân thủ carbon cho doanh nghiệp có hạn ngạch.
- Kế hoạch 4 giai đoạn / 12 tuần (xem [docs/project-context.md §Phần VIII](docs/project-context.md)).

**Ví dụ minh họa** (xi măng A, synthetic): sản lượng 3M tấn/năm, BAU 2,4M tCO₂e, hạn ngạch 2,2M, thiếu 200k, tín chỉ 50k, giá 250.000 VND/tCO₂e, ngân sách 80 tỷ VND, dự án WHR CAPEX 70 tỷ giảm 120k tCO₂e/năm.

## Kiến trúc planned

Lớp Decision Infrastructure nằm giữa doanh nghiệp, sàn giao dịch carbon, registry/lưu ký, ngân hàng, nhà đầu tư, cơ quan quản lý. Core engines:

- **Carbon Data Ledger** (PostgreSQL, 11 bảng MVP) + **Evidence vault** (MinIO) — mỗi bản ghi gắn nguồn, thời gian, đơn vị, trạng thái xác minh, confidence score.
- **Data Ingestion & Quality** — parser XLSX/CSV/PDF + OCR, rule-based validation + anomaly detection.
- **Emission Engine** — GHG Protocol/IPCC, Scope 1/2 (MVP), Scope 3 (sau).
- **Forecasting Engine** — dự báo phát thải cuối kỳ + Compliance Gap; time-series ML (XGBoost/LightGBM/Quantile Regression).
- **Policy Rule Engine** — 30% bù trừ, 15% vay kỳ sau, eligible credits; mỗi rule lưu văn bản nguồn.
- **Scenario Engine** — sinh kịch bản mua tín chỉ/đầu tư xanh/mua điện xanh/kết hợp + what-if.
- **Optimization Engine** — MILP (Pyomo + HiGHS) là kết quả chuẩn; QUBO + Simulated Annealing (quantum-inspired) so sánh.
- **Local LLM** (4B–9B quantized, on-prem) — NLP extraction, diễn giải, báo cáo, chatbot. **KHÔNG sinh số liệu tài chính/hiệu quả/pháp luật**.
- **Dashboard & RBAC/ABAC** — tiers: nội bộ / chỉ số dẫn xuất / hồ sơ chia sẻ (Green Finance Profile) + audit trail.

**Hàm mục tiêu**: `Minimize Total Cost = Cost_credit + CAPEX + OPEX_delta − Energy_savings − Avoided_future_carbon_cost`

## Tech stack

Python · PostgreSQL · MinIO · Polars/Pandas · Pydantic · FastAPI · Pyomo + HiGHS (MILP) · QUBO/Simulated Annealing · XGBoost/LightGBM · local LLM 4B–9B · Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui + Recharts.

## Tài liệu

- [docs/project-context.md](docs/project-context.md) — mẫu hồ sơ đề xuất đầy đủ (bài toán, giải pháp, data model MVP, kế hoạch 12 tuần, legal refs R1–R10).
- [docs/data-flow.md](docs/data-flow.md) — input 4 nhóm → 11 bảng data model → output 4 bên + derivation + ngưỡng + open questions.
- [CLAUDE.md](CLAUDE.md) — tổng quan + ops loop cho coding agent.
- [feature_list.json](feature_list.json) — danh sách feature (F00–F13) + trạng thái.
- [claude-progress.md](claude-progress.md) — nhật ký phiên.

## Key domain facts

- Vietnam ETS pilot 2025–2026; sàn giao dịch carbon trong nước khai trương 2026-06-29 (NĐ 29/2026).
- 110 cơ sở (nhiệt điện 34, sắt thép 25, xi măng 51) theo QĐ 699/QĐ-BNNMT.
- Tổng hạn ngạch thí điểm >511M tCO₂e (243,08M năm 2025; 268,39M năm 2026); nộp trả trước 31/12/2027.
- Hạn ngạch thấp hơn phát thải dự kiến → phần lớn doanh nghiệp thiếu hụt ngay từ đầu.
- Đòn bẩy tuân thủ: đầu tư giảm phát thải, mua hạn ngạch, dùng tín chỉ (max 30%), vay kỳ sau (max 15%).
- Bù trừ 30% bằng tín chỉ có thể giảm tổng chi phí tuân thủ 3 ngành từ ~420,5M USD xuống ~68,9M USD.
- Legal refs: QĐ 13/2024, QĐ 263/QĐ-TTg, QĐ 699/QĐ-BNNMT, NĐ 29/2026, TT 11/2026, NĐ 119/2025, **QĐ 21/2025 (Green Taxonomy)**, GHG Protocol, World Bank CCDR + Carbon Pricing Dashboard (R1–R10 trong [docs/project-context.md §Phụ lục C](docs/project-context.md)).

## Giấy phép

Dự án thi AI-Quantum Challenge 2026. Mock data là synthetic, không gán cho doanh nghiệp thật. Dữ liệu pháp lý trích nguồn rõ ràng.
