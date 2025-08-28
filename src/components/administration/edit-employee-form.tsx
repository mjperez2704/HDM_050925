
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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

type Employee = {
    name: string;
    email: string;
    position: string;
};

type EditEmployeeFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  employee: Employee | null;
};

export function EditEmployeeForm({ isOpen, onOpenChange, employee }: EditEmployeeFormProps) {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: employee?.name || '',
            email: employee?.email || '',
            position: employee?.position || '',
        }
    });

    useEffect(() => {
        if (employee) {
            reset(employee);
        }
    }, [employee, reset]);

    const onSubmit = (data: any) => {
        console.log(data);
        onOpenChange(false);
    };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
            <DialogTitle>Editar Empleado</DialogTitle>
            <DialogDescription>
                Actualiza los datos del empleado.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="employee-name">Nombre</Label>
                <Input id="employee-name" {...register('name')} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="employee-email">Email</Label>
                <Input id="employee-email" type="email" {...register('email')} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="employee-position">Puesto</Label>
                <Input id="employee-position" {...register('position')} />
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
            <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Guardar Cambios</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
