
"use client";

import { useEffect, useState } from 'react';
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
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { assignSkuToCoordinate, getProductsForSelect } from '@/actions/inventory-actions';

type Coordinate = { name: string; skus: string[]; visible: boolean; };
type Section = { id: number; name: string; coordinates: Coordinate[]; };
type Product = { id: number; sku: string; nombre: string; };

type AssignSkuFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  section: Section | null;
  coordinate: Coordinate | null;
  onActionSuccess: () => void;
};

const FormSchema = z.object({
  productId: z.coerce.number().int().positive("Debes seleccionar un producto."),
  sectionId: z.number().int().positive(),
  coordinateName: z.string().min(1),
});

export function AssignSkuForm({ isOpen, onOpenChange, section, coordinate, onActionSuccess }: AssignSkuFormProps) {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      productId: undefined,
      sectionId: section?.id,
      coordinateName: coordinate?.name,
    },
  });

  useEffect(() => {
    async function fetchProducts() {
      if (isOpen) {
        const productList = await getProductsForSelect();
        setProducts(productList);
      }
    }
    fetchProducts();
  }, [isOpen]);

  useEffect(() => {
    if (section && coordinate) {
      form.reset({
        productId: undefined,
        sectionId: section.id,
        coordinateName: coordinate.name,
      });
    }
  }, [section, coordinate, form, isOpen]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await assignSkuToCoordinate(data);
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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Asignar SKU a Coordenada</DialogTitle>
              <DialogDescription>
                Asignando a: {section?.name} / {coordinate?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Producto (SKU)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un SKU..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {products.map((p) => (
                          <SelectItem key={p.id} value={String(p.id)}>{p.sku} - {p.nombre}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
              <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Asignar SKU</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
