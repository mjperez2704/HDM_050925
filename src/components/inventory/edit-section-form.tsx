'use client';

import { useEffect, useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getRuleCatalogs, updateSectionRules } from '@/actions/inventory-actions';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Define los tipos para los catálogos que vamos a recibir
interface CatalogItem {
    id: number;
    nombre: string;
}

interface Catalogs {
    marcas: CatalogItem[];
    estatus: CatalogItem[];
    finalidades: CatalogItem[];
}

// Define el tipo para la sección que recibe el componente como prop
export interface SectionWithRules {
    id: number;
    name: string;
    rules: {
        finalidadId: number | null;
        estatusId: number | null;
        marcaId: number | null;
    };
}

interface EditSectionFormProps {
    section: SectionWithRules;
    onClose?: () => void; // Opcional: para cerrar un modal/dialog
}

export function EditSectionForm({ section, onClose }: EditSectionFormProps) {
    // Añadimos una guarda para evitar errores si la prop es nula.
    if (!section) {
        return null;
    }

    const [catalogs, setCatalogs] = useState<Catalogs>({ marcas: [], estatus: [], finalidades: [] });
    const initialState = { success: false, message: '' };
    // Usamos useFormState para manejar el estado del formulario que viene de la server action
    const [state, dispatch] = useActionState(updateSectionRules, initialState);

    // Al montar el componente, obtenemos los catálogos para llenar los <Select>
    useEffect(() => {
        async function fetchCatalogs() {
            const data = await getRuleCatalogs();
            setCatalogs({
                marcas: data.marcas,
                estatus: data.estatus,
                finalidades: data.finalidades,
            });
        }
        fetchCatalogs();
    }, []);
    
    // Este efecto muestra un "toast" (notificación) cuando la server action responde
    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message);
                onClose?.(); // Cierra el modal si la operación fue exitosa
            } else {
                toast.error(state.message);
            }
        }
    }, [state, onClose]);

    return (
        <form action={dispatch} className="grid gap-4 py-4">
            <input type="hidden" name="sectionId" value={section.id} />
            
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="finalidadId" className="text-right">Finalidad</Label>
                <Select name="finalidadId" defaultValue={String(section.rules.finalidadId ?? '0')}>
                    <SelectTrigger id="finalidadId" className="col-span-3"><SelectValue placeholder="Selecciona una finalidad..." /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">Cualquiera</SelectItem>
                        {catalogs.finalidades.map((item) => <SelectItem key={item.id} value={String(item.id)}>{item.nombre}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="estatusId" className="text-right">Estatus</Label>
                <Select name="estatusId" defaultValue={String(section.rules.estatusId ?? '0')}>
                    <SelectTrigger id="estatusId" className="col-span-3"><SelectValue placeholder="Selecciona un estatus..." /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">Cualquiera</SelectItem>
                        {catalogs.estatus.map((item) => <SelectItem key={item.id} value={String(item.id)}>{item.nombre}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="marcaId" className="text-right">Marca</Label>
                <Select name="marcaId" defaultValue={String(section.rules.marcaId ?? '0')}>
                    <SelectTrigger id="marcaId" className="col-span-3"><SelectValue placeholder="Selecciona una marca..." /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">Cualquiera</SelectItem>
                        {catalogs.marcas.map((item) => <SelectItem key={item.id} value={String(item.id)}>{item.nombre}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex justify-end pt-4">
                 <Button type="submit" disabled={useFormStatus().pending}>{useFormStatus().pending ? 'Guardando...' : 'Guardar Reglas'}</Button>
            </div>
        </form>
    );
}