# Nhật ký Tiến độ

## Trạng thái Đã xác minh Hiện tại

- Thư mục gốc kho lưu trữ: `d:/AIQuantum`
- Đường dẫn khởi động chuẩn: `cd web && npm run dev` (localhost:3000)
- Đường dẫn xác minh chuẩn (smoke/e2e): chưa có end-to-end thật — xem F13 trong `feature_list.json`. Tạm thời: `npm run lint` + `npm run build` trong `web/`.
- Tính năng chưa hoàn thành có mức ưu tiên cao nhất hiện tại: F12 (Frontend dashboards) — demo UI xong, RBAC/audit thật = Stage 2.
- Sự cố chặn hiện tại: chưa có backend (FastAPI + PostgreSQL + MinIO + Pyomo/HiGHS). Mock data VND, chưa nối engine thật.

## Nhật ký Phiên

### Phiên 001

- Ngày: 2026-07-24
- Mục tiêu: Thiết lập context dự án + scaffolding ops-loop cho CarbonPilot.
- Đã hoàn thành:
  - Tạo `docs/project-context.md` (đề án đầy đủ: bài toán, giải pháp, luồng xử lý, đối thủ, legal refs).
  - Tạo `docs/data-flow.md` (input 4 nhóm → output 4 bên + derivation + thresholds + open questions).
  - Cập nhật `CLAUDE.md`: tổng quan dự án, kiến trúc planned, tech stack, data flow, key domain facts, và section **Vòng lặp Vận hành (Ops Loop)**.
  - Thêm các memory: user-vietnamese-context (giao tiếp tiếng Việt), feedback-doc-style (lưu context kiểu CLAUDE.md).
  - Thay `feature_list.json` từ template chat-app → 14 feature CarbonPilot (F00–F13).
  - Sửa `init.sh` từ npm → placeholder Python (chưa có deps/test).
  - Điền `claude-progress.md` (file này).
- Xác minh đã chạy: không (chưa có code/test).
- Bằng chứng đã ghi lại: không (repo chưa có source code).
- Commit: 16efb6d (cùng commit chung với Phiên 002).
- Tệp hoặc artifact đã cập nhật: `CLAUDE.md`, `docs/project-context.md`, `docs/data-flow.md`, `feature_list.json`, `init.sh`, `claude-progress.md`, memory files.
- Rủi ro đã biết hoặc vấn đề chưa được giải quyết:
  - Stack frontend chưa chốt (React vs Streamlit) → chặn F00, F12.
  - Package manager chưa chốt (uv/poetry/pip).
  - Chưa có dữ liệu mẫu ngành xi măng để chạy prototype.
  - Open question trong data-flow.md: trường "quyết định lựa chọn phương án thực tế" required hay optional.
- Bước tốt nhất tiếp theo: Chốt stack (frontend + package manager) với user, rồi bắt đầu F00 (scaffolding: cấu trúc repo, Docker Compose PostgreSQL+MinIO, init.sh thật, smoke baseline).

### Phiên 002

- Ngày: 2026-07-24
- Mục tiêu: Xây demo UI (Stage 1) cho CarbonPilot — deploy Vercel, mock data.
- Đã hoàn thành:
  - Scaffold Next.js 16 app tại `web/` (TS + Tailwind v4 + App Router).
  - Cài shadcn/ui (card/table/tabs/badge/progress/dialog/select/separator/avatar), Recharts, lucide-react, framer-motion.
  - Viết `types.ts` + `mock-data.ts` (số liệu đề án: 110 cơ sở, 511.47M tCO₂e, 30% bù trừ, $420.5M→$68.9M, ESG ≥82, shortfall <10%).
  - Build layout: AppShell + Sidebar + RoleSwitcher (4 vai trò) + landing page (hero + 4 role cards, NumberTicker).
  - 4 dashboard: Enterprise (dự báo, cảnh báo, đòn bẩy tuân thủ, bảng so sánh 6 phương án, what-if giá carbon, tác động bù trừ, chatbot stub), Investor (ESG gauge radial, Net Zero roadmap, xu hướng, cơ hội đầu tư), Bank (risk level, tuân thủ, xu hướng, xác minh dữ liệu, tín dụng xanh), Regulator (KPI quốc gia, phân tích ngành, pie tuân thủ, chuyển đổi xanh, bảng so sánh).
  - Polish: NumberTicker (count-up), framer-motion fade-in, gradient hero, green palette.
- Xác minh đã chạy:
  - `npm run build` PASS — 5 route prerender static: /, /enterprise, /investor, /bank, /regulator.
- Bằng chứng đã ghi lại: build output trong progress; feature_list.json F00 + F12 evidence.
- Commit: 16efb6d — "Add CarbonPilot demo UI + project context" (51 files, 13.728 insertions). User tự push lên GitHub.
- Tệp hoặc artifact đã cập nhật: `web/**`, `feature_list.json`, `init.sh`, `claude-progress.md` (file này).
- Rủi ro đã biết hoặc vấn đề chưa được giải quyết:
  - Demo dùng mock data — chưa có backend/optimization thật (Stage 2).
  - Chưa có auth/RBAC thật — role switcher chỉ đổi view.
  - Chưa deploy Vercel (user review local trước).
  - Open question data-flow.md: trường "quyết định lựa chọn phương án thực tế" required hay optional.
