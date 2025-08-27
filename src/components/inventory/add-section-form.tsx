
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

type AddSectionFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  warehouseName?: string;
};

export function AddSectionForm({ isOpen, onOpenChange, warehouseName }: AddSectionFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Nueva Sección</DialogTitle>
          <DialogDescription>
            Agregando sección al almacén: <span className="font-semibold">{warehouseName}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="section-name">Nombre de la Sección</Label>
            <Input id="section-name" placeholder="Ej. Anaquel A1 - Pantallas" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Crear Sección</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
