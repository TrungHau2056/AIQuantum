"use client";

import { type ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { RoleSwitcher } from "./role-switcher";

const roleNav: Record<string, { href: string; label: string; icon: typeof RoleSwitcher }[]> = {
  enterprise: [
    { href: "/enterprise", label: "Tổng quan", icon: RoleSwitcher },
  ],
  investor: [
    { href: "/investor", label: "Đánh giá đầu tư xanh", icon: RoleSwitcher },
  ],
  bank: [
    { href: "/bank", label: "Thẩm định tín dụng xanh", icon: RoleSwitcher },
  ],
  regulator: [
    { href: "/regulator", label: "Tổng quan thị trường", icon: RoleSwitcher },
  ],
};

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-muted/20">
      <Sidebar navItems={[]} />
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-6 backdrop-blur-xl">
          <div className="ml-auto">
            <RoleSwitcher />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6 md:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

export { roleNav };
