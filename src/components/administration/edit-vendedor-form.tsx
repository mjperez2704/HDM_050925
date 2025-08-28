
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

type Vendedor = {
    name: string;
    slug: string;
    email: string;
    quota: string;
};

type EditVendedorFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  vendedor: Vendedor | null;
};

export function EditVendedorForm({ isOpen, onOpenChange, vendedor }: EditVendedorFormProps) {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: vendedor?.name || '',
            slug: vendedor?.slug || '',
            email: vendedor?.email || '',
            quota: vendedor?.quota.replace(/[^0-9.]/g, '') || '0',
        }
    });

    useEffect(() => {
        if (vendedor) {
            reset({
                ...vendedor,
                quota: vendedor.quota.replace(/[^0-9.]/g, ''),
            });
        }
    }, [vendedor, reset]);

    const onSubmit = (data: any) => {
        console.log(data);
        onOpenChange(false);
    };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
            <DialogTitle>Editar Vendedor</DialogTitle>
            <DialogDescription>
                Actualiza los datos del vendedor.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="vendedor-name">Nombre</Label>
                <Input id="vendedor-name" {...register('name')} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="vendedor-email">Email</Label>
                <Input id="vendedor-email" type="email" {...register('email')} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="vendedor-slug">Slug</Label>
                <Input id="vendedor-slug" {...register('slug')} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="vendedor-quota">Cuota de Venta (Mensual)</Label>
                <Input id="vendedor-quota" type="number" {...register('quota')} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="vendedor-password">Nueva Contraseña</Label>
                    <Input id="vendedor-password" type="password" placeholder="Dejar en blanco para no cambiar" />
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
            <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Guardar Cambios</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
