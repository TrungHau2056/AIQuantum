"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRole } from "@/lib/role-context";
import { roleLabels } from "@/lib/mock-data";
import { LayoutDashboard, Factory, TrendingUp, Landmark, Building2, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
}

const roleHome: Record<string, string> = {
  enterprise: "/enterprise",
  investor: "/investor",
  bank: "/bank",
  regulator: "/regulator",
};

const roleIcon: Record<string, typeof LayoutDashboard> = {
  enterprise: Factory,
  investor: TrendingUp,
  bank: Landmark,
  regulator: Building2,
};

const allRoles = ["enterprise", "investor", "bank", "regulator"] as const;

export function Sidebar({ navItems }: { navItems: NavItem[] }) {
  const { role } = useRole();
  const pathname = usePathname();
  const items = navItems.length > 0 ? navItems : [{ href: roleHome[role], label: roleLabels[role].label, icon: roleIcon[role] }];

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-sidebar md:flex md:flex-col">
      {/* Brand */}
      <div className="flex h-16 items-center gap-2.5 border-b px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Leaf className="h-5 w-5" />
        </div>
        <span className="text-base font-bold tracking-tight">CarbonPilot</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-3">
        <p className="px-3 pb-2 pt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
          Điều hướng
        </p>
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
            pathname === "/"
              ? "bg-primary/10 text-primary ring-1 ring-primary/20"
              : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
          Trang chủ
        </Link>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Role switcher list */}
      <div className="border-t p-3">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
          Vai trò
        </p>
        <div className="space-y-0.5">
          {allRoles.map((r) => {
            const Icon = roleIcon[r];
            const isActive = role === r;
            return (
              <Link
                key={r}
                href={roleHome[r]}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-1.5 text-xs transition-all",
                  isActive
                    ? "bg-foreground/5 font-semibold text-foreground"
                    : "text-muted-foreground/60 hover:bg-sidebar-accent/40 hover:text-muted-foreground"
                )}
              >
                <Icon className={cn("h-3.5 w-3.5", isActive && "text-primary")} />
                {roleLabels[r].label}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
