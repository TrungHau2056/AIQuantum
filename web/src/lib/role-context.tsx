"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { Role } from "./types";

interface RoleContextValue {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [selectedRole, setSelectedRole] = useState<Role>("enterprise");
  const pathname = usePathname();
  const routeRole = pathname.split("/")[1];
  const role: Role =
    routeRole === "enterprise" ||
    routeRole === "investor" ||
    routeRole === "bank" ||
    routeRole === "regulator"
      ? routeRole
      : selectedRole;

  return (
    <RoleContext.Provider value={{ role, setRole: setSelectedRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}
