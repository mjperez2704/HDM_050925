// src/lib/types/product.ts
import { z } from 'zod';

// Zod Schema para la validación de productos
export const ProductSchema = z.object({
  id: z.number().optional(),
  sku: z.string().min(3, "El SKU es requerido."),
  nombre: z.string().min(3, "El nombre es requerido."),
  descripcion: z.string().optional().nullable(),
  categoriaId: z.number().int().positive(),
  marcaId: z.number().int().positive().optional().nullable(),
  modeloId: z.number().int().positive().optional().nullable(),
  unidad: z.enum(['PZA', 'KIT', 'SRV']),
  precioLista: z.number().min(0, "El precio no puede ser negativo."),
  costoPromedio: z.number().min(0, "El costo no puede ser negativo."),
  esSerie: z.boolean().default(false),
  // Atributos adicionales
  atributo1: z.string().optional().nullable(),
  atributo2: z.string().optional().nullable(),
  atributo3: z.string().optional().nullable(),
  atributo4: z.string().optional().nullable(),
  atributo5: z.string().optional().nullable(),
  atributo6: z.string().optional().nullable(),
  atributo7: z.string().optional().nullable(),
  atributo8: z.string().optional().nullable(),
  atributo9: z.string().optional().nullable(),
  atributo10: z.string().optional().nullable(),
});

// TypeScript Type para el producto
export type Product = z.infer<typeof ProductSchema> & {
  id: number;
  activo: boolean;
};
