import { useState } from "react";
import { KPICard } from "./KPICard";
import { DiagnosticCard } from "./DiagnosticCard";
import { ActionPlanCard } from "./ActionPlanCard";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import {
  TrendingUp,
  DollarSign,
  Users,
  Package,
  Download,
  RefreshCw,
  Calendar,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Dashboard({ onNavigate }: DashboardProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<string | null>(
    null
  );

  const [actionPlans, setActionPlans] = useState([
    {
      id: "1",
      title: "Revisar mix de produtos com baixo giro",
      description:
        "Analisar produtos com giro < 2x/mês e definir ações de liquidação",
      status: "concluída" as const,
      deadline: "15/10/2025",
      responsible: "João Silva",
    },
    {
      id: "2",
      title: "Configurar alertas de ruptura no sistema",
      description:
        "Implementar notificações automáticas quando estoque atingir ponto de pedido",
      status: "em-andamento" as const,
      deadline: "25/10/2025",
      responsible: "Maria Santos",
    },
    {
      id: "3",
      title: "Criar campanha Instagram Stories",
      description:
        "Desenvolver 10 stories sobre produtos em destaque com ofertas exclusivas",
      status: "pendente" as const,
      deadline: "30/10/2025",
      responsible: "Pedro Costa",
    },
    {
      id: "4",
      title: "Treinar equipe em atendimento ágil",
      description:
        "Workshop de 4h sobre técnicas de atendimento eficiente e uso do sistema",
      status: "pendente" as const,
      deadline: "05/11/2025",
      responsible: "Ana Lima",
    },
  ]);

  const kpiData = [
    {
      title: "Faturamento Mensal",
      value: "R$ 285.4K",
      change: 12.5,
      changeLabel: "vs mês anterior",
      icon: DollarSign,
      trend: "up" as const,
    },
    {
      title: "Taxa de Conversão",
      value: "68.3%",
      change: 5.2,
      changeLabel: "vs mês anterior",
      icon: TrendingUp,
      trend: "up" as const,
    },
    {
      title: "Clientes Ativos",
      value: "1,247",
      change: -2.1,
      changeLabel: "vs mês anterior",
      icon: Users,
      trend: "down" as const,
    },
    {
      title: "Ticket Médio",
      value: "R$ 89.50",
      change: 8.3,
      changeLabel: "vs mês anterior",
      icon: Package,
      trend: "up" as const,
    },
  ];

  const diagnostics = [
    {
      id: "estoque",
      title: "Gestão de Estoque Ineficiente",
      priority: "alta" as const,
      impact:
        "Perda estimada de R$ 15.2K/mês em produtos vencidos e ruptura de estoque",
      solution:
        "Implementar sistema de reposição automática baseado em IA e análise de giro",
    },
    {
      id: "marketing",
      title: "Oportunidade de Marketing Digital",
      priority: "alta" as const,
      impact:
        "Potencial de aumentar base de clientes em 25% com estratégias digitais",
      solution:
        "Campanha segmentada no Instagram e WhatsApp Business com ofertas personalizadas",
    },
    {
      id: "atendimento",
      title: "Tempo de Atendimento Elevado",
      priority: "média" as const,
      impact:
        "Clientes aguardam 8min em média, resultando em 15% de desistências",
      solution: "Reorganizar fluxo de atendimento e implementar fila digital",
    },
  ];

  const salesChartData = [
    { name: "Jan", valor: 185 },
    { name: "Fev", valor: 198 },
    { name: "Mar", valor: 215 },
    { name: "Abr", valor: 208 },
    { name: "Mai", valor: 235 },
    { name: "Jun", valor: 248 },
    { name: "Jul", valor: 265 },
    { name: "Ago", valor: 285 },
  ];

  const conversionChartData = [
    { name: "Seg", taxa: 65 },
    { name: "Ter", taxa: 68 },
    { name: "Qua", taxa: 72 },
    { name: "Qui", taxa: 70 },
    { name: "Sex", taxa: 75 },
    { name: "Sab", taxa: 78 },
    { name: "Dom", taxa: 62 },
  ];

  const handleToggleAction = (id: string) => {
    setActionPlans((prev) =>
      prev.map((action) => {
        if (action.id === id) {
          const newStatus =
            action.status === "concluída" ? "em-andamento" : "concluída";
          return { ...action, status: newStatus };
        }
        return action;
      })
    );
  };

  return (
    <div className="min-h-screen bg-brand-rose-bg">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">
              Dashboard
            </h1>
            <p className="text-neutral-700">
              Visão geral da sua farmácia com insights acionáveis
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Últimos 30 dias
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button className="gap-2 bg-brand-red hover:bg-brand-red-hover">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-white">
            <h3 className="text-xl font-semibold text-neutral-900 mb-6">
              Evolução de Faturamento (R$ mil)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="valor" fill="#EF4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-white">
            <h3 className="text-xl font-semibold text-neutral-900 mb-6">
              Taxa de Conversão Semanal (%)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversionChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="taxa"
                  stroke="#EF4444"
                  strokeWidth={3}
                  dot={{ fill: "#EF4444", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="diagnostico" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="diagnostico">Diagnóstico IA</TabsTrigger>
            <TabsTrigger value="plano">Plano de Ação</TabsTrigger>
          </TabsList>

          <TabsContent value="diagnostico" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-2">
                  Diagnóstico Priorizado
                </h2>
                <p className="text-neutral-700">
                  IA identificou {diagnostics.length} oportunidades de melhoria
                  para sua farmácia
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {diagnostics.map((diagnostic) => (
                <DiagnosticCard
                  key={diagnostic.id}
                  {...diagnostic}
                  onAction={() => setSelectedDiagnostic(diagnostic.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="plano" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-2">
                  Plano de Ação
                </h2>
                <p className="text-neutral-700">
                  {actionPlans.filter((a) => a.status === "concluída").length}{" "}
                  de {actionPlans.length} ações concluídas
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {actionPlans.map((action) => (
                <ActionPlanCard
                  key={action.id}
                  {...action}
                  onToggle={() => handleToggleAction(action.id)}
                />
              ))}
            </div>

            <Card className="p-6 bg-white border-brand-red">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    Precisa de ajuda para executar?
                  </h3>
                  <p className="text-neutral-700">
                    Nossa equipe pode te auxiliar a implementar estas ações
                  </p>
                </div>
                <Button
                  onClick={() => alert("Funcionalidade de contato em breve!")}
                  className="bg-brand-red hover:bg-brand-red-hover whitespace-nowrap"
                >
                  Falar com Consultor
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
