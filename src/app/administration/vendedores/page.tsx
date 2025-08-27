
"use client";

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { AddVendedorForm } from '@/components/administration/add-vendedor-form';

const vendedoresData = [
    {
        name: 'Ana',
        slug: 'ana',
        email: 'ana@example.com',
        quota: '$ 0',
    },
];

export default function VendedoresPage() {
    const [isAddVendedorModalOpen, setIsAddVendedorModalOpen] = useState(false);

    return (
        <>
            <div className="flex min-h-screen w-full">
                <Sidebar />
                <div className="flex flex-1 flex-col bg-background">
                    <header className="sticky top-0 flex h-16 items-center justify-end gap-4 border-b bg-background px-4 md:px-6 z-10">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <Avatar>
                                <AvatarFallback>AD</AvatarFallback>
                                </Avatar>
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem>My Account</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>
                    <main className="flex-1 p-4 md:p-8">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Vendedores</CardTitle>
                                        <CardDescription>Administra las cuotas y el desempeño de tu equipo de ventas.</CardDescription>
                                    </div>
                                    <Button 
                                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                        onClick={() => setIsAddVendedorModalOpen(true)}
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Agregar Vendedor
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nombre</TableHead>
                                            <TableHead>Slug</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Cuota de Venta (Mensual)</TableHead>
                                            <TableHead><span className="sr-only">Actions</span></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {vendedoresData.map((vendedor) => (
                                            <TableRow key={vendedor.email}>
                                                <TableCell className="font-medium">{vendedor.name}</TableCell>
                                                <TableCell>{vendedor.slug}</TableCell>
                                                <TableCell>{vendedor.email}</TableCell>
                                                <TableCell>{vendedor.quota}</TableCell>
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
            <AddVendedorForm isOpen={isAddVendedorModalOpen} onOpenChange={setIsAddVendedorModalOpen} />
        </>
    );
}
