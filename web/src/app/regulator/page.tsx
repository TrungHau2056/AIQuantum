"use client";

import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { KpiCard } from "@/components/dashboards/kpi-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { regulatorOverview } from "@/lib/mock-data";
import { Building2, Factory, TrendingUp, Leaf, AlertTriangle, CalendarClock } from "lucide-react";

const complianceColors = ["var(--chart-1)", "var(--chart-4)", "var(--chart-5)"];

export default function RegulatorPage() {
  const { sectors, complianceStats, greenTransition } = regulatorOverview;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tổng quan thị trường carbon</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Dữ liệu tổng hợp toàn quốc theo ngành, lĩnh vực và địa phương
          </p>
        </div>
        <Badge variant="outline" className="gap-1.5">
          <CalendarClock className="h-3.5 w-3.5" />
          Hạn nộp trả: {regulatorOverview.surrenderDeadline}
        </Badge>
      </div>

      {/* National KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard
          title="Cơ sở trong diện ETS"
          value={`${regulatorOverview.totalFacilities}`}
          hint="Nhiệt điện 34 · Sắt thép 25 · Xi măng 51"
          icon={Building2}
          tone="default"
        />
        <KpiCard
          title="Tổng hạn ngạch"
          value={`${regulatorOverview.totalAllowance.toFixed(2)}M`}
          hint={`tCO₂e (2025: ${regulatorOverview.allowance2025}M, 2026: ${regulatorOverview.allowance2026}M)`}
          icon={Factory}
          tone="success"
        />
        <KpiCard
          title="Nhu cầu mua"
          value={`${regulatorOverview.buyDemand.toFixed(1)}M`}
          hint="tCO₂e — thiếu hụt hạn ngạch"
          icon={TrendingUp}
          tone="danger"
        />
        <KpiCard
          title="Nhu cầu bán"
          value={`${regulatorOverview.sellDemand.toFixed(1)}M`}
          hint="tCO₂e — dư hạn ngạch"
          icon={Leaf}
          tone="default"
        />
      </div>

      {/* Sector breakdown + compliance stats */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Phân tích theo ngành</CardTitle>
            <CardDescription>Phát thải, hạn ngạch và thiếu hụt theo 3 ngành thí điểm</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sectors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sector" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `${v}M`} />
                <Tooltip formatter={(v) => `${v}M tCO₂e`} />
                <Legend />
                <Bar dataKey="emissions" name="Phát thải" fill="var(--chart-5)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="allowance" name="Hạn ngạch" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trạng thái tuân thủ</CardTitle>
            <CardDescription>Phân bổ 110 cơ sở theo trạng thái hiện tại</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={complianceStats}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {complianceStats.map((_, i) => (
                    <Cell key={i} fill={complianceColors[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {complianceStats.map((stat, i) => (
                <div key={stat.status} className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-sm" style={{ background: complianceColors[i] }} />
                  <span className="flex-1">{stat.status}</span>
                  <span className="font-medium">{stat.count} cơ sở</span>
                  <span className="text-muted-foreground">{stat.pct}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Green transition report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-primary" /> Báo cáo chuyển đổi xanh</CardTitle>
          <CardDescription>Tỷ lệ doanh nghiệp theo hướng chuyển đổi xanh thay vì chỉ mua tín chỉ</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={greenTransition} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="metric" width={200} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar dataKey="pct" radius={[0, 4, 4, 0]}>
                {greenTransition.map((_, i) => (
                  <Cell key={i} fill={`var(--chart-${(i % 5) + 1})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Sector comparison table */}
      <Card>
        <CardHeader>
          <CardTitle>So sánh dữ liệu theo ngành</CardTitle>
          <CardDescription>Phát thải, hạn ngạch, thiếu hụt và số cơ sở</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="pb-2 pr-4 font-medium">Ngành</th>
                  <th className="pb-2 pr-4 text-right font-medium">Cơ sở</th>
                  <th className="pb-2 pr-4 text-right font-medium">Phát thải (M)</th>
                  <th className="pb-2 pr-4 text-right font-medium">Hạn ngạch (M)</th>
                  <th className="pb-2 pr-4 text-right font-medium">Thiếu hụt (M)</th>
                  <th className="pb-2 text-right font-medium">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {sectors.map((s) => (
                  <tr key={s.sector} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-medium">{s.sector}</td>
                    <td className="py-3 pr-4 text-right">{s.facilities}</td>
                    <td className="py-3 pr-4 text-right">{s.emissions.toFixed(1)}</td>
                    <td className="py-3 pr-4 text-right">{s.allowance.toFixed(1)}</td>
                    <td className="py-3 pr-4 text-right">
                      <span className={s.shortfall > 0 ? "text-destructive" : "text-primary"}>
                        {s.shortfall > 0 ? "+" : ""}{s.shortfall.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Badge variant={s.shortfall > 0 ? "destructive" : "default"}>
                        {s.shortfall > 0 ? "Thiếu" : "Dư"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Separator className="my-4" />
          <div className="text-xs text-muted-foreground">
            Chế độ chia sẻ tự nguyện: dữ liệu ESG & tiến độ giảm phát thải chỉ hiển thị khi doanh nghiệp đồng ý chia sẻ.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
