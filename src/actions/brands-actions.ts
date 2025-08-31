
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import db from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

export interface Model {
    id: number;
    nombre: string;
}

export interface BrandWithModels {
    id: number;
    nombre: string;
    pais_origen: string | null;
    modelos: Model[];
}

interface BrandQueryResult extends RowDataPacket {
    id: number;
    nombre: string;
    pais_origen: string | null;
}

interface ModelQueryResult extends RowDataPacket {
    id: number;
    nombre: string;
    marca_id: number;
}

interface CountQueryResult extends RowDataPacket {
    total: number;
}

const CreateModelSchema = z.object({
    nombre: z.string().min(1, 'El nombre del modelo es requerido.'),
    marca_id: z.number().int().positive('El ID de la marca es inválido.'),
});

const UpdateBrandSchema = z.object({
    id: z.number().int().positive(),
    nombre: z.string().min(1, 'El nombre de la marca es requerido.'),
    pais_origen: z.string().optional(),
});


/**
 * Obtiene las marcas y sus modelos asociados con paginación y filtrado.
 */
export async function getBrandsWithModels(
    query: string,
    currentPage: number,
    itemsPerPage: number
): Promise<{ brands: BrandWithModels[], totalPages: number }> {
    const offset = (currentPage - 1) * itemsPerPage;

    try {
        console.log('--- DEBUG: getBrandsWithModels ---');
        
        const whereClause = query ? 'WHERE nombre LIKE ?' : '';
        const queryParams = query ? [`%${query}%`] : [];

        // Consulta de Conteo
        const countSql = `SELECT COUNT(*) as total FROM cat_marcas ${whereClause}`;
        console.log('1. Count Query:', countSql);
        console.log('   Parameters:', queryParams);
        const [countResult] = await db.query<CountQueryResult[]>(countSql, queryParams);
        
        const totalBrands = countResult[0].total;
        const totalPages = Math.ceil(totalBrands / itemsPerPage);
        
        // Consulta de Marcas (Paginada)
        const brandsSql = `SELECT id, nombre, pais_origen FROM cat_marcas ${whereClause} ORDER BY nombre ASC LIMIT ? OFFSET ?`;
        const brandsParams = [...queryParams, itemsPerPage, offset];
        console.log('2. Brands Query:', brandsSql);
        console.log('   Parameters:', brandsParams);
        const [brands] = await db.query<BrandQueryResult[]>(brandsSql, brandsParams);

        if (brands.length === 0) {
            console.log('No brands found, returning empty.');
            console.log('---------------------------------');
            return { brands: [], totalPages: 0 };
        }

        const brandIds = brands.map(b => b.id);
        
        // Consulta de Modelos
        const modelsSql = 'SELECT id, nombre, marca_id FROM cat_modelos WHERE marca_id IN (?) ORDER BY nombre ASC';
        console.log('3. Models Query:', modelsSql);
        console.log('   Parameters:', [brandIds]);
        const [models] = await db.query<ModelQueryResult[]>(modelsSql, [brandIds]);

        const modelsByBrandId = new Map<number, Model[]>();
        models.forEach(model => {
            if (!modelsByBrandId.has(model.marca_id)) {
                modelsByBrandId.set(model.marca_id, []);
            }
            modelsByBrandId.get(model.marca_id)!.push({ id: model.id, nombre: model.nombre });
        });

        const results: BrandWithModels[] = brands.map(brand => ({
            id: brand.id,
            nombre: brand.nombre,
            pais_origen: brand.pais_origen,
            modelos: modelsByBrandId.get(brand.id) || [],
        }));
        
        console.log('--- END DEBUG ---');
        return { brands: results, totalPages };

    } catch (error) {
        console.error('Error fetching brands with models:', error);
        return { brands: [], totalPages: 0 };
    }
}


export async function createModel(formData: unknown) {
    const validatedFields = CreateModelSchema.safeParse(formData);

    if (!validatedFields.success) {
        return { success: false, message: 'Datos inválidos.' };
    }
    
    const { nombre, marca_id } = validatedFields.data;

    try {
        await db.query('INSERT INTO cat_modelos (nombre, marca_id) VALUES (?, ?)', [nombre, marca_id]);
        revalidatePath('/brands-and-models');
        return { success: true, message: 'Modelo creado exitosamente.' };
    } catch (error) {
        console.error('Error creating model:', error);
        return { success: false, message: 'Error de base de datos al crear el modelo.' };
    }
}

export async function updateBrand(formData: unknown) {
    const validatedFields = UpdateBrandSchema.safeParse(formData);

    if (!validatedFields.success) {
        return { success: false, message: 'Datos inválidos.' };
    }

    const { id, nombre, pais_origen } = validatedFields.data;

    try {
        await db.query('UPDATE cat_marcas SET nombre = ?, pais_origen = ? WHERE id = ?', [nombre, pais_origen, id]);
        revalidatePath('/brands-and-models');
        return { success: true, message: 'Marca actualizada exitosamente.' };
    } catch (error) {
        console.error('Error updating brand:', error);
        return { success: false, message: 'Error de base de datos al actualizar la marca.' };
    }
}
