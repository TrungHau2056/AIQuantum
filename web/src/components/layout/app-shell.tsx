"use client";

import { type ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { RoleSwitcher } from "./role-switcher";
import { Leaf } from "lucide-react";

const roleNav: Record<string, { href: string; label: string; icon: typeof Leaf }[]> = {
  enterprise: [
    { href: "/enterprise", label: "Tổng quan", icon: Leaf },
  ],
  investor: [
    { href: "/investor", label: "Đánh giá đầu tư xanh", icon: Leaf },
  ],
  bank: [
    { href: "/bank", label: "Thẩm định tín dụng xanh", icon: Leaf },
  ],
  regulator: [
    { href: "/regulator", label: "Tổng quan thị trường", icon: Leaf },
  ],
};

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar navItems={[]} />
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-6 backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">CarbonPilot</span>
          </div>
          <div className="ml-auto">
            <RoleSwitcher />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

export { roleNav };
