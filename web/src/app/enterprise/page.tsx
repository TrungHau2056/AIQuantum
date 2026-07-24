"use client";

import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, Line as RLine, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend, Cell,
} from "recharts";
import { NumberTicker } from "@/components/magic/number-ticker";
import { KpiCard, SectionHeader } from "@/components/dashboards/kpi-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  facility, forecast, abatementOptions, complianceRules, whatIfScenarios, costImpact,
} from "@/lib/mock-data";
import {
  Factory, TrendingDown, AlertTriangle, Wallet, Leaf, Gauge, Send, Bot,
} from "lucide-react";

const fmt = (n: number) => n.toLocaleString("en-US");
const fmtM = (n: number) => `${(n / 1_000_000).toFixed(2)}M`;

const leverData = [
  { name: "Hạn ngạch", value: forecast.allowance, fill: "var(--chart-1)" },
  { name: "Tín chỉ sở hữu", value: forecast.creditsOwned, fill: "var(--chart-2)" },
  { name: "Vay 15% kỳ sau", value: forecast.allowance * 0.15, fill: "var(--chart-4)" },
  { name: "Phát thải dự báo", value: forecast.forecastEndOfPeriod, fill: "var(--chart-5)" },
];

export default function EnterprisePage() {
  const deficit = Math.abs(forecast.surplusDeficit);
  const maxCreditOffset = forecast.allowance * 0.3;
  const optimal = abatementOptions.find((o) => o.isOptimal);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{facility.name}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Factory className="h-3.5 w-3.5" /> Xi măng</span>
            <span>Mã số thuế: {facility.taxCode}</span>
            <span>Mã cơ sở: {facility.registryId}</span>
            <Badge variant="secondary">Kỳ tuân thủ 2025–2026</Badge>
          </div>
        </div>
      </div>

      {/* Early warning banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4"
      >
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
        <div className="space-y-1 text-sm">
          <div className="font-medium text-destructive">Cảnh báo: dự kiến thiếu hạn ngạch cuối kỳ</div>
          <div className="text-muted-foreground">
            Phát thải dự báo {fmtM(forecast.forecastEndOfPeriod)} tCO₂e vượt hạn ngạch được cấp {fmtM(forecast.allowance)} tCO₂e.
            Thiếu hụt {fmtM(deficit)} tCO₂e. Nếu không xử lý, phần thiếu sẽ bị khấu trừ vào hạn ngạch kỳ tiếp theo.
          </div>
        </div>
      </motion.div>

      {/* KPI row */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Gauge className="h-4 w-4" /> Phát thải dự báo cuối kỳ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              <NumberTicker value={forecast.forecastEndOfPeriod / 1_000_000} decimals={2} suffix="M" />
            </div>
            <div className="mt-1 text-xs text-muted-foreground">tCO₂e</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Leaf className="h-4 w-4" /> Hạn ngạch được cấp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <NumberTicker value={forecast.allowance / 1_000_000} decimals={2} suffix="M" />
            </div>
            <div className="mt-1 text-xs text-muted-foreground">tCO₂e</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <TrendingDown className="h-4 w-4" /> Thiếu hụt hạn ngạch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              -<NumberTicker value={deficit / 1_000_000} decimals={2} suffix="M" />
            </div>
            <div className="mt-1 text-xs text-muted-foreground">tCO₂e</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Wallet className="h-4 w-4" /> Ngân sách tuân thủ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <NumberTicker value={forecast.complianceBudget / 1_000_000} decimals={2} prefix="$" suffix="M" />
            </div>
            <div className="mt-1 text-xs text-muted-foreground">USD</div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance levers + forecast */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Các đòn bẩy tuân thủ</CardTitle>
            <CardDescription>Hạn ngạch, tín chỉ, vay mượn so với phát thải dự báo</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={leverData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={fmtM} />
                <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v) => fmtM(Number(v)) + " tCO₂e"} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dự báo phát thải cuối kỳ</CardTitle>
            <CardDescription>Lũy kế thực tế + sản lượng kế hoạch còn lại</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={[
                { name: "Lũy kế thực tế", value: forecast.actualCumulative },
                { name: "Còn lại dự báo", value: forecast.plannedRemaining },
                { name: "Cuối kỳ", value: forecast.forecastEndOfPeriod },
                { name: "Hạn ngạch", value: forecast.allowance },
              ]}>
                <defs>
                  <linearGradient id="emGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-5)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--chart-5)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={fmtM} />
                <Tooltip formatter={(v) => fmtM(Number(v)) + " tCO₂e"} />
                <Area type="monotone" dataKey="value" stroke="var(--chart-5)" fill="url(#emGrad)" />
                <ReferenceLine y={forecast.allowance} stroke="var(--chart-1)" strokeDasharray="5 5" label={{ value: "Hạn ngạch", fontSize: 11, fill: "var(--chart-1)" }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Compliance rules */}
      <Card>
        <CardHeader>
          <CardTitle>Quy định tuân thủ áp dụng</CardTitle>
          <CardDescription>Policy Rule Engine — cảnh báo & kiểm tra điều kiện, không phải kết luận pháp lý</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {complianceRules.map((rule) => (
            <div key={rule.label} className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <div className="text-sm font-medium">{rule.label}</div>
                <div className="text-xs text-muted-foreground">{rule.source}</div>
              </div>
              <Badge variant="outline">{rule.value}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Option comparison table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>So sánh phương án giảm phát thải</CardTitle>
              <CardDescription>5–10 phương án — đậm = khuyến nghị tối ưu chi phí</CardDescription>
            </div>
            {optimal && (
              <Badge className="bg-primary text-primary-foreground">
                Tối ưu: {optimal.name.length > 30 ? optimal.name.slice(0, 30) + "…" : optimal.name}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Phương án</TableHead>
                <TableHead className="text-right">CAPEX</TableHead>
                <TableHead className="text-right">% giảm</TableHead>
                <TableHead className="text-right">tCO₂e giảm</TableHead>
                <TableHead className="text-right">Hoàn vốn</TableHead>
                <TableHead className="text-right">ROI</TableHead>
                <TableHead className="text-right">IRR</TableHead>
                <TableHead className="text-right">ESG</TableHead>
                <TableHead className="text-right">Thời gian</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {abatementOptions.map((opt) => (
                <TableRow key={opt.id} className={opt.isOptimal ? "bg-primary/5 font-medium" : ""}>
                  <TableCell className="max-w-50">
                    <div className="flex items-center gap-2">
                      {opt.isOptimal && <Leaf className="h-3.5 w-3.5 text-primary shrink-0" />}
                      <span className="text-xs">{opt.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">${fmt(opt.capex)}</TableCell>
                  <TableCell className="text-right">{opt.reductionPct}%</TableCell>
                  <TableCell className="text-right">{fmt(opt.reductionTco2e)}</TableCell>
                  <TableCell className="text-right">{opt.paybackYears} năm</TableCell>
                  <TableCell className="text-right">{opt.roi}%</TableCell>
                  <TableCell className="text-right">{opt.irr}%</TableCell>
                  <TableCell className="text-right">{opt.esgImpact}</TableCell>
                  <TableCell className="text-right text-xs">{opt.timeline}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* What-if analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Phân tích What-if theo giá carbon</CardTitle>
          <CardDescription>Ngưỡng quyết định: dưới $10/tCO₂e nên mua tín chỉ, trên $10 nên đầu tư công nghệ</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={whatIfScenarios}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="carbonPrice" label={{ value: "Giá carbon ($/tCO₂e)", position: "insideBottom", offset: -5, fontSize: 12 }} />
              <YAxis label={{ value: "Chi phí ($)", angle: -90, position: "insideLeft", fontSize: 12 }} tickFormatter={(v) => `${v / 1_000_000}M`} />
              <Tooltip formatter={(v) => `$${fmt(Number(v))}`} />
              <Legend />
              <ReferenceLine x={10} stroke="var(--chart-4)" strokeDasharray="5 5" label={{ value: "Ngưỡng quyết định", fontSize: 11, fill: "var(--chart-4)" }} />
              <Bar dataKey="buyCreditsCost" name="Mua tín chỉ" fill="var(--chart-3)" radius={[4, 4, 0, 0]} />
              <RLine type="monotone" dataKey="investTechCost" name="Đầu tư công nghệ" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cost impact + chatbot stub */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tác động tài chính của cơ chế bù trừ</CardTitle>
            <CardDescription>Bù trừ 30% bằng tín chỉ carbon giảm chi phí tuân thủ 3 ngành</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">Không bù trừ</div>
                <div className="mt-1 text-lg font-bold text-destructive">${costImpact.withoutOffset}M</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">Bù trừ 30%</div>
                <div className="mt-1 text-lg font-bold text-primary">${costImpact.withOffset}M</div>
              </div>
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
                <div className="text-xs text-muted-foreground">Tiết kiệm</div>
                <div className="mt-1 text-lg font-bold text-primary">${costImpact.reduction}M</div>
              </div>
            </div>
            <Separator />
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-muted-foreground">Mức giảm chi phí</span>
                <span className="font-medium">{((costImpact.reduction / costImpact.withoutOffset) * 100).toFixed(0)}%</span>
              </div>
              <Progress value={(costImpact.reduction / costImpact.withoutOffset) * 100} />
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5 text-primary" /> Chatbot tư vấn</CardTitle>
            <CardDescription>LLM local — giải thích kết quả, không tự sinh số liệu</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between gap-4">
            <div className="space-y-2 text-sm">
              <div className="ml-auto max-w-[80%] rounded-lg rounded-br-sm bg-primary px-3 py-2 text-primary-foreground">
                Phương án nào tối ưu chi phí nhất?
              </div>
              <div className="max-w-[85%] rounded-lg rounded-bl-sm bg-muted px-3 py-2">
                Dựa trên tổng chi phí vòng đời và IRR, <strong>{optimal?.name}</strong> là phương án tối ưu
                với IRR {optimal?.irr}% và thời gian hoàn vốn {optimal?.paybackYears} năm. Tuy nhiên nếu
                ưu tiên giảm phát thải tuyệt đối, hãy xem xét ABT-03 (RDF, giảm 18%).
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập câu hỏi…"
                className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
