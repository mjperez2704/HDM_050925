
import { z } from 'zod';

export const SupplierSchema = z.object({
  id: z.number().int().positive(),
  razonSocial: z.string().min(3, { message: "La razón social es requerida." }),
  rfc: z.string().optional().nullable(),
  email: z.string().email({ message: "Email inválido." }),
  telefono: z.string().optional().nullable(),
  whatsapp: z.string().optional().nullable(),
  direccion: z.string().optional().nullable(),
  ciudad: z.string().optional().nullable(),
  estado: z.string().optional().nullable(),
  pais: z.string().optional().nullable(),
  cp: z.string().optional().nullable(),
  diasCredito: z.coerce.number().int().min(0).default(0),
});

export type Supplier = z.infer<typeof SupplierSchema>;
