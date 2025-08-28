
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import db from '@/lib/db';
import { ProductSchema, Product } from '@/lib/types/product';

const CreateProductSchema = ProductSchema.omit({ id: true, activo: true });
const UpdateProductSchema = ProductSchema.omit({ activo: true });

export async function getProducts() {
  try {
    const [rows] = await db.query(`
      SELECT 
        id, sku, nombre, unidad, precio_lista as precioLista, costo_promedio as costoPromedio, 
        es_serie as esSerie, descripcion, categoria_id as categoriaId, marca_id as marcaId, 
        modelo_id as modeloId, atributo_1 as atributo1, atributo_2 as atributo2, 
        atributo_3 as atributo3, atributo_4 as atributo4, atributo_5 as atributo5, 
        atributo_6 as atributo6, atributo_7 as atributo7, atributo_8 as atributo8, 
        atributo_9 as atributo9, atributo_10 as atributo10 
      FROM cat_productos WHERE activo = 1 ORDER BY id DESC
    `);
    return rows as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function createProduct(formData: Omit<Product, 'id' | 'activo'>) {
    const validatedFields = CreateProductSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Error de validación. Por favor, revise los campos.',
        };
    }

    const { sku, nombre, descripcion, categoriaId, marcaId, modeloId, unidad, precioLista, costoPromedio, esSerie, ...attributes } = validatedFields.data;
    
    const attributeKeys = Object.keys(attributes).sort();
    const dbAttributeKeys = attributeKeys.map(key => key.replace('atributo', 'atributo_'));


    try {
        await db.query(
            `INSERT INTO cat_productos 
            (sku, nombre, descripcion, categoria_id, marca_id, modelo_id, unidad, precio_lista, costo_promedio, es_serie, 
            ${dbAttributeKeys.join(', ')}) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                sku, nombre, descripcion, categoriaId, marcaId, modeloId, unidad, precioLista, costoPromedio, esSerie,
                ...attributeKeys.map(key => attributes[key as keyof typeof attributes])
            ]
        );
        revalidatePath('/products');
        return { message: 'Producto creado exitosamente.' };
    } catch (error) {
        console.error(error);
        return { message: 'Error al crear el producto.' };
    }
}

export async function updateProduct(formData: Product) {
    const validatedFields = UpdateProductSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Error de validación. Por favor, revise los campos.',
        };
    }
    
    const { id, sku, nombre, descripcion, categoriaId, marcaId, modeloId, unidad, precioLista, costoPromedio, esSerie, ...attributes } = validatedFields.data;
    
    const attributeKeys = Object.keys(attributes).sort();
    const setClause = attributeKeys.map(key => `${key.replace('atributo', 'atributo_')} = ?`).join(', ');


    try {
        await db.query(
            `UPDATE cat_productos SET 
            sku = ?, nombre = ?, descripcion = ?, categoria_id = ?, marca_id = ?, modelo_id = ?, unidad = ?, precio_lista = ?, costo_promedio = ?, es_serie = ?, 
            ${setClause}
            WHERE id = ?`,
            [
                sku, nombre, descripcion, categoriaId, marcaId, modeloId, unidad, precioLista, costoPromedio, esSerie,
                ...attributeKeys.map(key => attributes[key as keyof typeof attributes]),
                id
            ]
        );
        revalidatePath('/products');
        return { message: 'Producto actualizado exitosamente.' };
    } catch (error) {
        console.error(error);
        return { message: 'Error al actualizar el producto.' };
    }
}

export async function deleteProduct(id: number) {
  if (!id) {
    return { message: 'ID de producto no proporcionado.' };
  }
  try {
    // Soft delete by setting activo to 0
    await db.query('UPDATE cat_productos SET activo = 0 WHERE id = ?', [id]);
    revalidatePath('/products');
    return { message: 'Producto eliminado exitosamente.' };
  } catch (error) {
    console.error(error);
    return { message: 'Error al eliminar el producto.' };
  }
}
