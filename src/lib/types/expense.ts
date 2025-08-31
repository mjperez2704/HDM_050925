
import { z } from 'zod';

export const GASTO_CATEGORIES = ['Servicios', 'Renta', 'Nómina', 'Marketing', 'Insumos', 'Otros'] as const;
export const GASTO_STATUSES = ['Pendiente', 'Pagado', 'Cancelado'] as const;

export const ExpenseSchema = z.object({
  id: z.number().int().positive(),
  fecha: z.date({
    required_error: "La fecha es requerida.",
  }),
  categoria: z.enum(GASTO_CATEGORIES, {
    required_error: "Debe seleccionar una categoría.",
  }),
  descripcion: z.string().min(3, { message: "La descripción es requerida." }),
  monto: z.coerce.number().min(0.01, { message: "El monto debe ser mayor a cero." }),
  estado: z.enum(GASTO_STATUSES, {
    required_error: "Debe seleccionar un estado.",
  }),
  usuarioId: z.coerce.number().int().positive({ message: "Debe seleccionar un usuario." }),
  nombreUsuario: z.string().optional(), // Para mostrar en la tabla
});

export type Expense = z.infer<typeof ExpenseSchema>;
