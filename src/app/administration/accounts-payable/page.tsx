
"use client";

import { SidebarProvider } from '@/components/ui/sidebar';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Header } from '@/components/dashboard/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Filter, Download } from 'lucide-react';

const accountsPayableData = [
  {
    folio: 'OC-2024-001',
    provider: 'Refacciones Móviles del Centro S.A.',
    emissionDate: '2024-07-20',
    dueDate: '2024-08-19',
    amount: '$2,500.00',
    balance: '$2,500.00',
    status: 'Pendiente',
  },
  {
    folio: 'SERV-07-2024',
    provider: 'Marketing Digital Avanzado S.C.',
    emissionDate: '2024-07-01',
    dueDate: '2024-07-31',
    amount: '$5,000.00',
    balance: '$0.00',
    status: 'Pagado',
  },
  {
    folio: 'RENT-07-2024',
    provider: 'Inmobiliaria Segura S.A.',
    emissionDate: '2024-07-05',
    dueDate: '2024-07-10',
    amount: '$12,000.00',
    balance: '$12,000.00',
    status: 'Vencido',
  },
];

export default function AccountsPayablePage() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Pendiente':
        return 'secondary';
      case 'Vencido':
        return 'destructive';
      case 'Pagado':
        return 'default';
      default:
        return 'outline';
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <CustomSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Cuentas por Pagar</CardTitle>
                    <CardDescription>Administra y da seguimiento a las facturas y pagos pendientes a proveedores.</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtrar
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Exportar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Folio</TableHead>
                      <TableHead>Proveedor</TableHead>
                      <TableHead>Fecha de Emisión</TableHead>
                      <TableHead>Fecha de Vencimiento</TableHead>
                      <TableHead>Monto</TableHead>
                      <TableHead>Saldo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accountsPayableData.map((account) => (
                      <TableRow key={account.folio}>
                        <TableCell className="font-medium text-destructive underline">{account.folio}</TableCell>
                        <TableCell>{account.provider}</TableCell>
                        <TableCell>{account.emissionDate}</TableCell>
                        <TableCell>{account.dueDate}</TableCell>
                        <TableCell>{account.amount}</TableCell>
                        <TableCell className="font-semibold">{account.balance}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(account.status) as any}>{account.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                              <DropdownMenuItem>Ver Detalle</DropdownMenuItem>
                              <DropdownMenuItem>Registrar Pago</DropdownMenuItem>
                              <DropdownMenuItem>Programar Pago</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
