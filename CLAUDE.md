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

**CarbonPilot** is a carbon compliance decision-support platform for Vietnam's emerging carbon market (ETS), built for the **AI-Quantum Challenge 2026** competition (Vòng 1). It helps emission-intensive enterprises (thermal power, steel, cement) standardize scattered carbon data and choose optimal compliance strategies — buying allowances/credits, investing in abatement technology, or operational changes — under Vietnam's legal constraints.

Reference docs (read before domain logic):
- [docs/project-context.md](docs/project-context.md) — full proposal: problem, solution, processing flow, competitors, legal references and numbers (source of truth).
- [docs/data-flow.md](docs/data-flow.md) — input sources (4 categories) → outputs by stakeholder (4) with derivation logic, thresholds, and open questions.

## Status

Demo UI (Stage 1) built in `web/` — Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui + Recharts. Uses mock data seeded from the proposal's real numbers; no backend yet. Build passes (`npm run build` → 5 static routes). Backend (FastAPI + Pyomo/HiGHS + PostgreSQL), real RBAC/auth, and local LLM are Stage 2.

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

CarbonPilot is enterprise-centric: the enterprise owns its data; external parties (banks, investors, regulators) only see shared/derived indicators. Core engines:

- **Carbon Data Ledger** — normalized store (PostgreSQL); every record carries source, timestamp, unit, verification status, quality score. Evidence/reports in MinIO.
- **Data Processing & Validation** (Python, Polars/Pandas, Pydantic) — maps Excel/CSV/forms to a unified schema; detects missing/duplicate/out-of-range/anomaly; keeps original + normalized values + source.
- **Forecasting Engine** — end-of-period emissions + allowance surplus/deficit. Early: cumulative actual + planned output + emission factors + abatement. Later: XGBoost/LightGBM/Quantile Regression (low/base/high scenarios).
- **Policy Rule Engine** — compliance checks: obligations, max credit usage (30%), eligible credit types, shortfall warnings. Each rule stores its source legal text, article, effective dates, applicability. Output = warnings/checks, not legal conclusions.
- **Retrieval Engine (RAG)** — filters Technology Abatement Catalogue by sector/scale/budget/conditions.
- **Scenario Engine** — generates candidate compliance portfolios; what-if on carbon price, output, tech effectiveness; finds decision thresholds.
- **Calculation Engine** — CAPEX, OPEX, NPV, IRR, ROI, payback, lifecycle cost, marginal/average abatement cost.
- **Optimization Engine** — MILP (Pyomo + HiGHS) selects optimal portfolio under legal/budget/timeline/output constraints. QUBO + Simulated Annealing as quantum-inspired experiment; **MILP is the prototype's source of truth**.
- **Local LLM** — open-source 4B–9B, quantized, on-prem. Synthesizes/explains/generates reports/chatbot. **NEVER generates financial numbers, abatement effectiveness, or legal rules** — those come from verified sources only.
- **Dashboard & RBAC** — tiers: internal / derived indicators / shareable profiles. Access by user/purpose/scope/time; full audit log.

Processing flow (8 steps): collect → validate & normalize → build carbon profile → forecast & compliance check → generate candidates → calculate & optimize → scenario analysis → report & share.

## Data Flow (inputs → outputs)

Four input source categories feed four stakeholder output views (full mapping in [docs/data-flow.md](docs/data-flow.md)):
- **Inputs**: enterprise data · legal framework · carbon market prices · bank standards
- **Outputs**: enterprise (forecast, warnings, option comparison, what-if, chatbot) · investor (green investment dashboard) · bank (green credit appraisal) · regulator (overview + compliance/green-transition report)

Key thresholds & refs used in outputs:
- Investor: ESG Score ≥ 82/100, Overall Score ≥ 80/100 (refs: MSCI, Sustainalytics, ASEAN ESG funds)
- Bank: shortfall < 10% → Low risk; refs IFC Performance Standards + NHNN green credit guidance
- Green Taxonomy: **Quyết định 21/2025/QĐ-TTg** (new — add to legal refs)

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

One cement facility, one compliance period, monthly operational data, ~5–10 abatement technologies/actions. Sufficient to demonstrate: data standardization → forecast allowance position → financial calculation → portfolio optimization.

## Key Domain Facts

- Vietnam ETS pilot 2025–2026; domestic carbon exchange launched 2026-06-29.
- 110 facilities (thermal power 34, steel 25, cement 51) under Decision 699/QĐ-BNNMT.
- Total pilot allowance >511M tCO₂e (243.08M in 2025, 268.39M in 2026); surrender deadline 2027-12-31.
- Allowances set below expected emissions → most facilities face a shortfall from the start.
- Compliance levers: invest in abatement, buy allowances, use carbon credits (max 30% of obligation), borrow up to 15% of next period's allowance.
- Credit offset (30%) could cut 3-sector compliance cost from ~USD 420.5M to ~USD 68.9M.
- Legal refs: Decree 06/2022, Decree 119/2025, Decision 232, Decision 263, Decision 699, Decree 29/2026, Circular 11/2026, Decision 13/2024, **Decision 21/2025 (Green Taxonomy)**.
