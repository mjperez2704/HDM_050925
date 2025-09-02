
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, MoreVertical, Eye } from 'lucide-react';
import { VisualInventory } from '@/components/inventory/visual-inventory';
import { AddWarehouseForm } from '@/components/inventory/add-warehouse-form';
import { AddSectionForm } from '@/components/inventory/add-section-form';
import { AddCoordinateForm } from '@/components/inventory/add-coordinate-form';
import { AssignSkuForm } from '@/components/inventory/assign-sku-form';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EditWarehouseForm } from '@/components/inventory/edit-warehouse-form';
import { EditSectionForm } from '@/components/inventory/edit-section-form';
import { EditCoordinateForm } from '@/components/inventory/edit-coordinate-form';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { deleteWarehouse, deleteSection, deleteCoordinate } from '@/actions/inventory-actions';


type Coordinate = {
    name: string;
    skus: string[];
    visible: boolean;
};

type Section = {
    id: number;
    name: string;
    coordinates: Coordinate[];
}

type Warehouse = {
    id: number;
    name: string;
    description: string | null;
    sections: Section[];
    sectionsCount: number;
}

type WarehouseManagementClientPageProps = {
    initialWarehouseData: any[];
}

export default function WarehouseManagementClientPage({ initialWarehouseData }: WarehouseManagementClientPageProps) {
    const router = useRouter();
    const { toast } = useToast();
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

    const handleActionSuccess = () => {
        router.refresh();
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

    const handleDelete = async (type: 'warehouse' | 'section' | 'coordinate', id: number, name?: string) => {
        let result;
        if (type === 'warehouse') result = await deleteWarehouse(id);
        if (type === 'section') result = await deleteSection(id);
        if (type === 'coordinate' && name) result = await deleteCoordinate(id, name);

        toast({
            title: result?.success ? "Éxito" : "Error",
            description: result?.message,
            variant: result?.success ? "default" : "destructive",
        });
        if (result?.success) handleActionSuccess();
    };

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Gestión de Almacén</h1>
                    <p className="text-muted-foreground">
                        Crea y organiza tus almacenes, secciones y coordenadas.
                    </p>
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
                    {initialWarehouseData.map((warehouse, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <CardTitle>{warehouse.name}</CardTitle>
                                        <Badge variant="secondary">{warehouse.sectionsCount} secciones</Badge>
                                    </div>
                                    <Button variant="default" size="sm" onClick={() => handleOpenSectionModal(warehouse)}>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Agregar Sección
                                    </Button>
                                </div>
                                <CardDescription>{warehouse.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    {warehouse.sections.map((section: Section, sIndex: any) => (
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
                                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); handleOpenEditSectionModal(warehouse, section); }}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <AccordionContent className="pt-4">
                                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                                                    {section.coordinates.map((coord: any, cIndex: any) => (
                                                        <AlertDialog key={cIndex}>
                                                            <div className="relative group/coord">
                                                                <Button 
                                                                    variant="outline" 
                                                                    size="sm"
                                                                    className="h-auto w-full justify-start text-left"
                                                                    onClick={() => handleOpenAssignSkuModal(warehouse, section, coord)}
                                                                >
                                                                    <div className="flex flex-col items-start w-full">
                                                                        <span className="font-semibold">{coord.name}</span>
                                                                        <span className="text-xs text-muted-foreground">
                                                                            SKUs: {coord.skus?.length || 0}/2
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
                                                                        <DropdownMenuItem onClick={() => handleOpenEditCoordinateModal(warehouse, section, coord)}>Editar</DropdownMenuItem>
                                                                        <AlertDialogTrigger asChild>
                                                                            <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                                                                        </AlertDialogTrigger>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            Esta acción no se puede deshacer. Se eliminará la coordenada '{coord.name}'.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                        <AlertDialogAction onClick={() => handleDelete('coordinate', section.id, coord.name)} className="bg-destructive hover:bg-destructive/90">
                                                                            Eliminar
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </div>
                                                        </AlertDialog>
                                                    ))}
                                                </div>
                                                <div className="flex justify-between items-center mt-4">
                                                     <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Eliminar Sección
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Esta acción no se puede deshacer. Se eliminará la sección '{section.name}' y todas sus coordenadas.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete('section', section.id)} className="bg-destructive hover:bg-destructive/90">
                                                                    Eliminar
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                    <Button variant="secondary" size="sm" onClick={() => handleOpenCoordinateModal(warehouse, section)}>
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
                                    <Button variant="ghost" onClick={() => handleOpenEditWarehouseModal(warehouse)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Editar Almacén
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" className="text-destructive hover:text-destructive">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Eliminar Almacén
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Esta acción no se puede deshacer. Se eliminará el almacén '{warehouse.name}' y todas sus secciones y coordenadas.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete('warehouse', warehouse.id)} className="bg-destructive hover:bg-destructive/90">
                                                    Eliminar
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
            {/* Add Modals */}
            <AddWarehouseForm isOpen={isWarehouseModalOpen} onOpenChange={setIsWarehouseModalOpen} onActionSuccess={handleActionSuccess} />
            <AddSectionForm isOpen={isSectionModalOpen} onOpenChange={setIsSectionModalOpen} warehouse={selectedWarehouse} onActionSuccess={handleActionSuccess} />
            <AddCoordinateForm isOpen={isCoordinateModalOpen} onOpenChange={setIsCoordinateModalOpen} section={selectedSection} onActionSuccess={handleActionSuccess} />
            
            {/* Edit Modals */}
            <EditWarehouseForm isOpen={isEditWarehouseModalOpen} onOpenChange={setIsEditWarehouseModalOpen} warehouse={selectedWarehouse} onActionSuccess={handleActionSuccess} />
            <EditSectionForm isOpen={isEditSectionModalOpen} onOpenChange={setIsEditSectionModalOpen} section={selectedSection} onActionSuccess={handleActionSuccess} />
            <EditCoordinateForm isOpen={isEditCoordinateModalOpen} onOpenChange={setIsEditCoordinateModalOpen} section={selectedSection} coordinate={selectedCoordinate} onActionSuccess={handleActionSuccess} />

            {/* Assign SKU Modal */}
            <AssignSkuForm 
                isOpen={isAssignSkuModalOpen} 
                onOpenChange={setIsAssignSkuModalOpen}
                section={selectedSection}
                coordinate={selectedCoordinate}
                onActionSuccess={handleActionSuccess}
            />
        </>
    );
}
