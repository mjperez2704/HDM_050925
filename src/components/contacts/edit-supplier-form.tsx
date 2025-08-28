
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
import { Textarea } from "@/components/ui/textarea";

type Supplier = {
    razonSocial: string;
    email: string;
    tipo: string;
    origen: string;
};

type EditSupplierFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  supplier: Supplier | null;
};

export function EditSupplierForm({ isOpen, onOpenChange, supplier }: EditSupplierFormProps) {
    const { register, handleSubmit, reset, setValue } = useForm({
        defaultValues: {
            razonSocial: supplier?.razonSocial || '',
            email: supplier?.email || '',
            tipo: supplier?.tipo || 'Nacional',
            origen: supplier?.origen || 'México',
            rfc: '',
            creditDays: '0',
            contactPerson: '',
            phone: '',
            address: '',
        }
    });

    useEffect(() => {
        if (supplier) {
            reset({
                razonSocial: supplier.razonSocial,
                email: supplier.email,
                tipo: supplier.tipo,
                origen: supplier.origen,
            });
        }
    }, [supplier, reset]);

    const onSubmit = (data: any) => {
        console.log(data);
        onOpenChange(false);
    };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
            <DialogTitle>Editar Proveedor</DialogTitle>
            <DialogDescription>
                Actualiza los datos del proveedor.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
            <div className="space-y-2">
                <Label htmlFor="supplier-name">Razón Social</Label>
                <Input id="supplier-name" {...register('razonSocial')} className="border-destructive focus:border-destructive ring-offset-background focus-visible:ring-destructive" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="supplier-rfc">RFC</Label>
                <Input id="supplier-rfc" {...register('rfc')} />
                </div>
                <div className="space-y-2">
                <Label htmlFor="credit-days">Días de Crédito</Label>
                <Input id="credit-days" type="number" {...register('creditDays')} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="supplier-type">Tipo de Proveedor</Label>
                <Select onValueChange={(value) => setValue('tipo', value)} defaultValue={supplier?.tipo}>
                    <SelectTrigger id="supplier-type">
                    <SelectValue placeholder="Productos" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="Productos">Productos</SelectItem>
                    <SelectItem value="Servicios">Servicios</SelectItem>
                    <SelectItem value="Mixto">Mixto</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div className="space-y-2">
                <Label htmlFor="supplier-origin">Origen</Label>
                <Select onValueChange={(value) => setValue('origen', value)} defaultValue={supplier?.origen}>
                    <SelectTrigger id="supplier-origin">
                    <SelectValue placeholder="Nacional" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="Nacional">Nacional</SelectItem>
                    <SelectItem value="Internacional">Internacional</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="contact-person">Persona de Contacto</Label>
                <Input id="contact-person" {...register('contactPerson')} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="supplier-email">Email</Label>
                <Input id="supplier-email" type="email" {...register('email')} />
                </div>
                <div className="space-y-2">
                <Label htmlFor="supplier-phone">Teléfono</Label>
                <Input id="supplier-phone" type="tel" {...register('phone')} />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="supplier-address">Dirección</Label>
                <Textarea id="supplier-address" {...register('address')} />
            </div>
            </div>
            <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="ghost">
                Cancelar
                </Button>
            </DialogClose>
            <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                Guardar Cambios
            </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
