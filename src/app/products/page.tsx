
"use client";

import { useState } from 'react';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Filter, Upload, PlusCircle, MoreHorizontal } from 'lucide-react';
import { AddProductForm } from '@/components/products/add-product-form';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { EditProductForm } from '@/components/products/edit-product-form';
import { ProductAttributesModal } from '@/components/products/product-attributes-modal';
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

const attributesData = {
    'PAR-IP15-PAN': {
        atributo_1: 'Calidad: Original',
        atributo_2: 'Resolución: 2556 x 1179',
        atributo_3: 'Tecnología: Super Retina XDR',
        atributo_4: 'Color: Negro',
        atributo_5: 'Compatibilidad: A2846, A2650',
    },
    'ACC-CAB-USBC': {
        atributo_1: 'Longitud: 1 metro',
        atributo_2: 'Conector: USB-C a USB-C',
        atributo_3: 'Velocidad: USB 3.1 Gen 2',
        atributo_4: 'Color: Blanco',
    },
    'EQU-SAM-S24': {
        atributo_1: 'Almacenamiento: 256GB',
        atributo_2: 'RAM: 8GB',
        atributo_3: 'Color: Phantom Black',
        atributo_4: 'Procesador: Snapdragon 8 Gen 3',
    },
};

type Product = typeof productsData[0];
type ProductWithAttributes = Product & { attributes?: Record<string, string> };

export default function ProductsPage() {
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
    const [isAttributesModalOpen, setIsAttributesModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductWithAttributes | null>(null);

    const handleOpenEditModal = (product: Product) => {
        setSelectedProduct(product);
        setIsEditProductModalOpen(true);
    };

    const handleOpenAttributesModal = (product: Product) => {
        const productAttributes = attributesData[product.sku as keyof typeof attributesData];
        setSelectedProduct({ ...product, attributes: productAttributes });
        setIsAttributesModalOpen(true);
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
                                                <TableCell>
                                                    <Button 
                                                        variant="link" 
                                                        className="font-medium text-destructive p-0 h-auto"
                                                        onClick={() => handleOpenAttributesModal(product)}
                                                    >
                                                        {product.sku}
                                                    </Button>
                                                </TableCell>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>{product.unit}</TableCell>
                                                <TableCell>{product.coordinate}</TableCell>
                                                <TableCell>
                                                    <AlertDialog>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                                    <span className="sr-only">Open menu</span>
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem onClick={() => handleOpenEditModal(product)}>Editar</DropdownMenuItem>
                                                                <AlertDialogTrigger asChild>
                                                                    <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                                                                </AlertDialogTrigger>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Esta acción no se puede deshacer. Esto eliminará permanentemente el producto.
                                                            </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                            <AlertDialogAction className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
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
            <ProductAttributesModal isOpen={isAttributesModalOpen} onOpenChange={setIsAttributesModalOpen} product={selectedProduct} />
        </SidebarProvider>
    );
}
