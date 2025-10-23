import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { Badge } from "./ui/badge";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: "ativo" | "inativo";
  createdAt: string;
}

interface ClientListProps {
  clients?: Client[];
  onNavigate?: (page: string, clientId?: string) => void;
}

export function ClientList({ clients = [], onNavigate }: ClientListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (client: Client) => {
    onNavigate?.("delete-client", client.id);
  };

  return (
    <div className="min-h-screen bg-brand-rose-bg">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl mb-2">Gerenciar Clientes</h1>
          <p className="text-neutral-700">
            Visualize, edite e gerencie seus clientes cadastrados
          </p>
        </div>

        {/* Search and Add Section */}
        <Card className="p-6 bg-white mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-700" />
              <Input
                type="text"
                placeholder="Buscar por nome, email ou cidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input-background border-neutral-300"
              />
            </div>
            <Button
              onClick={() => onNavigate?.("new-client")}
              className="bg-brand-red hover:bg-brand-red-hover w-full md:w-auto gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar Cliente
            </Button>
          </div>
        </Card>

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-neutral-700">
            {filteredClients.length}{" "}
            {filteredClients.length === 1
              ? "cliente encontrado"
              : "clientes encontrados"}
          </p>
        </div>

        {/* Desktop Table */}
        <Card className="hidden md:block bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-brand-rose-bg">
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-neutral-700"
                  >
                    Nenhum cliente encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredClients.map((client) => (
                  <TableRow
                    key={client.id}
                    className="hover:bg-brand-rose-bg/50"
                  >
                    <TableCell>{client.name}</TableCell>
                    <TableCell className="text-neutral-700">
                      {client.email}
                    </TableCell>
                    <TableCell className="text-neutral-700">
                      {client.phone}
                    </TableCell>
                    <TableCell className="text-neutral-700">
                      {client.city}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          client.status === "ativo" ? "default" : "secondary"
                        }
                        className={
                          client.status === "ativo"
                            ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200"
                        }
                      >
                        {client.status === "ativo" ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            onNavigate?.("client-details", client.id)
                          }
                          className="hover:bg-brand-red-light hover:text-brand-red"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onNavigate?.("edit-client", client.id)}
                          className="hover:bg-brand-red-light hover:text-brand-red"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(client)}
                          className="hover:bg-red-100 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredClients.length === 0 ? (
            <Card className="p-8 bg-white text-center">
              <p className="text-neutral-700">Nenhum cliente encontrado</p>
            </Card>
          ) : (
            filteredClients.map((client) => (
              <Card
                key={client.id}
                className="p-5 bg-white hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="mb-2">{client.name}</h3>
                    <Badge
                      variant={
                        client.status === "ativo" ? "default" : "secondary"
                      }
                      className={
                        client.status === "ativo"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-gray-100 text-gray-700 border-gray-200"
                      }
                    >
                      {client.status === "ativo" ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2 mb-4 text-sm">
                  <p className="text-neutral-700">
                    <span className="text-neutral-700">Email:</span>{" "}
                    {client.email}
                  </p>
                  <p className="text-neutral-700">
                    <span className="text-neutral-700">Telefone:</span>{" "}
                    {client.phone}
                  </p>
                  <p className="text-neutral-700">
                    <span className="text-neutral-700">Cidade:</span>{" "}
                    {client.city}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate?.("client-details", client.id)}
                    className="flex-1 border-brand-red text-brand-red hover:bg-brand-red-light gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    Ver
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate?.("edit-client", client.id)}
                    className="flex-1 border-brand-red text-brand-red hover:bg-brand-red-light gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(client)}
                    className="border-red-600 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
