
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

type AddRoleFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const permissions = [
    { id: 'usuarios', label: 'Usuarios' },
    { id: 'roles', label: 'Roles' },
    { id: 'clientes', label: 'Clientes' },
    { id: 'inventario', label: 'Inventario' },
    { id: 'ventas', label: 'Ventas' }
];

const actions = ['Ver', 'Crear', 'Editar', 'Eliminar'];

export function AddRoleForm({ isOpen, onOpenChange }: AddRoleFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Rol</DialogTitle>
          <DialogDescription>
            Define un nuevo rol y los permisos que tendrá.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="role-name">Nombre del Rol</Label>
                <Input id="role-name" placeholder="Ej. Gerente de Taller" className="border-primary/50 focus:border-primary ring-offset-background focus-visible:ring-primary" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="role-description">Descripción</Label>
                <Input id="role-description" placeholder="Breve descripción del rol" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Permisos</Label>
            <Accordion type="multiple" className="w-full">
                {permissions.map(permission => (
                    <AccordionItem key={permission.id} value={permission.id}>
                        <AccordionTrigger className="font-semibold">{permission.label}</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border rounded-md">
                                {actions.map(action => (
                                    <div key={`${permission.id}-${action}`} className="flex items-center space-x-2">
                                        <Checkbox id={`${permission.id}-${action.toLowerCase()}`} />
                                        <Label htmlFor={`${permission.id}-${action.toLowerCase()}`} className="font-normal">{action}</Label>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Guardar Rol</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
