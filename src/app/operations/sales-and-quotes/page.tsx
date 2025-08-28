
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

const salesData = [
  {
    folio: 'V-2024-001',
    client: 'Carlos Sánchez López',
    type: 'Venta',
    date: '2024-07-28',
    total: '$1,500.00',
    status: 'Pagado',
  },
  {
    folio: 'P-2024-005',
    client: 'Oficina Creativa SA de CV',
    type: 'Presupuesto',
    date: '2024-07-27',
    total: '$8,750.00',
    status: 'Pendiente',
  },
   {
    folio: 'V-2024-002',
    client: 'Ana García',
    type: 'Venta',
    date: '2024-07-26',
    total: '$350.00',
    status: 'Pagado',
  },
  {
    folio: 'P-2024-006',
    client: 'Prospecto Web',
    type: 'Presupuesto',
    date: '2024-07-29',
    total: '$2,800.00',
    status: 'Enviado',
  }
];

export default function SalesAndQuotesPage() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Pagado': return 'destructive';
      case 'Pendiente': return 'secondary';
      case 'Enviado': return 'outline';
      default: return 'secondary';
    }
  };

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
                    <CardTitle>Ventas y Presupuestos</CardTitle>
                    <CardDescription>Crea y administra tus ventas, cotizaciones y presupuestos.</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtrar
                    </Button>
                    <Button 
                      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Crear Venta / Presupuesto
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Folio</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead><span className="sr-only">Acciones</span></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesData.map((sale) => (
                      <TableRow key={sale.folio}>
                        <TableCell className="font-medium text-destructive underline">{sale.folio}</TableCell>
                        <TableCell>{sale.client}</TableCell>
                        <TableCell>
                            <Badge variant={sale.type === 'Venta' ? 'default' : 'secondary'}>{sale.type}</Badge>
                        </TableCell>
                        <TableCell>{sale.date}</TableCell>
                        <TableCell>{sale.total}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(sale.status) as any}>{sale.status}</Badge>
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
                              <DropdownMenuItem>Ver Detalle</DropdownMenuItem>
                              <DropdownMenuItem>Imprimir</DropdownMenuItem>
                              <DropdownMenuItem>Convertir a Venta</DropdownMenuItem>
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
    </SidebarProvider>
  );
}
