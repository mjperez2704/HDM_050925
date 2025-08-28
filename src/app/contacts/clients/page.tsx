
"use client";

import { useState } from 'react';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { AddClientForm } from '@/components/contacts/add-client-form';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { EditClientForm } from '@/components/contacts/edit-client-form';

const clientsData = [
    {
        razonSocial: 'Carlos Sánchez López',
        email: 'carlos.sanchez@email.com',
        telefono: '5587654321',
        rfc: 'SALC850315H00',
        fechaRegistro: '27/8/2025',
    },
    {
        razonSocial: 'Oficina Creativa SA de CV',
        email: 'contacto@oficinacreativa.com',
        telefono: '5512345678',
        rfc: 'OCR120520XYZ',
        fechaRegistro: '27/8/2025',
    },
];

type Client = typeof clientsData[0];

export default function ClientsPage() {
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
    const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    const handleOpenEditModal = (client: Client) => {
        setSelectedClient(client);
        setIsEditClientModalOpen(true);
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
                                            <TableRow key={client.email}>
                                                <TableCell className="font-medium">{client.razonSocial}</TableCell>
                                                <TableCell>{client.email}</TableCell>
                                                <TableCell>{client.telefono}</TableCell>
                                                <TableCell>{client.rfc}</TableCell>
                                                <TableCell>{client.fechaRegistro}</TableCell>
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
                                                            <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
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
