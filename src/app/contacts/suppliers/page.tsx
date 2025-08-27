
"use client";

import { useState } from 'react';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { AddSupplierForm } from '@/components/contacts/add-supplier-form';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';

const suppliersData = [
    {
        razonSocial: 'Refacciones Móviles del Centro S.A.',
        email: 'ventas@refaccionesdelcentro.com',
        tipo: 'Nacional',
        origen: 'México',
    },
    {
        razonSocial: 'Accesorios Tech de México',
        email: 'contacto@acctech.mx',
        tipo: 'Nacional',
        origen: 'México',
    },
];

export default function SuppliersPage() {
    const [isAddSupplierModalOpen, setIsAddSupplierModalOpen] = useState(false);

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
                                        <CardTitle>Proveedores</CardTitle>
                                        <CardDescription>Administra tu lista de proveedores desde la base de datos.</CardDescription>
                                    </div>
                                    <Button 
                                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                        onClick={() => setIsAddSupplierModalOpen(true)}
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Agregar Proveedor
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Razón Social</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Tipo</TableHead>
                                            <TableHead>Origen</TableHead>
                                            <TableHead><span className="sr-only">Actions</span></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {suppliersData.map((supplier) => (
                                            <TableRow key={supplier.email}>
                                                <TableCell className="font-medium">{supplier.razonSocial}</TableCell>
                                                <TableCell>{supplier.email}</TableCell>
                                                <TableCell>{supplier.tipo}</TableCell>
                                                <TableCell>{supplier.origen}</TableCell>
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
            <AddSupplierForm isOpen={isAddSupplierModalOpen} onOpenChange={setIsAddSupplierModalOpen} />
        </SidebarProvider>
    );
}
