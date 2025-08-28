
"use client";

import { useState } from 'react';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Filter, Upload, PlusCircle, MoreHorizontal } from 'lucide-react';
import { AddProductForm } from '@/components/products/add-product-form';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { EditProductForm } from '@/components/products/edit-product-form';

const productsData = [
    {
        sku: 'PAR-IP15-PAN',
        name: 'Pantalla iPhone 15',
        unit: 'PZA',
        coordinate: 'A1-001',
    },
    {
        sku: 'ACC-CAB-USBC',
        name: 'Cable USB-C 1m',
        unit: 'PZA',
        coordinate: 'LOTE-B1-001',
    },
    {
        sku: 'EQU-SAM-S24',
        name: 'Samsung Galaxy S24',
        unit: 'PZA',
        coordinate: 'C1-001',
    },
    {
        sku: 'HER-DES-01',
        name: 'Kit Desarmadores Precisión',
        unit: 'KIT',
        coordinate: 'N/A',
    },
    {
        sku: 'SRV-DIAG-01',
        name: 'Servicio de Diagnóstico',
        unit: 'SRV',
        coordinate: 'N/A',
    },
    {
        sku: 'PAR-SAM-S22-BAT',
        name: 'Batería Samsung S22',
        unit: 'PZA',
        coordinate: 'N/A',
    },
    {
        sku: 'ACC-CARG-30W',
        name: 'Cargador 30W',
        unit: 'PZA',
        coordinate: 'N/A',
    },
];

type Product = typeof productsData[0];

export default function ProductsPage() {
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleOpenEditModal = (product: Product) => {
        setSelectedProduct(product);
        setIsEditProductModalOpen(true);
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
                                        <CardTitle>Catálogo de Productos</CardTitle>
                                        <CardDescription>Administra todos los productos, servicios y artículos del sistema.</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline">
                                            <Filter className="mr-2 h-4 w-4" />
                                            Filtrar
                                        </Button>
                                        <Button variant="outline">
                                            <Upload className="mr-2 h-4 w-4" />
                                            Exportar
                                        </Button>
                                        <Button 
                                            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                            onClick={() => setIsAddProductModalOpen(true)}
                                        >
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Agregar Producto
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>SKU</TableHead>
                                            <TableHead>Nombre</TableHead>
                                            <TableHead>Unidad</TableHead>
                                            <TableHead>Coordenada</TableHead>
                                            <TableHead><span className="sr-only">Actions</span></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {productsData.map((product) => (
                                            <TableRow key={product.sku}>
                                                <TableCell className="font-medium text-destructive underline">{product.sku}</TableCell>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>{product.unit}</TableCell>
                                                <TableCell>{product.coordinate}</TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => handleOpenEditModal(product)}>Editar</DropdownMenuItem>
                                                            <DropdownMenuItem>Eliminar</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <div className="pt-4 text-sm text-muted-foreground">
                                    Mostrando 1-7 de 7 productos
                                </div>
                            </CardContent>
                        </Card>
                    </main>
                </div>
            </div>
            <AddProductForm isOpen={isAddProductModalOpen} onOpenChange={setIsAddProductModalOpen} />
            <EditProductForm isOpen={isEditProductModalOpen} onOpenChange={setIsEditProductModalOpen} product={selectedProduct} />
        </SidebarProvider>
    );
}
