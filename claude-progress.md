# Nhật ký Tiến độ

## Trạng thái Đã xác minh Hiện tại

- Thư mục gốc kho lưu trữ: `d:/AIQuantum`
- Đường dẫn khởi động chuẩn: chưa có (chưa có app/code)
- Đường dẫn xác minh chuẩn (smoke/e2e): chưa có — xem F13 trong `feature_list.json`
- Tính năng chưa hoàn thành có mức ưu tiên cao nhất hiện tại: F00 (Project scaffolding) — đang bị chặn
- Sự cố chặn hiện tại: chưa chốt stack frontend (React vs Streamlit) và package manager (uv/poetry/pip). Không có code, không có smoke baseline.

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
