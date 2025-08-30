
'use server';

import db from '@/lib/db';
import type { Product } from '@/lib/types/product';
import type { ProductWithStockDetails } from '@/lib/types/inventory';

type StockDetailQueryResult = {
    id_producto: number;
    almacen: string;
    seccion: string;
    coordenada: string;
    cantidad: number;
    visible: boolean;
};

/**
 * Obtiene todos los productos y su desglose de stock por coordenada.
 */
export async function getInventoryStockDetails(): Promise<ProductWithStockDetails[]> {
    try {
        // Obtenemos todos los productos activos primero
        const [products] = await db.query<Product[]>(`
            SELECT 
                p.id, p.sku, p.nombre, p.unidad, p.precio_lista as precioLista, p.costo_promedio as costoPromedio, 
                p.es_serie as esSerie, p.descripcion, p.categoria_id as categoriaId, p.marca_id as marcaId, 
                p.modelo_id as modeloId
            FROM cat_productos p WHERE p.activo = 1 ORDER BY p.nombre ASC
        `);

        // Obtenemos todos los detalles de stock de una sola vez
        const [stockDetails] = await db.query<StockDetailQueryResult[]>(`
            SELECT 
                s.id_producto,
                a.nombre as almacen,
                sec.nombre as seccion,
                c.nombre as coordenada,
                s.cantidad,
                c.visible
            FROM inv_stock s
            JOIN inv_coordenadas c ON s.id_coordenada = c.id
            JOIN inv_secciones sec ON c.id_seccion = sec.id
            JOIN inv_almacenes a ON sec.id_almacen = a.id
            WHERE s.cantidad > 0
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
