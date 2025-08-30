
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
import { getPermissions, updateRole, getRoleById, RoleWithDetails } from '@/actions/roles-actions';
import { useToast } from "@/hooks/use-toast";
import { groupBy } from 'lodash';
import { Skeleton } from '@/components/ui/skeleton';

type EditRoleFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  role: RoleWithDetails | null;
  onRoleUpdated: () => void;
};

type Permission = {
    id: number;
    clave: string;
    modulo: string;
    descripcion: string;
};

const FormSchema = z.object({
    id: z.number(),
    name: z.string().min(3, "El nombre del rol es requerido."),
    description: z.string().optional(),
    permissions: z.array(z.number()).default([]),
});

export function EditRoleForm({ isOpen, onOpenChange, role, onRoleUpdated }: EditRoleFormProps) {
    const { toast } = useToast();
    const [allPermissions, setAllPermissions] = useState<Record<string, Permission[]>>({});
    const [isLoading, setIsLoading] = useState(true);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: role?.id || 0,
            name: role?.name || "",
            description: role?.description || "",
            permissions: [],
        }
    });

    useEffect(() => {
        if (isOpen && role) {
            setIsLoading(true);
            const fetchInitialData = async () => {
                try {
                    const [perms, roleDetails] = await Promise.all([
                        getPermissions(),
                        getRoleById(role.id)
                    ]);
                    
                    const grouped = groupBy(perms, 'modulo');
                    setAllPermissions(grouped);

                    if (roleDetails) {
                        form.reset({
                            id: roleDetails.id,
                            name: roleDetails.name,
                            description: roleDetails.description,
                            permissions: roleDetails.permissions?.map(p => p.id) || []
                        });
                    }
                } catch (error) {
                    toast({ variant: "destructive", title: "Error", description: "No se pudieron cargar los datos del rol." });
                } finally {
                    setIsLoading(false);
                }
            };
            fetchInitialData();
        }
    }, [isOpen, role, form, toast]);

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const result = await updateRole(data);
        if (result.success) {
            toast({ title: "Éxito", description: result.message });
            onRoleUpdated();
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
                            <DialogTitle>Editar Rol</DialogTitle>
                            <DialogDescription>
                                Modifica el nombre, descripción y permisos del rol.
                            </DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="max-h-[70vh] p-4">
                            {isLoading ? (
                                <div className="space-y-4">
                                    <Skeleton className="h-10 w-1/2" />
                                    <Skeleton className="h-10 w-1/2" />
                                    <Skeleton className="h-20 w-full" />
                                </div>
                            ) : (
                                <div className="grid gap-6 py-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nombre del Rol</FormLabel>
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
                                                        <Input {...field} />
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
                                                    {Object.entries(allPermissions).map(([moduleName, perms]) => (
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
                            )}
                        </ScrollArea>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground" disabled={isLoading}>
                                Guardar Cambios
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
