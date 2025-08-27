
"use client";

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, ChevronDown } from 'lucide-react';

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
                                                <AccordionTrigger className="flex justify-between items-center w-full py-0 font-semibold hover:no-underline">
                                                    <div className="flex items-center gap-4">
                                                         <span>{section.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm font-normal">
                                                        <span>{section.coordinatesCount} Coordenadas</span>
                                                        <Button variant="ghost" size="icon" className="h-6 w-6"><Edit className="h-4 w-4" /></Button>
                                                        <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                                                    </div>
                                                </AccordionTrigger>
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
    );
}

