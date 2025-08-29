
'use server';

import { revalidatePath } from 'next/cache';
import db from '@/lib/db';
import type { PoolConnection } from 'mysql2/promise';

export type RoleWithDetails = {
    id: number;
    name: string;
    description: string;
    permissionsCount: number;
    usersCount: number;
};

export async function getRolesWithDetails(): Promise<RoleWithDetails[]> {
    try {
        const [rows]: any = await db.query(`
            SELECT 
                r.id, 
                r.nombre as name, 
                r.descripcion as description,
                (SELECT COUNT(*) FROM seg_rol_permiso WHERE rol_id = r.id) as permissionsCount,
                (SELECT COUNT(*) FROM seg_usuario_rol ur JOIN seg_usuarios u ON ur.usuario_id = u.id WHERE ur.rol_id = r.id AND u.activo = 1) as usersCount
            FROM seg_roles r
            ORDER BY r.nombre ASC
        `);
        return rows as RoleWithDetails[];
    } catch (error) {
        console.error('Error fetching roles with details:', error);
        return [];
    }
}

export async function getPermissions() {
    try {
        const [rows] = await db.query('SELECT id, clave, modulo, descripcion FROM seg_permisos ORDER BY modulo, clave');
        return rows as { id: number, clave: string, modulo: string, descripcion: string }[];
    } catch (error) {
        console.error('Error fetching permissions:', error);
        return [];
    }
}

export async function createRole(data: { name: string; description: string; permissions: number[] }) {
    const { name, description, permissions } = data;
    let connection: PoolConnection | null = null;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const [roleResult]: any = await connection.query(
            'INSERT INTO seg_roles (nombre, descripcion) VALUES (?, ?)',
            [name, description]
        );
        const roleId = roleResult.insertId;

        if (permissions.length > 0) {
            const permissionValues = permissions.map(permissionId => [roleId, permissionId]);
            await connection.query(
                'INSERT INTO seg_rol_permiso (rol_id, permiso_id) VALUES ?',
                [permissionValues]
            );
        }

        await connection.commit();
        revalidatePath('/security/roles');
        return { success: true, message: 'Rol creado exitosamente.' };
    } catch (error: any) {
        if (connection) await connection.rollback();
        console.error(error);
         if (error.code === 'ER_DUP_ENTRY') {
            return { success: false, message: 'Error: Ya existe un rol con ese nombre.' };
        }
        return { success: false, message: 'Error de base de datos al crear el rol.' };
    } finally {
        if (connection) connection.release();
    }
}

export async function deleteRole(roleId: number, newRoleIdForUsers?: number) {
    let connection: PoolConnection | null = null;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();
        
        // Si se proporcionó un nuevo rol, reasignar usuarios
        if (newRoleIdForUsers) {
            await connection.query(
                'UPDATE seg_usuario_rol SET rol_id = ? WHERE rol_id = ?',
                [newRoleIdForUsers, roleId]
            );
        }
        
        // Eliminar permisos asociados al rol
        await connection.query('DELETE FROM seg_rol_permiso WHERE rol_id = ?', [roleId]);
        
        // Eliminar el rol
        await connection.query('DELETE FROM seg_roles WHERE id = ?', [roleId]);
        
        await connection.commit();
        revalidatePath('/security/roles');
        return { success: true, message: 'Rol eliminado exitosamente.' };

    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Error deleting role:', error);
        return { success: false, message: 'Error de base de datos al eliminar el rol.' };
    } finally {
        if (connection) connection.release();
    }
}
