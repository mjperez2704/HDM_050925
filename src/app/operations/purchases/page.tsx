
"use client";

import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Header } from '@/components/dashboard/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle, Filter } from 'lucide-react';
import { AddPurchaseOrderForm } from '@/components/operations/add-purchase-order-form';

const purchasesData = [
  {
    folio: 'OC-2024-001',
    provider: 'Refacciones Móviles del Centro S.A.',
    emissionDate: '2024-07-20',
    deliveryDate: '2024-07-28',
    total: '$2,500.00',
    status: 'Pendiente',
  },
  {
    folio: 'OC-2024-002',
    provider: 'Accesorios Tech de México',
    emissionDate: '2024-07-18',
    deliveryDate: '2024-07-25',
    total: '$850.50',
    status: 'Recibido Parcialmente',
  },
];

export default function PurchasesPage() {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <CustomSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Gestión de Compras</CardTitle>
                    <CardDescription>Crea y administra tus órdenes de compra a proveedores.</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtrar
                    </Button>
                    <Button 
                      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                      onClick={() => setIsPurchaseModalOpen(true)}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Crear Orden de Compra
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Folio</TableHead>
                      <TableHead>Proveedor</TableHead>
                      <TableHead>Fecha de Emisión</TableHead>
                      <TableHead>Fecha de Entrega</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchasesData.map((purchase) => (
                      <TableRow key={purchase.folio}>
                        <TableCell className="font-medium text-destructive underline">{purchase.folio}</TableCell>
                        <TableCell>{purchase.provider}</TableCell>
                        <TableCell>{purchase.emissionDate}</TableCell>
                        <TableCell>{purchase.deliveryDate}</TableCell>
                        <TableCell>{purchase.total}</TableCell>
                        <TableCell>
                          <Badge variant={purchase.status === 'Pendiente' ? 'destructive' : 'secondary'}>{purchase.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                              <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                              <DropdownMenuItem>Registrar Recepción</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Cancelar Orden</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
      <AddPurchaseOrderForm 
        isOpen={isPurchaseModalOpen} 
        onOpenChange={setIsPurchaseModalOpen} 
      />
    </SidebarProvider>
  );
}
