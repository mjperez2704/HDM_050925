
"use client";

import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Header } from '@/components/dashboard/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle, Filter } from 'lucide-react';
import { AddTicketForm } from '@/components/crm/add-ticket-form';

const ticketsData = [
  {
    id: 'TKT-001',
    client: 'Carlos Sánchez López',
    subject: 'Garantía de reparación - Pantalla parpadea',
    status: 'Abierto',
    priority: 'Alta',
    assignedTo: 'Soporte Técnico',
    lastUpdate: '2024-07-28 10:00 AM',
  },
  {
    id: 'TKT-002',
    client: 'Oficina Creativa SA de CV',
    subject: 'Consulta sobre facturación',
    status: 'En Progreso',
    priority: 'Media',
    assignedTo: 'Administración',
    lastUpdate: '2024-07-28 09:30 AM',
  },
  {
    id: 'TKT-003',
    client: 'Ana García',
    subject: 'Problema con accesorio comprado',
    status: 'Cerrado',
    priority: 'Baja',
    assignedTo: 'Ventas',
    lastUpdate: '2024-07-27 05:00 PM',
  }
];

export default function SupportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'Alta': return 'destructive';
      case 'Media': return 'secondary';
      case 'Baja': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <CustomSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tickets de Soporte y Quejas</CardTitle>
                    <CardDescription>Administra las solicitudes y quejas de tus clientes.</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtrar
                    </Button>
                    <Button 
                      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Crear Ticket
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Asunto</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Prioridad</TableHead>
                      <TableHead>Asignado a</TableHead>
                      <TableHead>Última Actualización</TableHead>
                      <TableHead><span className="sr-only">Acciones</span></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ticketsData.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium text-destructive underline">{ticket.id}</TableCell>
                        <TableCell>{ticket.client}</TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>
                          <Badge variant={ticket.status === 'Cerrado' ? 'default' : 'secondary'}>{ticket.status}</Badge>
                        </TableCell>
                        <TableCell>
                           <Badge variant={getPriorityVariant(ticket.priority) as any}>{ticket.priority}</Badge>
                        </TableCell>
                        <TableCell>{ticket.assignedTo}</TableCell>
                        <TableCell>{ticket.lastUpdate}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                              <DropdownMenuItem>Ver Detalle</DropdownMenuItem>
                              <DropdownMenuItem>Asignar Agente</DropdownMenuItem>
                              <DropdownMenuItem>Cerrar Ticket</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
      <AddTicketForm isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </SidebarProvider>
  );
}
