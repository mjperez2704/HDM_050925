
"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from '@/components/ui/card';
import { Boxes, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

type AssignCoordinatesModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  purchaseOrderSkus: string[];
};

// Mock data simulating valid locations based on business rules
const validLocations = {
    'par-ip15-pan': {
        warehouse: 'Almacén Central',
        sections: [
            { 
                name: 'Anaquel A1 - Pantallas', 
                coordinates: ['A1-001', 'A1-002', 'A1-003']
            }
        ]
    },
    'acc-cab-usbc': {
        warehouse: 'Almacén Central',
        sections: [
            { 
                name: 'Mostrador - Accesorios', 
                coordinates: ['M-ACC-01', 'M-ACC-02']
            },
            {
                name: 'Bodega - Varios',
                coordinates: ['B-VAR-05', 'B-VAR-06']
            }
        ]
    }
}

export function AssignCoordinatesModal({ isOpen, onOpenChange, purchaseOrderSkus }: AssignCoordinatesModalProps) {
  const [selectedSku, setSelectedSku] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAssignCoordinate = (coordinate: string) => {
    toast({
        title: "Coordenada Asignada",
        description: `El SKU ${selectedSku} ha sido asignado a la coordenada ${coordinate}.`,
    });
    // Here you would add logic to save this assignment
  };
  
  const locations = selectedSku ? validLocations[selectedSku as keyof typeof validLocations] : null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Asignar Coordenadas de Recepción</DialogTitle>
          <DialogDescription>
            Selecciona un SKU de la orden y asígnale una coordenada de destino.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="sku-select">Producto (SKU)</Label>
            <Select onValueChange={setSelectedSku}>
              <SelectTrigger id="sku-select">
                <SelectValue placeholder="Selecciona un SKU para ubicar..." />
              </SelectTrigger>
              <SelectContent>
                {purchaseOrderSkus.map(sku => (
                  <SelectItem key={sku} value={sku}>{sku}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {locations && (
            <Card>
                <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-4">{locations.warehouse}</h3>
                    <div className="space-y-4">
                        {locations.sections.map((section, sIndex) => (
                            <div key={sIndex} className="p-4 border rounded-lg">
                                <div className="flex items-center gap-2 mb-3">
                                    <Boxes className="h-5 w-5 text-muted-foreground" />
                                    <h4 className="font-medium">{section.name}</h4>
                                </div>
                                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                                    {section.coordinates.map((coord, cIndex) => (
                                        <Button 
                                            key={cIndex} 
                                            variant="outline" 
                                            className="flex items-center gap-2"
                                            onClick={() => handleAssignCoordinate(coord)}
                                        >
                                            <MapPin className="h-4 w-4 text-primary/70" />
                                            <span>{coord}</span>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
          )}

          {!selectedSku && (
             <div className="text-center text-muted-foreground py-8">
                <p>Selecciona un producto para ver sus ubicaciones disponibles.</p>
             </div>
          )}

        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Finalizar Asignación
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
