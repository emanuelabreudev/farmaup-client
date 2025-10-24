import { Card } from "./ui/card";
import type { LucideIcon } from "lucide-react";

interface MethodStepCardProps {
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export function MethodStepCard({
  step,
  icon: Icon,
  title,
  description,
}: MethodStepCardProps) {
  return (
    <Card className="p-6 bg-white hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
      {/* Step Number Badge */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-rose-bg rounded-full flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
        <span className="text-6xl text-brand-red">{step}</span>
      </div>

      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-brand-red flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm px-3 py-1 bg-brand-red-light text-brand-red rounded-full">
              Passo {step}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-neutral-900">{title}</h3>
          <p className="text-neutral-700">{description}</p>
        </div>
      </div>
    </Card>
  );
}
