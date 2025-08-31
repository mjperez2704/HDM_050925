
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import db from '@/lib/db';
import { ProductSchema, Product } from '@/lib/types/product';

const CreateProductSchema = ProductSchema.omit({ id: true });
const UpdateProductSchema = ProductSchema;

export async function getProducts() {
  try {
    const [rows] = await db.query(`
      SELECT 
        id, sku, nombre, unidad, precio_lista as precioLista, costo_promedio as costoPromedio, 
        es_serie as esSerie, descripcion, categoria_id as categoriaId, marca_id as marcaId, 
        modelo_id as modeloId, atributo1, atributo2, atributo3, atributo4, atributo5, atributo6, atributo7, atributo8, atributo9, atributo10
      FROM cat_productos WHERE activo = 1 ORDER BY id DESC
    `);
    return rows as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function createProduct(formData: Omit<Product, 'id'>) {
    const validatedFields = CreateProductSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Error de validación. Por favor, revise los campos.',
        };
    }

    const { sku, nombre, descripcion, categoriaId, marcaId, modeloId, unidad, precioLista, costoPromedio, esSerie, ...attributes } = validatedFields.data;
    
    // Aseguramos un orden consistente para las claves y valores
    const attributeKeys = Object.keys(attributes).sort() as (keyof typeof attributes)[];
    const dbAttributeKeys = attributeKeys.map(key => key.replace('atributo', 'atributo_'));
    const attributeValues = attributeKeys.map(key => attributes[key]);
    
    try {
        await db.query(
            `INSERT INTO cat_productos 
            (sku, nombre, descripcion, categoria_id, marca_id, modelo_id, unidad, precio_lista, costo_promedio, es_serie, 
            ${dbAttributeKeys.join(', ')}) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                sku, nombre, descripcion, categoriaId, marcaId, modeloId, unidad, precioLista, costoPromedio, esSerie,
                ...attributeValues
            ]
        );
        revalidatePath('/products');
        return { success: true, message: 'Producto creado exitosamente.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al crear el producto.' };
    }
}

export async function updateProduct(formData: Product) {
    const validatedFields = UpdateProductSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Error de validación. Por favor, revise los campos.',
        };
    }
    
    const { id, sku, nombre, descripcion, categoriaId, marcaId, modeloId, unidad, precioLista, costoPromedio, esSerie, ...attributes } = validatedFields.data;
    
    const attributeKeys = Object.keys(attributes).sort() as (keyof typeof attributes)[];
    const setClause = attributeKeys.map(key => `${key.replace('atributo', 'atributo_')} = ?`).join(', ');
    const attributeValues = attributeKeys.map(key => attributes[key]);

    try {
        await db.query(
            `UPDATE cat_productos SET 
            sku = ?, nombre = ?, descripcion = ?, categoria_id = ?, marca_id = ?, modelo_id = ?, unidad = ?, precio_lista = ?, costo_promedio = ?, es_serie = ?, 
            ${setClause}
            WHERE id = ?`,
            [
                sku, nombre, descripcion, categoriaId, marcaId, modeloId, unidad, precioLista, costoPromedio, esSerie,
                ...attributeValues,
                id
            ]
        );
        revalidatePath('/products');
        return { success: true, message: 'Producto actualizado exitosamente.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al actualizar el producto.' };
    }
}

export async function deleteProduct(id: number) {
  if (!id) {
    return { success: false, message: 'ID de producto no proporcionado.' };
  }
  try {
    // Soft delete by setting activo to 0
    await db.query('UPDATE cat_productos SET activo = 0 WHERE id = ?', [id]);
    revalidatePath('/products');
    return { success: true, message: 'Producto eliminado exitosamente.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error al eliminar el producto.' };
  }
}
