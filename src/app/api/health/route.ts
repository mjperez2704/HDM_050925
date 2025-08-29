
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import db from '@/lib/db';

export async function GET() {
  try {
    // Intenta obtener una conexión del pool.
    // Esto es suficiente para verificar que las credenciales y la conexión son válidas.
    const connection = await db.getConnection();
    
    // Libera la conexión inmediatamente después de obtenerla.
    connection.release();
    
    return NextResponse.json({
      status: 'ok',
      message: 'La conexión con la base de datos se ha establecido correctamente.',
    });
  } catch (error: any) {
    console.error('Error al conectar con la base de datos:', error);
    // Devuelve una respuesta de error con detalles para facilitar la depuración.
    return NextResponse.json({
      status: 'error',
      message: 'No se pudo conectar a la base de datos.',
      error: {
        code: error.code,
        message: error.message,
      },
    }, { status: 500 });
  }
}
