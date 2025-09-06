
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Filter, Upload, PlusCircle, MoreHorizontal } from 'lucide-react';
import { AddProductForm } from '@/components/products/add-product-form';
import { EditProductForm } from '@/components/products/edit-product-form';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { getProducts, deleteProduct } from '@/actions/products-actions';
import type { Product } from '@/lib/types/product';
import { useToast } from "@/hooks/use-toast";

type ProductWithAttributes = Product & { attributes?: Record<string, string> };

// Definimos las props que este componente recibirá del servidor
type ProductsClientPageProps = {
  initialProducts: Product[];
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
};

export function ProductsClientPage({ initialProducts, canCreate, canEdit, canDelete }: ProductsClientPageProps) {
    const [productsData, setProductsData] = useState<Product[]>(initialProducts);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductWithAttributes | null>(null);
    const { toast } = useToast();

    const fetchProducts = async () => {
        const products = await getProducts();
        setProductsData(products as Product[]);
    };

    // Sincroniza los datos si la prop inicial cambia
    useEffect(() => {
        setProductsData(initialProducts);
    }, [initialProducts]);

    const handleOpenEditModal = (product: Product) => {
        setSelectedProduct({ ...product });
        setIsEditProductModalOpen(true);
    };

    const handleDeleteProduct = async (id: number) => {
        const result = await deleteProduct(id);
        if (result.message.startsWith('Error')) {
            toast({ variant: "destructive", title: "Error", description: result.message });
        } else {
            toast({ title: "Éxito", description: result.message });
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
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Catálogo de Productos</CardTitle>
                            <CardDescription>Administra todos los productos, servicios y artículos del sistema.</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline"><Filter className="mr-2 h-4 w-4" />Filtrar</Button>
                            <Button variant="outline"><Upload className="mr-2 h-4 w-4" />Exportar</Button>
                            <Button
                                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                onClick={() => setIsAddProductModalOpen(true)}
                                disabled={!canCreate}
                                title={!canCreate ? "No tienes permiso para agregar productos" : "Agregar Producto"}
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
                                    <TableCell>{product.sku}</TableCell>
                                    <TableCell>{product.nombre}</TableCell>
                                    <TableCell>{product.unidad}</TableCell>
                                    <TableCell>${Number(product.precioLista).toFixed(2)}</TableCell>
                                    <TableCell>
                                        <AlertDialog>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleOpenEditModal(product)} disabled={!canEdit}>Editar</DropdownMenuItem>
                                                    <AlertDialogTrigger asChild>
                                                        <DropdownMenuItem className="text-destructive" disabled={!canDelete}>Eliminar</DropdownMenuItem>
                                                    </AlertDialogTrigger>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                    <AlertDialogDescription>Esta acción no se puede deshacer. Esto eliminará permanentemente el producto.</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => handleDeleteProduct(product.id)}>Eliminar</AlertDialogAction>
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
            <AddProductForm isOpen={isAddProductModalOpen} onOpenChange={setIsAddProductModalOpen} onProductAdded={handleProductAdded} />
            <EditProductForm isOpen={isEditProductModalOpen} onOpenChange={setIsEditProductModalOpen} product={selectedProduct} onProductUpdated={handleProductUpdated} />
        </>
    );
}
