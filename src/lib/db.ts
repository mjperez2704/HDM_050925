import mysql from 'mysql2/promise';

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST || '195.250.27.25',
  user: process.env.DB_USER || 'megashop_hdm',
  password: process.env.DB_PASSWORD || 'megashop_hdm',
  database: process.env.DB_DATABASE || 'megashop_hdm',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // 10 segundos de tiempo de espera para la conexión
});

export default pool;
