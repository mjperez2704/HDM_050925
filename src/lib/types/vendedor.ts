
import { z } from 'zod';

export const VendedorSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(2, "El nombre es requerido."),
  slug: z.string().min(2, "El slug es requerido."),
  email: z.string().email("Email inválido."),
  quota: z.number().min(0, "La cuota no puede ser negativa."),
  password: z.string().optional(),
});

export const CreateVendedorSchema = VendedorSchema.omit({ id: true });
export const UpdateVendedorSchema = VendedorSchema;

export type Vendedor = z.infer<typeof VendedorSchema>;
