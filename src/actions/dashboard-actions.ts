
'use server';

import db from '@/lib/db';

type DashboardMetrics = {
    totalRevenue: number;
    totalSales: number;
    newClients: number;
};

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  try {
    // Asumimos que tienes una tabla 'ven_ventas' con una columna 'total'
    // y una tabla 'cli_clientes' con una columna 'fecha_registro'
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
    // Devolver valores por defecto en caso de error para no romper el dashboard
    return {
      totalRevenue: 0,
      totalSales: 0,
      newClients: 0,
    };
  }
}
