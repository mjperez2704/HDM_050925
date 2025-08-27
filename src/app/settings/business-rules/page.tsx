
"use client";

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Shield, Warehouse, Landmark, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const InventoryRules = () => (
  <Card className="flex-1">
    <CardHeader>
      <CardTitle>Reglas de Inventario</CardTitle>
      <CardDescription>Define las restricciones y comportamientos para almacenes, secciones y coordenadas.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <Accordion type="multiple" defaultValue={['generales', 'almacen', 'seccion', 'coordenada']}>
        <AccordionItem value="generales">
          <AccordionTrigger className="text-lg font-semibold">Reglas Generales de Inventario</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="backorder-switch" className="font-semibold">Permitir Venta Sin Existencia (Backorder)</Label>
                <p className="text-sm text-muted-foreground">Si se activa, el sistema permitirá vender productos aunque no haya stock, generando un saldo en "Backorder".</p>
              </div>
              <Switch id="backorder-switch" defaultChecked />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="almacen">
          <AccordionTrigger className="text-lg font-semibold">Reglas de Almacén</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center justify-between rounded-lg border p-4">
               <div>
                <Label htmlFor="unique-warehouse-switch" className="font-semibold">Nombres de Almacén Únicos</Label>
                <p className="text-sm text-muted-foreground">No permitir dos almacenes con el mismo nombre. (Regla del sistema)</p>
              </div>
              <Switch id="unique-warehouse-switch" defaultChecked />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="seccion">
          <AccordionTrigger className="text-lg font-semibold">Reglas de Sección</AccordionTrigger>
          <AccordionContent className="space-y-4 p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Define las reglas para una sección específica:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccionar Almacén..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="main">Almacén Principal</SelectItem>
                        <SelectItem value="secondary">Almacén Secundario</SelectItem>
                    </SelectContent>
                </Select>
                 <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccionar Sección..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="a">Sección A</SelectItem>
                        <SelectItem value="b">Sección B</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="coordenada">
          <AccordionTrigger className="text-lg font-semibold">Reglas de Coordenada</AccordionTrigger>
          <AccordionContent>
             <div className="flex items-center justify-between rounded-lg border p-4">
               <div>
                <Label htmlFor="max-skus" className="font-semibold">Máximo de SKUs distintos por Coordenada</Label>
                <p className="text-sm text-muted-foreground">Define la cantidad máxima de tipos de producto (SKUs) distintos por coordenada.</p>
              </div>
              <Input id="max-skus" type="number" defaultValue="2" className="w-20" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex justify-end">
        <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Guardar Reglas de Inventario</Button>
      </div>
    </CardContent>
  </Card>
);

const PlaceholderSection = ({ title }: { title: string }) => (
    <Card className="flex-1">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Configuración para {title.toLowerCase()} no disponible aún.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Las reglas para esta sección se implementarán próximamente.</p>
        </CardContent>
    </Card>
)

export default function BusinessRulesPage() {
    const [activeTab, setActiveTab] = useState('inventory');

    const menuItems = [
        { id: 'security', label: 'Seguridad', icon: Shield },
        { id: 'inventory', label: 'Inventario', icon: Warehouse },
        { id: 'administration', label: 'Administración', icon: Landmark },
        { id: 'general', label: 'General', icon: Settings },
    ];

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
                        <h1 className="text-3xl font-bold">Reglas de Negocio</h1>
                        <p className="text-muted-foreground">
                            Establece y personaliza las reglas de funcionamiento y las restricciones del sistema.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8">
                        <nav className="flex flex-col w-full md:w-64">
                            {menuItems.map((item) => (
                                <Button
                                    key={item.id}
                                    variant="ghost"
                                    onClick={() => setActiveTab(item.id)}
                                    className={cn(
                                        "justify-start gap-3 px-4 py-2 text-left",
                                        activeTab === item.id ? 'bg-muted font-semibold' : ''
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.label}
                                </Button>
                            ))}
                        </nav>
                        
                        <div className="flex-1">
                            {activeTab === 'inventory' && <InventoryRules />}
                            {activeTab === 'security' && <PlaceholderSection title="Reglas de Seguridad" />}
                            {activeTab === 'administration' && <PlaceholderSection title="Reglas de Administración" />}
                            {activeTab === 'general' && <PlaceholderSection title="Reglas Generales" />}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
