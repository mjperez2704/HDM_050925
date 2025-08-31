
'use server';

import db from '@/lib/db';
import type { Product } from '@/lib/types/product';
import type { ProductWithStockDetails } from '@/lib/types/inventory';
import type { RowDataPacket } from 'mysql2';

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
export type Coordinate = { name: string };
export type Section = { name: string; coordinates: Coordinate[] };
export type Warehouse = { name: string; sections: Section[] };

interface WarehouseRow extends RowDataPacket { id: number; nombre: string; }
interface SectionRow extends RowDataPacket { id: number; nombre: string; almacen_id: number; }
interface CoordinateRow extends RowDataPacket { codigo_coordenada: string; seccion_id: number; }

/**
 * Obtiene la estructura completa de almacenes, secciones y coordenadas.
 */
export async function getWarehouseStructure(): Promise<Warehouse[]> {
    try {
        const [warehouses] = await db.query<WarehouseRow[]>('SELECT id, nombre FROM alm_almacenes ORDER BY nombre');
        const [sections] = await db.query<SectionRow[]>('SELECT id, nombre, almacen_id FROM alm_secciones ORDER BY nombre');
        const [coordinates] = await db.query<CoordinateRow[]>('SELECT codigo_coordenada, seccion_id FROM alm_coordenada ORDER BY codigo_coordenada');

        const coordinatesBySection = new Map<number, Coordinate[]>();
        coordinates.forEach(c => {
            if (!coordinatesBySection.has(c.seccion_id)) {
                coordinatesBySection.set(c.seccion_id, []);
            }
            coordinatesBySection.get(c.seccion_id)!.push({ name: c.codigo_coordenada });
        });

        const sectionsByWarehouse = new Map<number, Section[]>();
        sections.forEach(s => {
            if (!sectionsByWarehouse.has(s.almacen_id)) {
                sectionsByWarehouse.set(s.almacen_id, []);
            }
            sectionsByWarehouse.get(s.almacen_id)!.push({
                name: s.nombre,
                coordinates: coordinatesBySection.get(s.id) || []
            });
        });

        return warehouses.map(w => ({
            name: w.nombre,
            sections: sectionsByWarehouse.get(w.id) || []
        }));

    } catch (error) {
        console.error('Error fetching warehouse structure:', error);
        return [];
    }
}
