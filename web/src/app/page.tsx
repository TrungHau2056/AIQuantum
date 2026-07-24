"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NumberTicker } from "@/components/magic/number-ticker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Factory, TrendingUp, Landmark, Building2, ArrowRight, Leaf, Sparkles } from "lucide-react";

const roles = [
  {
    key: "enterprise",
    href: "/enterprise",
    label: "Doanh nghiệp",
    desc: "Dự báo dư/thiếu hạn ngạch, cảnh báo vượt hạn ngạch, so sánh & tối ưu phương án tuân thủ.",
    icon: Factory,
    stats: "Dự báo · What-if · Tối ưu MILP",
    accent: "from-emerald-500/20 to-teal-500/5",
  },
  {
    key: "investor",
    href: "/investor",
    label: "Nhà đầu tư",
    desc: "Đánh giá đầu tư xanh: ESG Score, lộ trình Net Zero, xu hướng giảm phát thải.",
    icon: TrendingUp,
    stats: "ESG ≥ 82 · Net Zero roadmap",
    accent: "from-blue-500/20 to-cyan-500/5",
  },
  {
    key: "bank",
    href: "/bank",
    label: "Ngân hàng",
    desc: "Thẩm định tín dụng xanh: mức tuân thủ, rủi ro, xu hướng giảm phát thải.",
    icon: Landmark,
    stats: "Shortfall < 10% → Low risk",
    accent: "from-amber-500/20 to-orange-500/5",
  },
  {
    key: "regulator",
    href: "/regulator",
    label: "Cơ quan quản lý",
    desc: "Tổng quan thị trường carbon toàn quốc, cảnh báo tuân thủ, chuyển đổi xanh.",
    icon: Building2,
    stats: "110 cơ sở · 511M tCO₂e",
    accent: "from-violet-500/20 to-purple-500/5",
  },
];

const heroStats = [
  { value: 110, decimals: 0, suffix: "", label: "cơ sở trong diện ETS" },
  { value: 511.47, decimals: 2, suffix: "M", label: "tCO₂e hạn ngạch thí điểm" },
  { value: 351.6, decimals: 1, prefix: "$", suffix: "M", label: "tiết kiệm chi phí tuân thủ" },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-linear-to-br from-primary/10 via-background to-background p-8 md:p-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 25%, hsl(152 65% 45% / 0.18), transparent 45%), radial-gradient(circle at 85% 75%, hsl(195 60% 50% / 0.14), transparent 45%), radial-gradient(circle at 50% 50%, hsl(85 60% 50% / 0.06), transparent 60%)",
          }}
        />
        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            AI-Quantum Challenge 2026 — Carbon Compliance Decision Support
          </div>
          <div className="space-y-3">
            <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight md:text-6xl">
              Carbon<span className="text-primary">Pilot</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Nền tảng chuẩn hóa dữ liệu carbon và lựa chọn phương án tuân thủ tối ưu cho thị trường
              carbon Việt Nam — kết nối doanh nghiệp, ngân hàng, nhà đầu tư và cơ quan quản lý.
            </p>
          </div>
          <div className="flex flex-wrap gap-10 pt-4">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-primary">
                  <NumberTicker
                    value={stat.value}
                    decimals={stat.decimals}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role cards */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Chọn góc nhìn</h2>
          <p className="text-muted-foreground">Mỗi đối tượng có dashboard và quyền truy cập dữ liệu riêng.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {roles.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.key}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
              >
                <Link href={r.href} className="block h-full">
                  <Card className="group h-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${r.accent} text-foreground ring-1 ring-foreground/5`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                      </div>
                      <CardTitle className="mt-4 text-lg">{r.label}</CardTitle>
                      <CardDescription className="leading-relaxed">{r.desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        <Leaf className="h-3 w-3 text-primary" />
                        {r.stats}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer note */}
      <section className="rounded-2xl border border-dashed bg-muted/30 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Dữ liệu demo dựa trên số liệu đề án AI-Quantum Challenge 2026. Backend tối ưu hóa (FastAPI + Pyomo/HiGHS) & RBAC thật ở Stage 2.
        </p>
      </section>
    </div>
  );
}
