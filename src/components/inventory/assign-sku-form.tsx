
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type AssignSkuFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  warehouseName?: string;
  sectionName?: string;
  coordinateName?: string;
  selectedSku?: string;
};

export function AssignSkuForm({ 
    isOpen, 
    onOpenChange, 
    warehouseName, 
    sectionName, 
    coordinateName,
    selectedSku 
}: AssignSkuFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Asignar SKU a Coordenada</DialogTitle>
          <DialogDescription>
            {warehouseName && sectionName && coordinateName 
              ? `Asignando a: ${warehouseName} / ${sectionName} / ${coordinateName}`
              : "Seleccione una ubicación para el SKU."
            }
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="product-sku">Producto (SKU)</Label>
            {selectedSku ? (
              <Input id="product-sku" value={selectedSku} disabled />
            ) : (
              <Select>
                  <SelectTrigger id="product-sku">
                      <SelectValue placeholder="Seleccione un SKU..." />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="par-ip15-pan">PAR-IP15-PAN - Pantalla iPhone 15</SelectItem>
                      <SelectItem value="acc-cab-usbc">ACC-CAB-USBC - Cable USB-C 1m</SelectItem>
                      <SelectItem value="equ-sam-s24">EQU-SAM-S24 - Samsung Galaxy S24</SelectItem>
                      <SelectItem value="her-des-01">HER-DES-01 - Kit Desarmadores Precisión</SelectItem>
                  </SelectContent>
              </Select>
            )}
          </div>
           {!coordinateName && (
             <div className="space-y-2">
                <Label htmlFor="coordinate">Coordenada</Label>
                <Select>
                    <SelectTrigger id="coordinate">
                        <SelectValue placeholder="Seleccione una coordenada..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="a1-001">Almacén Central / Anaquel A1 / A1-001</SelectItem>
                        <SelectItem value="a2-001">Almacén Central / Anaquel A2 / A2-001</SelectItem>
                        <SelectItem value="ct1-001">Bodega Técnicos / Cajón Técnico 1 / CT1-001</SelectItem>
                    </SelectContent>
                </Select>
            </div>
           )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Asignar SKU</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
