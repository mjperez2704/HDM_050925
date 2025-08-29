
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import db from '@/lib/db';
import { CreateUserSchema, UpdateUserSchema, UserWithRole } from '@/lib/types/security';
import type { UserWithId } from '@/lib/types/security';
import type { PoolConnection } from 'mysql2/promise';

export async function getUsers(): Promise<UserWithRole[]> {
  try {
    const [rows] = await db.query(`
      SELECT 
        u.id, 
        u.username,
        u.nombre,
        u.email, 
        r.nombre as rol, 
        u.activo 
      FROM seg_usuarios u 
      LEFT JOIN seg_usuario_rol ur ON u.id = ur.usuario_id
      LEFT JOIN seg_roles r ON ur.rol_id = r.id 
      ORDER BY u.id ASC
    `);
    return rows as UserWithRole[];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function getUserByUsername(username: string): Promise<UserWithId[]> {
  try {
    const [rows] = await db.query(`
      SELECT u.id, 
             u.username
             FROM seg_usuarios u
             WHERE username = ?
    `, [username]);
    
    return rows as UserWithId[];
  } catch (error) {
    console.error('Error obteniendo el id de usuario:', error);
    return [];
  }
}

export async function createUser(formData: unknown) {
  const validatedFields = CreateUserSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error de validación. Por favor, revise los campos.',
    };
  }

  const { username, nombre, apellido_p, email, password, rol_id, pin, forcePasswordChange, forcePinChange } = validatedFields.data;
  const fullName = apellido_p ? `${nombre} ${apellido_p}` : nombre;

  let connection: PoolConnection | null = null;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    const [userResult]: any = await connection.query(
      'INSERT INTO seg_usuarios (username, nombre, email, password_hash, activo, pin, forzar_cambio_pwd, forzar_cambio_pin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [username, fullName, email, password, 1, pin, forcePasswordChange, forcePinChange]
    );
    const userId = userResult.insertId;

    if (!userId) {
      throw new Error("No se pudo obtener el ID del usuario insertado.");
    }

    await connection.query(
      'INSERT INTO seg_usuario_rol (usuario_id, rol_id) VALUES (?, ?)',
      [userId, rol_id]
    );

    await connection.commit();
    revalidatePath('/security/users');
    return { success: true, message: 'Usuario creado exitosamente.' };

  } catch (error: any) {
    if (connection) {
      await connection.rollback();
    }
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      return { success: false, message: 'Error: El correo electrónico o el nombre de usuario ya está registrado.' };
    }
    return { success: false, message: 'Error de base de datos al crear el usuario.' };
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function updateUser(formData: unknown) {
    const validatedFields = UpdateUserSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Error de validación. Por favor, revise los campos.',
        };
    }
    
    const { id, nombre, email, rol_id, password } = validatedFields.data;
    
    let connection: PoolConnection | null = null;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        // Actualizar tabla de usuarios
        if (password) {
            await connection.query(
                'UPDATE seg_usuarios SET nombre = ?, email = ?, password_hash = ? WHERE id = ?',
                [nombre, email, password, id]
            );
        } else {
            await connection.query(
                'UPDATE seg_usuarios SET nombre = ?, email = ? WHERE id = ?',
                [nombre, email, id]
            );
        }

        // Actualizar tabla de roles
        await connection.query(
            'UPDATE seg_usuario_rol SET rol_id = ? WHERE usuario_id = ?',
            [rol_id, id]
        );

        await connection.commit();
        revalidatePath('/security/users');
        return { success: true, message: 'Usuario actualizado exitosamente.' };

    } catch (error: any) {
        if (connection) {
            await connection.rollback();
        }
        console.error('Error al actualizar el usuario:', error);
        if (error.code === 'ER_DUP_ENTRY') {
             return { success: false, message: 'Error: El correo electrónico ya está en uso por otro usuario.' };
        }
        return { success: false, message: 'Error de base de datos al actualizar el usuario.' };
    } finally {
        if (connection) {
            connection.release();
        }
    }
}


export async function deleteUser(id: number) {
  if (!id) {
    return { success: false, message: 'ID de usuario no proporcionado.' };
  }
  let connection: PoolConnection | null = null;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();
    
    await connection.query('DELETE FROM seg_usuario_rol WHERE usuario_id = ?', [id]);
    await connection.query('DELETE FROM seg_usuarios WHERE id = ?', [id]);

    await connection.commit();
    revalidatePath('/security/users');
    return { success: true, message: 'Usuario eliminado exitosamente.' };
  } catch (error) {
    if (connection) {
        await connection.rollback();
    }
    console.error(error);
    return { success: false, message: 'Error al eliminar el usuario.' };
  } finally {
      if (connection) {
          connection.release();
      }
  }
}

export async function getRoles() {
    try {
        const [rows] = await db.query('SELECT id, nombre FROM seg_roles ORDER BY nombre ASC');
        return rows as { id: number, nombre: string }[];
    } catch (error) {
        console.error('Error fetching roles:', error);
        return [];
    }
}

export async function toggleUserStatus(id: number, currentState: boolean) {
    if (!id) {
        return { success: false, message: 'ID de usuario no proporcionado.' };
    }
    try {
        await db.query('UPDATE seg_usuarios SET activo = ? WHERE id = ?', [!currentState, id]);
        revalidatePath('/security/users');
        return { success: true, message: `Usuario ${!currentState ? 'activado' : 'desactivado'} exitosamente.` };
    } catch (error) {
        console.error('Error al cambiar el estado del usuario:', error);
        return { success: false, message: 'Error al cambiar el estado del usuario.' };
    }
}

export async function updateUserPin(id: number, pin: string) {
    if (!id) {
        return { success: false, message: 'ID de usuario no proporcionado.' };
    }
    if (!/^\d{4}$/.test(pin)) {
        return { success: false, message: 'El PIN debe ser de 4 dígitos numéricos.' };
    }

    try {
        await db.query('UPDATE seg_usuarios SET pin = ? WHERE id = ?', [pin, id]);
        revalidatePath('/security/users');
        return { success: true, message: 'PIN del usuario actualizado exitosamente.' };
    } catch (error) {
        console.error('Error al actualizar el PIN del usuario:', error);
        return { success: false, message: 'Error de base de datos al actualizar el PIN.' };
    }
}
