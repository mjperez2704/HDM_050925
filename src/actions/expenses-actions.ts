
'use server';

import { revalidatePath } from 'next/cache';
import db from '@/lib/db';
import { ExpenseSchema, Expense } from '@/lib/types/expense';
import { RowDataPacket } from 'mysql2';

const CreateExpenseSchema = ExpenseSchema.omit({ id: true });
const UpdateExpenseSchema = ExpenseSchema;

interface ExpenseQueryResult extends RowDataPacket, Expense {
  nombreUsuario?: string;
}

export async function getExpenses(): Promise<Expense[]> {
  try {
    const [rows] = await db.query<ExpenseQueryResult[]>(`
      SELECT 
        g.id, 
        g.fecha, 
        g.categoria, 
        g.descripcion, 
        g.monto, 
        g.estado, 
        g.usuario_id as usuarioId,
        u.nombre as nombreUsuario
      FROM fin_gastos g
      LEFT JOIN seg_usuarios u ON g.usuario_id = u.id
      ORDER BY g.fecha DESC
    `);
    return rows.map(row => ({
        ...row,
        fecha: new Date(row.fecha),
        monto: Number(row.monto), // Convertir a número aquí
    }));
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return [];
  }
}

export async function createExpense(formData: Omit<Expense, 'id'>) {
    const validatedFields = CreateExpenseSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Error de validación. Por favor, revise los campos.',
        };
    }

    const { fecha, categoria, descripcion, monto, estado, usuarioId } = validatedFields.data;

    try {
        await db.query(
            'INSERT INTO fin_gastos (fecha, categoria, descripcion, monto, estado, usuario_id) VALUES (?, ?, ?, ?, ?, ?)',
            [fecha, categoria, descripcion, monto, estado, usuarioId]
        );
        revalidatePath('/administration/expenses');
        return { success: true, message: 'Gasto creado exitosamente.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al crear el gasto.' };
    }
}

export async function updateExpense(formData: Expense) {
    const validatedFields = UpdateExpenseSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Error de validación. Por favor, revise los campos.',
        };
    }
    
    const { id, fecha, categoria, descripcion, monto, estado, usuarioId } = validatedFields.data;

    try {
        await db.query(
            'UPDATE fin_gastos SET fecha = ?, categoria = ?, descripcion = ?, monto = ?, estado = ?, usuario_id = ? WHERE id = ?',
            [fecha, categoria, descripcion, monto, estado, usuarioId, id]
        );
        revalidatePath('/administration/expenses');
        return { success: true, message: 'Gasto actualizado exitosamente.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al actualizar el gasto.' };
    }
}

export async function deleteExpense(id: number) {
  if (!id) {
    return { success: false, message: 'ID de gasto no proporcionado.' };
  }
  try {
    await db.query('DELETE FROM fin_gastos WHERE id = ?', [id]);
    revalidatePath('/administration/expenses');
    return { success: true, message: 'Gasto eliminado exitosamente.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error al eliminar el gasto.' };
  }
}

export async function markExpenseAsPaid(id: number) {
  if (!id) {
    return { success: false, message: 'ID de gasto no proporcionado.' };
  }
  try {
    await db.query('UPDATE fin_gastos SET estado = "Pagado" WHERE id = ?', [id]);
    revalidatePath('/administration/expenses');
    return { success: true, message: 'Gasto marcado como pagado.' };
  } catch (error) {
    console.error('Error al marcar gasto como pagado:', error);
    return { success: false, message: 'Error al actualizar el estado del gasto.' };
  }
}

export async function getUsersSimple() {
    try {
        const [rows] = await db.query<RowDataPacket[]>(`
            SELECT id, nombre FROM seg_usuarios WHERE activo = 1 ORDER BY nombre ASC
        `);
        return rows as { id: number; nombre: string }[];
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}
