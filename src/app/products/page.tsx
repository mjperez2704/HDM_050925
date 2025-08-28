
"use client";

import { useState, useEffect } from 'react';
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
import { getProducts, deleteProduct } from '@/actions/products-actions';
import type { Product } from '@/lib/types/product';
import { useToast } from "@/hooks/use-toast";

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

type ProductWithAttributes = Product & { attributes?: Record<string, string> };

export default function ProductsPage() {
    const [productsData, setProductsData] = useState<Product[]>([]);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
    const [isAttributesModalOpen, setIsAttributesModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductWithAttributes | null>(null);
    const { toast } = useToast();

    const fetchProducts = async () => {
        const products = await getProducts();
        setProductsData(products as Product[]);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleOpenEditModal = (product: Product) => {
        const productAttributes = attributesData[product.sku as keyof typeof attributesData];
        setSelectedProduct({ ...product, attributes: productAttributes });
        setIsEditProductModalOpen(true);
    };

    const handleOpenAttributesModal = (product: Product) => {
        const productAttributes = attributesData[product.sku as keyof typeof attributesData];
        setSelectedProduct({ ...product, attributes: productAttributes });
        setIsAttributesModalOpen(true);
    };

    const handleDeleteProduct = async (id: number) => {
        const result = await deleteProduct(id);
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
            fetchProducts();
        }
    };

    const handleProductAdded = () => {
        fetchProducts();
        setIsAddProductModalOpen(false);
    }

    const handleProductUpdated = () => {
        fetchProducts();
        setIsEditProductModalOpen(false);
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
                                            <TableHead>Precio Lista</TableHead>
                                            <TableHead><span className="sr-only">Actions</span></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {productsData.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell>
                                                    <Button 
                                                        variant="link" 
                                                        className="font-medium text-destructive p-0 h-auto"
                                                        onClick={() => handleOpenAttributesModal(product)}
                                                    >
                                                        {product.sku}
                                                    </Button>
                                                </TableCell>
                                                <TableCell>{product.nombre}</TableCell>
                                                <TableCell>{product.unidad}</TableCell>
                                                <TableCell>${product.precio_lista.toFixed(2)}</TableCell>
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
                                                            <AlertDialogAction 
                                                                className="bg-destructive hover:bg-destructive/90"
                                                                onClick={() => handleDeleteProduct(product.id)}
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
                                <div className="pt-4 text-sm text-muted-foreground">
                                    Mostrando {productsData.length} de {productsData.length} productos
                                </div>
                            </CardContent>
                        </Card>
                    </main>
                </div>
            </div>
            <AddProductForm isOpen={isAddProductModalOpen} onOpenChange={setIsAddProductModalOpen} onProductAdded={handleProductAdded} />
            <EditProductForm isOpen={isEditProductModalOpen} onOpenChange={setIsEditProductModalOpen} product={selectedProduct} onProductUpdated={handleProductUpdated} />
            <ProductAttributesModal isOpen={isAttributesModalOpen} onOpenChange={setIsAttributesModalOpen} product={selectedProduct} />
        </SidebarProvider>
    );
}
