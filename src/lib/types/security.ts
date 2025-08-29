// src/lib/types/security.ts
import { z } from 'zod';

// Zod Schema para la validación de un nuevo usuario
export const UserSchema = z.object({
  username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres."),
  email: z.string().email("Email inválido."),
  nombre: z.string().min(2, "El nombre es requerido."),
  apellido_p: z.string().optional(),
  password_hash: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
  rol_id: z.number().int().positive("Debes seleccionar un rol."),
});

// TypeScript Type derivado del schema
export type User = z.infer<typeof UserSchema> & {
  id: number;
  activo: boolean;
  ultimo_acceso?: Date;
};

// Zod Schema para Roles
export const RoleSchema = z.object({
  nombre: z.string().min(3, "El nombre del rol es requerido."),
  descripcion: z.string().optional(),
});

export type Role = z.infer<typeof RoleSchema> & {
  id: number;
};
