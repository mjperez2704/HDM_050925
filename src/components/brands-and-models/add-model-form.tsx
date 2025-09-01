
"use client";

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createModel } from '@/actions/brands-actions';
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

type AddModelFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  brandName?: string;
  brandId?: number;
  onModelAdded: () => void;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
    >
      {pending ? 'Creando...' : 'Crear Modelo'}
    </Button>
  );
}

export function AddModelForm({ isOpen, onOpenChange, brandName, brandId, onModelAdded }: AddModelFormProps) {
  const [state, formAction] = useFormState(createModel, { success: false, message: '' });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      onOpenChange(false);
      onModelAdded(); // Esto refrescará el conteo en la tarjeta de la marca
      formRef.current?.reset();
    }
  }, [state, onOpenChange, onModelAdded]);
  
    // Limpiar el formulario si se cierra el modal
  useEffect(() => {
      if (!isOpen) {
          formRef.current?.reset();
      }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form ref={formRef} action={formAction}>
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Modelo</DialogTitle>
            <DialogDescription>
              Agregando un modelo para la marca: <span className="font-bold">{brandName}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Campo oculto para el ID de la marca */}
            <input type="hidden" name="marca_id" value={brandId} />

            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del Modelo</Label>
              <Input
                id="nombre"
                name="nombre"
                placeholder="Ej. iPhone 15 Pro"
                className="border-destructive/50 focus:border-destructive ring-offset-background focus-visible:ring-destructive"
                required
              />
            </div>
            {!state.success && state.message && (
              <p className="text-sm text-red-500">{state.message}</p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">Cancelar</Button>
            </DialogClose>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
