
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
import { Textarea } from "@/components/ui/textarea";

type Warehouse = {
    name: string;
    description: string;
};

type EditWarehouseFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  warehouse: Warehouse | null;
};

export function EditWarehouseForm({ isOpen, onOpenChange, warehouse }: EditWarehouseFormProps) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: warehouse?.name || '',
      description: warehouse?.description || '',
    }
  });

  useEffect(() => {
    if (warehouse) {
      reset({
        name: warehouse.name,
        description: warehouse.description
      });
    }
  }, [warehouse, reset]);

  const onSubmit = (data: any) => {
    console.log(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
            <DialogTitle>Editar Almacén</DialogTitle>
            <DialogDescription>
                Modifica los detalles de tu almacén.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="warehouse-name">Nombre del Almacén</Label>
                <Input id="warehouse-name" {...register('name')} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="warehouse-description">Descripción</Label>
                <Textarea id="warehouse-description" {...register('description')} />
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

    