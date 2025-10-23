import { Button } from "./ui/button";
import { PainPointCard } from "./PainPointCard";
import { MethodStepCard } from "./MethodStepCard";
import {
  TrendingDown,
  AlertTriangle,
  Users,
  Package,
  Clock,
  Search,
  Lightbulb,
  Target,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import logoImg from "../assets/farmup-logo-sem-fundo.png";

interface LandingProps {
  onNavigate: (page: string) => void;
}

export function Landing({ onNavigate }: LandingProps) {
  const painPoints = [
    {
      icon: TrendingDown,
      title: "Perda de Receita",
      description:
        "Produtos vencidos e rupturas de estoque causam prejuízos mensais significativos",
    },
    {
      icon: AlertTriangle,
      title: "Gestão Complexa",
      description:
        "Dificuldade em priorizar ações e entender o que realmente impacta o resultado",
    },
    {
      icon: Users,
      title: "Baixa Fidelização",
      description:
        "Clientes não retornam com frequência por falta de estratégias personalizadas",
    },
    {
      icon: Package,
      title: "Estoque Desbalanceado",
      description:
        "Excesso de alguns produtos e falta de outros, prejudicando o capital de giro",
    },
    {
      icon: Clock,
      title: "Falta de Tempo",
      description:
        "Rotina operacional consome o tempo que deveria ser dedicado à estratégia",
    },
  ];

  const methodSteps = [
    {
      step: 1,
      icon: Search,
      title: "Análise Inteligente",
      description:
        "IA varre seus dados de vendas, estoque e atendimento para identificar padrões e oportunidades ocultas",
    },
    {
      step: 2,
      icon: Lightbulb,
      title: "Diagnóstico Priorizado",
      description:
        "Receba um diagnóstico claro com as principais oportunidades ranqueadas por impacto e urgência",
    },
    {
      step: 3,
      icon: Target,
      title: "Plano de Ação Customizado",
      description:
        "IA gera diagnóstico com metas específicas e passos práticos adaptados à sua realidade",
    },
    {
      step: 4,
      icon: Rocket,
      title: "Execução Assistida",
      description:
        "Acompanhe o progresso em tempo real e receba sugestões de ajustes para maximizar resultados",
    },
  ];

  const benefits = [
    "Reduza perdas com estoque em até 40%",
    "Aumente o faturamento com ações baseadas em dados",
    "Economize horas de trabalho manual toda semana",
    "Tome decisões estratégicas com confiança",
  ];

  return (
    <div className="min-h-screen bg-brand-rose-bg">
      {/* Hero Section */}
      <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center mb-6">
            <img
              src={logoImg}
              alt="Logo Pharma IA"
              className="h-20 w-20 lg:h-24 lg:w-24"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl text-neutral-900">
              Do diagnóstico à ação:{" "}
              <span className="text-brand-red">inteligência que eleva</span>,
              ações que transformam
            </h1>
            <p className="text-xl text-neutral-700 max-w-2xl mx-auto">
              Transformamos dados em metas claras, ações práticas e resultados
              reais para sua farmácia
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => onNavigate("dashboard")}
              className="bg-brand-red hover:bg-brand-red-hover gap-2 px-8 py-6 text-lg"
            >
              Conheça nosso método
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => alert("Funcionalidade de contato em breve!")}
              className="px-8 py-6 text-lg border-2"
            >
              Fale com a gente
            </Button>
          </div>

          {/* Benefits List */}
          <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-neutral-800 text-left">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-5xl text-neutral-900 mb-4">
              Desafios que toda farmácia enfrenta
            </h2>
            <p className="text-xl text-neutral-700">
              Identificamos os 5 principais obstáculos que impedem seu
              crescimento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {painPoints.map((pain, index) => (
              <PainPointCard key={index} {...pain} />
            ))}
          </div>
        </div>
      </section>

      {/* Method Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-5xl text-neutral-900 mb-4">
              Nosso método em 4 passos
            </h2>
            <p className="text-xl text-neutral-700">
              Da análise à execução, um processo simples e eficiente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {methodSteps.map((step) => (
              <MethodStepCard key={step.step} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-brand-red to-red-600 rounded-2xl p-8 lg:p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl lg:text-5xl mb-4">
              Pronto para transformar sua farmácia?
            </h2>
            <p className="text-xl mb-8 opacity-95">
              Comece agora com uma análise gratuita dos seus dados
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => onNavigate("dashboard")}
                className="bg-white text-brand-red hover:bg-gray-100 gap-2 px-8 py-6 text-lg"
              >
                Ver demonstração
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => alert("Funcionalidade de contato em breve!")}
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                Agendar consultoria
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Logo Pharma IA"
                className="h-10 w-10 brightness-0 invert"
              />
              <span className="text-xl">
                Pharma<span className="text-brand-red">IA</span>
              </span>
            </div>
            <p className="text-gray-400 text-center md:text-right">
              © 2025 FarmaUPAI. Inteligência que transforma farmácias.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
