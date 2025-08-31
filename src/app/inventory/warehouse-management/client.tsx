
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, MoreVertical, Eye, Search, EyeOff } from 'lucide-react';
import { VisualInventory } from '@/components/inventory/visual-inventory';
import { AddWarehouseForm } from '@/components/inventory/add-warehouse-form';
import { AddSectionForm } from '@/components/inventory/add-section-form';
import { AddCoordinateForm } from '@/components/inventory/add-coordinate-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AssignSkuForm } from '@/components/inventory/assign-sku-form';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EditWarehouseForm } from '@/components/inventory/edit-warehouse-form';
import { EditSectionForm } from '@/components/inventory/edit-section-form';
import { EditCoordinateForm } from '@/components/inventory/edit-coordinate-form';

type Coordinate = {
    name: string;
    skus: string[];
    visible: boolean;
};

type Section = {
    name: string;
    coordinates: Coordinate[];
}

type Warehouse = {
    name: string;
    description: string;
    sections: Section[];
    sectionsCount: number;
}

type WarehouseManagementClientPageProps = {
    initialWarehouseData: any[];
}

export default function WarehouseManagementClientPage({ initialWarehouseData }: WarehouseManagementClientPageProps) {
    const [showVisualInventory, setShowVisualInventory] = useState(false);
    const [isWarehouseModalOpen, setIsWarehouseModalOpen] = useState(false);
    const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
    const [isCoordinateModalOpen, setIsCoordinateModalOpen] = useState(false);
    const [isAssignSkuModalOpen, setIsAssignSkuModalOpen] = useState(false);

    const [isEditWarehouseModalOpen, setIsEditWarehouseModalOpen] = useState(false);
    const [isEditSectionModalOpen, setIsEditSectionModalOpen] = useState(false);
    const [isEditCoordinateModalOpen, setIsEditCoordinateModalOpen] = useState(false);

    const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);
    const [selectedCoordinate, setSelectedCoordinate] = useState<Coordinate | null>(null);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(initialWarehouseData);
    
    const userPermissions = {
        canViewHiddenCoordinates: true
    };

    const handleOpenSectionModal = (warehouse: Warehouse) => {
        setSelectedWarehouse(warehouse);
        setIsSectionModalOpen(true);
    };

    const handleOpenCoordinateModal = (warehouse: Warehouse, section: Section) => {
        setSelectedWarehouse(warehouse);
        setSelectedSection(section);
        setIsCoordinateModalOpen(true);
    };

    const handleOpenAssignSkuModal = (warehouse: Warehouse, section: Section, coordinate: Coordinate) => {
        setSelectedWarehouse(warehouse);
        setSelectedSection(section);
        setSelectedCoordinate(coordinate);
        setIsAssignSkuModalOpen(true);
    };

    const handleOpenEditWarehouseModal = (warehouse: Warehouse) => {
        setSelectedWarehouse(warehouse);
        setIsEditWarehouseModalOpen(true);
    };

    const handleOpenEditSectionModal = (warehouse: Warehouse, section: Section) => {
        setSelectedWarehouse(warehouse);
        setSelectedSection(section);
        setIsEditSectionModalOpen(true);
    };
    
    const handleOpenEditCoordinateModal = (warehouse: Warehouse, section: Section, coordinate: Coordinate) => {
        setSelectedWarehouse(warehouse);
        setSelectedSection(section);
        setSelectedCoordinate(coordinate);
        setIsEditCoordinateModalOpen(true);
    };

    const handleSearch = () => {
        if (!searchTerm) {
            setFilteredData(initialWarehouseData);
            return;
        }

        const lowercasedFilter = searchTerm.toLowerCase();
        const filtered = initialWarehouseData.map(warehouse => {
            const filteredSections = warehouse.sections.map((section: any) => {
                const filteredCoordinates = section.coordinates.filter((coordinate: any) => 
                    (coordinate.visible || userPermissions.canViewHiddenCoordinates) &&
                    coordinate.skus.some((sku: any) => sku.toLowerCase().includes(lowercasedFilter))
                );
                if (filteredCoordinates.length > 0) {
                    return { ...section, coordinates: filteredCoordinates, coordinatesCount: filteredCoordinates.length };
                }
                return null;
            }).filter(Boolean);

            if (filteredSections.length > 0) {
                return { ...warehouse, sections: filteredSections as any, sectionsCount: filteredSections.length };
            }
            return null;
        }).filter(Boolean);

        setFilteredData(filtered as any);
    };

    return (
        <>
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
            
            <Card className="mb-6">
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row items-end gap-4">
                        <div className="w-full sm:w-auto flex-grow space-y-2">
                            <Label htmlFor="product-search">Localizar Producto / Herramienta</Label>
                            <Input
                                id="product-search"
                                placeholder="Introduce el SKU o ID del producto..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button onClick={handleSearch}>
                            <Search className="mr-2 h-4 w-4" />
                            Localizar
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {showVisualInventory ? (
                <VisualInventory />
            ) : (
                <div className="space-y-8">
                    {filteredData.map((warehouse, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <CardTitle>{(warehouse as any).name}</CardTitle>
                                        <Badge variant="secondary">{(warehouse as any).sectionsCount} secciones</Badge>
                                    </div>
                                    <Button variant="default" size="sm" onClick={() => handleOpenSectionModal(warehouse as any)}>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Agregar Sección
                                    </Button>
                                </div>
                                <CardDescription>{(warehouse as any).description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="multiple" defaultValue={(warehouse as any).sections.map((_: any, sIndex: any) => `item-${sIndex}`)} className="w-full">
                                    {(warehouse as any).sections.map((section: any, sIndex: any) => (
                                    <div key={sIndex} className="border rounded-md p-4 mb-4">
                                        <AccordionItem value={`item-${sIndex}`} className="border-b-0">
                                            <div className="flex justify-between items-center w-full">
                                                <AccordionTrigger className="flex-1 py-0 font-semibold hover:no-underline text-left">
                                                    <div className="flex items-center gap-4">
                                                        <span>{section.name}</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <div className="flex items-center gap-2 text-sm font-normal ml-4">
                                                    <span>{section.coordinates.length} Coordenadas</span>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); handleOpenEditSectionModal(warehouse as any, section); }}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <AccordionContent className="pt-4">
                                                    {section.coordinates.length > 0 ? (
                                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                                                        {section.coordinates.filter((c: any) => c.visible || userPermissions.canViewHiddenCoordinates).map((coord: any, cIndex: any) => (
                                                            <div key={cIndex} className="relative group/coord">
                                                                <Button 
                                                                    variant="outline" 
                                                                    size="sm"
                                                                    className={cn(
                                                                        "h-auto w-full justify-start text-left relative pr-8",
                                                                        !coord.visible && "border-dashed border-yellow-500"
                                                                    )}
                                                                    disabled={coord.skus.length >= 2}
                                                                    onClick={() => handleOpenAssignSkuModal(warehouse as any, section, coord)}
                                                                >
                                                                    {!coord.visible && <EyeOff className="absolute top-1 right-1 h-3 w-3 text-yellow-500" />}
                                                                    <div className="flex flex-col items-start w-full">
                                                                        <span className="font-semibold">{coord.name}</span>
                                                                        <span className="text-xs text-muted-foreground">
                                                                            SKUs: {coord.skus.length}/2
                                                                        </span>
                                                                    </div>
                                                                </Button>
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button variant="ghost" size="icon" className="absolute top-1/2 -translate-y-1/2 right-0 h-8 w-8 opacity-0 group-hover/coord:opacity-100">
                                                                            <MoreVertical className="h-4 w-4" />
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent>
                                                                        <DropdownMenuItem onClick={() => handleOpenEditCoordinateModal(warehouse as any, section, coord)}>Editar</DropdownMenuItem>
                                                                        <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-center text-muted-foreground py-4">
                                                        No hay coordenadas en esta sección.
                                                    </div>
                                                )}
                                                <div className="flex justify-end mt-4">
                                                    <Button variant="secondary" size="sm" onClick={() => handleOpenCoordinateModal(warehouse as any, section)}>
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
                                    <Button variant="ghost" onClick={() => handleOpenEditWarehouseModal(warehouse as any)}>
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
            {/* Add Modals */}
            <AddWarehouseForm isOpen={isWarehouseModalOpen} onOpenChange={setIsWarehouseModalOpen} />
            <AddSectionForm isOpen={isSectionModalOpen} onOpenChange={setIsSectionModalOpen} warehouseName={selectedWarehouse?.name} />
            <AddCoordinateForm isOpen={isCoordinateModalOpen} onOpenChange={setIsCoordinateModalOpen} warehouseName={selectedWarehouse?.name} sectionName={selectedSection?.name} />
            
            {/* Edit Modals */}
            <EditWarehouseForm isOpen={isEditWarehouseModalOpen} onOpenChange={setIsEditWarehouseModalOpen} warehouse={selectedWarehouse} />
            <EditSectionForm isOpen={isEditSectionModalOpen} onOpenChange={setIsEditSectionModalOpen} warehouseName={selectedWarehouse?.name} section={selectedSection} />
            <EditCoordinateForm isOpen={isEditCoordinateModalOpen} onOpenChange={setIsEditCoordinateModalOpen} warehouseName={selectedWarehouse?.name} sectionName={selectedSection?.name} coordinate={selectedCoordinate} />

            {/* Assign SKU Modal */}
            <AssignSkuForm 
                isOpen={isAssignSkuModalOpen} 
                onOpenChange={setIsAssignSkuModalOpen}
                warehouseName={selectedWarehouse?.name}
                sectionName={selectedSection?.name}
                coordinateName={selectedCoordinate?.name}
            />
        </>
    );
}
