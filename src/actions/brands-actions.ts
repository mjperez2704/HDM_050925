
'use server';

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

/**
 * Obtiene todas las marcas activas y sus modelos asociados.
 */
export async function getBrandsWithModels(): Promise<BrandWithModels[]> {
    try {
        const [brands] = await db.query<BrandQueryResult[]>(
            'SELECT id, nombre, pais_origen FROM cat_marcas WHERE activo = 1 ORDER BY nombre ASC'
        );

        if (brands.length === 0) {
            return [];
        }

        const brandIds = brands.map(b => b.id);
        
        const [models] = await db.query<ModelQueryResult[]>(
            'SELECT id, nombre, marca_id FROM cat_modelos WHERE marca_id IN (?) AND activo = 1 ORDER BY nombre ASC',
            [brandIds]
        );

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

        return results;

    } catch (error) {
        console.error('Error fetching brands with models:', error);
        return [];
    }
}
