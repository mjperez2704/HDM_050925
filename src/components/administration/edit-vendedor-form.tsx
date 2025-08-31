
"use client";

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { updateVendedor } from '@/actions/vendedores-actions';
import type { Vendedor } from '@/lib/types/vendedor';
import { UpdateVendedorSchema } from '@/lib/types/vendedor';

type EditVendedorFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  vendedor: Vendedor | null;
  onVendedorUpdated: () => void;
};

export function EditVendedorForm({ isOpen, onOpenChange, vendedor, onVendedorUpdated }: EditVendedorFormProps) {
    const { toast } = useToast();
    const form = useForm<Vendedor>({
        resolver: zodResolver(UpdateVendedorSchema),
    });

    useEffect(() => {
        if (vendedor) {
            form.reset({
                ...vendedor,
                password: '', // Siempre iniciar vacío
            });
        }
    }, [vendedor, form]);

    async function onSubmit(data: Vendedor) {
        const result = await updateVendedor(data);
        if (result.success) {
            toast({
                title: "Éxito",
                description: result.message,
            });
            onVendedorUpdated();
            onOpenChange(false);
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.message,
            });
        }
    };
    
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader>
                <DialogTitle>Editar Vendedor</DialogTitle>
                <DialogDescription>
                    Actualiza los datos del vendedor.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="slug" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="quota" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cuota de Venta (Mensual)</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nueva Contraseña</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Dejar en blanco para no cambiar" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
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
