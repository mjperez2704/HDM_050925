
"use client";

import { useState } from 'react';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, Warehouse, Landmark, Settings, PlusCircle, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { PinConfirmationModal } from '@/components/security/pin-confirmation-modal';

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
          <AccordionContent className="space-y-6 p-4 border rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Define las reglas para una sección específica:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select defaultValue="main">
                      <SelectTrigger>
                          <SelectValue placeholder="Seleccionar Almacén..." />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="main">Almacén Principal</SelectItem>
                          <SelectItem value="secondary">Almacén Secundario</SelectItem>
                      </SelectContent>
                  </Select>
                   <Select defaultValue="refacciones-apple">
                      <SelectTrigger>
                          <SelectValue placeholder="Seleccionar Sección..." />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="refacciones-apple">Refacciones Apple</SelectItem>
                          <SelectItem value="accesorios">Accesorios</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
            </div>
            <div>
                <p className="text-sm text-muted-foreground mb-4">Condiciones de la sección seleccionada:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label>Finalidad (USO)</Label>
                        <Select defaultValue="venta">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="venta">Venta</SelectItem>
                                <SelectItem value="reparacion">Reparación</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Estatus de SKU</Label>
                        <Select defaultValue="usado">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="nuevo">Nuevo</SelectItem>
                                <SelectItem value="usado">Usado</SelectItem>
                                <SelectItem value="reacondicionado">Reacondicionado</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Marca Permitida</Label>
                        <Select defaultValue="apple">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="samsung">Samsung</SelectItem>
                                <SelectItem value="huawei">Huawei</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
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
              <Input id="max-skus" type="number" defaultValue="2" min="1" className="w-20" />
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

const SecurityRules = () => {
    const [usePin, setUsePin] = useState(true);
    const [pinActions, setPinActions] = useState([
        { id: 1, action: 'Eliminar Usuario', module: 'Seguridad' },
        { id: 2, action: 'Aprobar Traslado de Inventario', module: 'Inventario' },
    ]);
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);

    const handlePinConfirm = (pin: string) => {
        console.log("PIN Ingresado:", pin);
        // Aquí iría la lógica de validación del PIN
        setIsPinModalOpen(false);
    };

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>Reglas de Seguridad</CardTitle>
                <CardDescription>Configura las políticas de seguridad y acceso del sistema.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label htmlFor="pin-security-switch" className="font-semibold">Usar PIN de seguridad de usuario</Label>
                        <p className="text-sm text-muted-foreground">Activa esta opción para requerir un PIN de 4 dígitos para confirmar transacciones importantes.</p>
                    </div>
                    <Switch id="pin-security-switch" checked={usePin} onCheckedChange={setUsePin} />
                </div>

                {usePin && (
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Acciones que Requieren PIN</CardTitle>
                                    <CardDescription>Administra las acciones específicas que necesitarán confirmación con PIN.</CardDescription>
                                </div>
                                <Button size="sm" variant="outline" onClick={() => setIsPinModalOpen(true)}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Agregar Acción
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Acción</TableHead>
                                        <TableHead>Módulo</TableHead>
                                        <TableHead className="text-right">Quitar</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pinActions.map(action => (
                                        <TableRow key={action.id}>
                                            <TableCell className="font-medium">{action.action}</TableCell>
                                            <TableCell>{action.module}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
                 <div className="flex justify-end">
                    <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Guardar Reglas de Seguridad</Button>
                </div>
            </CardContent>
            <PinConfirmationModal 
                isOpen={isPinModalOpen}
                onOpenChange={setIsPinModalOpen}
                onConfirm={handlePinConfirm}
            />
        </Card>
    );
};


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
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-muted/40">
                <CustomSidebar />
                <div className="flex flex-1 flex-col">
                    <Header />
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
                                {activeTab === 'security' && <SecurityRules />}
                                {activeTab === 'administration' && <PlaceholderSection title="Reglas de Administración" />}
                                {activeTab === 'general' && <PlaceholderSection title="Reglas Generales" />}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
