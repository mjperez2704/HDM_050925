
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Home, Boxes, MapPin } from 'lucide-react';

// Función para generar un número aleatorio entre min y max (incluidos)
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generar los datos del inventario
const generateInventoryData = () => {
  const warehouses = ['Almacén A', 'Almacén B', 'Almacén C', 'Almacén D', 'Almacén E', 'Almacén F'];
  const sections = ['Sección ALFA', 'Sección BETA', 'Sección GAMA'];
  
  return warehouses.map(warehouseName => ({
    name: warehouseName,
    sections: sections.map(sectionName => ({
      name: sectionName,
      coordinates: Array.from({ length: getRandomInt(1, 10) }, (_, i) => `COORD-${i + 1}`)
    }))
  }));
};

type InventoryData = ReturnType<typeof generateInventoryData>;

export function VisualInventory() {
  const [inventoryData, setInventoryData] = useState<InventoryData>([]);

  useEffect(() => {
    setInventoryData(generateInventoryData());
  }, []);

  return (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center mb-4">Representación Visual del Inventario</h2>
        <Accordion type="multiple" className="w-full space-y-4">
        {inventoryData.map((warehouse, wIndex) => (
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
                            {warehouse.sections.map((section, sIndex) => (
                                <div key={sIndex} className="border rounded-md">
                                <AccordionItem value={`section-${wIndex}-${sIndex}`} className="border-b-0">
                                    <AccordionTrigger className="px-4 py-3 font-medium hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <Boxes className="h-5 w-5 text-muted-foreground" />
                                            {section.name}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 pt-2">
                                            {section.coordinates.map((coord, cIndex) => (
                                                <div key={cIndex} className="flex items-center gap-2 p-2 bg-muted rounded-md text-sm">
                                                    <MapPin className="h-4 w-4 text-primary/70" />
                                                    <span>{coord}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                </div>
                            ))}
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>
            </Card>
        ))}
        </Accordion>
    </div>
  );
}
