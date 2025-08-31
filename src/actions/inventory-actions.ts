
'use server';

import { revalidatePath } from 'next/cache';
import db from '@/lib/db';
import type { Product } from '@/lib/types/product';
import type { ProductWithStockDetails } from '@/lib/types/inventory';
import type { RowDataPacket, OkPacket } from 'mysql2';
import { z } from 'zod';

interface StockDetailQueryResult extends RowDataPacket {
    id_producto: number;
    almacen: string;
    seccion: string;
    coordenada: string;
    cantidad: number;
    visible: boolean;
};

interface ProductQueryResult extends RowDataPacket, Product {}

/**
 * Obtiene todos los productos y su desglose de stock por coordenada.
 */
export async function getInventoryStockDetails(): Promise<ProductWithStockDetails[]> {
    try {
        // Obtenemos todos los productos activos primero
        const [products] = await db.query<ProductQueryResult[]>(`
            SELECT
                p.id, p.sku, p.nombre, p.unidad, p.precio_lista as precioLista, p.costo_promedio as costoPromedio,
                p.es_serie as esSerie, p.descripcion, p.categoria_id as categoriaId, p.marca_id as marcaId,
                p.modelo_id as modeloId
            FROM cat_productos p WHERE p.activo = 1 ORDER BY p.nombre ASC
        `);

        // Obtenemos todos los detalles de stock de una sola vez
        const [stockDetails] = await db.query<StockDetailQueryResult[]>(`
            SELECT
                c.producto_id as id_producto,
                a.nombre as almacen,
                sec.nombre as seccion,
                c.codigo_coordenada as coordenada,
                c.cantidad,
                c.visible
            FROM alm_coordenada c
            JOIN alm_secciones sec ON c.seccion_id = sec.id
            JOIN alm_almacenes a ON c.almacen_id = a.id
            WHERE c.cantidad > 0 AND c.producto_id IS NOT NULL
        `);

        // Creamos un mapa para buscar detalles de stock eficientemente
        const stockDetailsMap = new Map<number, StockDetailQueryResult[]>();
        stockDetails.forEach(detail => {
            if (!stockDetailsMap.has(detail.id_producto)) {
                stockDetailsMap.set(detail.id_producto, []);
            }
            stockDetailsMap.get(detail.id_producto)!.push(detail);
        });

        // Mapeamos los detalles del stock a cada producto
        const results: ProductWithStockDetails[] = products.map(product => {
            const detailsForProduct = stockDetailsMap.get(product.id) || [];
            return {
                ...product,
                details: detailsForProduct.map(d => ({
                    warehouse: d.almacen,
                    section: d.seccion,
                    coordinate: d.coordenada,
                    quantity: d.cantidad,
                    visible: !!d.visible // Convertir 0/1 a booleano
                }))
            };
        });
        
        return results;

    } catch (error) {
        console.error('Error fetching inventory stock details:', error);
        return [];
    }
}

// Tipos para la estructura del almacén
export type Coordinate = { name: string; skus: string[]; visible: boolean };
export type Section = { id: number; name: string; coordinates: Coordinate[] };
export type Warehouse = { id: number; name: string; description: string | null; sections: Section[] };

interface WarehouseRow extends RowDataPacket { id: number; nombre: string; descripcion: string | null; }
interface SectionRow extends RowDataPacket { id: number; nombre: string; almacen_id: number; }
interface CoordinateRow extends RowDataPacket { 
    codigo_coordenada: string; 
    seccion_id: number; 
    visible: number; 
    sku: string | null;
}

/**
 * Obtiene la estructura completa de almacenes, secciones y coordenadas.
 */
