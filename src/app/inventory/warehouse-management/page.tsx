
"use client";

import { useState } from 'react';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, ChevronDown } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';

const warehouseData = [
    {
        name: 'Almacén Central',
        description: 'Administra las secciones y coordenadas de este almacén.',
        sectionsCount: 2,
        sections: [
            { name: 'Anaquel A1 - Pantallas', coordinatesCount: 0, coordinates: [] },
            { name: 'Anaquel A2 - Baterías', coordinatesCount: 0, coordinates: [] }
        ]
    },
    {
        name: 'Bodega de Técnicos',
        description: 'Administra las secciones y coordenadas de este almacén.',
        sectionsCount: 1,
        sections: [
            { name: 'Cajón Técnico 1', coordinatesCount: 0, coordinates: [] }
        ]
    }
]


export default function WarehouseManagementPage() {

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-muted/40">
                <CustomSidebar />
                <div className="flex flex-1 flex-col">
                    <Header />
                    <main className="flex-1 p-4 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold">Gestión de Almacén</h1>
                            </div>
                            <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Agregar Almacén
                            </Button>
                        </div>

                        <div className="space-y-8">
                            {warehouseData.map((warehouse, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <CardTitle>{warehouse.name}</CardTitle>
                                                <Badge variant="secondary">{warehouse.sectionsCount} secciones</Badge>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                Agregar Sección
                                            </Button>
                                        </div>
                                        <CardDescription>{warehouse.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Accordion type="single" collapsible className="w-full">
                                            {warehouse.sections.map((section, sIndex) => (
                                            <div key={sIndex} className="border rounded-md p-4 mb-4">
                                                <AccordionItem value={`item-${sIndex}`} className="border-b-0">
                                                    <div className="flex justify-between items-center w-full">
                                                        <AccordionTrigger className="flex-1 py-0 font-semibold hover:no-underline text-left">
                                                            <div className="flex items-center gap-4">
                                                                <span>{section.name}</span>
                                                            </div>
                                                        </AccordionTrigger>
                                                        <div className="flex items-center gap-2 text-sm font-normal ml-4">
                                                            <span>{section.coordinatesCount} Coordenadas</span>
                                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()}>
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <AccordionContent className="pt-4">
                                                         <div className="text-center text-muted-foreground py-4">
                                                            No hay coordenadas en esta sección.
                                                         </div>
                                                         <div className="flex justify-end">
                                                            <Button variant="outline" size="sm">
                                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                                Agregar Coordenada
                                                            </Button>
                                                         </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </div>
                                            ))}
                                        </Accordion>
                                        <div className="flex justify-end gap-4 mt-6">
                                            <Button variant="ghost">
                                                <Edit className="mr-2 h-4 w-4" />
                                                Editar Almacén
                                            </Button>
                                            <Button variant="ghost" className="text-destructive hover:text-destructive">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Eliminar Almacén
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
