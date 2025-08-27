
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
import { Textarea } from "@/components/ui/textarea";

type AddWarehouseFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddWarehouseForm({ isOpen, onOpenChange }: AddWarehouseFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Almacén</DialogTitle>
          <DialogDescription>
            Completa los campos para crear un nuevo almacén.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="warehouse-name">Nombre del Almacén</Label>
            <Input id="warehouse-name" placeholder="Ej. Almacén Central" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="warehouse-description">Descripción</Label>
            <Textarea id="warehouse-description" placeholder="Describe brevemente el propósito de este almacén." />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Crear Almacén</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
