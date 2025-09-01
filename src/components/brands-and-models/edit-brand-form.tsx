
"use client";

import { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateBrand, type Brand } from '@/actions/brands-actions';
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

type EditBrandFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  brand: Brand | null;
  onBrandUpdated: () => void;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
    >
      {pending ? 'Guardando...' : 'Guardar Cambios'}
    </Button>
  );
}

export function EditBrandForm({ isOpen, onOpenChange, brand, onBrandUpdated }: EditBrandFormProps) {
  const [state, formAction] = useActionState(updateBrand, { success: false, message: '' });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      onOpenChange(false);
      onBrandUpdated();
      formRef.current?.reset();
    }
  }, [state, onOpenChange, onBrandUpdated]);

  useEffect(() => {
      if (!isOpen) {
          formRef.current?.reset();
      }
  }, [isOpen]);


  if (!brand) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form ref={formRef} action={formAction}>
          <DialogHeader>
            <DialogTitle>Editar Marca</DialogTitle>
            <DialogDescription>
              Actualiza los datos de la marca: {brand.nombre}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <input type="hidden" name="id" value={brand.id} />

            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre de la Marca</Label>
              <Input
                id="nombre"
                name="nombre"
                defaultValue={brand.nombre}
                className="border-destructive/50 focus:border-destructive ring-offset-background focus-visible:ring-destructive"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pais_origen">País de Origen (Opcional)</Label>
              <Input
                id="pais_origen"
                name="pais_origen"
                defaultValue={brand.pais_origen || ''}
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