export async function getWarehouseStructure() {
    try {
        const [warehouses] = await db.query<WarehouseRow[]>('SELECT id, nombre, descripcion FROM alm_almacenes ORDER BY nombre');
        const [sections] = await db.query<SectionRow[]>('SELECT id, nombre, almacen_id FROM alm_secciones ORDER BY nombre');
        const [coordinates] = await db.query<CoordinateRow[]>(`
            SELECT 
                c.codigo_coordenada, 
                c.seccion_id,
                c.visible,
                p.sku
            FROM alm_coordenada c
            LEFT JOIN cat_productos p ON c.producto_id = p.id
            ORDER BY c.codigo_coordenada
        `);

        // Agrupar SKUs por coordenada
        const skusByCoordinate = new Map<string, { skus: string[], visible: boolean, seccion_id: number }>();
        coordinates.forEach(c => {
            const key = `${c.seccion_id}-${c.codigo_coordenada}`;
            if (!skusByCoordinate.has(key)) {
                skusByCoordinate.set(key, { skus: [], visible: !!c.visible, seccion_id: c.seccion_id });
            }
            if (c.sku) {
                skusByCoordinate.get(key)!.skus.push(c.sku);
            }
        });

        // Agrupar coordenadas por sección
        const coordinatesBySection = new Map<number, Coordinate[]>();
        skusByCoordinate.forEach((value, key) => {
            const [seccion_id_str, ...codigo_coordenada_parts] = key.split('-');
            const codigo_coordenada = codigo_coordenada_parts.join('-');
            const seccion_id = parseInt(seccion_id_str, 10);

            if (!coordinatesBySection.has(seccion_id)) {
                coordinatesBySection.set(seccion_id, []);
            }
            coordinatesBySection.get(seccion_id)!.push({ 
                name: codigo_coordenada,
                skus: value.skus,
                visible: value.visible,
            });
        });


        const sectionsByWarehouse = new Map<number, Section[]>();
        sections.forEach(s => {
            if (!sectionsByWarehouse.has(s.almacen_id)) {
                sectionsByWarehouse.set(s.almacen_id, []);
            }
            sectionsByWarehouse.get(s.almacen_id)!.push({
                id: s.id,
                name: s.nombre,
                coordinates: coordinatesBySection.get(s.id) || []
            });
        });

        return warehouses.map(w => ({
            id: w.id,
            name: w.nombre,
            description: w.descripcion, 
            sections: sectionsByWarehouse.get(w.id) || [],
            sectionsCount: (sectionsByWarehouse.get(w.id) || []).length
        }));

    } catch (error) {
        console.error('Error fetching warehouse structure:', error);
        return [];
    }
}

// --- CRUD Actions ---

const WarehouseSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido.'),
  description: z.string().optional(),
});

export async function createWarehouse(formData: unknown) {
  const validatedFields = WarehouseSchema.safeParse(formData);
  if (!validatedFields.success) return { success: false, message: 'Datos inválidos.' };
  const { name, description } = validatedFields.data;
  try {
    await db.query('INSERT INTO alm_almacenes (nombre, descripcion) VALUES (?, ?)', [name, description]);
    revalidatePath('/inventory/warehouse-management');
    return { success: true, message: 'Almacén creado exitosamente.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error al crear el almacén.' };
  }
}

export async function updateWarehouse(id: number, formData: unknown) {
  const validatedFields = WarehouseSchema.safeParse(formData);
  if (!validatedFields.success) return { success: false, message: 'Datos inválidos.' };
  const { name, description } = validatedFields.data;
  try {
    await db.query('UPDATE alm_almacenes SET nombre = ?, descripcion = ? WHERE id = ?', [name, description, id]);
    revalidatePath('/inventory/warehouse-management');
    return { success: true, message: 'Almacén actualizado.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error al actualizar.' };
  }
}

export async function deleteWarehouse(id: number) {
  try {
    await db.query('DELETE FROM alm_almacenes WHERE id = ?', [id]);
    revalidatePath('/inventory/warehouse-management');
    return { success: true, message: 'Almacén eliminado.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error al eliminar. Verifique que no tenga secciones.' };
  }
}


const SectionSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido.'),
  warehouseId: z.number().int().positive(),
});

export async function createSection(formData: unknown) {
    const validatedFields = SectionSchema.safeParse(formData);
    if (!validatedFields.success) return { success: false, message: 'Datos inválidos.' };
    const { name, warehouseId } = validatedFields.data;
    try {
        await db.query('INSERT INTO alm_secciones (nombre, almacen_id) VALUES (?, ?)', [name, warehouseId]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Sección creada.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al crear sección.' };
    }
}

export async function updateSection(id: number, name: string) {
    try {
        await db.query('UPDATE alm_secciones SET nombre = ? WHERE id = ?', [name, id]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Sección actualizada.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al actualizar.' };
    }
}

export async function deleteSection(id: number) {
    try {
        await db.query('DELETE FROM alm_secciones WHERE id = ?', [id]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Sección eliminada.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al eliminar. Verifique que no tenga coordenadas.' };
    }
}

const CoordinateSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido.'),
    visible: z.boolean(),
    sectionId: z.number().int().positive(),
});

export async function createCoordinate(formData: unknown) {
    const validatedFields = CoordinateSchema.safeParse(formData);
    if (!validatedFields.success) return { success: false, message: 'Datos inválidos.' };
    const { name, visible, sectionId } = validatedFields.data;
    try {
        const [warehouseResult] = await db.query<RowDataPacket[]>('SELECT almacen_id FROM alm_secciones WHERE id = ?', [sectionId]);
        if (warehouseResult.length === 0) throw new Error('Sección no encontrada');
        const warehouseId = warehouseResult[0].almacen_id;

        await db.query('INSERT INTO alm_coordenada (codigo_coordenada, seccion_id, almacen_id, visible) VALUES (?, ?, ?, ?)', [name, sectionId, warehouseId, visible]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Coordenada creada.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al crear coordenada.' };
    }
}

export async function updateCoordinate(sectionId: number, oldName: string, newName: string, newVisible: boolean) {
     try {
        await db.query('UPDATE alm_coordenada SET codigo_coordenada = ?, visible = ? WHERE seccion_id = ? AND codigo_coordenada = ?', [newName, newVisible, sectionId, oldName]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Coordenada actualizada.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al actualizar.' };
    }
}

export async function deleteCoordinate(sectionId: number, name: string) {
    try {
        await db.query('DELETE FROM alm_coordenada WHERE seccion_id = ? AND codigo_coordenada = ?', [sectionId, name]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Coordenada eliminada.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al eliminar. Verifique que no tenga stock.' };
    }
}

const AssignSkuSchema = z.object({
    productId: z.number().int().positive(),
    sectionId: z.number().int().positive(),
    coordinateName: z.string().min(1),
});

export async function assignSkuToCoordinate(formData: unknown) {
    const validatedFields = AssignSkuSchema.safeParse(formData);
    if (!validatedFields.success) return { success: false, message: 'Datos inválidos.' };
    const { productId, sectionId, coordinateName } = validatedFields.data;
    try {
        const [result] = await db.query<OkPacket>('UPDATE alm_coordenada SET producto_id = ? WHERE seccion_id = ? AND codigo_coordenada = ?', [productId, sectionId, coordinateName]);
        if (result.affectedRows === 0) {
            return { success: false, message: 'La coordenada no fue encontrada o ya está asignada.' };
        }
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'SKU asignado.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al asignar SKU.' };
    }
}

export async function getProductsForSelect(): Promise<{ id: number; sku: string; nombre: string }[]> {
    try {
        const [rows] = await db.query<RowDataPacket[]>('SELECT id, sku, nombre FROM cat_productos WHERE activo = 1 ORDER BY sku');
        return rows as { id: number; sku: string; nombre: string }[];
    } catch (error) {
        console.error('Error fetching products for select:', error);
        return [];
    }
}

    