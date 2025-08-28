
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
import { Checkbox } from "@/components/ui/checkbox";

type AddUserFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddUserForm({ isOpen, onOpenChange }: AddUserFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
          <DialogDescription>
            Completa los datos para crear un nuevo usuario en el sistema.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="user-name">Nombre</Label>
            <Input id="user-name" placeholder="Juan" className="border-primary/50 focus:border-primary ring-offset-background focus-visible:ring-primary" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-lastname">Apellido Paterno</Label>
            <Input id="user-lastname" placeholder="Pérez" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-email">Email</Label>
            <Input id="user-email" type="email" placeholder="juan.perez@ejemplo.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-password">Contraseña</Label>
            <Input id="user-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-role">Rol</Label>
            <Select>
                <SelectTrigger id="user-role">
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
          <div className="items-top flex space-x-2 pt-2">
            <Checkbox id="change-password" />
            <div className="grid gap-1.5 leading-none">
                <Label
                htmlFor="change-password"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                El usuario deberá cambiar la contraseña al iniciar sesión
                </Label>
            </div>
          </div>
          <div className="items-top flex space-x-2">
            <Checkbox id="register-pin" />
            <div className="grid gap-1.5 leading-none">
                <Label
                htmlFor="register-pin"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                El usuario deberá registrar PIN de confirmación al inicar sesión
                </Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
