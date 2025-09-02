
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
import { AddOpportunityForm } from '@/components/crm/add-opportunity-form';

const opportunitiesData = [
  {
    name: 'Renovación de Flotilla - Empresa ABC',
    client: 'Empresa ABC S.A. de C.V.',
    stage: 'Propuesta',
    value: '$15,000.00',
    closeDate: '2024-08-30',
    assignedTo: 'Ana García',
  },
  {
    name: 'Reparación 10 equipos - Cliente Nuevo',
    client: 'Prospecto Web',
    stage: 'Calificación',
    value: '$2,500.00',
    closeDate: '2024-09-15',
    assignedTo: 'Juan Pérez',
  },
   {
    name: 'Venta Accesorios Mayoreo',
    client: 'Distribuidor del Norte',
    stage: 'Ganada',
    value: '$5,000.00',
    closeDate: '2024-07-25',
    assignedTo: 'Ana García',
  },
  {
    name: 'Contrato Mantenimiento Anual',
    client: 'Oficina Creativa SA de CV',
    stage: 'Perdida',
    value: '$8,000.00',
    closeDate: '2024-07-20',
    assignedTo: 'Luisa Hernández',
  }
];

export default function OpportunitiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStageVariant = (stage: string) => {
    switch (stage) {
      case 'Calificación': return 'secondary';
      case 'Propuesta': return 'default';
      case 'Ganada': return 'destructive';
      case 'Perdida': return 'outline';
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
                    <CardTitle>Oportunidades de Venta</CardTitle>
                    <CardDescription>Gestiona tus prospectos y oportunidades de negocio.</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtrar
                    </Button>
                    <Button 
                      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Crear Oportunidad
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Oportunidad</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Etapa</TableHead>
                      <TableHead>Valor Estimado</TableHead>
                      <TableHead>Fecha Cierre</TableHead>
                      <TableHead>Asignado a</TableHead>
                      <TableHead><span className="sr-only">Acciones</span></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {opportunitiesData.map((opportunity, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-destructive underline">{opportunity.name}</TableCell>
                        <TableCell>{opportunity.client}</TableCell>
                        <TableCell>
                          <Badge variant={getStageVariant(opportunity.stage) as any}>{opportunity.stage}</Badge>
                        </TableCell>
                        <TableCell>{opportunity.value}</TableCell>
                        <TableCell>{opportunity.closeDate}</TableCell>
                        <TableCell>{opportunity.assignedTo}</TableCell>
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
                              <DropdownMenuItem>Actualizar Etapa</DropdownMenuItem>
                              <DropdownMenuItem>Asignar Vendedor</DropdownMenuItem>
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
      <AddOpportunityForm isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </SidebarProvider>
  );
}
