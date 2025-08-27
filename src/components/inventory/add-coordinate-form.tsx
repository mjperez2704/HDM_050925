
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

type AddCoordinateFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  warehouseName?: string;
  sectionName?: string;
};

export function AddCoordinateForm({ isOpen, onOpenChange, warehouseName, sectionName }: AddCoordinateFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Nueva Coordenada</DialogTitle>
          <DialogDescription>
            Agregando a {warehouseName} / {sectionName}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="coordinate-name">Nombre de la Coordenada</Label>
            <Input id="coordinate-name" placeholder="Ej. A1-001" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Crear Coordenada</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
