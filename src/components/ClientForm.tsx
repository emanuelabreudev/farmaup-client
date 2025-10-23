import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { ArrowLeft, Save, X } from "lucide-react";
import type { Client } from "./ClientList";

interface ClientFormProps {
  client?: Client;
  mode: "new" | "edit" | "view";
  onNavigate?: (page: string, clientId?: string) => void;
  onSave?: (client: Partial<Client>) => void;
}

export function ClientForm({
  client,
  mode,
  onNavigate,
  onSave,
}: ClientFormProps) {
  const [formData, setFormData] = useState({
    name: client?.name || "",
    email: client?.email || "",
    phone: client?.phone || "",
    city: client?.city || "",
    status: client?.status === "ativo" || mode === "new",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";
  const isNewMode = mode === "new";

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Cidade é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const clientData = {
      ...formData,
      status: formData.status ? ("ativo" as const) : ("inativo" as const),
      id: client?.id || Date.now().toString(),
      createdAt: client?.createdAt || new Date().toISOString().split("T")[0],
    };

    onSave?.(clientData);
    onNavigate?.("clients");
  };

  const title = isNewMode
    ? "Novo Cliente"
    : isEditMode
    ? "Editar Cliente"
    : "Detalhes do Cliente";
  const subtitle = isNewMode
    ? "Preencha as informações para cadastrar um novo cliente"
    : isEditMode
    ? "Atualize as informações do cliente"
    : "Visualize as informações do cliente";

  return (
    <div className="min-h-screen bg-brand-rose-bg">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate?.("clients")}
            className="mb-4 -ml-3 hover:bg-brand-red-light hover:text-brand-red"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Clientes
          </Button>
          <h1 className="text-3xl lg:text-4xl mb-2">{title}</h1>
          <p className="text-neutral-700">{subtitle}</p>
        </div>

        {/* Form */}
        <Card className="bg-white p-6 lg:p-8 max-w-3xl">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  disabled={isViewMode}
                  placeholder="Digite o nome completo"
                  className={`bg-input-background border-neutral-300 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled={isViewMode}
                  placeholder="exemplo@email.com"
                  className={`bg-input-background border-neutral-300 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  disabled={isViewMode}
                  placeholder="(00) 00000-0000"
                  className={`bg-input-background border-neutral-300 ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* City */}
              <div className="space-y-2">
                <Label htmlFor="city">Cidade *</Label>
                <Input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  disabled={isViewMode}
                  placeholder="Cidade - UF"
                  className={`bg-input-background border-neutral-300 ${
                    errors.city ? "border-red-500" : ""
                  }`}
                />
                {errors.city && (
                  <p className="text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              {/* Status */}
              {!isNewMode && (
                <div className="flex items-center justify-between p-4 bg-brand-rose-bg rounded-lg">
                  <div className="space-y-0.5">
                    <Label htmlFor="status">Status do Cliente</Label>
                    <p className="text-sm text-neutral-700">
                      Cliente {formData.status ? "ativo" : "inativo"} no sistema
                    </p>
                  </div>
                  <Switch
                    id="status"
                    checked={formData.status}
                    onCheckedChange={(checked) =>
                      handleChange("status", checked)
                    }
                    disabled={isViewMode}
                  />
                </div>
              )}

              {/* Created Date (View mode only) */}
              {isViewMode && client?.createdAt && (
                <div className="p-4 bg-brand-rose-bg rounded-lg">
                  <p className="text-sm text-neutral-700 mb-1">
                    Data de Cadastro
                  </p>
                  <p className="text-neutral-900">
                    {new Date(client.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8 pt-6 border-t border-neutral-300">
              <Button
                type="button"
                variant="outline"
                onClick={() => onNavigate?.("clients")}
                className="flex-1 sm:flex-initial border-neutral-300 gap-2"
              >
                <X className="w-4 h-4" />
                Cancelar
              </Button>

              {!isViewMode && (
                <Button
                  type="submit"
                  className="flex-1 sm:flex-initial bg-brand-red hover:bg-brand-red-hover gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isNewMode ? "Cadastrar Cliente" : "Salvar Alterações"}
                </Button>
              )}

              {isViewMode && (
                <Button
                  type="button"
                  onClick={() => onNavigate?.("edit-client", client?.id)}
                  className="flex-1 sm:flex-initial bg-brand-red hover:bg-brand-red-hover"
                >
                  Editar Cliente
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Delete Section (Edit/View mode only) */}
        {!isNewMode && (
          <Card className="bg-white p-6 lg:p-8 max-w-3xl mt-6 border-red-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-red-600 mb-1">Zona de Perigo</h3>
                <p className="text-sm text-neutral-700">
                  Esta ação não pode ser desfeita. O cliente será
                  permanentemente excluído.
                </p>
              </div>
              <Button
                type="button"
                variant="destructive"
                onClick={() => onNavigate?.("delete-client", client?.id)}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
              >
                Excluir Cliente
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
