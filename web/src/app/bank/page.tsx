"use client";

import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { NumberTicker } from "@/components/magic/number-ticker";
import { KpiCard } from "@/components/dashboards/kpi-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { bankAppraisal, facility } from "@/lib/mock-data";
import { ShieldCheck, AlertCircle, TrendingDown, FileCheck, Landmark } from "lucide-react";

const riskTone = {
  Low: "default",
  Medium: "warning",
  High: "danger",
} as const;

export default function BankPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard thẩm định tín dụng xanh</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Hồ sơ do {facility.name} cung cấp · Tham khảo: IFC Performance Standards & hướng dẫn tín dụng xanh NHNN
        </p>
      </div>

      {/* Appraisal summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ShieldCheck className="h-4 w-4" /> Mức rủi ro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={bankAppraisal.riskLevel === "Low" ? "default" : bankAppraisal.riskLevel === "Medium" ? "secondary" : "destructive"} className="text-base">
              {bankAppraisal.riskLevel} risk
            </Badge>
            <div className="mt-2 text-xs text-muted-foreground">
              Shortfall {bankAppraisal.shortfallPct}% &lt; 10% ngưỡng Low
            </div>
          </CardContent>
        </Card>
        <KpiCard
          title="Mức tuân thủ (cuối kỳ)"
          value={`${bankAppraisal.complianceLevel}%`}
          icon={FileCheck}
          tone="success"
        />
        <KpiCard
          title="Thiếu hạn ngạch"
          value={`${bankAppraisal.shortfallPct}%`}
          icon={AlertCircle}
          tone={bankAppraisal.shortfallPct < 10 ? "success" : "danger"}
          hint={bankAppraisal.shortfallPct < 10 ? "Dưới ngưỡng 10% — Low risk" : "Vượt ngưỡng 10%"}
        />
        <KpiCard
          title="Cường độ giảm phát thải"
          value="-19.4%"
          icon={TrendingDown}
          tone="success"
          hint="so với Q1/2025"
        />
      </div>

      {/* Reduction trend */}
      <Card>
        <CardHeader>
          <CardTitle>Xu hướng giảm phát thải</CardTitle>
          <CardDescription>Theo kỳ — tCO₂e</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={bankAppraisal.reductionTrend}>
              <defs>
                <linearGradient id="bankGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => Number(v).toLocaleString("en-US") + " tCO₂e"} />
              <Line type="monotone" dataKey="emissions" name="Phát thải" stroke="var(--chart-1)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Data verification */}
      <Card>
        <CardHeader>
          <CardTitle>Trạng thái xác minh dữ liệu</CardTitle>
          <CardDescription>Mức độ đầy đủ, khả năng truy xuất và xác minh từng loại dữ liệu</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loại dữ liệu</TableHead>
                <TableHead className="text-right">Đầy đủ</TableHead>
                <TableHead className="text-center">Truy xuất</TableHead>
                <TableHead className="text-center">Đã xác minh</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bankAppraisal.dataVerification.map((row) => (
                <TableRow key={row.metric}>
                  <TableCell className="font-medium">{row.metric}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Progress value={row.completeness} className="h-2 w-20" />
                      <span className="text-xs">{row.completeness}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={row.traceable ? "default" : "secondary"}>
                      {row.traceable ? "Có" : "Không"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={row.verified ? "default" : "outline"}>
                      {row.verified ? "Đã xác minh" : "Chưa"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Green credit recommendation stub */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Landmark className="h-5 w-5 text-primary" /> Đánh giá tín dụng xanh</CardTitle>
          <CardDescription>Hồ sơ dữ liệu carbon có khả năng truy xuất, kiểm chứng</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <div className="text-xs text-muted-foreground">Khả năng tiếp cận vốn xanh</div>
              <div className="mt-1 text-lg font-bold text-primary">Khả thi</div>
              <div className="mt-2 text-xs text-muted-foreground">
                Dữ liệu ESG + lộ trình Net Zero minh bạch, tuân thủ carbon ở mức Low risk.
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-xs text-muted-foreground">Điểm chất lượng dữ liệu tổng hợp</div>
              <div className="mt-1 text-lg font-bold">
                <NumberTicker value={93} suffix="/100" />
              </div>
              <Progress value={93} className="mt-2 h-2" />
            </div>
          </div>
          <Separator />
          <div className="text-xs text-muted-foreground">
            Lưu ý: Tài liệu & chỉ số phục vụ thẩm định, không phải điểm tín dụng hoặc khuyến nghị cho vay tự động.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
