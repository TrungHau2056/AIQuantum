# CarbonPilot — Web (Stage 1 Demo UI)

Frontend demo cho **CarbonPilot** (AI + Quantum Carbon & Green Finance Decision Platform) — cuộc thi AI-Quantum Challenge 2026. Lớp Decision Infrastructure cho thị trường carbon Việt Nam.

## Tech

Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui + Recharts + framer-motion.

> ⚠️ Next.js 16 có breaking changes so với bản cũ — xem `node_modules/next/dist/docs/` trước khi sửa code Next.

## Cấu trúc

```
src/
├── app/
│   ├── page.tsx              # landing (hero + 4 role cards)
│   ├── layout.tsx            # AppShell + Sidebar + RoleSwitcher
│   ├── enterprise/page.tsx   # Carbon Digital Twin, Compliance Gap, what-if, chatbot
│   ├── investor/page.tsx     # Green Finance Profile (ESG, Net Zero roadmap)
│   ├── bank/page.tsx         # thẩm định tín dụng xanh, risk level
│   └── regulator/page.tsx    # KPI quốc gia, phân tích ngành
├── components/
│   ├── dashboards/kpi-card.tsx
│   ├── layout/ (app-shell, sidebar, role-switcher)
│   ├── magic/number-ticker.tsx
│   └── ui/ (shadcn: card, table, tabs, badge, progress, ...)
└── lib/
    ├── types.ts              # data model mock
    ├── mock-data.ts          # synthetic data (VND, 10 doanh nghiệp)
    ├── role-context.tsx
    └── utils.ts
```

## Chạy

```bash
npm install
npm run dev      # localhost:3000
npm run build    # verify (5 route static)
npm run lint
```

## Mock data

Synthetic theo logic ngành (docs/project-context.md §Phần V.3). Đơn vị VND. Cơ sở demo chính: nhà máy xi măng A — sản lượng 3M tấn/năm, BAU 2,4M tCO₂e, hạn ngạch 2,2M, thiếu 200k, giá 250.000 VND/tCO₂e. 10 doanh nghiệp synthetic (4 xi măng, 3 nhiệt điện, 3 thép) trong `enterprises` array.

Stage 2: nối backend FastAPI (Carbon Data Ledger PostgreSQL + MinIO evidence vault + MILP Pyomo/HiGHS + local LLM).
