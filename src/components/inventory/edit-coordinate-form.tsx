
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
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { updateCoordinate } from '@/actions/inventory-actions';

type Coordinate = { name: string; skus: string[]; visible: boolean; };
type Section = { id: number; name: string; coordinates: Coordinate[]; };

type EditCoordinateFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  section: Section | null;
  coordinate: Coordinate | null;
  onActionSuccess: () => void;
};

const FormSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido.'),
  visible: z.boolean(),
});

export function EditCoordinateForm({ isOpen, onOpenChange, section, coordinate, onActionSuccess }: EditCoordinateFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (isOpen && coordinate) {
      form.reset({
        name: coordinate.name,
        visible: coordinate.visible,
      });
    }
  }, [isOpen, coordinate, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!section || !coordinate) return;
    const result = await updateCoordinate(section.id, coordinate.name, data.name, data.visible);
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
              <DialogTitle>Editar Coordenada</DialogTitle>
              <DialogDescription>
                Editando en {section?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la Coordenada</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="visible"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch id="visible-switch" checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <Label htmlFor="visible-switch">Visible</Label>
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
