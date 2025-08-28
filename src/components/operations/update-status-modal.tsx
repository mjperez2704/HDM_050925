
"use client";

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
import { Textarea } from "@/components/ui/textarea";

type RepairOrder = {
  folio: string;
  status: string;
};

type UpdateStatusModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  repairOrder: RepairOrder | null;
};

export function UpdateStatusModal({ isOpen, onOpenChange, repairOrder }: UpdateStatusModalProps) {
  if (!repairOrder) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Actualizar Estado de la Orden</DialogTitle>
          <DialogDescription>
            Folio: {repairOrder.folio}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="status">Nuevo Estado</Label>
            <Select defaultValue={repairOrder.status}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Seleccione un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="En Diagnóstico">En Diagnóstico</SelectItem>
                <SelectItem value="Pendiente de Refacción">Pendiente de Refacción</SelectItem>
                <SelectItem value="En Reparación">En Reparación</SelectItem>
                <SelectItem value="Reparado">Reparado</SelectItem>
                <SelectItem value="Entregado">Entregado</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notas (Opcional)</Label>
            <Textarea id="notes" placeholder="Agregue una nota interna sobre el cambio de estado..." />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
            Actualizar Estado
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
