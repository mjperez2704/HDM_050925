
"use client";

import { Sidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export default function InventoryTransfersPage() {
    return (
        <div className="flex min-h-screen w-full">
            <Sidebar />
            <div className="flex flex-1 flex-col bg-background">
                <header className="sticky top-0 flex h-16 items-center justify-end gap-4 border-b bg-background px-4 md:px-6 z-10">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <Avatar>
                            <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuItem>My Account</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex-1 p-4 md:p-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold">Traslados de Inventario</h1>
                        <p className="text-muted-foreground">
                            Gestiona los traslados de inventario entre almacenes o coordenadas.
                        </p>
                    </div>
                    
                    <Card>
                        <CardContent className="p-8">
                            <div className="space-y-8">
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <Label htmlFor="origen-coordenada">Coordenada Origen</Label>
                                        <Select>
                                            <SelectTrigger id="origen-coordenada">
                                                <SelectValue placeholder="Seleccione coordenada origen" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="a1-001">A1-001</SelectItem>
                                                <SelectItem value="a1-002">A1-002</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="destino-coordenada">Coordenada Destino</Label>
                                        <Select>
                                            <SelectTrigger id="destino-coordenada">
                                                <SelectValue placeholder="Seleccione coordenada destino" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                 <SelectItem value="b1-001">B1-001</SelectItem>
                                                 <SelectItem value="b1-002">B1-002</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="product-sku">Producto (SKU)</Label>
                                    <Select>
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
                                        <Label htmlFor="quantity">Cantidad a Trasladar</Label>
                                        <Input id="quantity" type="number" defaultValue="1" />
                                    </div>
                                     <div className="flex items-center space-x-2">
                                        <Checkbox id="transfer-all" />
                                        <Label htmlFor="transfer-all" className="text-sm font-normal">
                                            Trasladar todo el stock
                                        </Label>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end">
                                    <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                                        Registrar Traslado
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}
