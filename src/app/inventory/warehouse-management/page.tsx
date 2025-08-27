
"use client";

import { useState } from 'react';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, ChevronDown, Eye } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { VisualInventory } from '@/components/inventory/visual-inventory';
import { AddWarehouseForm } from '@/components/inventory/add-warehouse-form';
import { AddSectionForm } from '@/components/inventory/add-section-form';
import { AddCoordinateForm } from '@/components/inventory/add-coordinate-form';

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
    const [showVisualInventory, setShowVisualInventory] = useState(false);
    const [isWarehouseModalOpen, setIsWarehouseModalOpen] = useState(false);
    const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
    const [isCoordinateModalOpen, setIsCoordinateModalOpen] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState('');
    const [selectedSection, setSelectedSection] = useState('');

    const handleOpenSectionModal = (warehouseName: string) => {
        setSelectedWarehouse(warehouseName);
        setIsSectionModalOpen(true);
    };

    const handleOpenCoordinateModal = (warehouseName: string, sectionName: string) => {
        setSelectedWarehouse(warehouseName);
        setSelectedSection(sectionName);
        setIsCoordinateModalOpen(true);
    };

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
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => setShowVisualInventory(!showVisualInventory)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    {showVisualInventory ? 'Ocultar' : 'Visualizar'} Inventario
                                </Button>
                                <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground" onClick={() => setIsWarehouseModalOpen(true)}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Agregar Almacén
                                </Button>
                            </div>
                        </div>

                        {showVisualInventory ? (
                            <VisualInventory />
                        ) : (
                            <div className="space-y-8">
                                {warehouseData.map((warehouse, index) => (
                                    <Card key={index}>
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <CardTitle>{warehouse.name}</CardTitle>
                                                    <Badge variant="secondary">{warehouse.sectionsCount} secciones</Badge>
                                                </div>
                                                <Button variant="outline" size="sm" onClick={() => handleOpenSectionModal(warehouse.name)}>
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
                                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); /* Lógica para editar sección */ }}>
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <AccordionContent className="pt-4">
                                                            <div className="text-center text-muted-foreground py-4">
                                                                No hay coordenadas en esta sección.
                                                            </div>
                                                            <div className="flex justify-end">
                                                                <Button variant="outline" size="sm" onClick={() => handleOpenCoordinateModal(warehouse.name, section.name)}>
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
                        )}
                    </main>
                </div>
            </div>
            <AddWarehouseForm isOpen={isWarehouseModalOpen} onOpenChange={setIsWarehouseModalOpen} />
            <AddSectionForm isOpen={isSectionModalOpen} onOpenChange={setIsSectionModalOpen} warehouseName={selectedWarehouse} />
            <AddCoordinateForm isOpen={isCoordinateModalOpen} onOpenChange={setIsCoordinateModalOpen} warehouseName={selectedWarehouse} sectionName={selectedSection} />
        </SidebarProvider>
    );
}
