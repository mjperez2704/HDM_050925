
"use client";

import { useState, useEffect } from 'react';
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from '@/components/ui/scroll-area';
import { getPermissions, createRole } from '@/actions/roles-actions';
import { useToast } from "@/hooks/use-toast";
import { groupBy } from 'lodash';

type AddRoleFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onRoleAdded: () => void;
};

type Permission = {
    id: number;
    clave: string;
    modulo: string;
    descripcion: string;
};

const FormSchema = z.object({
    name: z.string().min(3, "El nombre del rol es requerido."),
    description: z.string().optional(),
    permissions: z.array(z.number()).default([]),
});

export function AddRoleForm({ isOpen, onOpenChange, onRoleAdded }: AddRoleFormProps) {
    const { toast } = useToast();
    const [permissions, setPermissions] = useState<Record<string, Permission[]>>({});

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            description: "",
            permissions: [],
        }
    });

    useEffect(() => {
        if (isOpen) {
            const fetchPermissions = async () => {
                const perms = await getPermissions();
                const grouped = groupBy(perms, 'modulo');
                setPermissions(grouped);
            };
            fetchPermissions();
        }
    }, [isOpen]);

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const result = await createRole(data);
        if (result.success) {
            toast({ title: "Éxito", description: result.message });
            onRoleAdded();
            onOpenChange(false);
            form.reset();
        } else {
            toast({ variant: "destructive", title: "Error", description: result.message });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader>
                <DialogTitle>Agregar Nuevo Rol</DialogTitle>
                <DialogDescription>
                    Define un nuevo rol y los permisos que tendrá.
                </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] p-4">
                <div className="grid gap-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Nombre del Rol</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej. Gerente de Taller" {...field} />
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
                                <Input placeholder="Breve descripción del rol" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="permissions"
                    render={() => (
                        <FormItem>
                            <FormLabel>Permisos</FormLabel>
                            <Accordion type="multiple" className="w-full">
                                {Object.entries(permissions).map(([moduleName, perms]) => (
                                    <AccordionItem key={moduleName} value={moduleName}>
                                        <AccordionTrigger className="font-semibold">{moduleName}</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border rounded-md">
                                                {perms.map((permission) => (
                                                    <FormField
                                                        key={permission.id}
                                                        control={form.control}
                                                        name="permissions"
                                                        render={({ field }) => (
                                                            <FormItem className="flex items-center space-x-2">
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(permission.id)}
                                                                        onCheckedChange={(checked) => {
                                                                            return checked
                                                                            ? field.onChange([...field.value, permission.id])
                                                                            : field.onChange(
                                                                                field.value?.filter(
                                                                                (value) => value !== permission.id
                                                                                )
                                                                            )
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">{permission.clave}</FormLabel>
                                                            </FormItem>
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                             <FormMessage />
                        </FormItem>
                    )}
                />
                </div>
                </ScrollArea>
                <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                    Cancelar
                    </Button>
                </DialogClose>
                <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Guardar Rol</Button>
                </DialogFooter>
            </form>
            </Form>
        </DialogContent>
        </Dialog>
    );
}
