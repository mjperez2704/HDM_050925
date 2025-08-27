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

const salesData = [
  { customer: "Olivia Martin", date: "2024-07-21", amount: "$1,999.00" },
  { customer: "Jackson Lee", date: "2024-07-20", amount: "$329.00" },
  { customer: "Isabella Nguyen", date: "2024-07-19", amount: "$150.00" },
  { customer: "William Kim", date: "2024-07-18", amount: "$499.50" },
  { customer: "Sofia Davis", date: "2024-07-17", amount: "$249.99" },
]

export function RecentSales() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas Recientes</CardTitle>
        <CardDescription>Un resumen de tus 5 transacciones más recientes.</CardDescription>
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
            {salesData.map((sale, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{sale.customer}</div>
                </TableCell>
                <TableCell>{sale.date}</TableCell>
                <TableCell className="text-right">{sale.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
