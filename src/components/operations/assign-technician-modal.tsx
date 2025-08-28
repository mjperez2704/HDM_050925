
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

type RepairOrder = {
  folio: string;
  assignedTechnician: string;
};

type AssignTechnicianModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  repairOrder: RepairOrder | null;
};

const technicians = [
    { id: '1', name: 'Juan Pérez' },
    { id: '2', name: 'Luis Martínez' },
    { id: '3', name: 'Pedro Gómez' },
];

export function AssignTechnicianModal({ isOpen, onOpenChange, repairOrder }: AssignTechnicianModalProps) {
  if (!repairOrder) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Asignar Técnico</DialogTitle>
          <DialogDescription>
            Selecciona el técnico que se encargará de la orden {repairOrder.folio}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="technician">Técnico</Label>
            <Select defaultValue={repairOrder.assignedTechnician}>
              <SelectTrigger id="technician">
                <SelectValue placeholder="Seleccione un técnico" />
              </SelectTrigger>
              <SelectContent>
                {technicians.map(tech => (
                    <SelectItem key={tech.id} value={tech.name}>{tech.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
            Asignar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
