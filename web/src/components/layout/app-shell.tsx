"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { Leaf, FileInput, Factory, TrendingUp, Landmark, Building2 } from "lucide-react";
import { Sidebar } from "./sidebar";
import { RoleSwitcher } from "./role-switcher";
import { useRole } from "@/lib/role-context";
import { roleLabels } from "@/lib/mock-data";

const roleHome: Record<string, { href: string; icon: typeof Leaf }> = {
  enterprise: { href: "/enterprise", icon: Factory },
  investor: { href: "/investor", icon: TrendingUp },
  bank: { href: "/bank", icon: Landmark },
  regulator: { href: "/regulator", icon: Building2 },
};

export function AppShell({ children }: { children: ReactNode }) {
  const { role } = useRole();
  const home = roleHome[role] ?? roleHome.enterprise;
  const navItems = [
    { href: home.href, label: roleLabels[role].label, icon: home.icon },
    { href: "/ingest", label: "Nhập dữ liệu", icon: FileInput },
  ];

  return (
    <div className="flex min-h-screen w-full bg-muted/20">
      <Sidebar navItems={navItems} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur-xl md:px-6">
          <Link
            href="/"
            aria-label="Về trang chủ CarbonPilot"
            className="flex items-center gap-2 rounded-lg outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="hidden text-sm font-bold tracking-tight sm:inline">CarbonPilot</span>
          </Link>
          <div className="ml-auto">
            <RoleSwitcher />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
