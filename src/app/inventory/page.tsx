
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, Upload, MoreHorizontal, PlusCircle } from 'lucide-react';
import { StockDetailsModal } from '@/components/inventory/stock-details-modal';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { cn } from '@/lib/utils';

const inventoryData = [
    {
        sku: 'PAR-IP15-PAN',
        name: 'Pantalla iPhone 15',
        unit: 'PZA',
        price: '$150.00',
        stock: 15,
        details: [
            { warehouse: 'Almacén Principal', section: 'Refacciones Apple', coordinate: 'A1-001', quantity: 10 },
            { warehouse: 'Almacén Principal', section: 'Refacciones Apple', coordinate: 'A1-002', quantity: 5 },
        ]
    },
    {
        sku: 'ACC-CAB-USBC',
        name: 'Cable USB-C 1m',
        unit: 'PZA',
        price: '$25.00',
        stock: 250,
        details: [
            { warehouse: 'Almacén Principal', section: 'Accesorios Venta', coordinate: 'LOTE-B1-001', quantity: 200 },
            { warehouse: 'Almacén Principal', section: 'Accesorios Venta', coordinate: 'LOTE-B1-005', quantity: 50 },
        ]
    },
    {
        sku: 'EQU-SAM-S24',
        name: 'Samsung Galaxy S24',
        unit: 'PZA',
        price: '$1200.00',
        stock: 2,
        details: [
            { warehouse: 'Almacén Principal', section: 'Equipos Venta', coordinate: 'C1-001', quantity: 2 },
        ]
    },
    {
        sku: 'HER-DES-01',
        name: 'Kit Desarmadores Precisión',
        unit: 'KIT',
        price: '$40.00',
        stock: 0,
        details: []
    },
    {
        sku: 'SRV-DIAG-01',
        name: 'Servicio de Diagnóstico',
        unit: 'SRV',
        price: '$20.00',
        stock: 0,
        details: []
    },
    {
        sku: 'PAR-SAM-S22-BAT',
        name: 'Batería Samsung S22',
        unit: 'PZA',
        price: '$80.00',
        stock: 0,
        details: []
    },
    {
        sku: 'ACC-CARG-30W',
        name: 'Cargador 30W',
        unit: 'PZA',
        price: '$35.00',
        stock: 0,
        details: []
    },
];

type InventoryItem = typeof inventoryData[0];

export default function InventoryPage() {
    const router = useRouter();
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

    const handleOpenDetails = (item: InventoryItem) => {
        if(item.stock > 0) {
            setSelectedItem(item);
            setIsDetailsModalOpen(true);
        }
    };
    
    const handleAddMovement = () => {
        router.push('/inventory/adjustments');
    };

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-muted/40">
                <CustomSidebar />
                <div className="flex flex-1 flex-col">
                    <Header />
                    <main className="flex-1 p-4 md:p-8">
                        <Tabs defaultValue="inventory">
                            <TabsList className="mb-4">
                                <TabsTrigger value="inventory">Inventario</TabsTrigger>
                                <TabsTrigger value="audit">Auditoría</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Inventario</CardTitle>
                                        <CardDescription>Gestiona tus productos, refacciones, accesorios y equipos.</CardDescription>
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
                                        <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground" onClick={handleAddMovement}>
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Agregar Movimiento
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
                                            <TableHead>Precio</TableHead>
                                            <TableHead>Existencia</TableHead>
                                            <TableHead><span className="sr-only">Actions</span></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {inventoryData.map((item) => (
                                            <TableRow key={item.sku}>
                                                <TableCell className="font-medium text-destructive underline">{item.sku}</TableCell>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.unit}</TableCell>
                                                <TableCell>{item.price}</TableCell>
                                                <TableCell>
                                                    <Badge 
                                                        variant={item.stock > 0 ? "default" : "destructive"} 
                                                        className={cn(
                                                            item.stock > 0 ? "bg-primary cursor-pointer" : "bg-destructive",
                                                        )}
                                                        onClick={() => handleOpenDetails(item)}
                                                    >
                                                        {item.stock}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => handleOpenDetails(item)}>Ver Detalles</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={handleAddMovement}>Ajustar Existencia</DropdownMenuItem>
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
            {selectedItem && (
                <StockDetailsModal 
                    isOpen={isDetailsModalOpen} 
                    onOpenChange={setIsDetailsModalOpen}
                    item={selectedItem}
                />
            )}
        </SidebarProvider>
    );
}
