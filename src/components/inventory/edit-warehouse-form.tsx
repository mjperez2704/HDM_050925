
"use client";

import { useEffect } from 'react';
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
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { updateWarehouse } from '@/actions/inventory-actions';


type Warehouse = {
    id: number;
    name: string;
    description: string | null;
};

type EditWarehouseFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  warehouse: Warehouse | null;
  onActionSuccess: () => void;
};

const FormSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido.'),
  description: z.string().optional(),
});


export function EditWarehouseForm({ isOpen, onOpenChange, warehouse, onActionSuccess }: EditWarehouseFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (warehouse) {
      form.reset({
        name: warehouse.name,
        description: warehouse.description || '',
      });
    }
  }, [warehouse, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!warehouse) return;
    const result = await updateWarehouse(warehouse.id, data);
    toast({
        title: result.success ? "Éxito" : "Error",
        description: result.message,
        variant: result.success ? "default" : "destructive",
    });
    if (result.success) {
        onActionSuccess();
        onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader>
                <DialogTitle>Editar Almacén</DialogTitle>
                <DialogDescription>
                    Modifica los detalles de tu almacén.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nombre del Almacén</FormLabel>
                        <FormControl>
                        <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                        <Textarea {...field} />
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
                <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Guardar Cambios</Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
