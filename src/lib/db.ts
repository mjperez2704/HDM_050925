import mysql from 'mysql2/promise';

// Configuración de la conexión a partir de las variables de entorno
export const dbConfig = {
  host: process.env.DB_HOST || '195.250.27.25',
  user: process.env.DB_USER || 'megashop_hdm',
  password: process.env.DB_PASSWORD || 'megashop_hdm',
  database: process.env.DB_DATABASE || 'megashop_hdm',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 30000, // 30 segundos
};

// Crear un pool de conexiones para reutilizarlas
const pool = mysql.createPool(dbConfig);

// Objeto para exportar que simula la interfaz de una conexión única
const db = {
  query: async (sql: string, params?: any) => {
    // console.log("Executing query:", sql, params); // Descomentar para depuración
    const [rows, fields] = await pool.execute(sql, params);
    return [rows, fields];
  },
  getConnection: () => pool.getConnection(),
};

export default db;
