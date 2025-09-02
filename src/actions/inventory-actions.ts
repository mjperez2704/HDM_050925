
'use server';

import { revalidatePath } from 'next/cache';
import { executeQuery as db } from '@/lib/db';
import type { Product } from '@/lib/types/product';
import type { ProductWithStockDetails } from '@/lib/types/inventory';
import type { RowDataPacket, OkPacket } from 'mysql2';
import { z } from 'zod';

// --- Tipos de Respuesta Estandarizados ---
type FormState = { success: boolean; message: string; };

// --- Tipos para la consulta de detalles de stock ---
interface ProductQueryResult extends RowDataPacket, Product {}
interface StockDetailQueryResult extends RowDataPacket {
    id_producto: number;
    almacen: string;
    seccion: string;
    coordenada: string;
    cantidad: number;
    visible: number;
}
interface WarehouseRow extends RowDataPacket { id: number; nombre: string; descripcion: string | null; }
interface SectionRow extends RowDataPacket { id: number; nombre: string; almacen_id: number; }
interface CoordinateRow extends RowDataPacket {
    seccion_id: number;
    codigo_coordenada: string;
    visible: number;
    sku: string | null;
}
type Coordinate = { name: string; skus: string[]; visible: boolean; };
type Section = { id: number; name: string; coordinates: Coordinate[]; };


export async function getInventoryStockDetails(): Promise<ProductWithStockDetails[]> {
    try {
        const productsQuery = `
            SELECT p.id, p.sku, p.nombre, p.unidad
            FROM cat_productos p
            WHERE p.activo = 1
            ORDER BY p.nombre ASC`;
        const stockDetailsQuery = `
            SELECT 
                cs.producto_id as id_producto,
                a.nombre as almacen,
                s.nombre as seccion,
                c.codigo_coordenada as coordenada,
                cs.cantidad,
                c.visible
            FROM alm_coordenada_stock cs
            JOIN alm_coordenada c ON cs.coordenada_id = c.id
            JOIN alm_secciones s ON c.seccion_id = s.id
            JOIN alm_almacenes a ON s.almacen_id = a.id`;

        const [productsRes] = await db(productsQuery) as [ProductQueryResult[], any];
        const [stockDetailsRes] = await db(stockDetailsQuery) as [StockDetailQueryResult[], any];

        const products = Array.isArray(productsRes) ? productsRes : [];
        const stockDetails = Array.isArray(stockDetailsRes) ? stockDetailsRes : [];

        const stockDetailsMap = new Map<number, StockDetailQueryResult[]>();
        stockDetails.forEach(detail => {
            if (!stockDetailsMap.has(detail.id_producto)) {
                stockDetailsMap.set(detail.id_producto, []);
            }
            stockDetailsMap.get(detail.id_producto)!.push(detail);
        });

        return products.map(product => {
            const detailsForProduct = stockDetailsMap.get(product.id) || [];
            return {
                ...product,
                details: detailsForProduct.map(d => ({
                    warehouse: d.almacen,
                    section: d.seccion,
                    coordinate: d.coordenada,
                    quantity: d.cantidad,
                    visible: !!d.visible
                }))
            };
        });

    } catch (error) {
        console.error('Error fetching inventory stock details:', error);
        return [];
    }
}

