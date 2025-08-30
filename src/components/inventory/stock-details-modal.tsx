import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ProductWithStock } from "@/lib/types/inventory";
import { EyeOff } from 'lucide-react';

type StockDetailsModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  item: ProductWithStock | null;
};

export function StockDetailsModal({ isOpen, onOpenChange, item }: StockDetailsModalProps) {
  if (!item) return null;
  
  // El cálculo ahora se hace con los datos reales que vienen del servidor
  const totalStock = item.details.reduce((sum, detail) => sum + detail.quantity, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Detalle de Existencias: {item.nombre}</DialogTitle>
           <DialogDescription>
             <div className="text-sm text-muted-foreground flex items-center gap-2 pt-2">
                <span>SKU: {item.sku}</span>
                <span>|</span>
                <span>Existencia Total (Todas las coordenadas):</span>
                <Badge variant="default">{totalStock}</Badge>
            </div>
           </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Almacén</TableHead>
                <TableHead>Sección</TableHead>
                <TableHead>Coordenada</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {item.details.length > 0 ? (
                item.details.map((detail, index) => (
                    <TableRow key={index}>
                    <TableCell>{detail.warehouse}</TableCell>
                    <TableCell>{detail.section}</TableCell>
                    <TableCell className="flex items-center gap-2">
                        {detail.coordinate}
                        {!detail.visible && <EyeOff className="h-4 w-4 text-muted-foreground" title="Coordenada no visible" />}
                    </TableCell>
                    <TableCell className="text-right">{detail.quantity}</TableCell>
                    </TableRow>
                ))
              ) : (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No hay detalles de ubicación para este producto.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
