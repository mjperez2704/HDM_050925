
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import db from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

// --- Tipos e Interfaces ---
export interface Model {
  id: number;
  nombre: string;
}

export interface ModelWithBrand extends Model {
  marca_nombre: string;
}

export interface Brand {
  id: number;
  nombre: string;
  pais_origen: string | null;
  modelos_count: number;
}

interface BrandQueryResult extends RowDataPacket, Brand {}

// --- Tipos de Respuesta Estandarizados ---
type FormState = { success: boolean; message: string; };
type SearchResult<T> = { success: true; data: T; } | { success: false; message: string; };

const brandSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre de la marca es requerido." }),
  pais_origen: z.string().optional(),
});

const modelSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre del modelo es requerido." }),
  marca_id: z.coerce.number({ invalid_type_error: "Debe seleccionar una marca." }).min(1, { message: "Debe seleccionar una marca." }),
});

// --- ACCIONES DE BÚSQUEDA (CORREGIDAS CON EL PATRÓN CORRECTO) ---

export async function getAllBrands(): Promise<SearchResult<Brand[]>> {
  try {
    const sql = `
      SELECT m.id, m.nombre, m.pais_origen, COUNT(mo.id) as modelos_count
      FROM cat_marcas as m
      LEFT JOIN cat_modelos as mo ON m.id = mo.marca_id
      GROUP BY m.id, m.nombre, m.pais_origen
      ORDER BY m.nombre ASC`;
    const [brands] = await db.query(sql) as [BrandQueryResult[], any];
    return { success: true, data: brands };
  } catch (error) {
    console.error('Error en getAllBrands:', error);
    return { success: false, message: 'Error en el servidor al obtener las marcas. Por favor, revise los logs.' };
  }
}

export async function searchBrands(query: string): Promise<SearchResult<Brand[]>> {
  if (!query?.trim()) {
    return getAllBrands();
  }
  try {
    const sql = `
      SELECT m.id, m.nombre, m.pais_origen, COUNT(mo.id) as modelos_count
      FROM cat_marcas as m
      LEFT JOIN cat_modelos as mo ON m.id = mo.marca_id
      WHERE m.nombre LIKE ?
      GROUP BY m.id, m.nombre, m.pais_origen
      ORDER BY m.nombre ASC`;
    const [brands] = await db.query(sql, [`%${query.trim()}%`]) as [BrandQueryResult[], any];
    return { success: true, data: brands };
  } catch (error) {
    console.error('Error in searchBrands:', error);
    return { success: false, message: 'Error en el servidor al buscar marcas.' };
  }
}

export async function searchModels(query: string, brandId: number | null): Promise<SearchResult<ModelWithBrand[]>> {
  try {
    const modelQuery = query?.trim() ? `%${query.trim()}%` : '%';
    let sql = `SELECT mo.id, mo.nombre, ma.nombre as marca_nombre FROM cat_modelos as mo JOIN cat_marcas as ma ON mo.marca_id = ma.id`;
    const params: (string | number)[] = [];
    let whereClauses: string[] = [];

    if (query?.trim()) {
      whereClauses.push('mo.nombre LIKE ?');
      params.push(modelQuery);
    }
    if (brandId) {
      whereClauses.push('mo.marca_id = ?');
      params.push(brandId);
    }
    if (whereClauses.length > 0) {
      sql += ' WHERE ' + whereClauses.join(' AND ');
    }
    sql += ' ORDER BY ma.nombre ASC, mo.nombre ASC';

    const [models] = await db.query(sql, params) as [any[], any];
    return { success: true, data: models };
  } catch (error) {
    console.error('Error searching models:', error);
    return { success: false, message: 'Error en el servidor al buscar modelos.' };
  }
}

export async function getModelsByBrandId(brandId: number): Promise<SearchResult<Model[]>> {
  try {
    const [models] = await db.query('SELECT id, nombre FROM cat_modelos WHERE marca_id = ? ORDER BY nombre', [brandId]) as [ModelQueryResult[], any];
    return { success: true, data: models };
  } catch (error) {
    console.error(`Error fetching models for brand ${brandId}:`, error);
    return { success: false, message: 'Error al obtener los modelos de la marca.' };
  }
}

// --- ACCIONES CRUD (YA USABAN UN PATRÓN SIMILAR, AHORA ESTANDARIZADO) ---

export async function createBrand(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = brandSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { success: false, message: validatedFields.error.errors[0].message };
  }
  const { nombre, pais_origen } = validatedFields.data;

  try {
    await db.query('INSERT INTO cat_marcas (nombre, pais_origen) VALUES (?, ?)', [nombre, pais_origen || null]);
    revalidatePath('/brands-and-models');
    return { success: true, message: `Marca "${nombre}" creada exitosamente.` };
  } catch (error: any) {
    console.error('Error creating brand:', error);
    if (error.code === 'ER_DUP_ENTRY') {
        return { success: false, message: `La marca "${nombre}" ya existe.` };
    }
    return { success: false, message: 'Error en el servidor al crear la marca.' };
  }
}

export async function updateBrand(prevState: FormState, formData: FormData): Promise<FormState> {
    const id = formData.get('id');
    if (!id) return { success: false, message: 'ID de marca no encontrado.' };

    const validatedFields = brandSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
        return { success: false, message: validatedFields.error.errors[0].message };
    }
    const { nombre, pais_origen } = validatedFields.data;

    try {
        await db.query('UPDATE cat_marcas SET nombre = ?, pais_origen = ? WHERE id = ?', [nombre, pais_origen || null, id]);
        revalidatePath('/brands-and-models');
        return { success: true, message: `Marca "${nombre}" actualizada.` };
    } catch (error: any) {
        console.error('Error updating brand:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return { success: false, message: `Ya existe otra marca con el nombre "${nombre}".` };
        }
        return { success: false, message: 'Error en el servidor al actualizar la marca.' };
    }
}

export async function deleteBrand(brandId: number): Promise<FormState> {
    if (!brandId) return { success: false, message: 'ID de marca no encontrado.' };
    try {
        await db.query('DELETE FROM cat_marcas WHERE id = ?', [brandId]);
        revalidatePath('/brands-and-models');
        return { success: true, message: 'Marca eliminada permanentemente.' };
    } catch (error: any) {
        console.error('Error deleting brand:', error);
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
             return { success: false, message: 'No se puede eliminar la marca porque tiene modelos asociados.' };
        }
        return { success: false, message: 'Error en el servidor al eliminar la marca.' };
    }
}

export async function createModel(prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = modelSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { success: false, message: validatedFields.error.errors[0].message };
    }
    const { nombre, marca_id } = validatedFields.data;

    try {
        await db.query('INSERT INTO cat_modelos (nombre, marca_id) VALUES (?, ?)', [nombre, marca_id]);
        revalidatePath('/brands-and-models?tab=models');
        return { success: true, message: `Modelo "${nombre}" creado exitosamente.` };
    } catch (error: any) {
        console.error('Error creating model:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return { success: false, message: `El modelo "${nombre}" ya existe para esta marca.` };
        }
        return { success: false, message: 'Error en el servidor al crear el modelo.' };
    }
}
