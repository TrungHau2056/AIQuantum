"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Wallet, Sprout, Award, Factory,
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
  createEmptyFacility, genId,
  type IngestFormData, type FacilityEntry, type ActivityRow,
  type CreditRow, type GreenProjectForm, type AllowancePeriod,
  type OwnershipType, type ActivityType, type EmissionScope,
  type CreditType, type DecisionChoice,
} from "@/lib/form-schema";

const stepIcons = [Building2, Wallet, Sprout, Award];

const inputClass =
  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";
const labelClass = "mb-1 block text-xs font-medium text-muted-foreground";
const selectClass = inputClass;

export function IngestWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<IngestFormData>(emptyFormData);
  const [activeFacilityId, setActiveFacilityId] = useState(data.facilities[0].id);
  const [submitted, setSubmitted] = useState(false);
  const completeness = calcCompleteness(data);
  const gap = calcComplianceGap(data);

  const activeFacility = data.facilities.find((f) => f.id === activeFacilityId) ?? data.facilities[0];
  const activeIdx = data.facilities.findIndex((f) => f.id === activeFacilityId);

  const setCompany = <K extends keyof IngestFormData["company"]>(key: K, value: IngestFormData["company"][K]) =>
    setData((prev) => ({ ...prev, company: { ...prev.company, [key]: value } }));

  const setEsg = <K extends keyof IngestFormData["esg"]>(key: K, value: IngestFormData["esg"][K]) =>
    setData((prev) => ({ ...prev, esg: { ...prev.esg, [key]: value } }));

  // Update a field on the active facility (top-level key of FacilityEntry)
  const updateFacility = <K extends keyof FacilityEntry>(key: K, value: FacilityEntry[K]) =>
    setData((prev) => ({
      ...prev,
      facilities: prev.facilities.map((f) => (f.id === activeFacilityId ? { ...f, [key]: value } : f)),
    }));

  // --- facility management ---
  const addFacility = () => {
    const newFac = createEmptyFacility(data.facilities[0]?.facility.productUnit || "tấn xi măng");
    setData((prev) => ({ ...prev, facilities: [...prev.facilities, newFac] }));
    setActiveFacilityId(newFac.id);
  };
  const removeFacility = (id: string) => {
    if (data.facilities.length <= 1) return;
    setData((prev) => ({ ...prev, facilities: prev.facilities.filter((f) => f.id !== id) }));
    if (activeFacilityId === id) {
      const remaining = data.facilities.filter((f) => f.id !== id);
      setActiveFacilityId(remaining[0].id);
    }
  };

  // --- array helpers (within active facility) ---
  const addActivity = () =>
    updateFacility("activityData", [...activeFacility.activityData, { id: genId(), month: "", activityType: "production", quantity: "", unit: activeFacility.facility.productUnit, ncv: "" } as ActivityRow]);
  const addCredit = () =>
    updateFacility("credits", [...activeFacility.credits, { id: genId(), creditType: "domestic", creditVintage: "", creditVolume: "", creditEligible: true } as CreditRow]);
  const addProject = () =>
    updateFacility("greenProjects", [...activeFacility.greenProjects, { id: genId(), projectName: "", capex: "", abatementPct: "", abatementTco2eYear: "", payback: "", opexDelta: "", energySavings: "", startDate: "", implementationLag: "", lifetime: "", taxonomyMatch: false } as GreenProjectForm]);
  const addPeriod = () =>
    updateFacility("allowance", { ...activeFacility.allowance, periods: [...activeFacility.allowance.periods, { id: genId(), period: "", allocatedTco2e: "" } as AllowancePeriod] });

  const removeArr = (arrKey: "activityData" | "credits" | "greenProjects", id: string) =>
    setData((prev) => ({
      ...prev,
      facilities: prev.facilities.map((f) =>
        f.id === activeFacilityId
          ? { ...f, [arrKey]: (f[arrKey] as { id: string }[]).filter((r) => r.id !== id) }
          : f
      ),
    }));
  const removePeriod = (id: string) =>
    updateFacility("allowance", { ...activeFacility.allowance, periods: activeFacility.allowance.periods.filter((p) => p.id !== id) });

  const updateActivity = (id: string, patch: Partial<ActivityRow>) =>
    updateFacility("activityData", activeFacility.activityData.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const updateCredit = (id: string, patch: Partial<CreditRow>) =>
    updateFacility("credits", activeFacility.credits.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const updateProject = (id: string, patch: Partial<GreenProjectForm>) =>
    updateFacility("greenProjects", activeFacility.greenProjects.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const updatePeriod = (id: string, patch: Partial<AllowancePeriod>) =>
    updateFacility("allowance", { ...activeFacility.allowance, periods: activeFacility.allowance.periods.map((p) => (p.id === id ? { ...p, ...patch } : p)) });

  const next = () => step < STEPS.length - 1 && setStep(step + 1);
  const prev = () => step > 0 && setStep(step - 1);

  const isStepValid = (stepId: number): boolean => {
    const s = STEPS[stepId];
    if (s.requiredFields.length === 0) return true;
    if (stepId === 0) {
      return !!data.company.name && !!data.company.taxId && !!data.company.sector && data.facilities.length > 0;
    }
    // Steps 1-2: check active facility
    const f = activeFacility;
    for (const field of s.requiredFields) {
      if (field === "facility.facilityName" && !f.facility.facilityName) return false;
      if (field === "allowance.periods" && f.allowance.periods.length === 0) return false;
      if (field === "activityData" && f.activityData.length === 0) return false;
      if (field === "greenProjects" && f.greenProjects.length === 0) return false;
      if (field === "market.priceBase" && !(f.market.priceBase !== "" && f.market.priceBase > 0)) return false;
      if (field === "market.budget" && !(f.market.budget !== "" && f.market.budget > 0)) return false;
      if (field === "emissions.productionPlanned" && !(f.emissions.productionPlanned !== "" && f.emissions.productionPlanned >= 0)) return false;
      if (field === "emissions.productionFactor" && !(f.emissions.productionFactor !== "" && f.emissions.productionFactor > 0)) return false;
    }
    return true;
  };

  return (
    <div className="space-y-6">
      {/* Header + completeness */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nhập dữ liệu doanh nghiệp</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Carbon Digital Twin cấp cơ sở → Compliance Gap → tối ưu phương án tuân thủ. Hỗ trợ đa cơ sở.
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

      {/* Facility selector (steps 1-2) */}
      {(step === 1 || step === 2) && (
        <Card>
          <CardContent className="flex flex-wrap items-center gap-2 p-3">
            <Factory className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Cơ sở:</span>
            <select
              className={`${selectClass} max-w-xs`}
              value={activeFacilityId}
              onChange={(e) => setActiveFacilityId(e.target.value)}
            >
              {data.facilities.map((f, i) => (
                <option key={f.id} value={f.id}>
                  {f.facility.facilityName || `Cơ sở ${i + 1}`}
                </option>
              ))}
            </select>
            <Button size="sm" variant="outline" onClick={addFacility}>
              <Plus className="mr-1 h-3.5 w-3.5" /> Thêm cơ sở
            </Button>
            {data.facilities.length > 1 && (
              <Button size="sm" variant="ghost" onClick={() => removeFacility(activeFacilityId)}>
                <Trash2 className="mr-1 h-3.5 w-3.5 text-destructive" /> Xóa cơ sở này
              </Button>
            )}
            <span className="ml-auto text-xs text-muted-foreground">
              {activeIdx + 1}/{data.facilities.length}
            </span>
          </CardContent>
        </Card>
      )}

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
              {/* NHÓM 1: Thông tin doanh nghiệp + danh sách cơ sở */}
              {step === 0 && (
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Doanh nghiệp (nhập 1 lần)</p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>Tên doanh nghiệp *</label>
                        <input className={inputClass} value={data.company.name} onChange={(e) => setCompany("name", e.target.value)} placeholder="VD: Công ty CP Xi măng VICEM Hoàng Mai" />
                      </div>
                      <div>
                        <label className={labelClass}>Mã số thuế *</label>
                        <input className={inputClass} value={data.company.taxId} onChange={(e) => setCompany("taxId", e.target.value)} placeholder="10–13 số" />
                      </div>
                      <div>
                        <label className={labelClass}>Ngành *</label>
                        <select className={selectClass} value={data.company.sector} onChange={(e) => setCompany("sector", e.target.value as Sector)}>
                          <option value="cement">Xi măng</option>
                          <option value="thermal-power">Nhiệt điện</option>
                          <option value="steel">Sắt thép</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Loại sở hữu</label>
                        <select className={selectClass} value={data.company.ownershipType} onChange={(e) => setCompany("ownershipType", e.target.value as OwnershipType | "")}>
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
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Danh sách cơ sở/nhà máy</p>
                      <Button size="sm" variant="outline" onClick={addFacility}><Plus className="mr-1 h-3.5 w-3.5" /> Thêm cơ sở</Button>
                    </div>
                    <div className="space-y-3">
                      {data.facilities.map((f, i) => (
                        <div key={f.id} className="space-y-2 rounded-lg border p-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="shrink-0">Cơ sở {i + 1}</Badge>
                            <input
                              className={inputClass}
                              value={f.facility.facilityName}
                              onChange={(e) => setData((prev) => ({
                                ...prev,
                                facilities: prev.facilities.map((ff) => ff.id === f.id ? { ...ff, facility: { ...ff.facility, facilityName: e.target.value } } : ff),
                              }))}
                              placeholder="Tên cơ sở (VD: Nhà máy Xi măng Hoàng Mai)"
                            />
                            {data.facilities.length > 1 && (
                              <Button size="sm" variant="ghost" onClick={() => removeFacility(f.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                            <input className={inputClass} value={f.facility.registryId} onChange={(e) => setData((prev) => ({ ...prev, facilities: prev.facilities.map((ff) => ff.id === f.id ? { ...ff, facility: { ...ff.facility, registryId: e.target.value } } : ff) }))} placeholder="Mã registry" />
                            <input className={inputClass} value={f.facility.province} onChange={(e) => setData((prev) => ({ ...prev, facilities: prev.facilities.map((ff) => ff.id === f.id ? { ...ff, facility: { ...ff.facility, province: e.target.value } } : ff) }))} placeholder="Tỉnh/TP" />
                            <input className={inputClass} value={f.facility.productMain} onChange={(e) => setData((prev) => ({ ...prev, facilities: prev.facilities.map((ff) => ff.id === f.id ? { ...ff, facility: { ...ff.facility, productMain: e.target.value } } : ff) }))} placeholder="Sản phẩm chính" />
                            <input type="number" className={inputClass} value={f.facility.capacity} onChange={(e) => setData((prev) => ({ ...prev, facilities: prev.facilities.map((ff) => ff.id === f.id ? { ...ff, facility: { ...ff.facility, capacity: e.target.value === "" ? "" : Number(e.target.value) } } : ff) }))} placeholder="Công suất" />
                            <select className={selectClass} value={f.facility.productUnit} onChange={(e) => setData((prev) => ({ ...prev, facilities: prev.facilities.map((ff) => ff.id === f.id ? { ...ff, facility: { ...ff.facility, productUnit: e.target.value } } : ff) }))}>
                              <option value="tấn xi măng">tấn xi măng</option>
                              <option value="tấn clinker">tấn clinker</option>
                              <option value="tấn thép">tấn thép</option>
                              <option value="MWh">MWh</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* NHÓM 2: Hạn ngạch & phát thải (per cơ sở) */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Hạn ngạch theo giai đoạn</p>
                    <div className="space-y-2">
                      {activeFacility.allowance.periods.map((p) => (
                        <div key={p.id} className="grid grid-cols-2 gap-2 rounded-lg border p-2 md:grid-cols-3">
                          <input className={inputClass} value={p.period} onChange={(e) => updatePeriod(p.id, { period: e.target.value })} placeholder="Giai đoạn (VD: 2025)" />
                          <input type="number" className={inputClass} value={p.allocatedTco2e} onChange={(e) => updatePeriod(p.id, { allocatedTco2e: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="Hạn ngạch (tCO₂e)" />
                          <Button size="sm" variant="ghost" onClick={() => removePeriod(p.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                        </div>
                      ))}
                    </div>
                    <Button size="sm" variant="outline" className="mt-2" onClick={addPeriod}><Plus className="mr-1 h-3.5 w-3.5" /> Thêm giai đoạn</Button>
                    <div className="mt-2 grid gap-4 md:grid-cols-3">
                      <div>
                        <label className={labelClass}>Hạn nộp trả *</label>
                        <input type="date" className={inputClass} value={activeFacility.allowance.surrenderDeadline} onChange={(e) => updateFacility("allowance", { ...activeFacility.allowance, surrenderDeadline: e.target.value })} />
                      </div>
                      <div>
                        <label className={labelClass}>Đã vay kỳ sau (%)</label>
                        <input type="number" min={0} max={15} className={inputClass} value={activeFacility.allowance.borrowedPct} onChange={(e) => updateFacility("allowance", { ...activeFacility.allowance, borrowedPct: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="Max 15%" />
                      </div>
                      <div>
                        <label className={labelClass}>Số dư hiện tại (tCO₂e)</label>
                        <input type="number" className={inputClass} value={activeFacility.allowance.balance} onChange={(e) => updateFacility("allowance", { ...activeFacility.allowance, balance: e.target.value === "" ? "" : Number(e.target.value) })} />
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Phát thải & sản lượng</p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>Phát thải thực tế lũy kế (tCO₂e)</label>
                        <input type="number" className={inputClass} value={activeFacility.emissions.emissionsTco2e} onChange={(e) => updateFacility("emissions", { ...activeFacility.emissions, emissionsTco2e: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="Từ báo cáo kiểm kê KNK — để trống để auto-calc" />
                      </div>
                      <div>
                        <label className={labelClass}>Sản lượng kế hoạch còn lại *</label>
                        <input type="number" className={inputClass} value={activeFacility.emissions.productionPlanned} onChange={(e) => updateFacility("emissions", { ...activeFacility.emissions, productionPlanned: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 800.000" />
                      </div>
                      <div>
                        <label className={labelClass}>Hệ số phát thải/đơn vị sản phẩm *</label>
                        <input type="number" step="0.0001" className={inputClass} value={activeFacility.emissions.productionFactor} onChange={(e) => updateFacility("emissions", { ...activeFacility.emissions, productionFactor: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 0.65 tCO₂e/tấn" />
                      </div>
                      <div>
                        <label className={labelClass}>Phạm vi phát thải</label>
                        <select className={selectClass} value={activeFacility.emissions.scope} onChange={(e) => updateFacility("emissions", { ...activeFacility.emissions, scope: e.target.value as EmissionScope })}>
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
                    {activeFacility.activityData.length === 0 ? (
                      <p className="mt-2 rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">Chưa có dữ liệu. Upload Excel hoặc thêm dòng thủ công.</p>
                    ) : (
                      <div className="mt-2 space-y-2">
                        {activeFacility.activityData.map((row) => (
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
                            <Button size="sm" variant="ghost" onClick={() => removeArr("activityData", row.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
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
                    {activeFacility.credits.length === 0 ? (
                      <p className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">Chưa có tín chỉ.</p>
                    ) : (
                      <div className="space-y-2">
                        {activeFacility.credits.map((row) => (
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
                            <Button size="sm" variant="ghost" onClick={() => removeArr("credits", row.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* NHÓM 3: Phương án tối ưu (per cơ sở) */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Danh sách phương án đầu tư công nghệ</p>
                      <Button size="sm" variant="outline" onClick={addProject}><Plus className="mr-1 h-3.5 w-3.5" /> Thêm phương án</Button>
                    </div>
                    {activeFacility.greenProjects.length === 0 ? (
                      <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">Chưa có phương án. Thêm ≥1 để optimize.</p>
                    ) : (
                      <div className="space-y-3">
                        {activeFacility.greenProjects.map((row) => (
                          <div key={row.id} className="space-y-2 rounded-lg border p-3">
                            <div className="flex items-center gap-2">
                              <input className={inputClass} value={row.projectName} onChange={(e) => updateProject(row.id, { projectName: e.target.value })} placeholder="Tên phương án (VD: Hệ thống thu hồi nhiệt thải WHR)" />
                              <Button size="sm" variant="ghost" onClick={() => removeArr("greenProjects", row.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
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
                        <input type="number" min={0} max={100} className={inputClass} value={activeFacility.fuelSwitch.altFuelPct} onChange={(e) => updateFacility("fuelSwitch", { ...activeFacility.fuelSwitch, altFuelPct: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 40 (%)" />
                      </div>
                      <div>
                        <label className={labelClass}>Chi phí chuyển đổi (VND)</label>
                        <input type="number" className={inputClass} value={activeFacility.fuelSwitch.altFuelCost} onChange={(e) => updateFacility("fuelSwitch", { ...activeFacility.fuelSwitch, altFuelCost: e.target.value === "" ? "" : Number(e.target.value) })} />
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Thị trường & ngân sách</p>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <label className={labelClass}>Giá carbon — thấp (VND/tCO₂e)</label>
                        <input type="number" className={inputClass} value={activeFacility.market.priceLow} onChange={(e) => updateFacility("market", { ...activeFacility.market, priceLow: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 150000" />
                      </div>
                      <div>
                        <label className={labelClass}>Giá carbon — cơ sở (VND/tCO₂e) *</label>
                        <input type="number" className={inputClass} value={activeFacility.market.priceBase} onChange={(e) => updateFacility("market", { ...activeFacility.market, priceBase: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 250000" />
                      </div>
                      <div>
                        <label className={labelClass}>Giá carbon — cao (VND/tCO₂e)</label>
                        <input type="number" className={inputClass} value={activeFacility.market.priceHigh} onChange={(e) => updateFacility("market", { ...activeFacility.market, priceHigh: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 500000" />
                      </div>
                      <div>
                        <label className={labelClass}>Phí giao dịch (%)</label>
                        <input type="number" className={inputClass} value={activeFacility.market.feeRate} onChange={(e) => updateFacility("market", { ...activeFacility.market, feeRate: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 2" />
                      </div>
                      <div>
                        <label className={labelClass}>Ngân sách tuân thủ tối đa (VND) *</label>
                        <input type="number" className={inputClass} value={activeFacility.market.budget} onChange={(e) => updateFacility("market", { ...activeFacility.market, budget: e.target.value === "" ? "" : Number(e.target.value) })} placeholder="VD: 80000000000" />
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
                        <select className={selectClass} value={activeFacility.actualDecision.chosen} onChange={(e) => updateFacility("actualDecision", { ...activeFacility.actualDecision, chosen: e.target.value as DecisionChoice | "" })}>
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
                        <input className={inputClass} value={activeFacility.actualDecision.note} onChange={(e) => updateFacility("actualDecision", { ...activeFacility.actualDecision, note: e.target.value })} placeholder="VD: Chọn WHR + mua 80k tín chỉ" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* NHÓM 4: ESG (company-level) */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm">
                    <strong>Optional — company-level:</strong> Hồ sơ ESG & cam kết Net Zero — phục vụ Green Finance Profile. Nhập 1 lần cho toàn doanh nghiệp.
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="h-4 w-4" checked={data.esg.hasEsgReport} onChange={(e) => setEsg("hasEsgReport", e.target.checked)} /> Có báo cáo ESG?
                    </label>
                    <div>
                      <label className={labelClass}>ESG Score (/100)</label>
                      <input type="number" min={0} max={100} className={inputClass} value={data.esg.esgScore} onChange={(e) => setEsg("esgScore", e.target.value === "" ? "" : Number(e.target.value))} placeholder="VD: 85" />
                    </div>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="h-4 w-4" checked={data.esg.netZeroCommitment} onChange={(e) => setEsg("netZeroCommitment", e.target.checked)} /> Cam kết Net Zero?
                    </label>
                    <div className="md:col-span-2">
                      <label className={labelClass}>Lộ trình Net Zero (mốc trung gian)</label>
                      <textarea className={inputClass + " h-20 py-2"} value={data.esg.netZeroRoadmap} onChange={(e) => setEsg("netZeroRoadmap", e.target.value)} placeholder="VD: 2026 giảm 5%, 2030 giảm 15%, 2050 Net Zero" />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Compliance Gap live preview (from group 2) */}
          {step >= 1 && gap.total.gap !== null && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm">
              <div className="flex items-center gap-2 font-medium text-primary">
                <CheckCircle2 className="h-4 w-4" /> Auto-calc Compliance Gap — Tổng ({data.facilities.length} cơ sở)
              </div>
              <div className="mt-1.5 grid grid-cols-3 gap-2 text-xs">
                <div>Phát thải: <strong>{gap.total.forecastEmissions?.toLocaleString("en-US")} tCO₂e</strong></div>
                <div>Hạn ngạch: <strong>{gap.total.totalAllowance?.toLocaleString("en-US")} tCO₂e</strong></div>
                <div>Gap: <strong className={gap.total.gap < 0 ? "text-destructive" : "text-primary"}>{gap.total.gap.toLocaleString("en-US")} tCO₂e</strong> {gap.total.gap < 0 ? "(thiếu)" : "(dư)"}</div>
              </div>
              {data.facilities.length > 1 && (
                <div className="mt-2 space-y-1 border-t pt-2">
                  {gap.perFacility.map((f) => (
                    <div key={f.facilityId} className="flex justify-between text-xs text-muted-foreground">
                      <span>{f.facilityName}</span>
                      <span>{f.gap !== null ? `${f.gap.toLocaleString("en-US")} tCO₂e ${f.gap < 0 ? "thiếu" : "dư"}` : "—"}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Validation warning */}
          {!isStepValid(step) && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" /> Còn trường required chưa điền {(step === 1 || step === 2) && "cho cơ sở đang chọn"}.
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
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Số cơ sở</span>
                <span className="font-semibold">{data.facilities.length}</span>
              </div>
              {gap.total.gap !== null ? (
                <div className="rounded-lg border p-3">
                  <div className="text-xs text-muted-foreground">Compliance Gap tổng (auto-calc)</div>
                  <div className="mt-1 text-lg font-bold text-destructive">{gap.total.gap.toLocaleString("en-US")} tCO₂e {gap.total.gap < 0 ? "thiếu" : "dư"}</div>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-3 text-xs text-muted-foreground">
                  Chưa đủ dữ liệu để tính Compliance Gap. Bổ sung Nhóm 2 (hạn ngạch + sản lượng + hệ số) cho các cơ sở.
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
