
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClientSchema, ClientWithId } from '@/lib/types/client';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { updateClient } from '@/actions/clients-actions';

type EditClientFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  client: ClientWithId | null;
  onClientUpdated: () => void;
};

const FormSchema = ClientSchema.omit({ fechaRegistro: true });

export function EditClientForm({ isOpen, onOpenChange, client, onClientUpdated }: EditClientFormProps) {
    const { toast } = useToast();
    const form = useForm<ClientWithId>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: client?.id || 0,
            razonSocial: client?.razonSocial || '',
            email: client?.email || '',
            telefono: client?.telefono || '',
            rfc: client?.rfc || '',
            tipoCliente: 'final', // default value
        }
    });

    useEffect(() => {
        if (client) {
            form.reset(client);
        }
    }, [client, form]);

    async function onSubmit(data: ClientWithId) {
        const result = await updateClient(data);
        if (!result.success) {
             toast({
                variant: "destructive",
                title: "Error",
                description: result.message,
            });
        } else {
             toast({
                title: "Éxito",
                description: result.message,
            });
            onClientUpdated();
        }
    };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
            <DialogDescription>
                Actualiza los datos del cliente.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
             <FormField
                control={form.control}
                name="razonSocial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre / Razón Social</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Juan Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tipoCliente"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Cliente</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="final">Cliente Final</SelectItem>
                        <SelectItem value="distribuidor">Distribuidor</SelectItem>
                        <SelectItem value="empresa">Empresa</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contacto@ejemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Ej. 55 1234 5678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="rfc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RFC (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Registro Federal de Contribuyentes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                Cancelar
                </Button>
            </DialogClose>
            <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                Guardar Cambios
            </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