- Bước tốt nhất tiếp theo: User chạy `cd web && npm run dev` review local → deploy Vercel → sau đó bắt đầu Stage 2 (FastAPI + Pyomo/HiGHS + PostgreSQL trên Railway).

### Phiên 003

- Ngày: 2026-07-24
- Mục tiêu: Đọc live UI, kết nối Playwright và cải thiện trải nghiệm responsive cho F12.
- Đã hoàn thành:
  - Sửa role context lấy vai trò từ pathname; mở trực tiếp `/investor`, `/bank`, `/regulator` không còn hiển thị sai vai trò Doanh nghiệp.
  - Thêm mobile header với logo/link về trang chủ; giữ sidebar desktop hiện tại.
  - Tối ưu mobile spacing, kích thước hero, lưới KPI landing page và chiều rộng role switcher.
  - Dọn toàn bộ 10 cảnh báo ESLint do import/biến không dùng trong dashboard.
- Xác minh đã chạy:
  - `npm run lint` PASS — 0 lỗi, 0 cảnh báo.
  - `npm run build` PASS — 5 route static: `/`, `/enterprise`, `/investor`, `/bank`, `/regulator`.
  - `git diff --check` PASS.
- Chặn xác minh trực quan:
  - App đã chạy local tại `http://localhost:3001`, nhưng phiên Codex không phát hiện in-app Browser tab nên Playwright chưa thể chụp/nhấp kiểm tra.
- Bước tốt nhất tiếp theo: Gắn/mở Browser cạnh Codex, chạy Playwright ở desktop + mobile cho 5 route, sửa các vấn đề trực quan còn lại rồi commit.

### Phiên 004

- Ngày: 2026-07-28
- Mục tiêu: Đồng bộ toàn bộ docs + feature_list + mock data theo bản đề xuất cập nhật mới của user (AI + Quantum Carbon & Green Finance Decision Platform).
- Đã hoàn thành:
  - Thay `docs/project-context.md` bằng mẫu hồ sơ đề xuất đầy đủ (Phần I–X + Phụ lục A/B/C, R1–R10 có URL, data model 11 bảng, kế hoạch 12 tuần, hàm mục tiêu, ví dụ xi măng A VND).
  - Cập nhật `docs/data-flow.md`: định vị Decision Infrastructure, Minimum Data Model 11 bảng, outputs theo Carbon Digital Twin / Compliance Gap / Scenario Recommendation / Green Finance Profile, luồng 7 bước, hàm mục tiêu + ràng buộc.
  - Cập nhật `CLAUDE.md`: tên đề tài dài + định vị mới, Planned Architecture (Decision Infrastructure, evidence vault, confidence score, Scope 1/2), Prototype Scope (10 doanh nghiệp synthetic, 12 tuần), Key Domain Facts (R1–R10).
  - Viết lại `README.md` root: tổng quan project, bài toán, trạng thái, chạy nhanh, MVP scope, kiến trúc planned, tech stack, key domain facts.
  - Cập nhật `feature_list.json`: thêm proposal_title, positioning, mvp_scope (10 doanh nghiệp, 11 bảng, hàm mục tiêu, ràng buộc, 12 tuần); cập nhật F01–F13 theo định vị mới (Carbon Digital Twin, evidence vault, confidence score, Green Finance Profile sharing, RBAC/ABAC).
  - Cập nhật `web/src/lib/types.ts`: comment VND, thêm productionVolume/productUnit/province, carbonPriceAssumption, energySavings, taxonomyMatch, EnterpriseSummary (10 doanh nghiệp).
  - Cập nhật `web/src/lib/mock-data.ts`: cơ sở demo xi măng A (hạn ngạch 2,2M, BAU 2,4M, thiếu 200k, giá 250.000 VND/tCO₂e, ngân sách 80 tỷ VND); 6 abatement options VND (WHR 70 tỷ giảm 120k tCO₂e/năm, tiết kiệm 12 tỷ/năm theo docs); whatIf giá carbon nghìn VND; thêm 10 doanh nghiệp synthetic (4 xi măng, 3 nhiệt điện, 3 thép); thêm rule QĐ 21/2025 Green Taxonomy.
  - Sửa dashboard pages hiển thị VND: enterprise (CAPEX, ngân sách, what-if axis/tooltip, cost impact label), landing (hero badge + subtitle + heroStats), investor (vốn xanh 108 tỷ VND).
  - Cập nhật `web/README.md`: context CarbonPilot + cấu trúc + mock data VND.
- Xác minh đã chạy:
  - `npm run lint` PASS — 0 lỗi, 0 cảnh báo.
  - `npm run build` PASS — 5 route static: `/`, `/enterprise`, `/investor`, `/bank`, `/regulator`.
