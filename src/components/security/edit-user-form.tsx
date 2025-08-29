
"use client";

import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { getRoles } from '@/actions/users-actions';
import type { UserWithRole } from '@/lib/types/security';

type EditUserFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  user: UserWithRole | null;
  onUserUpdated: () => void;
};

type Role = {
  id: number;
  nombre: string;
};

export function EditUserForm({ isOpen, onOpenChange, user, onUserUpdated }: EditUserFormProps) {
  const { toast } = useToast();
  const [roles, setRoles] = useState<Role[]>([]);
  
  const form = useForm({
    defaultValues: {
      nombre: user?.nombre || "",
      email: user?.email || "",
      rol: user?.rol || "",
    },
  });

  useEffect(() => {
    async function loadRoles() {
      const fetchedRoles = await getRoles();
      setRoles(fetchedRoles);
    }
    if (isOpen) {
      loadRoles();
      if (user) {
        form.reset({
            nombre: user.nombre,
            email: user.email,
            rol: user.rol,
        });
      }
    }
  }, [isOpen, user, form]);
  
  async function onSubmit(data: any) {
    // Aquí iría la llamada a updateUser
    console.log(data);
    toast({
      title: "Usuario Actualizado",
      description: "El usuario ha sido actualizado exitosamente.",
    });
    onUserUpdated();
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Editar Usuario</DialogTitle>
              <DialogDescription>
                Actualiza los datos del usuario.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role.id} value={role.nombre}>
                            {role.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <div className="space-y-2">
                <Label htmlFor="password">Nueva Contraseña</Label>
                <Input id="password" type="password" placeholder="Dejar en blanco para no cambiar" />
              </div>
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
