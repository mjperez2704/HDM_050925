import mysql from 'mysql2/promise';

// Configuration for the database connection
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  connectTimeout: 30000, // 30 seconds timeout for connection
};

// This approach creates a connection for each query and then closes it.
// It's more resilient to connection closing issues in serverless environments.
const db = {
  query: async (sql: string, values?: any) => {
    let connection;
    try {
      connection = await mysql.createConnection(dbConfig);
      const [rows, fields] = await connection.execute(sql, values);
      return [rows, fields];
    } catch (error) {
      console.error("Database Query Error:", error);
      throw error; // Re-throw the error to be handled by the caller
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  },
  // This is used for transactions where the connection needs to be managed manually.
  getConnection: async () => {
      return mysql.createConnection(dbConfig);
  }
};

export default db;
