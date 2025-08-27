
"use client";

import { useState } from 'react';
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
import { CheckCircle, XCircle } from 'lucide-react';

// Mock data simulating stock in different warehouses
const mockStockData = {
    'par-ip15-pan': { 'almacen-central': 10, 'bodega-tecnicos': 5 },
    'acc-cab-usbc': { 'almacen-central': 250, 'bodega-tecnicos': 50 },
    'equ-sam-s24': { 'almacen-central': 2, 'bodega-tecnicos': 0 },
};

export default function InventoryTransfersPage() {
    const { toast } = useToast();
    const [selectedSku, setSelectedSku] = useState('');
    const [quantityNeeded, setQuantityNeeded] = useState(1);

    const handleCheckAvailability = () => {
        if (!selectedSku) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Por favor, seleccione un producto (SKU) primero.",
            });
            return;
        }

        const stockInfo = mockStockData[selectedSku as keyof typeof mockStockData];
        const totalStock = Object.values(stockInfo).reduce((sum, current) => sum + current, 0);

        if (totalStock >= quantityNeeded) {
            toast({
                title: "Disponibilidad Confirmada",
                description: (
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>¡Sí hay disponibilidad para tu solicitud!</span>
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
                        <span>No hay suficiente stock disponible.</span>
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
                                            <RadioGroupItem value="entre-coordenadas" id="entre-coordenadas" />
                                            <Label htmlFor="entre-coordenadas">Entre Coordenadas (mismo almacén)</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <Label htmlFor="origen-almacen">Almacén Origen</Label>
                                        <Select>
                                            <SelectTrigger id="origen-almacen">
                                                <SelectValue placeholder="Seleccione almacén origen" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="almacen-central">Almacén Central</SelectItem>
                                                <SelectItem value="bodega-tecnicos">Bodega de Técnicos</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="destino-almacen">Almacén Destino</Label>
                                        <Select>
                                            <SelectTrigger id="destino-almacen">
                                                <SelectValue placeholder="Seleccione almacén destino" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="almacen-central">Almacén Central</SelectItem>
                                                <SelectItem value="bodega-tecnicos">Bodega de Técnicos</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="product-sku">Producto (SKU)</Label>
                                    <Select onValueChange={setSelectedSku}>
                                        <SelectTrigger id="product-sku">
                                            <SelectValue placeholder="Seleccione un producto" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="par-ip15-pan">PAR-IP15-PAN - Pantalla iPhone 15</SelectItem>
                                            <SelectItem value="acc-cab-usbc">ACC-CAB-USBC - Cable USB-C 1m</SelectItem>
                                            <SelectItem value="equ-sam-s24">EQU-SAM-S24 - Samsung Galaxy S24</SelectItem>
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
                                    <Button variant="outline" onClick={handleCheckAvailability}>
                                        Consultar Disponibilidad (Pre-solicitud)
                                    </Button>
                                    <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                                        Generar Solicitud de Traslado
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
