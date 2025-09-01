
"use client";

import { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createBrand } from '@/actions/brands-actions';
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


type AddBrandFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onBrandAdded: () => void;
};

// Componente para el botón de envío, para usar useFormStatus
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
    >
      {pending ? 'Creando...' : 'Crear Marca'}
    </Button>
  );
}

export function AddBrandForm({ isOpen, onOpenChange, onBrandAdded }: AddBrandFormProps) {
  const [state, formAction] = useActionState(createBrand, { success: false, message: '' });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      onOpenChange(false);
      onBrandAdded();
      formRef.current?.reset();
    }
  }, [state, onOpenChange, onBrandAdded]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form ref={formRef} action={formAction}>
          <DialogHeader>
            <DialogTitle>Agregar Nueva Marca</DialogTitle>
            <DialogDescription>
              Completa los campos para registrar una nueva marca.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">
                Nombre de la Marca
              </Label>
              <Input
                id="nombre"
                name="nombre"
                placeholder="Ej. Apple"
                className="border-destructive/50 focus:border-destructive ring-offset-background focus-visible:ring-destructive"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pais_origen">
                País de Origen (Opcional)
              </Label>
              <Input
                id="pais_origen"
                name="pais_origen"
                placeholder="Ej. USA"
              />
            </div>
            {!state.success && state.message && (
              <p className="text-sm text-red-500">{state.message}</p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancelar
              </Button>
            </DialogClose>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
