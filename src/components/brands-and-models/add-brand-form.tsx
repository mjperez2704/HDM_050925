
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

type AddBrandFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddBrandForm({ isOpen, onOpenChange }: AddBrandFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Nueva Marca</DialogTitle>
          <DialogDescription>
            Completa los campos para registrar una nueva marca.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="brand-name">
              Nombre de la Marca
            </Label>
            <Input
              id="brand-name"
              placeholder="Ej. Apple"
              className="border-destructive/50 focus:border-destructive ring-offset-background focus-visible:ring-destructive"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="origin-country">
              País de Origen (Opcional)
            </Label>
            <Input
              id="origin-country"
              placeholder="Ej. USA"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Crear Marca</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
