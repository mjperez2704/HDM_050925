
import { z } from 'zod';

export const SupplierSchema = z.object({
  id: z.number().int().positive(),
  razonSocial: z.string().min(3, { message: "La razón social es requerida." }),
  rfc: z.string().optional(),
  diasCredito: z.coerce.number().int().min(0).default(0),
  tipo: z.enum(['Productos', 'Servicios', 'Mixto']),
  origen: z.enum(['Nacional', 'Internacional']),
  personaContacto: z.string().optional(),
  email: z.string().email({ message: "Email inválido." }),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
});

export type Supplier = z.infer<typeof SupplierSchema>;
