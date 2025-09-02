
"use server";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Home, Boxes, MapPin } from 'lucide-react';
import { getWarehouseStructure } from '@/actions/inventory-actions';

export async function VisualInventory() {
  const inventoryData = await getWarehouseStructure();

  return (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center mb-4">Representación Visual del Inventario</h2>
        <Accordion type="multiple" className="w-full space-y-4">
        {inventoryData.length > 0 ? (
          inventoryData.map((warehouse, wIndex) => (
            <Card key={wIndex}>
                <AccordionItem value={`warehouse-${wIndex}`} className="border-b-0">
                    <AccordionTrigger className="p-6 text-lg font-semibold hover:no-underline">
                        <div className="flex items-center gap-3">
                            <Home className="h-6 w-6 text-primary" />
                            {warehouse.name}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                        <Accordion type="multiple" className="space-y-2">
                            {warehouse.sections.length > 0 ? (
                                warehouse.sections.map((section, sIndex) => (
                                    <div key={sIndex} className="border rounded-md">
                                        <AccordionItem value={`section-${wIndex}-${sIndex}`} className="border-b-0">
                                            <AccordionTrigger className="px-4 py-3 font-medium hover:no-underline">
                                                <div className="flex items-center gap-3">
                                                    <Boxes className="h-5 w-5 text-muted-foreground" />
                                                    {section.name}
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="px-4 pb-4">
                                                {section.coordinates.length > 0 ? (
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 pt-2">
                                                        {section.coordinates.map((coord, cIndex) => (
                                                            <div key={cIndex} className="flex flex-col items-start gap-2 p-2 bg-muted rounded-md text-sm">
                                                                <div className="flex items-center gap-2 font-semibold">
                                                                    <MapPin className="h-4 w-4 text-primary/70" />
                                                                    <span>{coord.name}</span>
                                                                </div>
                                                                <div className="pl-6 text-xs text-muted-foreground">
                                                                    {coord.skus.length > 0 ? coord.skus.join(', ') : 'Vacío'}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-center text-muted-foreground pt-2">No hay coordenadas en esta sección.</p>
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </div>
                                ))
                             ) : (
                                <p className="text-sm text-center text-muted-foreground">No hay secciones en este almacén.</p>
                             )}
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>
            </Card>
            ))
        ) : (
            <div className="text-center text-muted-foreground py-10">
                <p>No se encontró ninguna estructura de almacén. Comienza por agregar un almacén.</p>
            </div>
        )}
        </Accordion>
    </div>
  );
}
