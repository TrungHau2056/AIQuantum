import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  hint?: string;
  tone?: "default" | "danger" | "success" | "warning";
}

const toneText = {
  default: "text-foreground",
  danger: "text-destructive",
  success: "text-primary",
  warning: "text-amber-600 dark:text-amber-400",
};

const toneIconBg = {
  default: "bg-muted text-muted-foreground",
  danger: "bg-destructive/10 text-destructive",
  success: "bg-primary/10 text-primary",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export function KpiCard({ title, value, icon: Icon, hint, tone = "default" }: KpiCardProps) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-3 p-5">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className={cn("text-2xl font-bold tracking-tight", toneText[tone])}>{value}</div>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", toneIconBg[tone])}>
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}

export function SectionHeader({ title, description, icon: Icon }: { title: string; description?: string; icon?: LucideIcon }) {
  return (
    <div className="flex items-start gap-3">
      {Icon && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      )}
      <div className="space-y-0.5">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}
