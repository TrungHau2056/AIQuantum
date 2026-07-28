"use client";

import {
  RadialBarChart, RadialBar, PolarAngleAxis, Cell,
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { NumberTicker } from "@/components/magic/number-ticker";
import { KpiCard } from "@/components/dashboards/kpi-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { esgProfile, facility } from "@/lib/mock-data";
import { ShieldCheck, Target, TrendingDown, Award, FileText } from "lucide-react";

export default function InvestorPage() {
  const esgPass = esgProfile.esgScore >= esgProfile.esgThreshold;
  const overallPass = esgProfile.overallScore >= esgProfile.overallThreshold;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard đánh giá đầu tư xanh</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Hồ sơ do {facility.name} chủ động chia sẻ · Tham khảo: MSCI ESG Ratings, Sustainalytics, quỹ ESG ASEAN
        </p>
      </div>

      {/* ESG Score gauges */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-primary" /> Điểm ESG</CardTitle>
            <CardDescription>Ngưỡng đầu tư xanh: ESG ≥ 82, Overall ≥ 80</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={180}>
                  <RadialBarChart
                    innerRadius="70%"
                    outerRadius="100%"
                    data={[{ value: esgProfile.esgScore, fill: "var(--chart-1)" }]}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar background dataKey="value" cornerRadius={10} />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-3xl font-bold">
                      {esgProfile.esgScore}
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="mt-2 text-sm font-medium">ESG Score</div>
                <Badge variant={esgPass ? "default" : "destructive"} className="mt-1">
                  {esgPass ? "Đạt ngưỡng" : "Chưa đạt"}
                </Badge>
              </div>
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={180}>
                  <RadialBarChart
                    innerRadius="70%"
                    outerRadius="100%"
                    data={[{ value: esgProfile.overallScore, fill: "var(--chart-2)" }]}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar background dataKey="value" cornerRadius={10} />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-3xl font-bold">
                      {esgProfile.overallScore}
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="mt-2 text-sm font-medium">Overall Score</div>
                <Badge variant={overallPass ? "default" : "destructive"} className="mt-1">
                  {overallPass ? "Đạt ngưỡng" : "Chưa đạt"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4">
          <KpiCard
            title="Báo cáo ESG"
            value={esgProfile.hasEsgReport ? "Có" : "Không"}
            icon={FileText}
            tone={esgProfile.hasEsgReport ? "success" : "danger"}
          />
          <KpiCard
            title="Cam kết Net Zero"
            value={esgProfile.hasNetZeroCommitment ? "Có" : "Không"}
            icon={Target}
            tone={esgProfile.hasNetZeroCommitment ? "success" : "danger"}
          />
          <KpiCard
            title="Cường độ phát thải"
            value="0.77"
            icon={TrendingDown}
            hint="tCO₂e/t sản phẩm"
            tone="success"
          />
        </div>
      </div>

      {/* Net Zero roadmap */}
      <Card>
        <CardHeader>
          <CardTitle>Lộ trình Net Zero</CardTitle>
          <CardDescription>Mức độ khả thi của từng giai đoạn</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={esgProfile.netZeroRoadmap}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} />
              <Tooltip
                content={({ payload }) => {
                  if (!payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-background p-2 text-xs shadow">
                      <div className="font-medium">{d.phase} ({d.year})</div>
                      <div className="text-muted-foreground">{d.target}</div>
                      <div className="mt-1">Khả thi: {d.feasibility}%</div>
                    </div>
                  );
                }}
              />
              <Bar dataKey="feasibility" name="Khả thi (%)" radius={[4, 4, 0, 0]}>
                {esgProfile.netZeroRoadmap.map((entry, i) => (
                  <Cell key={i} fill={entry.feasibility >= 70 ? "var(--chart-1)" : entry.feasibility >= 50 ? "var(--chart-4)" : "var(--chart-5)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-3">
            {esgProfile.netZeroRoadmap.map((phase) => (
              <div key={phase.year} className="flex items-center gap-3">
                <div className="w-24 shrink-0 text-sm font-medium">{phase.year}</div>
                <div className="flex-1 text-sm text-muted-foreground">{phase.target}</div>
                <div className="w-32 shrink-0">
                  <Progress value={phase.feasibility} className="h-2" />
                </div>
                <div className="w-10 shrink-0 text-right text-xs font-medium">{phase.feasibility}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Carbon reduction trend */}
      <Card>
        <CardHeader>
          <CardTitle>Xu hướng giảm phát thải & cường độ</CardTitle>
          <CardDescription>Theo kỳ — phát thải (tCO₂e) và cường độ phát thải</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={esgProfile.reductionTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 1]} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="emissions" name="Phát thải" stroke="var(--chart-1)" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="intensity" name="Cường độ" stroke="var(--chart-2)" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Green investment opportunity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /> Cơ hội đầu tư xanh</CardTitle>
          <CardDescription>Danh mục dự án xanh và nhu cầu vốn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="text-xs text-muted-foreground">Tổng vốn xanh cần huy động</div>
              <div className="mt-1 text-xl font-bold text-primary">
                <NumberTicker value={108} decimals={0} suffix=" tỷ VND" />
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-xs text-muted-foreground">Dự án giảm phát thải</div>
              <div className="mt-1 text-xl font-bold">
                <NumberTicker value={6} />
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-xs text-muted-foreground">IRR trung bình</div>
              <div className="mt-1 text-xl font-bold">
                <NumberTicker value={22.3} decimals={1} suffix="%" />
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="text-xs text-muted-foreground">
            Lưu ý: Tài liệu & chỉ số phục vụ thẩm định, không phải khuyến nghị đầu tư tự động.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
