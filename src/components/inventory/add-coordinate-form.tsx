
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
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { createCoordinate } from '@/actions/inventory-actions';

type Section = { id: number; name: string; };

type AddCoordinateFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  section: Section | null;
  onActionSuccess: () => void;
};

const FormSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido.'),
  visible: z.boolean(),
  sectionId: z.number().int().positive(),
});

export function AddCoordinateForm({ isOpen, onOpenChange, section, onActionSuccess }: AddCoordinateFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      visible: true,
      sectionId: section?.id,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await createCoordinate(data);
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
  
  if (isOpen && section) {
      form.setValue('sectionId', section.id);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Agregar Nueva Coordenada</DialogTitle>
              <DialogDescription>
                Agregando a {section?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la Coordenada</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. A1-001" {...field} />
                    </FormControl>
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
              <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Crear Coordenada</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

    