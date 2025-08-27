
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
import { MoreHorizontal, PlusCircle, Wrench } from 'lucide-react';
import { AddToolForm } from '@/components/tools/add-tool-form';

const toolsData = [
  {
    code: 'HER-001',
    name: 'Kit de Desarmadores de Precisión',
    status: 'Disponible',
    assignedTo: 'N/A',
    location: 'Almacén Central',
  },
  {
    code: 'HER-002',
    name: 'Estación de Calor',
    status: 'En Uso',
    assignedTo: 'Juan Pérez',
    location: 'Taller',
  },
  {
    code: 'HER-003',
    name: 'Multímetro Digital',
    status: 'En Mantenimiento',
    assignedTo: 'N/A',
    location: 'Taller',
  },
];

export default function ToolsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Disponible': return 'destructive';
      case 'En Uso': return 'secondary';
      case 'En Mantenimiento': return 'outline';
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
                    <CardTitle>Catálogo de Herramientas</CardTitle>
                    <CardDescription>Administra las herramientas y equipos de tu taller.</CardDescription>
                  </div>
                  <Button 
                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Agregar Herramienta
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Asignada a</TableHead>
                      <TableHead>Ubicación</TableHead>
                      <TableHead><span className="sr-only">Acciones</span></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {toolsData.map((tool) => (
                      <TableRow key={tool.code}>
                        <TableCell className="font-medium">{tool.code}</TableCell>
                        <TableCell>{tool.name}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(tool.status) as any}>{tool.status}</Badge>
                        </TableCell>
                        <TableCell>{tool.assignedTo}</TableCell>
                        <TableCell>{tool.location}</TableCell>
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
                              <DropdownMenuItem>Editar</DropdownMenuItem>
                              <DropdownMenuItem>Asignar</DropdownMenuItem>
                              <DropdownMenuItem>Registrar Mantenimiento</DropdownMenuItem>
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
      <AddToolForm isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </SidebarProvider>
  );
}
