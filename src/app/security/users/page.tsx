
"use client";

import { useState } from 'react';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { AddUserForm } from '@/components/security/add-user-form';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { PinConfirmationModal } from '@/components/security/pin-confirmation-modal';

const usersData = [
    {
        name: 'Admin Global',
        email: 'admin@taller.com',
        roles: 'Administrador',
        status: 'Activo',
    },
    {
        name: 'Juan Pérez',
        email: 'juan.perez@taller.com',
        roles: 'Técnico',
        status: 'Activo',
    },
    {
        name: 'Ana García',
        email: 'ana.garcia@taller.com',
        roles: 'Ventas',
        status: 'Activo',
    },
    {
        name: 'Luisa Hernández',
        email: 'luisa.hernandez@taller.com',
        roles: 'Gerente',
        status: 'Activo',
    },
];

export default function UsersPage() {
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);

    const handlePinConfirm = (pin: string) => {
        console.log("PIN Ingresado para cambiar PIN de usuario:", pin);
        // Aquí iría la lógica de validación y cambio de PIN
        setIsPinModalOpen(false);
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
                                        <CardTitle>Usuarios</CardTitle>
                                        <CardDescription>Administra los usuarios del sistema y sus roles.</CardDescription>
                                    </div>
                                    <Button 
                                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                        onClick={() => setIsAddUserModalOpen(true)}
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Agregar Usuario
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nombre</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Roles</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead><span className="sr-only">Actions</span></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {usersData.map((user) => (
                                            <TableRow key={user.email}>
                                                <TableCell className="font-medium">{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.roles}</TableCell>
                                                <TableCell>
                                                    <Badge variant="destructive">{user.status}</Badge>
                                                </TableCell>
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
                                                            <DropdownMenuItem>Editar</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => setIsPinModalOpen(true)}>
                                                                Cambiar PIN de Usuario
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>Desactivar</DropdownMenuItem>
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
            <AddUserForm isOpen={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen} />
            <PinConfirmationModal
                isOpen={isPinModalOpen}
                onOpenChange={setIsPinModalOpen}
                onConfirm={handlePinConfirm}
            />
        </SidebarProvider>
    );
}
