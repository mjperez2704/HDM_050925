
"use client";

import { useState, useEffect } from 'react';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { AddClientForm } from '@/components/contacts/add-client-form';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { EditClientForm } from '@/components/contacts/edit-client-form';
import { getClients, deleteClient } from '@/actions/clients-actions';
import type { ClientWithId } from '@/lib/types/client';
import { useToast } from "@/hooks/use-toast";

export default function ClientsPage() {
    const [clientsData, setClientsData] = useState<ClientWithId[]>([]);
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
    const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<ClientWithId | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const fetchClients = async () => {
            const clients = await getClients();
            setClientsData(clients as ClientWithId[]);
        };
        fetchClients();
    }, []);

    const handleOpenEditModal = (client: ClientWithId) => {
        setSelectedClient(client);
        setIsEditClientModalOpen(true);
    };
    
    const handleDeleteClient = async (id: number) => {
        const result = await deleteClient(id);
        if (result.message.startsWith('Error')) {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.message,
            });
        } else {
            toast({
                title: "Éxito",
                description: result.message,
            });
            // Refrescar la lista de clientes
            const clients = await getClients();
            setClientsData(clients as ClientWithId[]);
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
                                        <CardTitle>Clientes</CardTitle>
                                        <CardDescription>Administra tu lista de clientes desde la base de datos.</CardDescription>
                                    </div>
                                    <Button 
                                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                        onClick={() => setIsAddClientModalOpen(true)}
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Agregar Cliente
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Razón Social</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Teléfono</TableHead>
                                            <TableHead>RFC</TableHead>
                                            <TableHead>Fecha de Registro</TableHead>
                                            <TableHead><span className="sr-only">Actions</span></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {clientsData.map((client) => (
                                            <TableRow key={client.id}>
                                                <TableCell className="font-medium">{client.razonSocial}</TableCell>
                                                <TableCell>{client.email}</TableCell>
                                                <TableCell>{client.telefono}</TableCell>
                                                <TableCell>{client.rfc}</TableCell>
                                                <TableCell>{new Date(client.fechaRegistro).toLocaleDateString()}</TableCell>
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
                                                            <DropdownMenuItem onClick={() => handleOpenEditModal(client)}>Editar</DropdownMenuItem>
                                                            <DropdownMenuItem 
                                                                className="text-destructive"
                                                                onClick={() => handleDeleteClient(client.id)}
                                                            >
                                                                Eliminar
                                                            </DropdownMenuItem>
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
            <AddClientForm isOpen={isAddClientModalOpen} onOpenChange={setIsAddClientModalOpen} />
            <EditClientForm isOpen={isEditClientModalOpen} onOpenChange={setIsEditClientModalOpen} client={selectedClient} />
        </SidebarProvider>
    );
}
