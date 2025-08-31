import mysql from 'mysql2/promise';

// Configuration for the database connection
const dbConfig = {
  host: process.env.DB_HOST || '195.250.27.25',
  user: process.env.DB_USER || 'megashop_hdm',
  password: process.env.DB_PASSWORD || 'megashop_hdm',
  database: process.env.DB_DATABASE || 'megashop_hdm',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  connectTimeout: 10000, // 10 seconds timeout for connection
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
  // In case transaction support is needed in the future, it can be added here.
  // For now, we only support simple queries.
  getConnection: async () => {
      // Note: This pattern is more complex as you need to manage the connection release manually.
      // For simplicity and stability in this environment, we are using the query method above.
      // This is a placeholder and should be used with caution.
      return mysql.createConnection(dbConfig);
  }
};

export default db;
