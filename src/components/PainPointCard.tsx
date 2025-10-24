import { Card } from "./ui/card";
import type { LucideIcon } from "lucide-react";

interface PainPointCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function PainPointCard({
  icon: Icon,
  title,
  description,
}: PainPointCardProps) {
  return (
    <Card className="p-6 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-brand-rose-bg flex items-center justify-center">
          <Icon className="w-8 h-8 text-brand-red" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-neutral-900">{title}</h3>
          <p className="text-neutral-700">{description}</p>
        </div>
      </div>
    </Card>
  );
}
