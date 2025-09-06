
import 'server-only'; // Asegura que este código solo se ejecute en el servidor
import { cookies } from 'next/headers';
import * as jose from 'jose';

// Definimos la estructura del payload de nuestra sesión
export interface SessionPayload {
  userId: number;
  username: string;
  nombre: string;
  permissions: string[];
  iat: number; // Issued at
  exp: number; // Expiration time
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// --- Función Principal para Obtener la Sesión ---
export async function getSession(): Promise<SessionPayload | null> {
  const sessionCookie = cookies().get('session')?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const { payload } = await jose.jwtVerify<SessionPayload>(sessionCookie, secret);
    return payload;
  } catch (error) {
    console.error('Failed to verify session JWT:', error);
    return null;
  }
}

// --- Helper para Verificar Permisos ---
export async function hasPermission(permissionKey: string): Promise<boolean> {
    const session = await getSession();
    if (!session) {
        return false;
    }
    return session.permissions.includes(permissionKey);
}
