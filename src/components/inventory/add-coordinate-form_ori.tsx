"use client";

import {useEffect, useRef, useActionState} from 'react';
import {useFormStatus} from 'react-dom';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {useToast} from "@/hooks/use-toast";
import {createCoordinates} from '@/actions/inventory-actions';
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from '@/components/ui/textarea';
import {Section as section} from "@jridgewell/trace-mapping";

// Define types locally for the component
type Warehouse = { id: number; name: string; };
type Section = { id: number; name: string; };

type AddCoordinateFormProps = {
    isOpen: boolean,
    onOpenChange: (isOpen: boolean) => void,
    warehouse: Warehouse | null,
    section: Section | null,
    onActionSuccess: () => void,
    warehouseId?: number,
    sectionId?: number,
    onClose?: () => void
};

function SubmitButton() {
    const {pending} = useFormStatus();
    return (
        <Button
            type="submit"
            disabled={pending}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
        >
            {pending ? 'Creando...' : 'Crear Coordenada'}
        </Button>
    );
}

export function AddCoordinateForm_ori({
                                          isOpen,
                                          onOpenChange,
                                          warehouse,
                                          section,
                                          onActionSuccess,
                                          warehouseId,
                                          sectionId,
                                          onClose
                                      }: AddCoordinateFormProps) {
    const {toast} = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction] = useActionState(createCoordinates, {success: false, message: ''});

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
                        <DialogTitle>Agregar Nueva Coordenada</DialogTitle>
                        <DialogDescription>
                            Agregando en {warehouse?.name} / {section?.name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <input type="hidden" name="warehouseId" value={warehouse?.id || ''}/>
                        <input type="hidden" name="sectionId" value={section?.id || ''}/>
                        <div className="space-y-2">
                            <Label htmlFor="codes">Nombre(s) de la(s) Coordenada(s)</Label>
                            <Input
                                id="codes"
                                name="codes"
                                placeholder="Ej. A1-001, A1-002, A1-003"
                                required
                            />
                            <p className="text-xs text-muted-foreground">Puedes agregar varias coordenadas separadas por
                                comas.</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="visible" name="visible" defaultChecked={true}/>
                            <Label htmlFor="visible">Visible</Label>
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
                        <SubmitButton/>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
