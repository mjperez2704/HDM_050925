
"use client";

import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Header } from '@/components/dashboard/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { EquipmentReceptionForm } from '@/components/operations/equipment-reception-form';

const repairsData = [
  {
    folio: 'OS-2024-001',
    client: 'Ana García',
    equipment: 'iPhone 13 Pro',
    reportedIssue: 'Pantalla rota',
    assignedTechnician: 'Juan Pérez',
    status: 'En Diagnóstico',
  },
  {
    folio: 'OS-2024-002',
    client: 'Carlos Sánchez',
    equipment: 'Samsung Galaxy S22',
    reportedIssue: 'No enciende',
    assignedTechnician: 'Luis Martínez',
    status: 'Pendiente de Refacción',
  },
];

export default function RepairsPage() {
  const [isReceptionModalOpen, setIsReceptionModalOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <CustomSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Gestión de Reparaciones</h1>
              <p className="text-muted-foreground">
                Administra el ciclo de vida de las reparaciones, desde la recepción hasta la entrega.
              </p>
            </div>

            <Tabs defaultValue="requests">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="requests">Solicitudes</TabsTrigger>
                  <TabsTrigger value="reception">Recepción de Equipos</TabsTrigger>
                </TabsList>
                <Button 
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                  onClick={() => setIsReceptionModalOpen(true)}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Registrar Recepción
                </Button>
              </div>
              <TabsContent value="requests">
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Órdenes de Reparación</CardTitle>
                    <CardDescription>Listado de las últimas órdenes de reparación registradas.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Folio</TableHead>
                          <TableHead>Cliente</TableHead>
                          <TableHead>Equipo</TableHead>
                          <TableHead>Falla Reportada</TableHead>
                          <TableHead>Técnico Asignado</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {repairsData.map((repair) => (
                          <TableRow key={repair.folio}>
                            <TableCell className="font-medium text-destructive underline">{repair.folio}</TableCell>
                            <TableCell>{repair.client}</TableCell>
                            <TableCell>{repair.equipment}</TableCell>
                            <TableCell>{repair.reportedIssue}</TableCell>
                            <TableCell>{repair.assignedTechnician}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{repair.status}</Badge>
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
                                  <DropdownMenuItem>Actualizar Estado</DropdownMenuItem>
                                  <DropdownMenuItem>Asignar Técnico</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reception">
                <div className="text-center text-muted-foreground py-12">
                  <p>Haga clic en el botón "Registrar Recepción" para iniciar un nuevo diagnóstico.</p>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
      <EquipmentReceptionForm 
        isOpen={isReceptionModalOpen} 
        onOpenChange={setIsReceptionModalOpen} 
      />
    </SidebarProvider>
  );
}