export async function getWarehouseStructure() {
    try {
        const warehousesQuery = 'SELECT id, nombre, descripcion FROM alm_almacenes ORDER BY nombre';
        const sectionsQuery = 'SELECT id, nombre, almacen_id FROM alm_secciones ORDER BY nombre';
        const coordinatesQuery = `
            SELECT 
                c.seccion_id, 
                c.codigo_coordenada, 
                c.visible,
                p.sku
            FROM alm_coordenada c
            LEFT JOIN alm_coordenada_sku cs ON c.id = cs.coordenada_id
            LEFT JOIN cat_productos p ON cs.producto_id = p.id
            ORDER BY c.seccion_id, c.codigo_coordenada`;

        const [warehousesRes] = await db(warehousesQuery) as [WarehouseRow[], any];
        const [sectionsRes] = await db(sectionsQuery) as [SectionRow[], any];
        const [coordinatesRes] = await db(coordinatesQuery) as [CoordinateRow[], any];

        const warehouses = Array.isArray(warehousesRes) ? warehousesRes : [];
        const sections = Array.isArray(sectionsRes) ? sectionsRes : [];
        const coordinates = Array.isArray(coordinatesRes) ? coordinatesRes : [];

        const coordinatesMap = new Map<number, Coordinate[]>();
        coordinates.forEach(c => {
            if (!coordinatesMap.has(c.seccion_id)) {
                coordinatesMap.set(c.seccion_id, []);
            }
            const coordList = coordinatesMap.get(c.seccion_id)!;
            let coord = coordList.find(item => item.name === c.codigo_coordenada);
            if (!coord) {
                coord = { name: c.codigo_coordenada, skus: [], visible: !!c.visible };
                coordList.push(coord);
            }
            if (c.sku) {
                coord.skus.push(c.sku);
            }
        });
        
        const sectionsMap = new Map<number, Section[]>();
        sections.forEach(s => {
            if (!sectionsMap.has(s.almacen_id)) {
                sectionsMap.set(s.almacen_id, []);
            }
            sectionsMap.get(s.almacen_id)!.push({
                id: s.id,
                name: s.nombre,
                coordinates: coordinatesMap.get(s.id) || []
            });
        });

        return warehouses.map(w => {
            const warehouseSections = sectionsMap.get(w.id) || [];
            return {
                id: w.id,
                name: w.nombre,
                description: w.descripcion, 
                sections: warehouseSections,
                sectionsCount: warehouseSections.length
            };
        });

    } catch (error) {
        console.error('Error fetching warehouse structure:', error);
        return [];
    }
}

