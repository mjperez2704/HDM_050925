
"use client";

import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Download } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';

export default function InventoryAdjustmentsPage() {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-muted/40">
                <CustomSidebar />
                <div className="flex flex-1 flex-col">
                    <Header />
                    <main className="flex-1 p-4 md:p-8">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold">Ajustes de Inventario</h1>
                            <p className="text-muted-foreground">
                                Registra entradas, salidas o realiza un inventario físico mediante carga masiva.
                            </p>
                        </div>
                        
                        <Tabs defaultValue="manual-adjustment" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 md:w-1/2">
                                <TabsTrigger value="manual-adjustment">Ajuste Manual</TabsTrigger>
                                <TabsTrigger value="bulk-upload">Carga Masiva (Inventario Real)</TabsTrigger>
                            </TabsList>
                            <TabsContent value="manual-adjustment">
                                <Card className="mt-6">
                                    <CardHeader>
                                        <CardTitle>Formulario de Ajuste Manual</CardTitle>
                                        <CardDescription>Completa el formulario para registrar un movimiento de entrada o salida.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <Label htmlFor="adjustment-type">Tipo de Ajuste</Label>
                                                <Select>
                                                    <SelectTrigger id="adjustment-type">
                                                        <SelectValue placeholder="Seleccione..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="entrada">Entrada</SelectItem>
                                                        <SelectItem value="salida">Salida</SelectItem>
                                                        <SelectItem value="merma">Merma</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="product-sku">Producto (SKU)</Label>
                                                <Select>
                                                    <SelectTrigger id="product-sku">
                                                        <SelectValue placeholder="Seleccione..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="par-ip15-pan">PAR-IP15-PAN - Pantalla iPhone 15</SelectItem>
                                                        <SelectItem value="acc-cab-usbc">ACC-CAB-USBC - Cable USB-C 1m</SelectItem>
                                                        <SelectItem value="equ-sam-s24">EQU-SAM-S24 - Samsung Galaxy S24</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            <div className="space-y-2">
                                                <Label htmlFor="warehouse">Almacén</Label>
                                                <Select>
                                                    <SelectTrigger id="warehouse">
                                                        <SelectValue placeholder="Seleccione..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="almacen-central">Almacén Central</SelectItem>
                                                        <SelectItem value="bodega-tecnicos">Bodega de Técnicos</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="section">Sección</Label>
                                                <Select>
                                                    <SelectTrigger id="section">
                                                        <SelectValue placeholder="Seleccione..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="anaquel-a1">Anaquel A1 - Pantallas</SelectItem>
                                                        <SelectItem value="anaquel-a2">Anaquel A2 - Baterías</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="coordinate">Coordenada</Label>
                                                <Select>
                                                    <SelectTrigger id="coordinate">
                                                        <SelectValue placeholder="Seleccione..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                         <SelectItem value="a1-001">A1-001</SelectItem>
                                                         <SelectItem value="a1-002">A1-002</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <Label htmlFor="quantity">Cantidad</Label>
                                                <Input id="quantity" type="number" defaultValue="0" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="reason">Motivo / Justificación</Label>
                                            <Textarea id="reason" placeholder="Describe el motivo de este ajuste..." />
                                        </div>
                                        <div className="flex justify-start">
                                            <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                                                Realizar Ajuste
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="bulk-upload">
                                <Card className="mt-6">
                                    <CardHeader>
                                        <CardTitle>Carga Masiva</CardTitle>
                                        <CardDescription>Sube un archivo CSV con el conteo de tu inventario real para ajustar el stock masivamente.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Haz clic para cargar</span> o arrastra y suelta</p>
                                                    <p className="text-xs text-muted-foreground">CSV (MAX. 5MB)</p>
                                                </div>
                                                <input id="dropzone-file" type="file" className="hidden" />
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Button variant="link" className="p-0 h-auto text-muted-foreground">
                                                <Download className="mr-2 h-4 w-4" />
                                                Descargar Layout de Ejemplo
                                            </Button>
                                            <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Procesar Archivo</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
