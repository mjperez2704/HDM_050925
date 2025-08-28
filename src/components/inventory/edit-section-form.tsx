
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

type Section = {
    name: string;
};

type EditSectionFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  warehouseName?: string;
  section: Section | null;
};

export function EditSectionForm({ isOpen, onOpenChange, warehouseName, section }: EditSectionFormProps) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: section?.name || '',
    }
  });

  useEffect(() => {
    if (section) {
      reset({ name: section.name });
    }
  }, [section, reset]);

  const onSubmit = (data: any) => {
    console.log(data);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
            <DialogTitle>Editar Sección</DialogTitle>
            <DialogDescription>
                Editando sección en el almacén: <span className="font-semibold">{warehouseName}</span>
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="section-name">Nombre de la Sección</Label>
                <Input id="section-name" {...register('name')} />
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

    