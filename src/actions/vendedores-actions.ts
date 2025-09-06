'use server';

import { revalidatePath } from 'next/cache';
import db from '@/lib/db';
import { CreateVendedorSchema, UpdateVendedorSchema, Vendedor } from '@/lib/types/vendedor';
import { z } from 'zod';

interface FormState {
    success: boolean;
    message: string;
}

export async function getVendedores(): Promise<Vendedor[]> {
    try {
        const [vendedores] = await db.query(
            'SELECT id, name, slug, email, quota FROM cat_vendedores ORDER BY name'
        );
        return vendedores as Vendedor[];
    } catch (error) {
        console.error('Error fetching vendedores:', error);
        return [];
    }
}

export async function createVendedor(formData: Omit<Vendedor, 'id'>): Promise<FormState> {
    const validatedFields = CreateVendedorSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Datos inválidos: ' + validatedFields.error.errors.map(e => e.message).join(', '),
        };
    }

    const { name, slug, email, quota, password } = validatedFields.data;

    try {
        // En una aplicación real, el password debería ser "hasheado" antes de guardarse.
        await db.query(
            'INSERT INTO cat_vendedores (name, slug, email, quota, password) VALUES (?, ?, ?, ?, ?)',
            [name, slug, email, quota, password || null]
        );
        revalidatePath('/administration/vendedores');
        return { success: true, message: 'Vendedor creado exitosamente.' };
    } catch (error: any) {
        console.error('Error creating vendedor:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return { success: false, message: 'Ya existe un vendedor con el mismo slug o email.' };
        }
        return { success: false, message: 'Error en el servidor al crear el vendedor.' };
    }
}

export async function updateVendedor(formData: Vendedor): Promise<FormState> {
    const validatedFields = UpdateVendedorSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Datos inválidos: ' + validatedFields.error.errors.map(e => e.message).join(', '),
        };
    }

    const { id, name, slug, email, quota, password } = validatedFields.data;

    try {
        if (password && password.length > 0) {
            // Si se proveyó un nuevo password, se actualiza.
            await db.query(
                'UPDATE cat_vendedores SET name = ?, slug = ?, email = ?, quota = ?, password = ? WHERE id = ?',
                [name, slug, email, quota, password, id]
            );
        } else {
            // Si no, se actualiza todo excepto el password.
            await db.query(
                'UPDATE cat_vendedores SET name = ?, slug = ?, email = ?, quota = ? WHERE id = ?',
                [name, slug, email, quota, id]
            );
        }
        revalidatePath('/administration/vendedores');
        return { success: true, message: 'Vendedor actualizado exitosamente.' };
    } catch (error: any) {
        console.error('Error updating vendedor:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return { success: false, message: 'Ya existe otro vendedor con el mismo slug o email.' };
        }
        return { success: false, message: 'Error en el servidor al actualizar el vendedor.' };
    }
}

export async function deleteVendedor(id: number): Promise<FormState> {
    if (!id) {
        return { success: false, message: 'ID de vendedor no proporcionado.' };
    }
    try {
        await db.query('DELETE FROM cat_vendedores WHERE id = ?', [id]);
        revalidatePath('/administration/vendedores');
        return { success: true, message: 'Vendedor eliminado exitosamente.' };
    } catch (error: any) {
        console.error('Error deleting vendedor:', error);
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return { success: false, message: 'No se puede eliminar, el vendedor tiene registros asociados.' };
        }
        return { success: false, message: 'Error en el servidor al eliminar el vendedor.' };
    }
}
