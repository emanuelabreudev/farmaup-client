import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import type { Client } from "./ClientList";

interface DeleteClientDialogProps {
  client?: Client;
  onNavigate?: (page: string) => void;
  onConfirm?: (clientId: string) => void;
}

export function DeleteClientDialog({
  client,
  onNavigate,
  onConfirm,
}: DeleteClientDialogProps) {
  const handleConfirm = () => {
    if (client?.id) {
      onConfirm?.(client.id);
    }
    onNavigate?.("clients");
  };

  const handleCancel = () => {
    onNavigate?.("clients");
  };

  return (
    <div className="min-h-screen bg-brand-rose-bg flex items-center justify-center p-4">
      <Card className="bg-white p-8 max-w-md w-full shadow-2xl">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl mb-3">Confirmar Exclusão</h2>
          <p className="text-neutral-700 mb-4">
            Tem certeza que deseja excluir o cliente{" "}
            <span className="text-neutral-900">
              {client?.name || "este cliente"}
            </span>
            ?
          </p>
          <p className="text-sm text-neutral-700">
            Esta ação não pode ser desfeita. Todos os dados do cliente serão
            permanentemente removidos do sistema.
          </p>
        </div>

        {/* Client Info */}
        {client && (
          <div className="bg-brand-rose-bg rounded-lg p-4 mb-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-700">Nome:</span>
              <span className="text-neutral-900">{client.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-700">Email:</span>
              <span className="text-neutral-900">{client.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-700">Cidade:</span>
              <span className="text-neutral-900">{client.city}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1 border-neutral-300"
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            Sim, Excluir Cliente
          </Button>
        </div>

        {/* Additional info */}
        <p className="text-xs text-center text-neutral-700 mt-6">
          Pressione ESC ou clique em Cancelar para voltar sem excluir
        </p>
      </Card>
    </div>
  );
}
