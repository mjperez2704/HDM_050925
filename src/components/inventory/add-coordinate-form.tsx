'use client';

import { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createCoordinates } from '@/actions/inventory-actions';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from '@/components/ui/textarea';

interface AddCoordinateFormProps {
    warehouseId: number;
    sectionId: number;
    onClose: () => void;
    onSuccess: () => void; // <-- Nueva prop
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Creando...' : 'Crear Coordenadas'}
        </Button>
    );
}

export function AddCoordinateForm({ warehouseId, sectionId, onClose, onSuccess }: AddCoordinateFormProps) {
    const initialState = { success: false, message: '' };
    const [state, dispatch] = useActionState(createCoordinates, initialState);

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message);
                onSuccess(); // <-- Llamar a la nueva función
                onClose();
            } else {
                toast.error(state.message);
            }
        }
    }, [state, onClose, onSuccess]);

    return (
        <form action={dispatch} className="grid gap-4 py-4">
            <input type="hidden" name="warehouseId" value={warehouseId} />
            <input type="hidden" name="sectionId" value={sectionId} />

            <div className="grid gap-2">
                <Label htmlFor="codes">Códigos de Coordenada</Label>
                <Textarea
                    id="codes"
                    name="codes"
                    placeholder="Ej: A1-P1, A1-P2, A1-P3..."
                    required
                    rows={4}
                />
                <p className="text-sm text-muted-foreground">
                    Introduce uno o más códigos separados por comas.
                </p>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox id="visible" name="visible" defaultChecked={true} />
                <Label htmlFor="visible" className="text-sm font-medium leading-none">
                    Visible en el sistema
                </Label>
            </div>

            <div className="flex justify-end pt-4">
                <SubmitButton />
            </div>
        </form>
    );
}
