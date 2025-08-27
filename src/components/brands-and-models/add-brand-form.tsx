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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="brand-name" className="col-span-4">
              Nombre de la Marca
            </Label>
            <Input
              id="brand-name"
              placeholder="Ej. Apple"
              className="col-span-4 border-primary/50 focus:border-primary ring-offset-background focus-visible:ring-primary"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="origin-country" className="col-span-4">
              País de Origen (Opcional)
            </Label>
            <Input
              id="origin-country"
              placeholder="Ej. USA"
              className="col-span-4"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Crear Marca</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
