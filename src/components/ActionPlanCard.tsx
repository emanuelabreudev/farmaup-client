import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Calendar, User } from "lucide-react";

interface ActionPlanCardProps {
  id: string;
  title: string;
  description: string;
  status: "pendente" | "em-andamento" | "concluída";
  deadline: string;
  responsible: string;
  onToggle: () => void;
}

export function ActionPlanCard({
  title,
  description,
  status,
  deadline,
  responsible,
  onToggle,
}: ActionPlanCardProps) {
  const statusConfig = {
    pendente: {
      label: "Pendente",
      className: "bg-gray-100 text-gray-700 border-gray-200",
    },
    "em-andamento": {
      label: "Em andamento",
      className: "bg-blue-100 text-blue-700 border-blue-200",
    },
    concluída: {
      label: "Concluída",
      className: "bg-green-100 text-green-700 border-green-200",
    },
  };

  const config = statusConfig[status];
  const isCompleted = status === "concluída";

  return (
    <Card
      className={`p-4 bg-white hover:shadow-md transition-shadow duration-200 ${
        isCompleted ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="pt-1">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-brand-red data-[state=checked]:border-brand-red"
          />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h4
              className={`text-neutral-900 ${
                isCompleted ? "line-through" : ""
              }`}
            >
              {title}
            </h4>
            <Badge variant="outline" className={`${config.className} border`}>
              {config.label}
            </Badge>
          </div>

          <p className="text-sm text-neutral-700">{description}</p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-2 text-sm text-neutral-700">
              <Calendar className="w-4 h-4" />
              <span>{deadline}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-700">
              <User className="w-4 h-4" />
              <span>{responsible}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
