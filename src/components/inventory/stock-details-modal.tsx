import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type StockDetail = {
  warehouse: string;
  section: string;
  coordinate: string;
  quantity: number;
};

type InventoryItem = {
  sku: string;
  name: string;
  stock: number;
  details: StockDetail[];
};

type StockDetailsModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  item: InventoryItem | null;
};

export function StockDetailsModal({ isOpen, onOpenChange, item }: StockDetailsModalProps) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Detalle de Existencias: {item.name}</DialogTitle>
          <div className="text-sm text-muted-foreground flex items-center gap-2 pt-2">
            <span>SKU: {item.sku}</span>
            <span>|</span>
            <span>Existencia Total:</span>
            <Badge variant="default">{item.stock}</Badge>
          </div>
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
              {item.details.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell>{detail.warehouse}</TableCell>
                  <TableCell>{detail.section}</TableCell>
                  <TableCell>{detail.coordinate}</TableCell>
                  <TableCell className="text-right">{detail.quantity}</TableCell>
                </TableRow>
              ))}
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
