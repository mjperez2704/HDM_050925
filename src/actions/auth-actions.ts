
'use server';

import { z } from 'zod';
// CORRECCIÓN: Se importa directamente el pool de conexiones 'db'.
import db from '@/lib/db';
import type { RowDataPacket } from 'mysql2';


const LoginSchema = z.object({
  email: z.string().email({ message: 'Por favor, ingrese un correo electrónico válido.' }),
  password: z.string().min(1, { message: 'La contraseña es requerida.' }),
});

type LoginInput = z.infer<typeof LoginSchema>;

// Tipo para el usuario que viene de la BD para mayor seguridad
interface UserFromDB extends RowDataPacket {
    id: number;
    email: string;
    password: string; // ADVERTENCIA: Contraseña en texto plano
}


export async function login(credentials: LoginInput): Promise<{ success: boolean; message: string }> {
  const validatedFields = LoginSchema.safeParse(credentials);

  if (!validatedFields.success) {
    return { success: false, message: validatedFields.error.errors[0].message };
  }

  const { email, password } = validatedFields.data;

  try {
    // CORRECCIÓN: Usamos directamente el pool 'db.query' en lugar del antiguo executeQuery.
    const [rows] = await db.query<UserFromDB[]>(
      'SELECT * FROM seg_usuarios WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return { success: false, message: 'El correo electrónico no está registrado.' };
    }

    const user = rows[0];

    // ADVERTENCIA DE SEGURIDAD GRAVE:
    // Estás comparando contraseñas en texto plano. Esto es extremadamente inseguro.
    // Cualquier persona con acceso a la base de datos puede ver todas las contraseñas.
    // En un siguiente paso, DEBERÍAS cambiar esto para usar una librería como 'bcryptjs' 
    // y comparar contraseñas hasheadas. ej: const match = await bcrypt.compare(password, user.password_hash);
    const passwordMatch = user.password === password;

    if (!passwordMatch) {
      return { success: false, message: 'La contraseña es incorrecta.' };
    }

    // Si el login es exitoso, aquí deberías crear una sesión o un token (JWT)
    return { success: true, message: 'Inicio de sesión exitoso.' };

  } catch (error) {
    console.error('Error de autenticación:', error);
    return { success: false, message: 'Error del servidor al intentar iniciar sesión.' };
  }
}


// Esta función es una simulación. En una aplicación real, obtendrías el ID del usuario de la sesión.
const getCurrentUserId = () => 1;

interface PermissionCheckResult extends RowDataPacket {
    count: number;
}

export async function checkUserPermission(permissionId: number): Promise<boolean> {
  const userId = getCurrentUserId();
  if (!userId) {
    return false;
  }

  try {
    // CORRECCIÓN: Usamos directamente 'db.query'
    const [rows] = await db.query<PermissionCheckResult[]>(
      `SELECT COUNT(*) as count
       FROM seg_usuario_rol ur
       JOIN seg_rol_permiso rp ON ur.rol_id = rp.rol_id
       WHERE ur.usuario_id = ? AND rp.permiso_id = ?`,
      [userId, permissionId]
    );

    return rows[0].count > 0;
  } catch (error) {
    console.error("Error al verificar permisos:", error);
    return false;
  }
}
