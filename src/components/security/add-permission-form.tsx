
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

type AddPermissionFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddPermissionForm({ isOpen, onOpenChange }: AddPermissionFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Permiso</DialogTitle>
          <DialogDescription>
            Completa los campos para registrar un nuevo permiso en el sistema.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="permission-key">Clave</Label>
            <Input id="permission-key" placeholder="Ej. inventario:ver_costo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="permission-module">Módulo</Label>
            <Input id="permission-module" placeholder="Ej. Inventario" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="permission-description">Descripción</Label>
            <Input id="permission-description" placeholder="Describe brevemente qué hace este permiso" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Guardar Permiso</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
