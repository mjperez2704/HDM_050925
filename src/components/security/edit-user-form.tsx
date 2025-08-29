
"use client";

import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { getRoles, updateUser } from '@/actions/users-actions';
import type { UserWithRole } from '@/lib/types/security';
import { UpdateUserSchema } from '@/lib/types/security';

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
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      id: 0,
      nombre: "",
      email: "",
      rol_id: 0,
      password: "",
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
        const userRole = roles.find(r => r.nombre === user.rol);
        form.reset({
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            rol_id: userRole ? userRole.id : 0,
            password: "", // Siempre empezar vacío
        });
      }
    }
  }, [isOpen, user, roles, form]);
  
  async function onSubmit(data: any) {
    // Si el password está vacío, no lo enviamos
    if (!data.password) {
      delete data.password;
    }
    
    const result = await updateUser(data);
    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Error al actualizar",
        description: result.message,
      });
    } else {
      toast({
        title: "Usuario Actualizado",
        description: result.message,
      });
      onUserUpdated();
      onOpenChange(false);
    }
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
                name="rol_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <Select onValueChange={(value) => field.onChange(Number(value))} value={String(field.value)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role.id} value={String(role.id)}>
                            {role.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nueva Contraseña</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Dejar en blanco para no cambiar" {...field} />
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
