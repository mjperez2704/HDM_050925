
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientSchema } from "@/lib/types/client";
import type { Client } from "@/lib/types/client";
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
import { createClient } from "@/actions/clients-actions";

type AddClientFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClientAdded: () => void;
};

const FormSchema = ClientSchema.omit({ id: true, fechaRegistro: true });

export function AddClientForm({ isOpen, onOpenChange, onClientAdded }: AddClientFormProps) {
  const { toast } = useToast();
  const form = useForm<Omit<Client, 'id' | 'fechaRegistro'>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      razonSocial: "",
      email: "",
      telefono: "",
      rfc: "",
      tipoCliente: undefined,
    }
  });

  async function onSubmit(data: Omit<Client, 'id' | 'fechaRegistro'>) {
    const result = await createClient(data);
    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
      });
    } else {
      toast({
        title: "Cliente Creado",
        description: "El nuevo cliente ha sido registrado exitosamente.",
      });
      onClientAdded();
      form.reset();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Cliente</DialogTitle>
              <DialogDescription>
                Completa los campos para registrar un nuevo cliente.
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <Button type="button" variant="ghost" onClick={() => { form.reset(); onOpenChange(false); }}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                Crear Cliente
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
