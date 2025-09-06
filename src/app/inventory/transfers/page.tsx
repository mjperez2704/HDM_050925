'use client';

import { useState, useEffect } from 'react';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { getProductsForSelect, getProductStockByWarehouse, getWarehouseStructure } from '@/actions/inventory-actions';

// Tipos para los datos que cargaremos
type Product = { id: number; sku: string; nombre: string; };
type Warehouse = { id: number; name: string; description: string; };
type StockData = { [key: string]: number };

export default function InventoryTransfersPage() {
    const { toast } = useToast();

    // Estados para los datos
    const [products, setProducts] = useState<Product[]>([]);
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [stock, setStock] = useState<StockData>({});

    // Estados para el formulario
    const [selectedProductId, setSelectedProductId] = useState<string>('');
    const [selectedOriginWarehouse, setSelectedOriginWarehouse] = useState<string>('');
    const [quantityNeeded, setQuantityNeeded] = useState(1);

    // Estados de carga
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [isLoadingStock, setIsLoadingStock] = useState(false);

    // Cargar datos iniciales (productos y almacenes)
    useEffect(() => {
        async function loadInitialData() {
            setIsLoadingProducts(true);
            try {
                const [productsData, warehousesData] = await Promise.all([
                    getProductsForSelect(),
                    getWarehouseStructure()
                ]);
                setProducts(productsData);
                setWarehouses(warehousesData.map(w => ({ id: w.id, name: w.name, description: w.description })));
            } catch (error) {
                toast({ variant: "destructive", title: "Error", description: "No se pudieron cargar los datos iniciales." });
            }
            setIsLoadingProducts(false);
        }
        loadInitialData();
    }, [toast]);

    // Cargar stock cuando se selecciona un producto
    useEffect(() => {
        async function loadStock() {
            if (!selectedProductId) {
                setStock({});
                return;
            }
            setIsLoadingStock(true);
            try {
                const stockData = await getProductStockByWarehouse(Number(selectedProductId));
                setStock(stockData);
            } catch (error) {
                 toast({ variant: "destructive", title: "Error", description: "No se pudo cargar el stock del producto." });
            }
            setIsLoadingStock(false);
        }
        loadStock();
    }, [selectedProductId, toast]);

    const handleCheckAvailability = () => {
        if (!selectedProductId || !selectedOriginWarehouse) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Por favor, seleccione un producto y un almacén de origen.",
            });
            return;
        }

        const availableStock = stock[selectedOriginWarehouse] || 0;

        if (availableStock >= quantityNeeded) {
            toast({
                title: "Disponibilidad Confirmada",
                description: (
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>¡Sí hay <b>{availableStock}</b> unidades disponibles en <b>{selectedOriginWarehouse}</b>!</span>
                    </div>
                ),
                className: 'bg-green-100 border-green-300 text-green-800',
            });
        } else {
            toast({
                variant: "destructive",
                title: "Sin Disponibilidad",
                description: (
                     <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span>No hay suficiente stock. Disponibles: <b>{availableStock}</b>. Solicitados: <b>{quantityNeeded}</b>.</span>
                    </div>
                ),
            });
        }
    };

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-muted/40">
                <CustomSidebar />
                <div className="flex flex-1 flex-col">
                    <Header />
                    <main className="flex-1 p-4 md:p-8">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold">Traslados de Inventario</h1>
                            <p className="text-muted-foreground">
                                Gestiona los traslados de inventario entre almacenes o coordenadas.
                            </p>
                        </div>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle>Formulario de Traslado</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <div className="space-y-4">
                                    <Label className="text-base">Tipo de Traslado</Label>
                                    <RadioGroup defaultValue="entre-almacenes" className="flex items-center gap-8">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="entre-almacenes" id="entre-almacenes" />
                                            <Label htmlFor="entre-almacenes">Entre Almacenes</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="entre-coordenadas" id="entre-coordenadas" disabled />
                                            <Label htmlFor="entre-coordenadas" className="text-muted-foreground">Entre Coordenadas (Próximamente)</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <Label htmlFor="origen-almacen">Almacén Origen</Label>
                                        <Select onValueChange={setSelectedOriginWarehouse} disabled={isLoadingProducts}>
                                            <SelectTrigger id="origen-almacen">
                                                <SelectValue placeholder={isLoadingProducts ? "Cargando..." : "Seleccione almacén origen"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {warehouses.map(w => <SelectItem key={w.id} value={w.name}>{w.name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="destino-almacen">Almacén Destino</Label>
                                        <Select disabled={isLoadingProducts}>
                                            <SelectTrigger id="destino-almacen">
                                                <SelectValue placeholder={isLoadingProducts ? "Cargando..." : "Seleccione almacén destino"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {warehouses.map(w => <SelectItem key={w.id} value={w.name}>{w.name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="product-sku">Producto (SKU)</Label>
                                    <Select onValueChange={setSelectedProductId} disabled={isLoadingProducts}>
                                        <SelectTrigger id="product-sku">
                                            <SelectValue placeholder={isLoadingProducts ? "Cargando..." : "Seleccione un producto"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {products.map(p => <SelectItem key={p.id} value={String(p.id)}>{p.sku} - {p.nombre}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                                    <div className="space-y-2">
                                        <Label htmlFor="quantity">Cantidad a Solicitar/Trasladar</Label>
                                        <Input 
                                            id="quantity" 
                                            type="number" 
                                            value={quantityNeeded}
                                            onChange={(e) => setQuantityNeeded(parseInt(e.target.value, 10) || 1)}
                                            min="1"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="transfer-all" />
                                        <Label htmlFor="transfer-all" className="text-sm font-normal">
                                            Trasladar todo el stock de origen
                                        </Label>
                                    </div>
                                </div>
                                
                                <div className="flex justify-between items-center pt-4 border-t">
                                    <Button variant="outline" onClick={handleCheckAvailability} disabled={!selectedProductId || !selectedOriginWarehouse || isLoadingStock}>
                                        {isLoadingStock && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} 
                                        Consultar Disponibilidad
                                    </Button>
                                    <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground" disabled>
                                        Generar Solicitud (Próximamente)
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
