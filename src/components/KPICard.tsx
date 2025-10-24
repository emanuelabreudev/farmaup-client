import { Card } from "./ui/card";
import type { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  trend: "up" | "down";
}

export function KPICard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  trend,
}: KPICardProps) {
  const isPositive = trend === "up";

  return (
    <Card className="p-6 bg-white hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-brand-rose-bg flex items-center justify-center">
          <Icon className="w-6 h-6 text-brand-red" />
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-neutral-700 uppercase tracking-wide">
          {title}
        </p>
        <p className="text-3xl text-neutral-900">{value}</p>
        <div className="flex items-center gap-2">
          <span className={`${isPositive ? "text-green-600" : "text-red-600"}`}>
            {isPositive ? "↑" : "↓"} {Math.abs(change)}%
          </span>
          <span className="text-sm text-neutral-700">{changeLabel}</span>
        </div>
      </div>
    </Card>
  );
}