- Bằng chứng đã ghi lại: build output trong progress; feature_list.json cập nhật.
- Tệp hoặc artifact đã cập nhật: `docs/project-context.md`, `docs/data-flow.md`, `CLAUDE.md`, `README.md`, `feature_list.json`, `web/src/lib/types.ts`, `web/src/lib/mock-data.ts`, `web/src/app/enterprise/page.tsx`, `web/src/app/page.tsx`, `web/src/app/investor/page.tsx`, `web/README.md`, `claude-progress.md` (file này).
- Rủi ro đã biết hoặc vấn đề chưa được giải quyết:
  - Mock data VND chưa nối backend thật (Stage 2).
  - 10 doanh nghiệp synthetic thêm vào mock-data.ts nhưng dashboard vẫn hiển thị 1 cơ sở chính (chưa có UI list doanh nghiệp).
  - costImpact giữ triệu USD (số liệu nghiên cứu Impact Assessment) — không phải VND demo.
  - Chưa có RBAC/ABAC thật + audit trail + evidence vault (Stage 2).
  - Open question data-flow.md: trường "quyết định lựa chọn phương án thực tế" required hay optional vẫn chưa chốt.
  - Playwright visual verification chưa chạy.
- Bước tốt nhất tiếp theo: Bắt đầu Stage 2 — scaffolding backend (FastAPI + Docker Compose PostgreSQL + MinIO), hoặc mở rộng UI hiển thị danh sách 10 doanh nghiệp + Playwright visual verify.

### Phiên 005

- Ngày: 2026-07-28
- Mục tiêu: Xây wizard nhập dữ liệu doanh nghiệp (/ingest) — spec + UI, gom theo 4 nhóm.
- Đã hoàn thành:
  - Viết `docs/form-spec.md`: spec 4 nhóm (Thông tin DN / Hạn ngạch & phát thải / Phương án tối ưu / ESG), map vào 11-bảng data model, validation cross-field, data completeness tiers, output sau submit.
  - Tạo `web/src/lib/form-schema.ts`: TypeScript types cho IngestFormData (company, facility, activityData, emissions, allowance, credits, greenProjects, market, fuelSwitch, actualDecision, esg); STEPS 4 nhóm; `calcCompleteness` (17 required checks); `calcComplianceGap` (forecast = emissions OR (prodActual + planned) × factor; gap = allowance − forecast − credits).
  - Tạo `web/src/components/onboarding/ingest-wizard.tsx`: wizard 4 section với step navigation, completeness bar, validation per-step, auto-calc Compliance Gap live preview, summary modal. Upload Excel/CSV stub cho activity data. Mảng dynamic cho activityData, credits, greenProjects.
  - Tạo `web/src/app/ingest/page.tsx`: route /ingest.
  - Sửa `web/src/components/layout/app-shell.tsx`: truyền navItems (role home + "Nhập dữ liệu" /ingest) vào Sidebar thay vì mảng trống; xóa roleNav export không dùng; thêm useRole + roleLabels.
  - Thiết kế form theo cấu trúc 4 nhóm từ user: Nhóm 1 (DN + cơ sở), Nhóm 2 (hạn ngạch + phát thải + sản lượng + hệ số + tín chỉ), Nhóm 3 (phương án đầu tư + chuyển đổi nhiên liệu + thị trường + ngân sách + quyết định thực tế optional), Nhóm 4 (ESG optional).
  - Giữ 2 điều chỉnh từ spec cũ: (a) chuỗi dữ liệu theo tháng cho forecasting, (b) cả % giảm VÀ absolute tCO₂e/năm cho abatement.
  - `actualDecision` (quyết định lựa chọn phương án thực tế) = OPTIONAL — doanh nghiệp nhập trước khi quyết định, quay lại cập nhật sau; giá trị cho regulator: so sánh thực tế vs khuyến nghị optimizer (adoption rate xanh).
- Xác minh đã chạy:
  - `npm run lint` PASS — 0 lỗi, 0 cảnh báo.
  - `npm run build` PASS — 6 route static: `/`, `/enterprise`, `/investor`, `/bank`, `/regulator`, `/ingest`.
- Bằng chứng đã ghi lại: build output trong progress; route /ingest trong build output.
- Tệp hoặc artifact đã cập nhật: `docs/form-spec.md`, `web/src/lib/form-schema.ts`, `web/src/components/onboarding/ingest-wizard.tsx`, `web/src/app/ingest/page.tsx`, `web/src/components/layout/app-shell.tsx`, `claude-progress.md` (file này).
- Rủi ro đã biết hoặc vấn đề chưa được giải quyết:
  - Wizard dùng mock state (Stage 1) — chưa POST API (Stage 2: F11 ingest → Carbon Data Ledger).
  - Upload Excel/CSV là stub (onChange rỗng) — chưa parse file thật.
  - `actualDecision` optional → regulator có thể thấy ít dữ liệu trong prototype.
  - Chưa có multi-facility UI (doanh nghiệp đa cơ sở lặp Nhóm 1 — prototype 1 cơ sở).
  - Playwright visual verification chưa chạy.
- Bước tốt nhất tiếp theo: Playwright visual verify /ingest (desktop + mobile), hoặc bắt đầu Stage 2 (FastAPI + Docker Compose PostgreSQL + MinIO + parser Excel thật).
