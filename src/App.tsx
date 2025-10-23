import { useState } from "react";
import { Header } from "./components/Header";
import { Landing } from "./components/Landing";
import { Dashboard } from "./components/Dashboard";
import { ClientList, type Client } from "./components/ClientList";
import { ClientForm } from "./components/ClientForm";
import { DeleteClientDialog } from "./components/DeleteClientDialog";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("landing");
  const [selectedClientId, setSelectedClientId] = useState<string | undefined>(
    undefined
  );
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "Maria Silva Santos",
      email: "maria.silva@email.com",
      phone: "(11) 98765-4321",
      city: "São Paulo - SP",
      status: "ativo",
      createdAt: "2025-01-15",
    },
    {
      id: "2",
      name: "João Pedro Oliveira",
      email: "joao.pedro@email.com",
      phone: "(21) 99876-5432",
      city: "Rio de Janeiro - RJ",
      status: "ativo",
      createdAt: "2025-02-10",
    },
    {
      id: "3",
      name: "Ana Carolina Costa",
      email: "ana.costa@email.com",
      phone: "(31) 97654-3210",
      city: "Belo Horizonte - MG",
      status: "ativo",
      createdAt: "2025-03-05",
    },
    {
      id: "4",
      name: "Carlos Eduardo Mendes",
      email: "carlos.mendes@email.com",
      phone: "(41) 96543-2109",
      city: "Curitiba - PR",
      status: "inativo",
      createdAt: "2025-01-20",
    },
    {
      id: "5",
      name: "Juliana Almeida",
      email: "juliana.almeida@email.com",
      phone: "(51) 95432-1098",
      city: "Porto Alegre - RS",
      status: "ativo",
      createdAt: "2025-02-28",
    },
  ]);

  const handleNavigate = (page: string, clientId?: string) => {
    setCurrentPage(page);
    setSelectedClientId(clientId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveClient = (clientData: Partial<Client>) => {
    if (selectedClientId) {
      // Update existing client
      setClients((prev) =>
        prev.map((client) =>
          client.id === selectedClientId
            ? ({ ...client, ...clientData } as Client)
            : client
        )
      );
    } else {
      // Add new client
      setClients((prev) => [...prev, clientData as Client]);
    }
  };

  const handleDeleteClient = (clientId: string) => {
    setClients((prev) => prev.filter((client) => client.id !== clientId));
  };

  const selectedClient = clients.find((c) => c.id === selectedClientId);

  return (
    <div className="min-h-screen">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      {currentPage === "landing" && <Landing onNavigate={handleNavigate} />}
      {currentPage === "dashboard" && <Dashboard onNavigate={handleNavigate} />}
      {currentPage === "clients" && (
        <ClientList clients={clients} onNavigate={handleNavigate} />
      )}
      {currentPage === "new-client" && (
        <ClientForm
          mode="new"
          onNavigate={handleNavigate}
          onSave={handleSaveClient}
        />
      )}
      {currentPage === "edit-client" && (
        <ClientForm
          client={selectedClient}
          mode="edit"
          onNavigate={handleNavigate}
          onSave={handleSaveClient}
        />
      )}
      {currentPage === "client-details" && (
        <ClientForm
          client={selectedClient}
          mode="view"
          onNavigate={handleNavigate}
          onSave={handleSaveClient}
        />
      )}
      {currentPage === "delete-client" && (
        <DeleteClientDialog
          client={selectedClient}
          onNavigate={handleNavigate}
          onConfirm={handleDeleteClient}
        />
      )}
    </div>
  );
}
