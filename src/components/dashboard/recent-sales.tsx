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
import { Badge } from "@/components/ui/badge"

const salesData = [
  { customer: "Olivia Martin", date: "2024-07-21", amount: "$1,999.00", status: "Paid" },
  { customer: "Jackson Lee", date: "2024-07-20", amount: "$329.00", status: "Paid" },
  { customer: "Isabella Nguyen", date: "2024-07-19", amount: "$150.00", status: "Pending" },
  { customer: "William Kim", date: "2024-07-18", amount: "$499.50", status: "Paid" },
  { customer: "Sofia Davis", date: "2024-07-17", amount: "$249.99", status: "Paid" },
]

export function RecentSales() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>A summary of your 5 most recent transactions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
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
