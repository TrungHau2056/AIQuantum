"use client";

import { useRouter } from "next/navigation";
import { useRole } from "@/lib/role-context";
import { roleLabels } from "@/lib/mock-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Factory, TrendingUp, Landmark, Building2 } from "lucide-react";

const roleHome: Record<string, string> = {
  enterprise: "/enterprise",
  investor: "/investor",
  bank: "/bank",
  regulator: "/regulator",
};

const roleIcon = {
  enterprise: Factory,
  investor: TrendingUp,
  bank: Landmark,
  regulator: Building2,
};

export function RoleSwitcher() {
  const { role, setRole } = useRole();
  const router = useRouter();

  const handleChange = (value: string | null) => {
    if (!value) return;
    setRole(value as typeof role);
    router.push(roleHome[value]);
  };

  const Icon = roleIcon[role];

  return (
    <Select value={role} onValueChange={handleChange}>
      <SelectTrigger className="w-50">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="enterprise">
          <div className="flex items-center gap-2">
            <Factory className="h-4 w-4" />
            {roleLabels.enterprise.label}
          </div>
        </SelectItem>
        <SelectItem value="investor">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            {roleLabels.investor.label}
          </div>
        </SelectItem>
        <SelectItem value="bank">
          <div className="flex items-center gap-2">
            <Landmark className="h-4 w-4" />
            {roleLabels.bank.label}
          </div>
        </SelectItem>
        <SelectItem value="regulator">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            {roleLabels.regulator.label}
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
