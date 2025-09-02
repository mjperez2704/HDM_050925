
"use client";

import { useState } from 'react';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow, TableHead, TableHeader } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Filter, Calendar as CalendarIcon, PlusCircle } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { AddLogEntryForm } from '@/components/communication/add-log-entry-form';

export default function LogPage() {
    const [isAddLogModalOpen, setIsAddLogModalOpen] = useState(false);

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
                                        <CardTitle>Bitácora del Sistema</CardTitle>
                                        <CardDescription>Registro de todos los eventos importantes que ocurren en el sistema.</CardDescription>
                                    </div>
                                    <Button 
                                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                        onClick={() => setIsAddLogModalOpen(true)}
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Agregar Registro
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2 pt-4">
                                    <Button variant="outline">
                                        <Filter className="mr-2 h-4 w-4" />
                                        Filtros
                                    </Button>
                                    <Button variant="outline">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        Filtrar por fecha
                                    </Button>
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Filtrar por usuario" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="tecnico1">Técnico 1</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Filtrar por acción" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="create">Creación</SelectItem>
                                            <SelectItem value="update">Actualización</SelectItem>
                                            <SelectItem value="delete">Eliminación</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Fecha y Hora</TableHead>
                                            <TableHead>Usuario</TableHead>
                                            <TableHead>Acción</TableHead>
                                            <TableHead>Descripción</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-24 text-center">
                                                No se encontraron registros con los filtros seleccionados.
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </main>
                </div>
            </div>
            <AddLogEntryForm isOpen={isAddLogModalOpen} onOpenChange={setIsAddLogModalOpen} />
        </SidebarProvider>
    );
}
