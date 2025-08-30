
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { updateBrand } from "@/actions/brands-actions";
import type { BrandWithModels } from '@/actions/brands-actions';

type EditBrandFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  brand: BrandWithModels | null;
  onBrandUpdated: () => void;
};

const FormSchema = z.object({
  id: z.number().int().positive(),
  nombre: z.string().min(1, 'El nombre de la marca es requerido.'),
  pais_origen: z.string().optional(),
});

export function EditBrandForm({ isOpen, onOpenChange, brand, onBrandUpdated }: EditBrandFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (brand) {
      form.reset({
        id: brand.id,
        nombre: brand.nombre,
        pais_origen: brand.pais_origen || '',
      });
    }
  }, [brand, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await updateBrand(data);
    if (result.success) {
      toast({ title: "Éxito", description: result.message });
      onBrandUpdated();
      onOpenChange(false);
    } else {
      toast({ variant: "destructive", title: "Error", description: result.message });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Editar Marca</DialogTitle>
              <DialogDescription>
                Actualiza los datos de la marca.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la Marca</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej. Apple"
                        className="border-destructive/50 focus:border-destructive ring-offset-background focus-visible:ring-destructive"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pais_origen"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>País de Origen (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. USA" {...field} />
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
