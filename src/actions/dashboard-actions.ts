
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
    // Devuelve valores por defecto en caso de error para no bloquear la UI
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


export async function getHistoricalSalesData(): Promise<string> {
    try {
        const [rows]: any = await db.query(`
            SELECT 
                DATE(fecha) as salesDate, 
                SUM(total) as totalSales
            FROM ven_ventas
            WHERE estado = 'PAGADA'
            GROUP BY DATE(fecha)
            ORDER BY salesDate ASC
            LIMIT 100
        `);

        if (rows.length === 0) {
            return "Fecha,Ventas\n";
        }

        const csvHeader = "Fecha,Ventas\n";
        const csvRows = rows.map((row: any) => {
            const date = new Date(row.salesDate).toISOString().split('T')[0];
            return `${date},${row.totalSales}`;
        });

        return csvHeader + csvRows.join('\n');
    } catch (error) {
        console.error('Error fetching historical sales data:', error);
        return "Fecha,Ventas\n";
    }
}

export type SalesTrendData = {
    month: string;
    sales: number;
}[];

export async function getSalesTrendData(): Promise<SalesTrendData> {
    try {
        const [rows]: any = await db.query(`
            SELECT 
                DATE_FORMAT(fecha, '%Y-%m') as month,
                SUM(total) as totalSales
            FROM ven_ventas
            WHERE fecha >= DATE_SUB(NOW(), INTERVAL 6 MONTH) AND estado = 'PAGADA'
            GROUP BY DATE_FORMAT(fecha, '%Y-%m')
            ORDER BY month ASC
        `);

        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        return rows.map((row: any) => {
            const [year, monthIndex] = row.month.split('-');
            return {
                month: monthNames[parseInt(monthIndex, 10) - 1],
                sales: row.totalSales,
            };
        });

    } catch (error) {
        console.error('Error fetching sales trend data:', error);
        return [];
    }
}
