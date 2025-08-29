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
import type { Product } from "@/lib/types/product";

type StockDetail = {
  warehouse: string;
  section: string;
  coordinate: string;
  quantity: number;
};

// Simulación de datos de detalle de stock
const mockStockDetails: { [key: string]: StockDetail[] } = {
    'PAR-IP15-PAN': [
        { warehouse: 'Almacén Central', section: 'Anaquel A1 - Pantallas', coordinate: 'A1-001', quantity: 10 },
        { warehouse: 'Almacén Central', section: 'Anaquel A1 - Pantallas', coordinate: 'A1-002', quantity: 5 },
    ],
    'ACC-CAB-USBC': [
        { warehouse: 'Almacén Central', section: 'Mostrador', coordinate: 'M-001', quantity: 250 },
        { warehouse: 'Bodega de Técnicos', section: 'Cajón 1', coordinate: 'CT1-001', quantity: 50 },
    ],
    // 'EQU-SAM-S24' no tiene detalles para probar el caso sin stock
};


type StockDetailsModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  item: Product | null;
};

export function StockDetailsModal({ isOpen, onOpenChange, item }: StockDetailsModalProps) {
  if (!item) return null;
  
  const details = mockStockDetails[item.sku] || [];
  const totalStock = details.reduce((sum, detail) => sum + detail.quantity, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Detalle de Existencias: {item.name}</DialogTitle>
           <DialogDescription>
             <div className="text-sm text-muted-foreground flex items-center gap-2 pt-2">
                <span>SKU: {item.sku}</span>
                <span>|</span>
                <span>Existencia Total:</span>
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
              {details.length > 0 ? (
                details.map((detail, index) => (
                    <TableRow key={index}>
                    <TableCell>{detail.warehouse}</TableCell>
                    <TableCell>{detail.section}</TableCell>
                    <TableCell>{detail.coordinate}</TableCell>
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
