
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { createSection } from '@/actions/inventory-actions';

type Warehouse = { id: number; name: string };

type AddSectionFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  warehouse: Warehouse | null;
  onActionSuccess: () => void;
};

const FormSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido.'),
  warehouseId: z.number().int().positive(),
});


export function AddSectionForm({ isOpen, onOpenChange, warehouse, onActionSuccess }: AddSectionFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      warehouseId: warehouse?.id
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await createSection(data);
    toast({
        title: result.success ? "Éxito" : "Error",
        description: result.message,
        variant: result.success ? "default" : "destructive",
    });
    if (result.success) {
        onActionSuccess();
        onOpenChange(false);
    }
  }
  
  if (isOpen && warehouse) {
    form.setValue('warehouseId', warehouse.id);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Agregar Nueva Sección</DialogTitle>
              <DialogDescription>
                Agregando sección al almacén: <span className="font-semibold">{warehouse?.name}</span>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la Sección</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Anaquel A1 - Pantallas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Crear Sección</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
