
'use server';

import { revalidatePath } from 'next/cache';
import db from '@/lib/db';
import { CreateUserSchema, UserWithRole } from '@/lib/types/security';

export async function getUsers(): Promise<UserWithRole[]> {
  try {
    const [rows] = await db.query(`
      SELECT 
        u.id, 
        u.nombre, 
        u.email, 
        r.nombre as rol, 
        u.activo 
      FROM seg_usuarios u
      LEFT JOIN seg_roles r ON u.rol_id = r.id
      ORDER BY u.id DESC
    `);
    return rows as UserWithRole[];
  } catch (error) {
    console.error('Error fetching users:', error);
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

  const { nombre, apellido_p, email, password, rol_id } = validatedFields.data;
  const fullName = apellido_p ? `${nombre} ${apellido_p}` : nombre;
  
  // NOTA: La contraseña se guarda en texto plano.
  // En producción, se debe usar una librería como bcrypt para hashear la contraseña.
  // const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.query(
      'INSERT INTO seg_usuarios (nombre, email, password_hash, rol_id, activo) VALUES (?, ?, ?, ?, ?)',
      [fullName, email, password, rol_id, 1]
    );
    revalidatePath('/security/users');
    return { message: 'Usuario creado exitosamente.' };
  } catch (error: any) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
        return { message: 'Error: El correo electrónico ya está registrado.' };
    }
    return { message: 'Error al crear el usuario.' };
  }
}

export async function deleteUser(id: number) {
  if (!id) {
    return { message: 'ID de usuario no proporcionado.' };
  }
  try {
    await db.query('DELETE FROM seg_usuarios WHERE id = ?', [id]);
    revalidatePath('/security/users');
    return { message: 'Usuario eliminado exitosamente.' };
  } catch (error) {
    console.error(error);
    return { message: 'Error al eliminar el usuario.' };
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
