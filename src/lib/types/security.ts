
import { z } from 'zod';

// Zod Schema for creating a new user (from form)
export const CreateUserSchema = z.object({
  nombre: z.string().min(2, "El nombre es requerido."),
  username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres."),
  apellido_p: z.string().optional(),
  email: z.string().email("Email inválido."),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
  rol_id: z.coerce.number().int().positive("Debes seleccionar un rol."),
  pin: z.string().length(4, "El PIN debe ser de 4 dígitos.").regex(/^\d{4}$/, "El PIN solo debe contener números."),
  forcePasswordChange: z.boolean().default(false),
  forcePinChange: z.boolean().default(false),
});

// Zod Schema for a user from the DB
export const UserSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email("Email inválido."),
  nombre: z.string().min(2, "El nombre es requerido."),
  username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres."),
  password_hash: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
  rol_id: z.number().int().positive("Debes seleccionar un rol."),
  activo: z.boolean(),
  ultimo_acceso: z.date().optional().nullable(),
  pin: z.string().length(4, "El PIN debe ser de 4 dígitos.").optional().nullable(),
  forzar_cambio_pwd: z.boolean().default(false),
  forzar_cambio_pin: z.boolean().default(false),
});

// TypeScript Type derived from the schema
export type User = z.infer<typeof UserSchema>;

// Type for displaying users in the table with role name
export type UserWithRole = {
  id: number;
  nombre: string;
  username: string;
  email: string;
  rol: string;
  activo: boolean;
};

export type UserWithId = {
  id: number;
  username: string;
}

// Zod Schema for Roles
export const RoleSchema = z.object({
  id: z.number().int().positive(),
  nombre: z.string().min(3, "El nombre del rol es requerido."),
  descripcion: z.string().optional().nullable(),
});

export type Role = z.infer<typeof RoleSchema>;
