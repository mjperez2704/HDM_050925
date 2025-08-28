import { z } from 'zod';

export const clientSchema = z.object({
  razonSocial: z.string().min(3, { message: "El nombre o razón social debe tener al menos 3 caracteres." }),
  tipoCliente: z.string({ required_error: "Por favor, seleccione un tipo de cliente." }),
  email: z.string().email({ message: "Por favor, ingrese un correo electrónico válido." }),
  telefono: z.string().min(10, { message: "El teléfono debe tener al menos 10 dígitos." }),
  rfc: z.string().optional(),
});

export type ClientSchema = z.infer<typeof clientSchema>;
