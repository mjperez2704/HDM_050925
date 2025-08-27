
"use client";

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Filter, Upload, PlusCircle, MoreHorizontal } from 'lucide-react';
import { AddExpenseForm } from '@/components/administration/add-expense-form';

const expensesData = [
    {
        date: '27/8/2025',
        category: 'Servicios',
        description: 'Pago de servicio de Internet mensual',
        user: 'ID undefined',
        status: 'Pendiente',
        amount: '$800.00',
    },
];

export default function ExpensesPage() {
    const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

    return (
        <>
            <div className="flex min-h-screen w-full">
                <Sidebar />
                <div className="flex flex-1 flex-col bg-background">
                    <header className="sticky top-0 flex h-16 items-center justify-end gap-4 border-b bg-background px-4 md:px-6 z-10">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <Avatar>
                                <AvatarFallback>AD</AvatarFallback>
                                </Avatar>
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem>My Account</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>
                    <main className="flex-1 p-4 md:p-8">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Gestión de Gastos</CardTitle>
                                        <CardDescription>Administra los gastos registrados en el sistema.</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline">
                                            <Filter className="mr-2 h-4 w-4" />
                                            Filtrar
                                        </Button>
                                        <Button variant="outline">
                                            <Upload className="mr-2 h-4 w-4" />
                                            Exportar
                                        </Button>
                                        <Button 
                                            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                            onClick={() => setIsAddExpenseModalOpen(true)}
                                        >
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Registrar Gasto
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-4">
                                    <span className="text-sm text-muted-foreground">Mostrar</span>
                                     <Select defaultValue="10">
                                        <SelectTrigger className="w-20">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="10">10</SelectItem>
                                            <SelectItem value="20">20</SelectItem>
                                            <SelectItem value="50">50</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <span className="text-sm text-muted-foreground">registros.</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Categoría</TableHead>
                                            <TableHead>Descripción</TableHead>
                                            <TableHead>Realizado por</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead>Monto</TableHead>
                                            <TableHead><span className="sr-only">Actions</span></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {expensesData.map((expense, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{expense.date}</TableCell>
                                                <TableCell><Badge variant="secondary">{expense.category}</Badge></TableCell>
                                                <TableCell className="font-medium">{expense.description}</TableCell>
                                                <TableCell>{expense.user}</TableCell>
                                                <TableCell>
                                                    <Badge variant="destructive" className="bg-red-200 text-red-800">{expense.status}</Badge>
                                                </TableCell>
                                                <TableCell>{expense.amount}</TableCell>
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
                                                            <DropdownMenuItem>Marcar como Pagado</DropdownMenuItem>
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
            <AddExpenseForm isOpen={isAddExpenseModalOpen} onOpenChange={setIsAddExpenseModalOpen} />
        </>
    );
}
