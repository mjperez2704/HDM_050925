
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, Upload, MoreHorizontal, PlusCircle, CheckCircle, XCircle } from 'lucide-react';
import { StockDetailsModal } from '@/components/inventory/stock-details-modal';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { cn } from '@/lib/utils';
import { AssignSkuForm } from '@/components/inventory/assign-sku-form';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const inventoryData = [
    {
        sku: 'PAR-IP15-PAN',
        name: 'Pantalla iPhone 15',
        unit: 'PZA',
        details: [
            { warehouse: 'Almacén Principal', section: 'Refacciones Apple', coordinate: 'A1-001', quantity: 10, visible: true },
            { warehouse: 'Almacén Principal', section: 'Refacciones Apple', coordinate: 'A1-002', quantity: 5, visible: true },
            { warehouse: 'Almacén Principal', section: 'Refacciones Apple', coordinate: 'A1-003', quantity: 3, visible: false }, // No visible
        ]
    },
    {
        sku: 'ACC-CAB-USBC',
        name: 'Cable USB-C 1m',
        unit: 'PZA',
        details: [
            { warehouse: 'Almacén Principal', section: 'Accesorios Venta', coordinate: 'LOTE-B1-001', quantity: 200, visible: true },
            { warehouse: 'Almacén Principal', section: 'Accesorios Venta', coordinate: 'LOTE-B1-005', quantity: 50, visible: true },
        ]
    },
    {
        sku: 'EQU-SAM-S24',
        name: 'Samsung Galaxy S24',
        unit: 'PZA',
        details: [
            { warehouse: 'Almacén Principal', section: 'Equipos Venta', coordinate: 'C1-001', quantity: 2, visible: true },
        ]
    },
    {
        sku: 'HER-DES-01',
        name: 'Kit Desarmadores Precisión',
        unit: 'KIT',
        details: []
    },
    {
        sku: 'SRV-DIAG-01',
        name: 'Servicio de Diagnóstico',
        unit: 'SRV',
        details: []
    },
    {
        sku: 'PAR-SAM-S22-BAT',
        name: 'Batería Samsung S22',
        unit: 'PZA',
        details: [
             { warehouse: 'Almacén Principal', section: 'Refacciones Samsung', coordinate: 'A3-001', quantity: 0, visible: true },
        ]
    },
    {
        sku: 'ACC-CARG-30W',
        name: 'Cargador 30W',
        unit: 'PZA',
        details: []
    },
];

type InventoryItem = {
    sku: string;
    name: string;
    unit: string;
    details: {
        warehouse: string;
        section: string;
        coordinate: string;
        quantity: number;
        visible: boolean;
    }[];
};

// SIMULACIÓN DE PERMISOS
const checkPermission = (permission: string): boolean => {
    const userPermissions = ['VER EXISTENCIAS TOTALES']; // Cambiar esto para probar la otra vista
    return userPermissions.includes(permission);
};

export default function InventoryPage() {
    const router = useRouter();
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isAssignSkuModalOpen, setIsAssignSkuModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

    const hasTotalStockPermission = checkPermission('VER EXISTENCIAS TOTALES');

    const handleOpenDetails = (item: InventoryItem) => {
        setSelectedItem(item);
        setIsDetailsModalOpen(true);
    };

    const handleOpenAssignSku = (item: InventoryItem) => {
        setSelectedItem(item);
        setIsAssignSkuModalOpen(true);
    };
    
    const handleAddMovement = () => {
        router.push('/inventory/adjustments');
    };

    const calculateVisibleStock = (item: InventoryItem) => {
        return item.details
            .filter(detail => detail.visible)
            .reduce((sum, detail) => sum + detail.quantity, 0);
    };

    return (
        <TooltipProvider>
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
                                            <TableHead>Existencia</TableHead>
                                            <TableHead>Coordenada</TableHead>
                                            <TableHead><span className="sr-only">Actions</span></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {inventoryData.map((item) => {
                                            const visibleStock = calculateVisibleStock(item);
                                            const hasVisibleStock = visibleStock > 0;
                                            const firstVisibleCoordinate = item.details.find(d => d.visible)?.coordinate || 'N/A';
                                            
                                            return (
                                                <TableRow key={item.sku}>
                                                    <TableCell className="font-medium text-destructive underline">{item.sku}</TableCell>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell>{item.unit}</TableCell>
                                                    <TableCell>
                                                        {hasTotalStockPermission ? (
                                                            <Badge 
                                                                variant={hasVisibleStock ? "default" : "destructive"} 
                                                                className={cn(
                                                                    "cursor-pointer",
                                                                    hasVisibleStock ? "bg-primary" : "bg-destructive",
                                                                )}
                                                                onClick={() => handleOpenDetails(item)}
                                                            >
                                                                {visibleStock}
                                                            </Badge>
                                                        ) : (
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <div className="flex items-center justify-center w-6 h-6 rounded-full"
                                                                         style={{ backgroundColor: hasVisibleStock ? 'hsl(var(--primary))' : 'hsl(var(--destructive))' }}>
                                                                        {hasVisibleStock ? <CheckCircle className="h-4 w-4 text-white" /> : <XCircle className="h-4 w-4 text-white" />}
                                                                    </div>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>{hasVisibleStock ? 'DISPONIBLE' : 'NO DISPONIBLE'}</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{firstVisibleCoordinate}</TableCell>
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
                                                                <DropdownMenuItem onClick={() => handleOpenAssignSku(item)}>Asignar Coordenada</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                                <div className="pt-4 text-sm text-muted-foreground">
                                    Mostrando 1-{inventoryData.length} de {inventoryData.length} productos
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
             <AssignSkuForm 
                isOpen={isAssignSkuModalOpen} 
                onOpenChange={setIsAssignSkuModalOpen}
                selectedSku={selectedItem?.sku}
            />
        </SidebarProvider>
        </TooltipProvider>
    );
}
