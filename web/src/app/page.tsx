"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NumberTicker } from "@/components/magic/number-ticker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Factory, TrendingUp, Landmark, Building2, ArrowRight, Leaf } from "lucide-react";

const roles = [
  {
    key: "enterprise",
    href: "/enterprise",
    label: "Doanh nghiệp",
    desc: "Dự báo dư/thiếu hạn ngạch, cảnh báo vượt hạn ngạch, so sánh & tối ưu phương án tuân thủ.",
    icon: Factory,
    stats: "Dự báo · What-if · Tối ưu MILP",
  },
  {
    key: "investor",
    href: "/investor",
    label: "Nhà đầu tư",
    desc: "Đánh giá đầu tư xanh: ESG Score, lộ trình Net Zero, xu hướng giảm phát thải.",
    icon: TrendingUp,
    stats: "ESG ≥ 82 · Net Zero roadmap",
  },
  {
    key: "bank",
    href: "/bank",
    label: "Ngân hàng",
    desc: "Thẩm định tín dụng xanh: mức tuân thủ, rủi ro, xu hướng giảm phát thải.",
    icon: Landmark,
    stats: "Shortfall < 10% → Low risk",
  },
  {
    key: "regulator",
    href: "/regulator",
    label: "Cơ quan quản lý",
    desc: "Tổng quan thị trường carbon toàn quốc, cảnh báo tuân thủ, chuyển đổi xanh.",
    icon: Building2,
    stats: "110 cơ sở · 511M tCO₂e",
  },
];

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border bg-linear-to-br from-primary/10 via-background to-background p-8 md:p-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, hsl(152 60% 50% / 0.15), transparent 40%), radial-gradient(circle at 80% 70%, hsl(195 60% 50% / 0.12), transparent 40%)",
          }}
        />
        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Leaf className="h-3.5 w-3.5 text-primary" />
            AI-Quantum Challenge 2026 — Carbon Compliance Decision Support
          </div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            CarbonPilot
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Nền tảng chuẩn hóa dữ liệu carbon và lựa chọn phương án tuân thủ tối ưu cho thị trường
            carbon Việt Nam — kết nối doanh nghiệp, ngân hàng, nhà đầu tư và cơ quan quản lý.
          </p>
          <div className="flex flex-wrap gap-8 pt-4">
            <div>
              <div className="text-3xl font-bold text-primary">
                <NumberTicker value={110} />
              </div>
              <div className="text-sm text-muted-foreground">cơ sở trong diện ETS</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">
                <NumberTicker value={511.47} decimals={2} suffix="M" />
              </div>
              <div className="text-sm text-muted-foreground">tCO₂e hạn ngạch thí điểm</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">
                <NumberTicker value={351.6} decimals={1} prefix="$" suffix="M" />
              </div>
              <div className="text-sm text-muted-foreground">tiết kiệm chi phí tuân thủ</div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Chọn góc nhìn</h2>
          <p className="text-muted-foreground">Mỗi đối tượng có dashboard và quyền truy cập dữ liệu riêng.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {roles.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={r.href}>
                  <Card className="group h-full cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                      </div>
                      <CardTitle className="mt-3">{r.label}</CardTitle>
                      <CardDescription>{r.desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs font-medium text-muted-foreground">{r.stats}</div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