// --- CRUD Almacenes ---
const warehouseSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido.'),
  description: z.string().optional(),
});
export async function createWarehouse(data: z.infer<typeof warehouseSchema>): Promise<FormState> {
    const validated = warehouseSchema.safeParse(data);
    if (!validated.success) return { success: false, message: 'Datos inválidos.' };
    try {
        await db('INSERT INTO alm_almacenes (nombre, descripcion) VALUES (?, ?)', [validated.data.name, validated.data.description]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Almacén creado exitosamente.' };
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') return { success: false, message: 'Ya existe un almacén con ese nombre.' };
        return { success: false, message: 'Error en el servidor.' };
    }
}
export async function updateWarehouse(id: number, data: z.infer<typeof warehouseSchema>): Promise<FormState> {
    const validated = warehouseSchema.safeParse(data);
    if (!validated.success) return { success: false, message: 'Datos inválidos.' };
    try {
        await db('UPDATE alm_almacenes SET nombre = ?, descripcion = ? WHERE id = ?', [validated.data.name, validated.data.description, id]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Almacén actualizado.' };
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') return { success: false, message: 'Ya existe un almacén con ese nombre.' };
        return { success: false, message: 'Error en el servidor.' };
    }
}
export async function deleteWarehouse(id: number): Promise<FormState> {
    try {
        await db('DELETE FROM alm_almacenes WHERE id = ?', [id]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Almacén eliminado.' };
    } catch (error: any) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') return { success: false, message: 'No se puede eliminar porque tiene secciones asociadas.' };
        return { success: false, message: 'Error en el servidor.' };
    }
}

// --- CRUD Secciones ---
const sectionSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido.'),
    warehouseId: z.number().int().positive(),
});
export async function createSection(data: z.infer<typeof sectionSchema>): Promise<FormState> {
    const validated = sectionSchema.safeParse(data);
    if (!validated.success) return { success: false, message: 'Datos inválidos.' };
    try {
        await db('INSERT INTO alm_secciones (nombre, almacen_id) VALUES (?, ?)', [validated.data.name, validated.data.warehouseId]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Sección creada exitosamente.' };
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') return { success: false, message: 'Ya existe una sección con ese nombre en este almacén.' };
        return { success: false, message: 'Error en el servidor.' };
    }
}
export async function updateSection(id: number, name: string): Promise<FormState> {
    if (!name) return { success: false, message: 'El nombre es requerido.' };
    try {
        await db('UPDATE alm_secciones SET nombre = ? WHERE id = ?', [name, id]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Sección actualizada.' };
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') return { success: false, message: 'Ya existe una sección con ese nombre en este almacén.' };
        return { success: false, message: 'Error en el servidor.' };
    }
}
export async function deleteSection(id: number): Promise<FormState> {
    try {
        await db('DELETE FROM alm_secciones WHERE id = ?', [id]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Sección eliminada.' };
    } catch (error: any) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') return { success: false, message: 'No se puede eliminar porque tiene coordenadas asociadas.' };
        return { success: false, message: 'Error en el servidor.' };
    }
}

// --- CRUD Coordenadas ---
const coordinateSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido.'),
    visible: z.boolean(),
    sectionId: z.number().int().positive(),
});
export async function createCoordinate(data: z.infer<typeof coordinateSchema>): Promise<FormState> {
    const validated = coordinateSchema.safeParse(data);
    if (!validated.success) return { success: false, message: 'Datos inválidos.' };
    try {
        await db('INSERT INTO alm_coordenada (codigo_coordenada, seccion_id, visible) VALUES (?, ?, ?)', [validated.data.name, validated.data.sectionId, validated.data.visible]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Coordenada creada.' };
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') return { success: false, message: 'Esa coordenada ya existe en esta sección.' };
        return { success: false, message: 'Error en el servidor.' };
    }
}
export async function updateCoordinate(sectionId: number, oldName: string, newName: string, visible: boolean): Promise<FormState> {
    try {
        await db('UPDATE alm_coordenada SET codigo_coordenada = ?, visible = ? WHERE seccion_id = ? AND codigo_coordenada = ?', [newName, visible, sectionId, oldName]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Coordenada actualizada.' };
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') return { success: false, message: 'Esa coordenada ya existe en esta sección.' };
        return { success: false, message: 'Error en el servidor.' };
    }
}
export async function deleteCoordinate(sectionId: number, name: string): Promise<FormState> {
    try {
        await db('DELETE FROM alm_coordenada WHERE seccion_id = ? AND codigo_coordenada = ?', [sectionId, name]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Coordenada eliminada.' };
    } catch (error: any) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') return { success: false, message: 'No se puede eliminar porque tiene stock o SKUs asignados.' };
        return { success: false, message: 'Error en el servidor.' };
    }
}

// --- Asignación de SKU ---
const assignSkuSchema = z.object({
    productId: z.number().int().positive(),
    sectionId: z.number().int().positive(),
    coordinateName: z.string().min(1),
});
export async function assignSkuToCoordinate(data: z.infer<typeof assignSkuSchema>): Promise<FormState> {
    const validated = assignSkuSchema.safeParse(data);
    if (!validated.success) return { success: false, message: 'Datos inválidos.' };
    try {
        const { productId, sectionId, coordinateName } = validated.data;
        const [coordinateRows]: any = await db('SELECT id FROM alm_coordenada WHERE seccion_id = ? AND codigo_coordenada = ?', [sectionId, coordinateName]);
        if (coordinateRows.length === 0) return { success: false, message: 'La coordenada no existe.' };
        const coordinateId = coordinateRows[0].id;

        await db('INSERT INTO alm_coordenada_sku (coordenada_id, producto_id) VALUES (?, ?)', [coordinateId, productId]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'SKU asignado a la coordenada.' };
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') return { success: false, message: 'Este SKU ya está asignado a esta coordenada.' };
        return { success: false, message: 'Error del servidor al asignar SKU.' };
    }
}

// --- Helpers ---
export async function getProductsForSelect() {
    try {
        const [rows] = await db('SELECT id, sku, nombre FROM cat_productos WHERE activo = 1 ORDER BY sku') as [RowDataPacket[], any];
        return rows as { id: number; sku: string; nombre: string; }[];
    } catch (error) {
        console.error('Error fetching products for select:', error);
        return [];
    }
}
