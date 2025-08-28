
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
          <div className="space-y-2">
            <Label htmlFor="model-name">
              Nombre del Modelo
            </Label>
            <Input
              id="model-name"
              placeholder="Ej. iPhone 15 Pro"
              className="border-destructive/50 focus:border-destructive ring-offset-background focus-visible:ring-destructive"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="release-year">
              Año de Lanzamiento (Opcional)
            </Label>
            <Input
              id="release-year"
              placeholder="2025"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Crear Modelo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
