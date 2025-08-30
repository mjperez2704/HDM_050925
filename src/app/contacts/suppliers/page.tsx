
"use client";

import { useState, useEffect } from 'react';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { AddSupplierForm } from '@/components/contacts/add-supplier-form';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { EditSupplierForm } from '@/components/contacts/edit-supplier-form';
import { getSuppliers, deleteSupplier } from '@/actions/suppliers-actions';
import type { Supplier } from '@/lib/types/supplier';
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function SuppliersPage() {
    const [suppliersData, setSuppliersData] = useState<Supplier[]>([]);
    const [isAddSupplierModalOpen, setIsAddSupplierModalOpen] = useState(false);
    const [isEditSupplierModalOpen, setIsEditSupplierModalOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
    const { toast } = useToast();

    const fetchSuppliers = async () => {
        const suppliers = await getSuppliers();
        setSuppliersData(suppliers);
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const handleOpenEditModal = (supplier: Supplier) => {
        setSelectedSupplier(supplier);
        setIsEditSupplierModalOpen(true);
    };

    const handleDeleteSupplier = async (id: number) => {
        const result = await deleteSupplier(id);
        if (!result.success) {
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
            fetchSuppliers();
        }
    };
    
    const handleSupplierAdded = () => {
        fetchSuppliers();
        setIsAddSupplierModalOpen(false);
    }
    
    const handleSupplierUpdated = () => {
        fetchSuppliers();
        setIsEditSupplierModalOpen(false);
    }

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
                                            <TableRow key={supplier.id}>
                                                <TableCell className="font-medium">{supplier.razonSocial}</TableCell>
                                                <TableCell>{supplier.email}</TableCell>
                                                <TableCell>{supplier.tipo}</TableCell>
                                                <TableCell>{supplier.origen}</TableCell>
                                                <TableCell className="text-right">
                                                    <AlertDialog>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                                    <span className="sr-only">Open menu</span>
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                                <DropdownMenuItem onClick={() => handleOpenEditModal(supplier)}>Editar</DropdownMenuItem>
                                                                <AlertDialogTrigger asChild>
                                                                    <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                                                                </AlertDialogTrigger>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Esta acción no se puede deshacer. Esto eliminará permanentemente al proveedor.
                                                            </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                            <AlertDialogAction 
                                                                className="bg-destructive hover:bg-destructive/90"
                                                                onClick={() => handleDeleteSupplier(supplier.id)}
                                                            >
                                                                Eliminar
                                                            </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
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
            <AddSupplierForm isOpen={isAddSupplierModalOpen} onOpenChange={setIsAddSupplierModalOpen} onSupplierAdded={handleSupplierAdded} />
            <EditSupplierForm isOpen={isEditSupplierModalOpen} onOpenChange={setIsEditSupplierModalOpen} supplier={selectedSupplier} onSupplierUpdated={handleSupplierUpdated}/>
        </SidebarProvider>
    );
}
