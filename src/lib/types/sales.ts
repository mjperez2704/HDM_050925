// src/lib/types/sales.ts
import { z } from 'zod';

// Detalle de una venta
export const SaleDetailSchema = z.object({
  producto_id: z.number().int().positive(),
  cantidad: z.number().positive("La cantidad debe ser mayor a cero."),
  precio_unitario: z.number().min(0),
  // Podrías añadir más campos si es necesario
});

// Zod Schema para la cabecera de la venta
export const SaleSchema = z.object({
  cliente_id: z.number().int().positive(),
  fecha: z.date(),
  estado: z.enum(['BORRADOR', 'PAGADA', 'PARCIAL', 'CANCELADA']),
  detalles: z.array(SaleDetailSchema).min(1, "La venta debe tener al menos un producto."),
});

// TypeScript Types
export type SaleDetail = z.infer<typeof SaleDetailSchema>;
export type Sale = z.infer<typeof SaleSchema> & {
  id: number;
  folio: string;
  total: number;
};
