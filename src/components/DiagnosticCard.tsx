import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

interface DiagnosticCardProps {
  id: string;
  title: string;
  priority: "alta" | "média" | "baixa";
  impact: string;
  solution: string;
  onAction: () => void;
}

export function DiagnosticCard({
  title,
  priority,
  impact,
  solution,
  onAction,
}: DiagnosticCardProps) {
  const priorityColors = {
    alta: "bg-red-100 text-red-700 border-red-200",
    média: "bg-yellow-100 text-yellow-700 border-yellow-200",
    baixa: "bg-blue-100 text-blue-700 border-blue-200",
  };

  return (
    <Card className="p-6 bg-white hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="flex-1 space-y-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-brand-red mt-1 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="text-neutral-900">{title}</h3>
                <Badge
                  variant="outline"
                  className={`${priorityColors[priority]} border`}
                >
                  Prioridade {priority}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="bg-brand-rose-bg p-3 rounded-lg">
                  <p className="text-sm text-neutral-800">
                    <strong>Impacto:</strong> {impact}
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-sm text-neutral-700">
                    <strong>Solução recomendada:</strong> {solution}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={onAction}
          className="bg-brand-red hover:bg-brand-red-hover gap-2 whitespace-nowrap"
        >
          Ver detalhes
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
