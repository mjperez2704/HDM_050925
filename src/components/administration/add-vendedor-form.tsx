
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

type AddVendedorFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddVendedorForm({ isOpen, onOpenChange }: AddVendedorFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Vendedor</DialogTitle>
          <DialogDescription>
            Completa los campos para registrar un nuevo vendedor.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="vendedor-name">Nombre</Label>
            <Input id="vendedor-name" placeholder="Nombre completo del vendedor" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vendedor-email">Email</Label>
            <Input id="vendedor-email" type="email" placeholder="correo@ejemplo.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vendedor-slug">Slug</Label>
            <Input id="vendedor-slug" placeholder="Ej. ana-perez" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vendedor-quota">Cuota de Venta (Mensual)</Label>
            <Input id="vendedor-quota" type="number" placeholder="$0.00" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="vendedor-password">Contraseña</Label>
                <Input id="vendedor-password" type="password" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="vendedor-confirm-password">Confirmar Contraseña</Label>
                <Input id="vendedor-confirm-password" type="password" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Crear Vendedor</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
