import mysql from 'mysql2/promise';

// Configuración de la conexión a partir de las variables de entorno
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Función principal para ejecutar consultas de forma segura
export async function executeQuery(query: string, values: any[] = []) {
  let connection;
  try {
    // Crea una nueva conexión para cada consulta, garantizando que no queden conexiones abiertas
    connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute(query, values);
    return results;
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    // Lanzamos el error para que el código que llamó a esta función sepa que algo salió mal
    throw new Error('Error al ejecutar la consulta en la base de datos.');
  } finally {
    // Es CRUCIAL cerrar la conexión siempre, tanto si hubo éxito como si hubo error
    if (connection) {
      await connection.end();
    }
  }
}
