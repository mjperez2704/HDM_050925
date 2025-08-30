
'use server';

import { revalidatePath } from 'next/cache';
import db from '@/lib/db';
import { SupplierSchema, Supplier } from '@/lib/types/supplier';

const CreateSupplierSchema = SupplierSchema.omit({ id: true });
const UpdateSupplierSchema = SupplierSchema;

export async function getSuppliers() {
  try {
    const [rows] = await db.query('SELECT id, razon_social as razonSocial, email, tipo, origen FROM pro_proveedores ORDER BY id DESC');
    return rows as Supplier[];
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    return [];
  }
}

export async function createSupplier(formData: Omit<Supplier, 'id'>) {
    const validatedFields = CreateSupplierSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Error de validación. Por favor, revise los campos.',
        };
    }

    const { razonSocial, rfc, diasCredito, tipo, origen, personaContacto, email, telefono, direccion } = validatedFields.data;

    try {
        await db.query(
            'INSERT INTO pro_proveedores (razon_social, rfc, dias_credito, tipo, origen, persona_contacto, email, telefono, direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [razonSocial, rfc, diasCredito, tipo, origen, personaContacto, email, telefono, direccion]
        );
        revalidatePath('/contacts/suppliers');
        return { success: true, message: 'Proveedor creado exitosamente.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al crear el proveedor.' };
    }
}

export async function updateSupplier(formData: Supplier) {
    const validatedFields = UpdateSupplierSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Error de validación. Por favor, revise los campos.',
        };
    }
    
    const { id, razonSocial, rfc, diasCredito, tipo, origen, personaContacto, email, telefono, direccion } = validatedFields.data;

    try {
        await db.query(
            'UPDATE pro_proveedores SET razon_social = ?, rfc = ?, dias_credito = ?, tipo = ?, origen = ?, persona_contacto = ?, email = ?, telefono = ?, direccion = ? WHERE id = ?',
            [razonSocial, rfc, diasCredito, tipo, origen, personaContacto, email, telefono, direccion, id]
        );
        revalidatePath('/contacts/suppliers');
        return { success: true, message: 'Proveedor actualizado exitosamente.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al actualizar el proveedor.' };
    }
}

export async function deleteSupplier(id: number) {
  if (!id) {
    return { success: false, message: 'ID de proveedor no proporcionado.' };
  }
  try {
    await db.query('DELETE FROM pro_proveedores WHERE id = ?', [id]);
    revalidatePath('/contacts/suppliers');
    return { success: true, message: 'Proveedor eliminado exitosamente.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error al eliminar el proveedor.' };
  }
}
