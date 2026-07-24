"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRole } from "@/lib/role-context";
import { roleLabels } from "@/lib/mock-data";
import { LayoutDashboard, Factory, TrendingUp, Landmark, Building2 } from "lucide-react";
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
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <span className="text-sm font-medium text-muted-foreground">Vai trò hiện tại</span>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname === "/" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground hover:bg-sidebar-accent/50"
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
          Trang chủ
        </Link>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname.startsWith(item.href) ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-3">
        <div className="space-y-1">
          {allRoles.map((r) => {
            const Icon = roleIcon[r];
            return (
              <Link
                key={r}
                href={roleHome[r]}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-1.5 text-xs transition-colors",
                  role === r ? "text-foreground font-medium" : "text-muted-foreground/70 hover:text-muted-foreground"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {roleLabels[r].label}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
