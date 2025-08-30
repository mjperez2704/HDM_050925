
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import db from '@/lib/db';
import { ClientSchema, Client, ClientWithId } from '@/lib/types/client';

const CreateClientSchema = ClientSchema.omit({ id: true, fechaRegistro: true });
const UpdateClientSchema = ClientSchema.omit({ fechaRegistro: true });

export async function getClients() {
  try {
    const [rows] = await db.query('SELECT id, razon_social as razonSocial, email, telefono, rfc, fecha_registro as fechaRegistro FROM cli_clientes ORDER BY id DESC');
    // Asumimos que la base de datos devuelve un formato compatible con Client
    return rows as ClientWithId[];
  } catch (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
}

export async function createClient(formData: Omit<Client, 'id' | 'fechaRegistro'>) {
    const validatedFields = CreateClientSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Error de validación. Por favor, revise los campos.',
        };
    }

    const { razonSocial, email, telefono, rfc, tipoCliente } = validatedFields.data;

    try {
        await db.query(
            'INSERT INTO cli_clientes (razon_social, email, telefono, rfc, tipo_id) VALUES (?, ?, ?, ?, ?)',
            [razonSocial, email, telefono, rfc, tipoCliente === 'final' ? 1 : tipoCliente === 'distribuidor' ? 2 : 3]
        );
        revalidatePath('/contacts/clients');
        return { success: true, message: 'Cliente creado exitosamente.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al crear el cliente.' };
    }
}

export async function updateClient(formData: ClientWithId) {
    const validatedFields = UpdateClientSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Error de validación. Por favor, revise los campos.',
        };
    }
    
    const { id, razonSocial, email, telefono, rfc, tipoCliente } = validatedFields.data;

    try {
        await db.query(
            'UPDATE cli_clientes SET razon_social = ?, email = ?, telefono = ?, rfc = ?, tipo_id = ? WHERE id = ?',
            [razonSocial, email, telefono, rfc, tipoCliente === 'final' ? 1 : tipoCliente === 'distribuidor' ? 2 : 3, id]
        );
        revalidatePath('/contacts/clients');
        return { success: true, message: 'Cliente actualizado exitosamente.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al actualizar el cliente.' };
    }
}

export async function deleteClient(id: number) {
  if (!id) {
    return { success: false, message: 'ID de cliente no proporcionado.' };
  }
  try {
    await db.query('DELETE FROM cli_clientes WHERE id = ?', [id]);
    revalidatePath('/contacts/clients');
    return { success: true, message: 'Cliente eliminado exitosamente.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error al eliminar el cliente.' };
  }
}
