import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getRecentSales } from "@/actions/dashboard-actions";

export async function RecentSales() {
  const salesData = await getRecentSales();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas Recientes</CardTitle>
        <CardDescription>Un resumen de tus 5 transacciones más recientes desde la base de datos.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesData.length > 0 ? (
              salesData.map((sale, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="font-medium">{sale.customerName}</div>
                  </TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell className="text-right">${sale.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No hay ventas recientes.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
