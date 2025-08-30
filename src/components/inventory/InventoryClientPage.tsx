
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, Upload, MoreHorizontal, PlusCircle, CheckCircle, XCircle, ChevronDown } from 'lucide-react';
import { StockDetailsModal } from '@/components/inventory/stock-details-modal';
import { cn } from '@/lib/utils';
import { AssignSkuForm } from '@/components/inventory/assign-sku-form';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { ProductWithStock } from '@/lib/types/inventory';

type InventoryClientPageProps = {
    initialInventoryData: ProductWithStock[];
    hasTotalStockPermission: boolean;
};

export function InventoryClientPage({ initialInventoryData, hasTotalStockPermission }: InventoryClientPageProps) {
    const router = useRouter();
    const [inventoryData, setInventoryData] = useState(initialInventoryData);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isAssignSkuModalOpen, setIsAssignSkuModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ProductWithStock | null>(null);

    const handleOpenDetails = (item: ProductWithStock) => {
        setSelectedItem(item);
        setIsDetailsModalOpen(true);
    };

    const handleOpenAssignSku = (item: ProductWithStock) => {
        setSelectedItem(item);
        setIsAssignSkuModalOpen(true);
    };
    
    const handleAddMovement = () => {
        router.push('/inventory/adjustments');
    };

    return (
        <TooltipProvider>
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
                                const visibleDetails = item.details.filter(d => d.visible);
                                const hasVisibleStock = item.visibleStock > 0;
                                
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium text-destructive underline">{item.sku}</TableCell>
                                        <TableCell>{item.nombre}</TableCell>
                                        <TableCell>{item.unidad}</TableCell>
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
                                                    {Math.floor(item.visibleStock)}
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
                                        <TableCell>
                                            {visibleDetails.length > 1 ? (
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="outline" size="sm" className="h-8">
                                                            Múltiples <ChevronDown className="ml-2 h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="start">
                                                        {visibleDetails.map((detail, index) => (
                                                            <DropdownMenuItem key={index} className="flex justify-between">
                                                                <span>{detail.coordinate}</span>
                                                                <Badge variant="secondary">{Math.floor(detail.quantity)}</Badge>
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            ) : (
                                                <span>{visibleDetails[0]?.coordinate || 'N/A'}</span>
                                            )}
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
                        Mostrando {inventoryData.length} de {inventoryData.length} productos
                    </div>
                </CardContent>
            </Card>
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
        </TooltipProvider>
    );
}
