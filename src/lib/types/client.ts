// src/lib/types/client.ts
import { z } from 'zod';

// Zod Schema para la validación de clientes
export const ClientSchema = z.object({
  razon_social: z.string().min(3, { message: "El nombre o razón social debe tener al menos 3 caracteres." }),
  tipoCliente: z.string({ required_error: "Por favor, seleccione un tipo de cliente." }),
  email: z.string().email({ message: "Por favor, ingrese un correo electrónico válido." }),
  telefono: z.string().min(10, { message: "El teléfono debe tener al menos 10 dígitos." }),
  rfc: z.string().length(13, "El RFC debe tener 13 caracteres.").optional().or(z.literal('')),
  tipo_id: z.number().int().positive().optional(), // Assuming tipoCliente will be mapped to a number
});

// TypeScript Type para Cliente
export type Client = z.infer<typeof ClientSchema> & {
  id: number;
  fecha_registro: Date;
};
