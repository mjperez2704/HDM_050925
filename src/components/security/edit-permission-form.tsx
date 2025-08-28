
"use client";

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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

type Permission = {
    key: string;
    module: string;
    description: string;
};

type EditPermissionFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  permission: Permission | null;
};

export function EditPermissionForm({ isOpen, onOpenChange, permission }: EditPermissionFormProps) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
        key: permission?.key || '',
        module: permission?.module || '',
        description: permission?.description || '',
    }
  });

  useEffect(() => {
    if (permission) {
        reset(permission);
    }
  }, [permission, reset]);

  const onSubmit = (data: any) => {
    console.log(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
            <DialogTitle>Editar Permiso</DialogTitle>
            <DialogDescription>
                Actualiza los detalles del permiso.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="permission-key">Clave</Label>
                <Input id="permission-key" {...register('key')} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="permission-module">Módulo</Label>
                <Input id="permission-module" {...register('module')} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="permission-description">Descripción</Label>
                <Input id="permission-description" {...register('description')} />
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
      </DialogContent>
    </Dialog>
  );
}
