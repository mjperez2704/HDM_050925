
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import db from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

// --- Tipos y Estados ---

interface FormState {
    success: boolean;
    message: string;
}

// --- Acciones de Búsqueda y Obtención ---

export async function getSimpleProducts(query: string) {
    try {
        const searchQuery = query ? `%${query}%` : '%';
        const [products] = await db.query(
            'SELECT id, sku, nombre FROM cat_productos WHERE nombre LIKE ? OR sku LIKE ? ORDER BY nombre LIMIT 50',
            [searchQuery, searchQuery]
        );
        return products;
    } catch (error) {
        console.error('Error fetching simple products:', error);
        return [];
    }
}

export async function getInventoryStockDetails(productId?: number) {
    try {
        let sql = `
            SELECT 
                p.id,
                p.sku,
                p.nombre,
                p.unidad,
                cs.id as stock_id,
                a.nombre as warehouse,
                s.nombre as section,
                c.codigo_coordenada as coordinate,
                c.visible,
                cs.cantidad,
                cs.ultima_modificacion
            FROM cat_productos p
            LEFT JOIN alm_coordenada_sku cs ON p.id = cs.producto_id
            LEFT JOIN alm_coordenada c ON cs.coordenada_id = c.id
            LEFT JOIN alm_secciones s ON c.seccion_id = s.id
            LEFT JOIN alm_almacenes a ON s.almacen_id = a.id
        `;
        const params = [];
        if (productId) {
            sql += ' WHERE p.id = ?';
            params.push(productId);
        }
        sql += ' ORDER BY p.nombre, a.nombre, s.nombre, c.codigo_coordenada;';

        const [details] = await db.query(sql, params) as [any[], any];

        // Agrupar por producto
        const productsMap = new Map();
        details.forEach(row => {
            if (!productsMap.has(row.id)) {
                productsMap.set(row.id, {
                    id: row.id,
                    sku: row.sku,
                    nombre: row.nombre,
                    unidad: row.unidad,
                    details: []
                });
            }
            if (row.stock_id) { // Solo agregar detalles si hay stock/coordenada
                 productsMap.get(row.id).details.push({
                    stock_id: row.stock_id,
                    warehouse: row.warehouse,
                    section: row.section,
                    coordinate: row.coordinate,
                    quantity: row.cantidad,
                    visible: !!row.visible,
                    lastModified: row.ultima_modificacion,
                });
            }
        });

        return Array.from(productsMap.values());
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
                c.id, c.seccion_id, c.codigo_coordenada as name, c.visible,
                p.sku
            FROM alm_coordenada c
            LEFT JOIN alm_coordenada_sku cs ON c.id = cs.coordenada_id
            LEFT JOIN cat_productos p ON cs.producto_id = p.id
            ORDER BY c.seccion_id, c.codigo_coordenada`;

        const [warehouses, sections, coordinates] = await Promise.all([
            db.query(warehousesQuery),
            db.query(sectionsQuery),
            db.query(coordinatesQuery)
        ]);

        const allWarehouses = (warehouses[0] as any[]);
        const allSections = (sections[0] as any[]);
        const allCoordinates = (coordinates[0] as any[]);

        const coordinatesMap = new Map<number, any[]>();
        allCoordinates.forEach(c => {
            const coordData = {
                id: c.id,
                name: c.name,
                visible: c.visible,
                skus: c.sku ? [c.sku] : [], // Inicialmente solo un SKU
            };

            const existingSection = coordinatesMap.get(c.seccion_id);
            if (existingSection) {
                const existingCoord = existingSection.find(ec => ec.name === c.name);
                if (existingCoord && c.sku) {
                    existingCoord.skus.push(c.sku);
                } else {
                    existingSection.push(coordData);
                }
            } else {
                coordinatesMap.set(c.seccion_id, [coordData]);
            }
        });
        
        const sectionsMap = new Map<number, any[]>();
        allSections.forEach(s => {
            if (!sectionsMap.has(s.almacen_id)) {
                sectionsMap.set(s.almacen_id, []);
            }
            const sectionCoordinates = coordinatesMap.get(s.id) || [];
            sectionsMap.get(s.almacen_id)!.push({
                id: s.id,
                name: s.nombre,
                coordinates: sectionCoordinates,
            });
        });

        return allWarehouses.map(w => {
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

export async function getProductsForSelect() {
    try {
        const [products] = await db.query('SELECT id, sku, nombre FROM cat_productos WHERE activo = 1 ORDER BY sku');
        return products as { id: number; sku: string; nombre: string; }[];
    } catch (error) {
        console.error('Error fetching products for select:', error);
        return [];
    }
}


// --- CRUD Almacenes ---
const warehouseSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido.'),
  description: z.string().optional(),
});

export async function createWarehouse(prevState: FormState, formData: FormData): Promise<FormState> {
    const data = Object.fromEntries(formData.entries());
    const validated = warehouseSchema.safeParse(data);
    if (!validated.success) return { success: false, message: 'Datos inválidos.' };
    try {
        await db.query('INSERT INTO alm_almacenes (nombre, descripcion) VALUES (?, ?)', [validated.data.name, validated.data.description]);
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
        await db.query('UPDATE alm_almacenes SET nombre = ?, descripcion = ? WHERE id = ?', [validated.data.name, validated.data.description, id]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Almacén actualizado.' };
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') return { success: false, message: 'Ya existe otro almacén con ese nombre.' };
        return { success: false, message: 'Error en el servidor.' };
    }
}

export async function deleteWarehouse(id: number): Promise<FormState> {
    try {
        await db.query('DELETE FROM alm_almacenes WHERE id = ?', [id]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Almacén eliminado.' };
    } catch (error: any) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
             return { success: false, message: 'No se puede eliminar, el almacén tiene secciones asociadas.' };
        }
        return { success: false, message: 'Error en el servidor.' };
    }
}

// --- CRUD Secciones ---
const sectionSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido.'),
    warehouseId: z.coerce.number().min(1, 'Debe seleccionar un almacén.'),
});

export async function createSection(prevState: FormState, formData: FormData): Promise<FormState> {
    const data = Object.fromEntries(formData.entries());
    const validated = sectionSchema.safeParse(data);
    if (!validated.success) return { success: false, message: 'Datos inválidos.' };

    try {
        await db.query('INSERT INTO alm_secciones (nombre, almacen_id) VALUES (?, ?)', [validated.data.name, validated.data.warehouseId]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Sección creada exitosamente.' };
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') return { success: false, message: 'Ya existe una sección con ese nombre en este almacén.' };
        console.error("Error creating section:", error);
        return { success: false, message: 'Error en el servidor.' };
    }
}

export async function updateSection(id: number, name: string): Promise<FormState> {
    if (!name) return { success: false, message: 'El nombre no puede estar vacío.' };
    try {
        await db.query('UPDATE alm_secciones SET nombre = ? WHERE id = ?', [name, id]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Sección actualizada.' };
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') return { success: false, message: 'Ya existe otra sección con ese nombre en el almacén.' };
        return { success: false, message: 'Error en el servidor.' };
    }
}

export async function deleteSection(id: number): Promise<FormState> {
    try {
        await db.query('DELETE FROM alm_secciones WHERE id = ?', [id]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Sección eliminada.' };
    } catch (error: any) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return { success: false, message: 'No se puede eliminar, la sección tiene coordenadas asociadas.' };
        }
        return { success: false, message: 'Error en el servidor.' };
    }
}

// --- CRUD Coordenadas ---
const coordinateSchema = z.object({
    codes: z.string().min(1, 'Debe ingresar al menos un código.'),
    sectionId: z.coerce.number().min(1, 'Debe seleccionar una sección.'),
    visible: z.preprocess((val) => val === 'on', z.boolean()).optional().default(true),
});
export async function createCoordinates(prevState: FormState, formData: FormData): Promise<FormState> {
    const data = Object.fromEntries(formData.entries());
    const validated = coordinateSchema.safeParse(data);
    if (!validated.success) {
        return { success: false, message: validated.error.errors[0].message };
    }

    const codes = validated.data.codes.split(',').map(c => c.trim()).filter(c => c.length > 0);
    if(codes.length === 0) {
        return { success: false, message: 'Formato de códigos inválido.' };
    }

    try {
        const values = codes.map(code => [code, validated.data.sectionId, validated.data.visible]);
        await db.query('INSERT INTO alm_coordenada (codigo_coordenada, seccion_id, visible) VALUES ?', [values]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: `${codes.length} coordenada(s) creada(s) exitosamente.` };
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') return { success: false, message: 'Una o más coordenadas ya existen en esta sección.' };
        console.error("Error creating coordinate:", error);
        return { success: false, message: 'Error en el servidor.' };
    }
}

export async function updateCoordinate(sectionId: number, oldName: string, newName: string, visible: boolean): Promise<FormState> {
    if (!newName) return { success: false, message: 'El nombre no puede estar vacío.' };
    try {
        await db.query('UPDATE alm_coordenada SET codigo_coordenada = ?, visible = ? WHERE seccion_id = ? AND codigo_coordenada = ?', [newName, visible, sectionId, oldName]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Coordenada actualizada.' };
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') return { success: false, message: 'Ya existe otra coordenada con ese nombre en la sección.' };
        return { success: false, message: 'Error en el servidor.' };
    }
}

export async function deleteCoordinate(sectionId: number, name: string): Promise<FormState> {
    try {
        await db.query('DELETE FROM alm_coordenada WHERE seccion_id = ? AND codigo_coordenada = ?', [sectionId, name]);
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'Coordenada eliminada.' };
    } catch (error: any) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return { success: false, message: 'No se puede eliminar, la coordenada tiene SKUs asignados.' };
        }
        return { success: false, message: 'Error en el servidor.' };
    }
}

// --- Asignación de SKU ---
const assignSkuSchema = z.object({
    coordinateName: z.string(),
    sectionId: z.coerce.number(),
    productId: z.coerce.number(),
});

export async function assignSkuToCoordinate(data: z.infer<typeof assignSkuSchema>): Promise<FormState> {
    const validated = assignSkuSchema.safeParse(data);
    if (!validated.success) return { success: false, message: 'Datos inválidos.' };

    const { coordinateName, sectionId, productId } = validated.data;

    try {
        const [coordinate] = await db.query('SELECT id FROM alm_coordenada WHERE codigo_coordenada = ? AND seccion_id = ?', [coordinateName, sectionId]) as [RowDataPacket[], any];
        if (!coordinate[0]) {
            return { success: false, message: 'Coordenada no encontrada.' };
        }
        const coordinateId = coordinate[0].id;
        
        await db.query(`
            INSERT INTO alm_coordenada_sku (coordenada_id, producto_id, cantidad) 
            VALUES (?, ?, 0) 
            ON DUPLICATE KEY UPDATE producto_id = ?`,
            [coordinateId, productId, productId]
        );
        revalidatePath('/inventory/warehouse-management');
        return { success: true, message: 'SKU asignado correctamente.' };
    } catch (error) {
        console.error('Error assigning SKU:', error);
        return { success: false, message: 'Error en el servidor al asignar SKU.' };
    }
}
