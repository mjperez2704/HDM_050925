
'use server';

import db from '@/lib/db';

type DashboardMetrics = {
    totalRevenue: number;
    totalSales: number;
    newClients: number;
};

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  try {
    const [revenueResult]: any = await db.query('SELECT SUM(total) as totalRevenue FROM ven_ventas WHERE estado = "PAGADA"');
    const [salesResult]: any = await db.query('SELECT COUNT(*) as totalSales FROM ven_ventas');
    const [clientsResult]: any = await db.query('SELECT COUNT(*) as newClients FROM cli_clientes WHERE fecha_registro >= DATE_SUB(NOW(), INTERVAL 30 DAY)');
    
    const totalRevenue = revenueResult[0].totalRevenue || 0;
    const totalSales = salesResult[0].totalSales || 0;
    const newClients = clientsResult[0].newClients || 0;

    return {
      totalRevenue,
      totalSales,
      newClients,
    };
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    return {
      totalRevenue: 0,
      totalSales: 0,
      newClients: 0,
    };
  }
}

export type RecentSale = {
  customerName: string;
  date: string;
  amount: number;
};

export async function getRecentSales(): Promise<RecentSale[]> {
  try {
    const [rows]: any = await db.query(`
      SELECT 
        c.razon_social as customerName, 
        v.fecha as date, 
        v.total as amount 
      FROM ven_ventas v
      JOIN cli_clientes c ON v.cliente_id = c.id
      ORDER BY v.fecha DESC
      LIMIT 5
    `);
    
    // Formatear la fecha para que sea legible
    return rows.map((row: any) => ({
      ...row,
      date: new Date(row.date).toLocaleDateString(),
    }));
  } catch (error) {
    console.error('Error fetching recent sales:', error);
    return [];
  }
}
