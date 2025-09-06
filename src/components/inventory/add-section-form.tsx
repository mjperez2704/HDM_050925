'use client';

import { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createSection } from '@/actions/inventory-actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AddSectionFormProps {
    warehouseId: number;
    onClose: () => void;
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Creando...' : 'Crear Sección'}
        </Button>
    );
}

export function AddSectionForm({ warehouseId, onClose }: AddSectionFormProps) {
    const initialState = { success: false, message: '' };
    const [state, dispatch] = useActionState(createSection, initialState);

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message);
                onClose(); // Cierra el modal si la operación fue exitosa
            } else {
                toast.error(state.message);
            }
        }
    }, [state, onClose]);

    return (
        <form action={dispatch} className="grid gap-4 py-4">
            <input type="hidden" name="warehouseId" value={warehouseId} />

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="clave" className="text-right">Clave</Label>
                <Input id="clave" name="clave" className="col-span-3" placeholder="Ej: A1, B2, C3" required />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre" className="text-right">Nombre</Label>
                <Input id="nombre" name="nombre" className="col-span-3" placeholder="Ej: Estante de Refacciones" required />
            </div>

            <div className="flex justify-end pt-4">
                <SubmitButton />
            </div>
        </form>
    );
}
