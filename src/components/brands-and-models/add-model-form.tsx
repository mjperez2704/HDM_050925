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

type AddModelFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  brandName?: string;
};

export function AddModelForm({ isOpen, onOpenChange, brandName }: AddModelFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Modelo</DialogTitle>
          <DialogDescription>
            Agregando/editando un modelo para la marca: <span className="font-bold">{brandName}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="model-name" className="col-span-4">
              Nombre del Modelo
            </Label>
            <Input
              id="model-name"
              placeholder="Ej. iPhone 15 Pro"
              className="col-span-4 border-primary/50 focus:border-primary ring-offset-background focus-visible:ring-primary"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="release-year" className="col-span-4">
              Año de Lanzamiento (Opcional)
            </Label>
            <Input
              id="release-year"
              placeholder="2025"
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
          <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Crear Modelo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
