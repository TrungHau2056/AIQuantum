"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Wallet, Sprout, Award,
  ChevronLeft, ChevronRight, Check, AlertCircle, Upload, Plus, Trash2, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { Sector } from "@/lib/types";
import {
  STEPS, emptyFormData, calcCompleteness, calcComplianceGap,
  type IngestFormData, type ActivityRow, type CreditRow, type GreenProjectForm,
  type OwnershipType, type ActivityType, type EmissionScope,
  type CreditType, type DecisionChoice,
} from "@/lib/form-schema";

const stepIcons = [Building2, Wallet, Sprout, Award];

const inputClass =
  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";
const labelClass = "mb-1 block text-xs font-medium text-muted-foreground";
const selectClass = inputClass;

let rowId = 0;
const nextId = () => `row-${++rowId}`;

type ArrayKey = "activityData" | "credits" | "greenProjects";

export function IngestWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<IngestFormData>(emptyFormData);
  const [submitted, setSubmitted] = useState(false);
  const completeness = calcCompleteness(data);
  const gap = calcComplianceGap(data);

  const set = <K extends keyof IngestFormData>(key: K, value: IngestFormData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const isStepValid = (stepId: number): boolean => {
    const step = STEPS[stepId];
    if (step.requiredFields.length === 0) return true;
    for (const field of step.requiredFields) {
      if (field === "activityData" && data.activityData.length === 0) return false;
      if (field === "greenProjects" && data.greenProjects.length === 0) return false;
      if (field.includes(".")) {
        const [obj, key] = field.split(".");
        const section = data[obj as keyof IngestFormData] as unknown as Record<string, unknown> | undefined;
        const v = section?.[key];
        if (v === "" || v === undefined || v === null) return false;
      }
    }
    return true;
  };

  const next = () => step < STEPS.length - 1 && setStep(step + 1);
  const prev = () => step > 0 && setStep(step - 1);

  // --- array helpers ---
  const addActivity = () =>
    set("activityData", [...data.activityData, { id: nextId(), month: "", activityType: "production", quantity: "", unit: data.facility.productUnit, ncv: "" } as ActivityRow]);
  const addCredit = () =>
    set("credits", [...data.credits, { id: nextId(), creditType: "domestic", creditVintage: "", creditVolume: "", creditEligible: true } as CreditRow]);
  const addProject = () =>
    set("greenProjects", [...data.greenProjects, { id: nextId(), projectName: "", capex: "", abatementPct: "", abatementTco2eYear: "", payback: "", opexDelta: "", energySavings: "", startDate: "", implementationLag: "", lifetime: "", taxonomyMatch: false } as GreenProjectForm]);

  const removeRow = (arr: ArrayKey, id: string) => {
    const filtered = (data[arr] as { id: string }[]).filter((r) => r.id !== id);
    setData((prev) => ({ ...prev, [arr]: filtered }) as IngestFormData);
  };

  const updateActivity = (id: string, patch: Partial<ActivityRow>) =>
    set("activityData", data.activityData.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const updateCredit = (id: string, patch: Partial<CreditRow>) =>
    set("credits", data.credits.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const updateProject = (id: string, patch: Partial<GreenProjectForm>) =>
    set("greenProjects", data.greenProjects.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  return (
    <div className="space-y-6">
      {/* Header + completeness */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nhập dữ liệu doanh nghiệp</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Carbon Digital Twin cấp cơ sở → Compliance Gap → tối ưu phương án tuân thủ. Map vào 11-bảng data model.
          </p>
        </div>
        <div className="min-w-56 rounded-lg border p-3">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Hoàn thành (required)</span>
            <span className="font-semibold">{completeness.pct}%</span>
          </div>
          <Progress value={completeness.pct} />
          <div className="mt-2 flex items-center gap-2">
            <Badge variant={completeness.tier === "Đầy đủ" ? "default" : completeness.tier === "Benchmark" ? "secondary" : "outline"}>
              {completeness.tier}
            </Badge>
            <span className="text-xs text-muted-foreground">{completeness.filledRequired}/{completeness.totalRequired}</span>
          </div>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex flex-wrap gap-1.5">
        {STEPS.map((s, i) => {
          const Icon = stepIcons[i] ?? Building2;
          const done = i < step;
          const active = i === step;
          return (
            <button
              key={s.id}
              onClick={() => setStep(i)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                active ? "border-primary bg-primary/10 text-primary" : done ? "border-primary/30 bg-primary/5 text-primary/70" : "border-border text-muted-foreground hover:bg-muted/40"
              }`}
            >
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${active ? "bg-primary text-primary-foreground" : done ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                {done ? <Check className="h-3 w-3" /> : i + 1}
              </span>
              <Icon className="h-3.5 w-3.5 hidden sm:block" />
              <span className="hidden md:inline">{s.title}</span>
            </button>
          );
        })}
      </div>

      {/* Step content */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            {(() => { const Icon = stepIcons[step] ?? Building2; return <Icon className="h-5 w-5 text-primary" />; })()}
            <div>
              <CardTitle className="text-lg">{STEPS[step].title}</CardTitle>
              <CardDescription>{STEPS[step].description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
            >
              {/* NHÓM 1: Thông tin doanh nghiệp */}
              {step === 0 && (
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Doanh nghiệp</p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>Tên doanh nghiệp *</label>
                        <input className={inputClass} value={data.company.name} onChange={(e) => set("company", { ...data.company, name: e.target.value })} placeholder="VD: Công ty CP Xi măng VICEM Hoàng Mai" />
                      </div>
                      <div>
                        <label className={labelClass}>Mã số thuế *</label>
                        <input className={inputClass} value={data.company.taxId} onChange={(e) => set("company", { ...data.company, taxId: e.target.value })} placeholder="10–13 số" />
                      </div>
                      <div>
                        <label className={labelClass}>Ngành *</label>
                        <select className={selectClass} value={data.company.sector} onChange={(e) => set("company", { ...data.company, sector: e.target.value as Sector })}>
                          <option value="cement">Xi măng</option>
                          <option value="thermal-power">Nhiệt điện</option>
                          <option value="steel">Sắt thép</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Loại sở hữu</label>
                        <select className={selectClass} value={data.company.ownershipType} onChange={(e) => set("company", { ...data.company, ownershipType: e.target.value as OwnershipType | "" })}>
                          <option value="">— Chọn —</option>
                          <option value="SOE">State-owned (SOE)</option>
                          <option value="private">Private</option>
                          <option value="FDI">FDI</option>
                          <option value="joint-stock">Joint-stock</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Cơ sở/nhà máy</p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>Tên cơ sở/nhà máy *</label>
                        <input className={inputClass} value={data.facility.facilityName} onChange={(e) => set("facility", { ...data.facility, facilityName: e.target.value })} placeholder="VD: Nhà máy Xi măng Hoàng Mai" />
                      </div>
                      <div>
                        <label className={labelClass}>Mã cơ sở (registry)</label>
                        <input className={inputClass} value={data.facility.registryId} onChange={(e) => set("facility", { ...data.facility, registryId: e.target.value })} placeholder="VD: VN-ETS-CMT-0042" />
                      </div>
                      <div>
                        <label className={labelClass}>Tỉnh/TP *</label>
                        <input className={inputClass} value={data.facility.province} onChange={(e) => set("facility", { ...data.facility, province: e.target.value })} placeholder="VD: Nghệ An" />
                      </div>
                      <div>
                        <label className={labelClass}>Sản phẩm chính *</label>
                        <input className={inputClass} value={data.facility.productMain} onChange={(e) => set("facility", { ...data.facility, productMain: e.target.value })} placeholder="VD: Clinker, xi măng PCB40" />
                      </div>
                      <div>
                        <label className={labelClass}>Công suất thiết kế *</label>
                        <input type="number" className={inputClass} value={data.facility.capacity} onChange={(e) => set("facility", { ...data.facility, capacity: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 1.500.000 tấn/năm" />
                      </div>
                      <div>
                        <label className={labelClass}>Đơn vị sản phẩm *</label>
                        <select className={selectClass} value={data.facility.productUnit} onChange={(e) => set("facility", { ...data.facility, productUnit: e.target.value })}>
                          <option value="tấn xi măng">tấn xi măng</option>
                          <option value="tấn clinker">tấn clinker</option>
                          <option value="tấn thép">tấn thép</option>
                          <option value="MWh">MWh</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* NHÓM 2: Hạn ngạch & phát thải */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Hạn ngạch</p>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <label className={labelClass}>Hạn ngạch cấp 2025 (tCO₂e) *</label>
                        <input type="number" className={inputClass} value={data.allowance.allocated2025} onChange={(e) => set("allowance", { ...data.allowance, allocated2025: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 1.100.000" />
                      </div>
                      <div>
                        <label className={labelClass}>Hạn ngạch cấp 2026 (tCO₂e) *</label>
                        <input type="number" className={inputClass} value={data.allowance.allocated2026} onChange={(e) => set("allowance", { ...data.allowance, allocated2026: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 1.100.000" />
                      </div>
                      <div>
                        <label className={labelClass}>Số dư hiện tại (tCO₂e)</label>
                        <input type="number" className={inputClass} value={data.allowance.balance} onChange={(e) => set("allowance", { ...data.allowance, balance: e.target.value === "" ? "" : Number(e.target.value) })} />
                      </div>
                      <div>
                        <label className={labelClass}>Hạn nộp trả *</label>
                        <input type="date" className={inputClass} value={data.allowance.surrenderDeadline} onChange={(e) => set("allowance", { ...data.allowance, surrenderDeadline: e.target.value })} />
                      </div>
                      <div>
                        <label className={labelClass}>Đã vay kỳ sau (%)</label>
                        <input type="number" min={0} max={15} className={inputClass} value={data.allowance.borrowedPct} onChange={(e) => set("allowance", { ...data.allowance, borrowedPct: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="Max 15%" />
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Phát thải & sản lượng</p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>Phát thải thực tế lũy kế (tCO₂e)</label>
                        <input type="number" className={inputClass} value={data.emissions.emissionsTco2e} onChange={(e) => set("emissions", { ...data.emissions, emissionsTco2e: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="Từ báo cáo kiểm kê KNK — để trống để auto-calc" />
                      </div>
                      <div>
                        <label className={labelClass}>Sản lượng kế hoạch còn lại *</label>
                        <input type="number" className={inputClass} value={data.emissions.productionPlanned} onChange={(e) => set("emissions", { ...data.emissions, productionPlanned: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 800.000" />
                      </div>
                      <div>
                        <label className={labelClass}>Hệ số phát thải/đơn vị sản phẩm *</label>
                        <input type="number" step="0.0001" className={inputClass} value={data.emissions.productionFactor} onChange={(e) => set("emissions", { ...data.emissions, productionFactor: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 0.65 tCO₂e/tấn" />
                      </div>
                      <div>
                        <label className={labelClass}>Phạm vi phát thải</label>
                        <select className={selectClass} value={data.emissions.scope} onChange={(e) => set("emissions", { ...data.emissions, scope: e.target.value as EmissionScope })}>
                          <option value="scope-1">Scope 1 (trực tiếp)</option>
                          <option value="scope-2">Scope 2 (điện)</option>
                          <option value="scope-3">Scope 3 (gián tiếp)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Sản lượng đã sản xuất (chuỗi theo tháng)</p>
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/40">
                        <Upload className="h-3.5 w-3.5" /> Upload Excel/CSV
                        <input type="file" accept=".xlsx,.csv" className="hidden" onChange={() => {}} />
                      </label>
                    </div>
                    <Button size="sm" variant="outline" onClick={addActivity}><Plus className="mr-1 h-3.5 w-3.5" /> Thêm dòng</Button>
                    {data.activityData.length === 0 ? (
                      <p className="mt-2 rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">Chưa có dữ liệu. Upload Excel hoặc thêm dòng thủ công.</p>
                    ) : (
                      <div className="mt-2 space-y-2">
                        {data.activityData.map((row) => (
                          <div key={row.id} className="grid grid-cols-2 gap-2 rounded-lg border p-2 md:grid-cols-6">
                            <input type="month" className={inputClass} value={row.month} onChange={(e) => updateActivity(row.id, { month: e.target.value })} />
                            <select className={selectClass} value={row.activityType} onChange={(e) => updateActivity(row.id, { activityType: e.target.value as ActivityType })}>
                              <option value="production">Sản lượng</option>
                              <option value="electricity">Điện</option>
                              <option value="coal">Than</option>
                              <option value="gas">Khí</option>
                              <option value="oil">Dầu</option>
                              <option value="biomass">Sinh khối</option>
                              <option value="RDF">RDF</option>
                            </select>
                            <input type="number" className={inputClass} value={row.quantity} onChange={(e) => updateActivity(row.id, { quantity: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="Lượng" />
                            <input className={inputClass} value={row.unit} onChange={(e) => updateActivity(row.id, { unit: e.target.value })} placeholder="Đơn vị" />
                            <input type="number" className={inputClass} value={row.ncv} onChange={(e) => updateActivity(row.id, { ncv: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="NCV" />
                            <Button size="sm" variant="ghost" onClick={() => removeRow("activityData", row.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Separator />
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Tín chỉ carbon đang sở hữu</p>
                      <Button size="sm" variant="outline" onClick={addCredit}><Plus className="mr-1 h-3.5 w-3.5" /> Thêm tín chỉ</Button>
                    </div>
                    {data.credits.length === 0 ? (
                      <p className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">Chưa có tín chỉ.</p>
                    ) : (
                      <div className="space-y-2">
                        {data.credits.map((row) => (
                          <div key={row.id} className="grid grid-cols-2 gap-2 rounded-lg border p-2 md:grid-cols-5">
                            <select className={selectClass} value={row.creditType} onChange={(e) => updateCredit(row.id, { creditType: e.target.value as CreditType })}>
                              <option value="domestic">Trong nước</option>
                              <option value="international-COR">Quốc tế (COR)</option>
                              <option value="CORSIA">CORSIA</option>
                              <option value="VCM">VCM</option>
                            </select>
                            <input type="number" className={inputClass} value={row.creditVintage} onChange={(e) => updateCredit(row.id, { creditVintage: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="Vintage" />
                            <input type="number" className={inputClass} value={row.creditVolume} onChange={(e) => updateCredit(row.id, { creditVolume: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="Thể tích tCO₂e" />
                            <label className="flex items-center gap-2 text-xs">
                              <input type="checkbox" checked={row.creditEligible} onChange={(e) => updateCredit(row.id, { creditEligible: e.target.checked })} /> Bù trừ 30%?
                            </label>
                            <Button size="sm" variant="ghost" onClick={() => removeRow("credits", row.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* NHÓM 3: Phương án tối ưu */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Danh sách phương án đầu tư công nghệ</p>
                      <Button size="sm" variant="outline" onClick={addProject}><Plus className="mr-1 h-3.5 w-3.5" /> Thêm phương án</Button>
                    </div>
                    {data.greenProjects.length === 0 ? (
                      <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">Chưa có phương án. Thêm ≥1 để optimize.</p>
                    ) : (
                      <div className="space-y-3">
                        {data.greenProjects.map((row) => (
                          <div key={row.id} className="space-y-2 rounded-lg border p-3">
                            <div className="flex items-center gap-2">
                              <input className={inputClass} value={row.projectName} onChange={(e) => updateProject(row.id, { projectName: e.target.value })} placeholder="Tên phương án (VD: Hệ thống thu hồi nhiệt thải WHR)" />
                              <Button size="sm" variant="ghost" onClick={() => removeRow("greenProjects", row.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                              <div>
                                <label className={labelClass}>Vốn đầu tư CAPEX (VND)</label>
                                <input type="number" className={inputClass} value={row.capex} onChange={(e) => updateProject(row.id, { capex: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 70.000.000.000" />
                              </div>
                              <div>
                                <label className={labelClass}>% giảm phát thải kì vọng</label>
                                <input type="number" min={0} max={100} className={inputClass} value={row.abatementPct} onChange={(e) => updateProject(row.id, { abatementPct: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 5 (%)" />
                              </div>
                              <div>
                                <label className={labelClass}>Lượng giảm (tCO₂e/năm)</label>
                                <input type="number" className={inputClass} value={row.abatementTco2eYear} onChange={(e) => updateProject(row.id, { abatementTco2eYear: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 120.000" />
                              </div>
                              <div>
                                <label className={labelClass}>Thời gian hoàn vốn (năm)</label>
                                <input type="number" step="0.1" className={inputClass} value={row.payback} onChange={(e) => updateProject(row.id, { payback: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 5.8" />
                              </div>
                              <div>
                                <label className={labelClass}>Tiết kiệm năng lượng (VND/năm)</label>
                                <input type="number" className={inputClass} value={row.energySavings} onChange={(e) => updateProject(row.id, { energySavings: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 12.000.000.000" />
                              </div>
                              <div>
                                <label className={labelClass}>OPEX delta (VND/năm)</label>
                                <input type="number" className={inputClass} value={row.opexDelta} onChange={(e) => updateProject(row.id, { opexDelta: e.target.value === "" ? "" : Number(e.target.value) })} />
                              </div>
                              <div>
                                <label className={labelClass}>Ngày bắt đầu</label>
                                <input type="date" className={inputClass} value={row.startDate} onChange={(e) => updateProject(row.id, { startDate: e.target.value })} />
                              </div>
                              <div>
                                <label className={labelClass}>Thời gian triển khai (tháng)</label>
                                <input type="number" className={inputClass} value={row.implementationLag} onChange={(e) => updateProject(row.id, { implementationLag: e.target.value === "" ? "" : Number(e.target.value) })} />
                              </div>
                              <div>
                                <label className={labelClass}>Tuổi thọ (năm)</label>
                                <input type="number" className={inputClass} value={row.lifetime} onChange={(e) => updateProject(row.id, { lifetime: e.target.value === "" ? "" : Number(e.target.value) })} />
                              </div>
                              <div className="flex items-end pb-2">
                                <label className="flex items-center gap-2 text-xs">
                                  <input type="checkbox" checked={row.taxonomyMatch} onChange={(e) => updateProject(row.id, { taxonomyMatch: e.target.checked })} /> QĐ 21/2025?
                                </label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Separator />
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Chuyển đổi nhiên liệu thay thế</p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>% công suất tối đa áp dụng</label>
                        <input type="number" min={0} max={100} className={inputClass} value={data.fuelSwitch.altFuelPct} onChange={(e) => set("fuelSwitch", { ...data.fuelSwitch, altFuelPct: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 40 (%)" />
                      </div>
                      <div>
                        <label className={labelClass}>Chi phí chuyển đổi (VND)</label>
                        <input type="number" className={inputClass} value={data.fuelSwitch.altFuelCost} onChange={(e) => set("fuelSwitch", { ...data.fuelSwitch, altFuelCost: e.target.value === "" ? "" : Number(e.target.value) })} />
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Thị trường & ngân sách</p>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <label className={labelClass}>Giá carbon — thấp (VND/tCO₂e)</label>
                        <input type="number" className={inputClass} value={data.market.priceLow} onChange={(e) => set("market", { ...data.market, priceLow: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 150000" />
                      </div>
                      <div>
                        <label className={labelClass}>Giá carbon — cơ sở (VND/tCO₂e) *</label>
                        <input type="number" className={inputClass} value={data.market.priceBase} onChange={(e) => set("market", { ...data.market, priceBase: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 250000" />
                      </div>
                      <div>
                        <label className={labelClass}>Giá carbon — cao (VND/tCO₂e)</label>
                        <input type="number" className={inputClass} value={data.market.priceHigh} onChange={(e) => set("market", { ...data.market, priceHigh: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 500000" />
                      </div>
                      <div>
                        <label className={labelClass}>Phí giao dịch (%)</label>
                        <input type="number" className={inputClass} value={data.market.feeRate} onChange={(e) => set("market", { ...data.market, feeRate: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 2" />
                      </div>
                      <div>
                        <label className={labelClass}>Ngân sách tuân thủ tối đa (VND) *</label>
                        <input type="number" className={inputClass} value={data.market.budget} onChange={(e) => set("market", { ...data.market, budget: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 80000000000" />
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                      Quyết định lựa chọn phương án thực tế <span className="font-normal text-muted-foreground/40">(optional)</span>
                    </p>
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground">
                      Optional — doanh nghiệp nhập dữ liệu trước khi quyết định. Quay lại cập nhật sau khi quyết định để regulator so sánh thực tế vs khuyến nghị optimizer.
                    </div>
                    <div className="mt-2 grid gap-4 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>Quyết định thực tế</label>
                        <select className={selectClass} value={data.actualDecision.chosen} onChange={(e) => set("actualDecision", { ...data.actualDecision, chosen: e.target.value as DecisionChoice | "" })}>
                          <option value="">— Chưa quyết định —</option>
                          <option value="buy-credits">Mua tín chỉ carbon</option>
                          <option value="invest-green">Đầu tư công nghệ xanh</option>
                          <option value="combine">Kết hợp</option>
                          <option value="no-action">Không hành động</option>
                          <option value="undecided">Chưa quyết định</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Ghi chú</label>
                        <input className={inputClass} value={data.actualDecision.note} onChange={(e) => set("actualDecision", { ...data.actualDecision, note: e.target.value })} placeholder="VD: Chọn WHR + mua 80k tín chỉ" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* NHÓM 4: ESG & cam kết */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm">
                    <strong>Optional:</strong> Hồ sơ ESG & cam kết Net Zero — phục vụ Green Finance Profile.
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="h-4 w-4" checked={data.esg.hasEsgReport} onChange={(e) => set("esg", { ...data.esg, hasEsgReport: e.target.checked })} /> Có báo cáo ESG?
                    </label>
                    <div>
                      <label className={labelClass}>ESG Score (/100)</label>
                      <input type="number" min={0} max={100} className={inputClass} value={data.esg.esgScore} onChange={(e) => set("esg", { ...data.esg, esgScore: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 85" />
                    </div>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="h-4 w-4" checked={data.esg.netZeroCommitment} onChange={(e) => set("esg", { ...data.esg, netZeroCommitment: e.target.checked })} /> Cam kết Net Zero?
                    </label>
                    <div className="md:col-span-2">
                      <label className={labelClass}>Lộ trình Net Zero (mốc trung gian)</label>
                      <textarea className={inputClass + " h-20 py-2"} value={data.esg.netZeroRoadmap} onChange={(e) => set("esg", { ...data.esg, netZeroRoadmap: e.target.value })} placeholder="VD: 2026 giảm 5%, 2030 giảm 15%, 2050 Net Zero" />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Compliance Gap live preview (from group 2) */}
          {step >= 1 && gap.gap !== null && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm">
              <div className="flex items-center gap-2 font-medium text-primary">
                <CheckCircle2 className="h-4 w-4" /> Auto-calc Compliance Gap
              </div>
              <div className="mt-1.5 grid grid-cols-3 gap-2 text-xs">
                <div>Phát thải: <strong>{gap.forecastEmissions?.toLocaleString("en-US")} tCO₂e</strong></div>
                <div>Hạn ngạch: <strong>{gap.totalAllowance?.toLocaleString("en-US")} tCO₂e</strong></div>
                <div>Gap: <strong className={gap.gap < 0 ? "text-destructive" : "text-primary"}>{gap.gap.toLocaleString("en-US")} tCO₂e</strong> {gap.gap < 0 ? "(thiếu)" : "(dư)"}</div>
              </div>
            </div>
          )}

          {/* Validation warning */}
          {!isStepValid(step) && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" /> Còn trường required chưa điền trong nhóm này.
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" onClick={prev} disabled={step === 0}>
              <ChevronLeft className="mr-1 h-4 w-4" /> Trước
            </Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={next} disabled={!isStepValid(step)}>
                Tiếp <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={() => setSubmitted(true)}>
                <Check className="mr-1 h-4 w-4" /> Hoàn tất
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary modal */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSubmitted(false)}>
          <Card className="max-w-lg" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> Đã lưu dữ liệu (mock)</CardTitle>
              <CardDescription>Stage 1: lưu trong state. Stage 2: POST tới API ingest → Carbon Data Ledger.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Data completeness</span>
                <Badge variant={completeness.tier === "Đầy đủ" ? "default" : "secondary"}>{completeness.tier} ({completeness.pct}%)</Badge>
              </div>
              {gap.gap !== null ? (
                <div className="rounded-lg border p-3">
                  <div className="text-xs text-muted-foreground">Compliance Gap (auto-calc)</div>
                  <div className="mt-1 text-lg font-bold text-destructive">{gap.gap.toLocaleString("en-US")} tCO₂e {gap.gap < 0 ? "thiếu" : "dư"}</div>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-3 text-xs text-muted-foreground">
                  Chưa đủ dữ liệu để tính Compliance Gap. Bổ sung Nhóm 2 (hạn ngạch + sản lượng + hệ số).
                </div>
              )}
              <Button className="w-full" onClick={() => setSubmitted(false)}>Đóng</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
