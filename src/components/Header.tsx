import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logoImg from "../assets/farmup-logo-sem-fundo.png";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "landing", label: "Início" },
    { id: "dashboard", label: "Dashboard" },
    { id: "clients", label: "Clientes" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src={logoImg} alt="Logo Pharma IA" className="h-10 w-10" />
            <span className="text-xl text-neutral-900 hidden sm:inline">
              Pharma<span className="text-brand-red">IA</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-neutral-700 hover:text-brand-red transition-colors ${
                  currentPage === item.id ? "text-brand-red" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" onClick={() => onNavigate("dashboard")}>
              Acessar plataforma
            </Button>
            <Button
              className="bg-brand-red hover:bg-brand-red-hover"
              onClick={() => alert("Funcionalidade de contato em breve!")}
            >
              Fale com a gente
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-brand-red"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2 text-neutral-700 hover:text-brand-red hover:bg-brand-rose-bg rounded-lg transition-colors ${
                    currentPage === item.id
                      ? "text-brand-red bg-brand-rose-bg"
                      : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="flex flex-col gap-2 px-4 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    onNavigate("dashboard");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Acessar plataforma
                </Button>
                <Button
                  className="bg-brand-red hover:bg-brand-red-hover w-full"
                  onClick={() => {
                    alert("Funcionalidade de contato em breve!");
                    setMobileMenuOpen(false);
                  }}
                >
                  Fale com a gente
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
