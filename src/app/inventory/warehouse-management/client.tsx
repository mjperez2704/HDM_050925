'use client';

import { Key, useState} from 'react';
import {getWarehouseStructure} from '@/actions/inventory-actions';
import {Button, buttonVariants} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription} from '@/components/ui/dialog';
import {EditSectionForm, SectionWithRules} from '@/components/inventory/edit-section-form';
import {Badge} from '@/components/ui/badge';
import {Home, Settings, Warehouse, PlusCircle, GripVertical, Tag, PackageCheck, Package} from 'lucide-react';

// Definimos el tipo de los datos que recibimos del servidor
type WarehouseData = Awaited<ReturnType<typeof getWarehouseStructure>>;

interface WarehouseManagementClientPageProps {
    initialWarehouseData: WarehouseData;
}

export default function WarehouseManagementClientPage({initialWarehouseData}: WarehouseManagementClientPageProps) {
    const [warehouses, setWarehouses] = useState(initialWarehouseData);
    const [editingSection, setEditingSection] = useState<SectionWithRules | null>(null);

    const handleOpenEditDialog = (section: SectionWithRules) => {
        setEditingSection(section);
    };

    const handleCloseEditDialog = () => {
        setEditingSection(null);
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Gestión de Almacenes</CardTitle>
                    <CardDescription>
                        Visualiza y gestiona la estructura de tus almacenes, secciones y coordenadas.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4"/>
                        Crear Almacén
                    </Button>
                </CardContent>
            </Card>

            <Accordion type="multiple" className="w-full space-y-4">
                {warehouses.map((warehouse) => (
                    <Card key={warehouse.id}>
                        <AccordionItem value={`warehouse-${warehouse.id}`} className="border-b-0">
                            <AccordionTrigger className="p-6 hover:no-underline">
                                <div className="flex items-center gap-4">
                                    <Warehouse className="h-6 w-6 text-primary"/>
                                    <div>
                                        <h3 className="text-lg font-semibold">{warehouse.name}</h3>
                                        <p className="text-sm text-muted-foreground">{warehouse.description}</p>
                                    </div>
                                    <Badge variant="secondary">{warehouse.sectionsCount} secciones</Badge>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-6 pt-0">
                                <div className="space-y-4">
                                    <Button variant="outline" size="sm">
                                        <PlusCircle className="mr-2 h-4 w-4"/>
                                        Añadir Sección
                                    </Button>
                                    <Accordion type="multiple" className="w-full space-y-2">
                                        {warehouse.sections.map((section) => (
                                            <div key={section.id} className="rounded-md border">
                                                <AccordionItem value={`section-${section.id}`} className="border-b-0">
                                                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                                                        <div className="flex flex-1 items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <Home className="h-5 w-5 text-muted-foreground"/>
                                                                <span className="font-medium">{section.name}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {section.rules.marcaId && <Badge variant="outline"><Tag
                                                                    className="mr-1 h-3 w-3"/>Marca</Badge>}
                                                                {section.rules.estatusId &&
                                                                    <Badge variant="outline"><PackageCheck
                                                                        className="mr-1 h-3 w-3"/>Estatus</Badge>}
                                                                {section.rules.finalidadId &&
                                                                    <Badge variant="outline"><Package
                                                                        className="mr-1 h-3 w-3"/>Finalidad</Badge>}
                                                                <div
                                                                    role="button"
                                                                    tabIndex={0}
                                                                    className={buttonVariants({ variant: "ghost", size: "icon" })}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation(); // Evita que el acordeón se cierre
                                                                        handleOpenEditDialog(section);
                                                                    }}
                                                                >
                                                                    <Settings className="h-4 w-4"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="px-4 pb-4">
                                                        <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                                                            <h4 className="font-semibold">Coordenadas</h4>
                                                            {section.coordinates.length > 0 ? (
                                                                <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                                                    {section.coordinates.map((coord: { id: Key | null | undefined; name: string; skus: any[]; }) => (
                                                                        <li key={coord.id} className="flex items-center gap-2 rounded-md bg-background p-2 text-sm">
                                                                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                                                                            <span>{coord.name}</span>
                                                                            {coord.skus.length > 0 && <Badge>{coord.skus.length}</Badge>}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <p className="text-sm text-muted-foreground">No hay coordenadas en esta sección.</p>
                                                            )}
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </div>
                                        ))}
                                    </Accordion>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Card>
                ))}
            </Accordion>

            {/* Diálogo para editar reglas de sección */}
            <Dialog open={!!editingSection} onOpenChange={(open) => !open && handleCloseEditDialog()}>
                <DialogContent className="sm:max-w-[425px]">
                    {editingSection && (
                        <>
                            <DialogHeader>
                                <DialogTitle>Reglas de la Sección: {editingSection.name}</DialogTitle>
                                <DialogDescription>
                                    Define qué productos se pueden almacenar aquí. Si una regla es "Cualquiera", no se aplicará restricción.
                                </DialogDescription>
                            </DialogHeader>
                            <EditSectionForm
                                section={editingSection}
                                onClose={handleCloseEditDialog}
                            />
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
