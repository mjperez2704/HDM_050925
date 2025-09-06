'use client';

import { useState, useEffect } from 'react';
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Boxes, MapPin, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { getWarehouseStructure, getProductsForSelect, assignSkuToCoordinate } from '@/actions/inventory-actions';

// --- Tipos de Datos ---
type Product = { id: number; sku: string; nombre: string; };
type WarehouseStructure = Awaited<ReturnType<typeof getWarehouseStructure>>;

// --- Props del Componente ---
type AssignCoordinatesModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  purchaseOrderSkus: string[];
};

export function AssignCoordinatesModal({ isOpen, onOpenChange, purchaseOrderSkus }: AssignCoordinatesModalProps) {
  const { toast } = useToast();

  // --- Estados del Componente ---
  const [selectedSku, setSelectedSku] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAssigning, setIsAssigning] = useState<string | null>(null); // Guarda la coordenada que se está asignando

  // --- Estados para Datos del Servidor ---
  const [products, setProducts] = useState<Product[]>([]);
  const [warehouses, setWarehouses] = useState<WarehouseStructure>([]);

  // --- Efecto para Cargar Datos ---
  useEffect(() => {
    if (isOpen) {
      async function loadData() {
        setIsLoading(true);
        try {
          const [productsData, warehouseData] = await Promise.all([
            getProductsForSelect(),
            getWarehouseStructure()
          ]);
          setProducts(productsData);
          setWarehouses(warehouseData);
        } catch (error) {
          toast({ variant: "destructive", title: "Error de Carga", description: "No se pudieron cargar los datos de productos y almacenes." });
        }
        setIsLoading(false);
      }
      loadData();
    }
  }, [isOpen, toast]);

  // --- Manejador de Asignación ---
  const handleAssignCoordinate = async (coordinateName: string, sectionId: number) => {
    if (!selectedSku) {
      toast({ variant: "destructive", title: "Error", description: "Por favor, selecciona un producto (SKU) primero." });
      return;
    }

    const product = products.find(p => p.sku === selectedSku);
    if (!product) {
      toast({ variant: "destructive", title: "Error", description: `No se encontró la información del producto con SKU ${selectedSku}.` });
      return;
    }

    setIsAssigning(coordinateName);
    const result = await assignSkuToCoordinate({
      coordinateName,
      sectionId,
      productId: product.id,
    });
    setIsAssigning(null);

    if (result.success) {
      toast({
        title: "Asignación Exitosa",
        description: `SKU ${selectedSku} asignado a ${coordinateName}.`,
        className: 'bg-green-100 border-green-300 text-green-800',
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error de Asignación",
        description: result.message, // Mensaje de error real desde el servidor
      });
    }
  };

  // --- Renderizado del Componente ---
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Asignar Coordenadas de Recepción</DialogTitle>
          <DialogDescription>
            Selecciona un SKU y asígnale una coordenada de destino en el almacén.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="sku-select">Producto (SKU) de la Orden</Label>
            <Select onValueChange={setSelectedSku} disabled={isLoading}>
              <SelectTrigger id="sku-select">
                <SelectValue placeholder={isLoading ? "Cargando datos..." : "Selecciona un SKU para ubicar..."} />
              </SelectTrigger>
              <SelectContent>
                {purchaseOrderSkus.map(sku => (
                  <SelectItem key={sku} value={sku}>{sku}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : selectedSku ? (
            <Card>
              <CardContent className="pt-6">
                <Accordion type="multiple" className="w-full">
                  {warehouses.map(warehouse => (
                    <AccordionItem key={warehouse.id} value={warehouse.name}>
                      <AccordionTrigger className="font-semibold text-lg">{warehouse.name}</AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <div className="space-y-3">
                          {warehouse.sections.map(section => (
                            <div key={section.id} className="p-4 border rounded-lg bg-muted/50">
                              <div className="flex items-center gap-2 mb-3">
                                <Boxes className="h-5 w-5 text-muted-foreground" />
                                <h4 className="font-medium">{section.name}</h4>
                              </div>
                              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                                {section.coordinates.map(coord => (
                                  <Button
                                    key={coord.name}
                                    variant="outline"
                                    className="flex items-center gap-2"
                                    disabled={isAssigning === coord.name}
                                    onClick={() => handleAssignCoordinate(coord.name, section.id)}
                                  >
                                    {isAssigning === coord.name ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <MapPin className="h-4 w-4 text-primary/70" />
                                    )}
                                    <span>{coord.name}</span>
                                  </Button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ) : (
             <div className="text-center text-muted-foreground py-12 border-2 border-dashed rounded-lg">
                <p>Selecciona un producto para ver la estructura de almacenes.</p>
             </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
