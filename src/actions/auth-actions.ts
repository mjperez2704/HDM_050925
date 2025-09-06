'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import db from '@/lib/db';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import type { RowDataPacket } from 'mysql2';

// --- Zod Schema for validation ---
const LoginSchema = z.object({
    credential: z.string().min(1, { message: 'El usuario o email es requerido.' }),
    password: z.string().min(1, { message: 'La contraseña es requerida.' }),
});

// --- Main Authenticate Action ---
export async function authenticate(_prevState: string | undefined, formData: FormData) {
    try {
        const validatedFields = LoginSchema.safeParse(Object.fromEntries(formData.entries()));

        if (!validatedFields.success) {
            return 'Datos inválidos. Por favor, verifica la información.';
        }

        const { credential, password } = validatedFields.data;

        // 1. Find the user by username or email
        // Se corrige la destructuración y el tipado
        const [userRows] = await db.query(
            'SELECT * FROM seg_usuarios WHERE (username = ? OR email = ?) AND activo = 1 AND deleted_at IS NULL',
            [credential, credential]
        ) as [RowDataPacket[]];

        const user = userRows[0];
        if (!user) {
            return 'Credenciales incorrectas. Inténtalo de nuevo.';
        }

        // 2. Compare the provided password with the stored hash
        const passwordsMatch = await bcrypt.compare(password, user.password_hash);

        if (!password===user.password_hash) {
           return 'Credenciales incorrectas. Inténtalo de nuevo.';
        }

        // 3. Authentication successful, fetch roles and permissions
        // Se corrige la destructuración y el tipado
        const [permissionRows] = await db.query(
            `SELECT DISTINCT p.clave FROM seg_permisos p
                                                      JOIN seg_rol_permiso rp ON p.id = rp.permiso_id
                                                      JOIN seg_usuario_rol ur ON rp.rol_id = ur.rol_id
                     WHERE ur.usuario_id = ?`,
            [user.id]
        ) as [RowDataPacket[]];

        // Ahora 'permissionRows' es un array y '.map' funciona correctamente
        const permissions = permissionRows.map((p: RowDataPacket) => (p as { clave: string }).clave);

        // 4. Create the session payload (JWT)
        const sessionPayload = {
            userId: user.id,
            username: user.username,
            nombre: user.nombre,
            permissions: permissions,
        };

        // 5. Sign the JWT
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            // Este es un error del servidor, no del usuario.
            throw new Error('La clave secreta para JWT no está configurada en las variables de entorno.');
        }
        const encodedSecret = new TextEncoder().encode(secret);
        const token = await new jose.SignJWT(sessionPayload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('8h')
            .sign(encodedSecret);

        // 6. Set the session cookie
        (await cookies()).set('session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 8, // 8 hours
            path: '/',
        });

    } catch (error) {
        console.error('Authentication Error:', error);
        // Se devuelve un mensaje genérico para no exponer detalles del error al cliente.
        return 'Ocurrió un error inesperado en el servidor.';
    }

    // 7. Redirect to the dashboard on success
    redirect('/');
}

// --- Funciones de Ayuda de Sesión y Permisos ---

export interface SessionPayload {
  userId: number;
  username: string;
  nombre: string;
  permissions: string[];
}

async function getSession(): Promise<(SessionPayload & { iat: number; exp: number; }) | null> {
  const sessionCookie = (await cookies()).get('session')?.value;
  if (!sessionCookie) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify<SessionPayload & { iat: number; exp: number; }>(sessionCookie, secret);
    return payload;
  } catch (error) {
    // Esto puede ocurrir si el token es inválido o ha expirado
    return null;
  }
}

export async function getCurrentUserId(): Promise<number | null> {
    const session = await getSession();
    return session?.userId ?? null;
}

/**
 * Verifica si el usuario actual tiene un permiso específico.
 * @param permissionKey La clave del permiso a verificar (e.g., 'inventory:baja')
 * @returns `true` si el usuario tiene el permiso, `false` en caso contrario.
 */
export async function checkUserPermission(permissionKey: string): Promise<boolean> {
    const session = await getSession();
    return session?.permissions?.includes(permissionKey) ?? false;
}
