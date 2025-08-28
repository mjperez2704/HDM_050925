// src/lib/types/product.ts
import { z } from 'zod';

// Zod Schema para la validación de productos
export const ProductSchema = z.object({
  sku: z.string().min(3, "El SKU es requerido."),
  nombre: z.string().min(3, "El nombre es requerido."),
  descripcion: z.string().optional(),
  categoria_id: z.number().int().positive(),
  marca_id: z.number().int().positive().optional(),
  modelo_id: z.number().int().positive().optional(),
  unidad: z.enum(['PZA', 'KIT', 'SRV']),
  precio_lista: z.number().min(0, "El precio no puede ser negativo."),
  costo_promedio: z.number().min(0, "El costo no puede ser negativo."),
  es_serie: z.boolean().default(false),
  // Atributos adicionales
  atributo_1: z.string().optional(),
  atributo_2: z.string().optional(),
  atributo_3: z.string().optional(),
  atributo_4: z.string().optional(),
  atributo_5: z.string().optional(),
  atributo_6: z.string().optional(),
  atributo_7: z.string().optional(),
  atributo_8: z.string().optional(),
  atributo_9: z.string().optional(),
  atributo_10: z.string().optional(),
});

// TypeScript Type para el producto
export type Product = z.infer<typeof ProductSchema> & {
  id: number;
  activo: boolean;
};
