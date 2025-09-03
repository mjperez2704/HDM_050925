"use client";

import { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
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
import { useToast } from "@/hooks/use-toast";
import { createSection } from '@/actions/inventory-actions';

type Warehouse = { id: number; name: string };

type AddSectionFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  warehouse: Warehouse | null;
  onActionSuccess: () => void;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
    >
      {pending ? 'Creando...' : 'Crear Sección'}
    </Button>
  );
}

export function AddSectionForm({ isOpen, onOpenChange, warehouse, onActionSuccess }: AddSectionFormProps) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(createSection, { success: false, message: '' });

  useEffect(() => {
    if (state.success) {
      toast({
          title: "Éxito",
          description: state.message,
      });
      onActionSuccess();
      onOpenChange(false);
      formRef.current?.reset();
    }
  }, [state, onActionSuccess, onOpenChange, toast]);
  
  // Reset form when dialog closes or warehouse changes
  useEffect(() => {
    if (!isOpen) {
      formRef.current?.reset();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
          <form ref={formRef} action={formAction}>
            <DialogHeader>
              <DialogTitle>Agregar Nueva Sección</DialogTitle>
              <DialogDescription>
                Agregando sección al almacén: <span className="font-semibold">{warehouse?.name}</span>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <input type="hidden" name="warehouseId" value={warehouse?.id || ''} />
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la Sección</Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="Ej. Anaquel A1 - Pantallas"
                    required
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
