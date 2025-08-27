
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type AddEmployeeFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddEmployeeForm({ isOpen, onOpenChange }: AddEmployeeFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Empleado</DialogTitle>
          <DialogDescription>
            Completa los campos para registrar un nuevo empleado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="employee-name">Nombre</Label>
            <Input id="employee-name" placeholder="Nombre completo del empleado" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="employee-email">Email</Label>
            <Input id="employee-email" type="email" placeholder="correo@ejemplo.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="employee-position">Puesto</Label>
            <Input id="employee-position" placeholder="Ej. Técnico Senior" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="employee-role">Rol en el Sistema</Label>
            <Select>
                <SelectTrigger id="employee-role">
                    <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="tecnico">Técnico</SelectItem>
                    <SelectItem value="ventas">Ventas</SelectItem>
                    <SelectItem value="gerente">Gerente</SelectItem>
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
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Crear Empleado</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
