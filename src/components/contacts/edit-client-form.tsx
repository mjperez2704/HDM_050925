
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

type Client = {
    razonSocial: string;
    email: string;
    telefono: string;
    rfc: string;
};

type EditClientFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  client: Client | null;
};

export function EditClientForm({ isOpen, onOpenChange, client }: EditClientFormProps) {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            razonSocial: client?.razonSocial || '',
            email: client?.email || '',
            telefono: client?.telefono || '',
            rfc: client?.rfc || '',
        }
    });

    useEffect(() => {
        if (client) {
            reset(client);
        }
    }, [client, reset]);

    const onSubmit = (data: any) => {
        console.log(data);
        onOpenChange(false);
    };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
            <DialogDescription>
                Actualiza los datos del cliente.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
            <div className="space-y-2">
                <Label htmlFor="client-name">Nombre / Razón Social</Label>
                <Input id="client-name" {...register('razonSocial')} className="border-destructive focus:border-destructive ring-offset-background focus-visible:ring-destructive" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="client-type">Tipo de Cliente</Label>
                <Select>
                <SelectTrigger id="client-type">
                    <SelectValue placeholder="Cliente Final" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="final">Cliente Final</SelectItem>
                    <SelectItem value="distribuidor">Distribuidor</SelectItem>
                    <SelectItem value="empresa">Empresa</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="client-email">Email</Label>
                <Input id="client-email" type="email" {...register('email')} />
                </div>
                <div className="space-y-2">
                <Label htmlFor="client-phone">Teléfono</Label>
                <Input id="client-phone" type="tel" {...register('telefono')} />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="client-rfc">RFC (Opcional)</Label>
                <Input id="client-rfc" {...register('rfc')} />
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
