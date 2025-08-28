
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
import { Switch } from "@/components/ui/switch";

type Coordinate = {
    name: string;
    skus: string[];
    visible: boolean;
};

type EditCoordinateFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  warehouseName?: string;
  sectionName?: string;
  coordinate: Coordinate | null;
};

export function EditCoordinateForm({ isOpen, onOpenChange, warehouseName, sectionName, coordinate }: EditCoordinateFormProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      name: coordinate?.name || '',
      visible: coordinate?.visible ?? true,
    }
  });

  const isVisible = watch('visible');

  useEffect(() => {
    if (isOpen && coordinate) {
      setValue('name', coordinate.name);
      setValue('visible', coordinate.visible);
    }
  }, [isOpen, coordinate, setValue]);

  const onSubmit = (data: any) => {
    console.log(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
            <DialogTitle>Editar Coordenada</DialogTitle>
            <DialogDescription>
                Editando en {warehouseName} / {sectionName}
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="coordinate-name">Nombre de la Coordenada</Label>
                <Input id="coordinate-name" {...register('name')} />
            </div>
            <div className="flex items-center space-x-2">
                <Switch 
                    id="visible-switch"
                    checked={isVisible}
                    onCheckedChange={(checked) => setValue('visible', checked)}
                />
                <Label htmlFor="visible-switch">Visible</Label>
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
    