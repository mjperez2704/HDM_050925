
"use client";

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/lib/types/product";
import type { Product } from "@/lib/types/product";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { createProduct } from '@/actions/products-actions';

type AddProductFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onProductAdded: () => void;
};

const FormSchema = ProductSchema.omit({ id: true, activo: true });
type FormValues = Omit<Product, 'id' | 'activo'>;

export function AddProductForm({ isOpen, onOpenChange, onProductAdded }: AddProductFormProps) {
  const [tieneVigencia, setTieneVigencia] = useState(false);
  const [esParteDeKit, setEsParteDeKit] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sku: "",
      nombre: "",
      descripcion: "",
      categoria_id: 1, // Default, you might want a selector for this
      unidad: "PZA",
      precio_lista: 0,
      costo_promedio: 0,
      es_serie: false,
    },
  });

  async function onSubmit(data: FormValues) {
    const result = await createProduct(data);
    if (result.message.startsWith('Error')) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
      });
    } else {
      toast({
        title: "Producto Creado",
        description: "El nuevo producto ha sido registrado exitosamente.",
      });
      onProductAdded();
      form.reset();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Producto</DialogTitle>
              <DialogDescription>
                Complete los campos para registrar un nuevo producto en el catálogo.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 pr-6">
                {/* Columna Izquierda */}
                <div className="md:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="nombre"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre del Producto</FormLabel>
                          <FormControl>
                            <Input placeholder="Ej. Pantalla iPhone 15" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="descripcion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Descripción detallada del producto" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU</FormLabel>
                        <FormControl>
                          <Input placeholder="SKU-PROD-001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                          control={form.control}
                          name="unidad"
                          render={({ field }) => (
                          <FormItem>
                              <FormLabel>Unidad</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                  <SelectTrigger>
                                  <SelectValue placeholder="Seleccione una unidad" />
                                  </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                  <SelectItem value="PZA">PZA</SelectItem>
                                  <SelectItem value="KIT">KIT</SelectItem>
                                  <SelectItem value="SRV">SRV</SelectItem>
                              </SelectContent>
                              </Select>
                              <FormMessage />
                          </FormItem>
                          )}
                      />
                      <div className="space-y-2">
                          <Label htmlFor="resupply-time">Tiempo para Resurtir (días)</Label>
                          <Input id="resupply-time" type="number" placeholder="Ej. 15" />
                      </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <FormField
                        control={form.control}
                        name="costo_promedio"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Costo Promedio</FormLabel>
                            <FormControl>
                            <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="precio_lista"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Precio Lista</FormLabel>
                            <FormControl>
                            <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="space-y-2">
                        <Label htmlFor="min-stock">Mínimo</Label>
                        <Input id="min-stock" type="number" defaultValue="0" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="max-stock">Máximo</Label>
                        <Input id="max-stock" type="number" defaultValue="0" />
                    </div>
                  </div>
                  
                  {/* Atributos Adicionales */}
                  <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-medium">Atributos Adicionales</h3>
                    <div className="border rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Array.from({ length: 10 }).map((_, i) => (
                           <FormField
                            key={`atributo-${i + 1}`}
                            control={form.control}
                            name={`atributo_${i + 1}` as keyof FormValues}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Atributo {i + 1}</FormLabel>
                                <FormControl>
                                    <Input placeholder={`Valor del atributo ${i + 1}`} {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        ))}
                    </div>
                  </div>
                </div>

                {/* Columna Derecha */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="es_serie"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-3">
                            <FormLabel>Es de Serie</FormLabel>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <Label htmlFor="inventoriable">Inventariable</Label>
                    <Switch id="inventoriable" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <Label htmlFor="blocked">Bloqueado (Inactivo)</Label>
                    <Switch id="blocked" />
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Guardar Producto</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
