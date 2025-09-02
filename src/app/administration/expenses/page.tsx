
"use client";

import { useState, useEffect } from 'react';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Filter, Upload, PlusCircle, MoreHorizontal } from 'lucide-react';
import { AddExpenseForm } from '@/components/administration/add-expense-form';
import { EditExpenseForm } from '@/components/administration/edit-expense-form';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { getExpenses, deleteExpense, markExpenseAsPaid } from '@/actions/expenses-actions';
import type { Expense } from '@/lib/types/expense';
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ExpensesPage() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
    const [isEditExpenseModalOpen, setIsEditExpenseModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
    const { toast } = useToast();

    const fetchExpenses = async () => {
        const data = await getExpenses();
        setExpenses(data);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleOpenEditModal = (expense: Expense) => {
        setSelectedExpense(expense);
        setIsEditExpenseModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        const result = await deleteExpense(id);
        toast({
            title: result.success ? "Éxito" : "Error",
            description: result.message,
            variant: result.success ? "default" : "destructive",
        });
        if (result.success) fetchExpenses();
    };
    
    const handleMarkAsPaid = async (id: number) => {
        const result = await markExpenseAsPaid(id);
        toast({
            title: result.success ? "Éxito" : "Error",
            description: result.message,
            variant: result.success ? "default" : "destructive",
        });
        if (result.success) fetchExpenses();
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Pagado': return 'default';
            case 'Pendiente': return 'destructive';
            case 'Cancelado': return 'secondary';
            default: return 'outline';
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
                                        <CardTitle>Gestión de Gastos</CardTitle>
                                        <CardDescription>Administra los gastos registrados en el sistema.</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button 
                                            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                            onClick={() => setIsAddExpenseModalOpen(true)}
                                        >
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Registrar Gasto
                                        </Button>
                                    </div>
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
                                        {expenses.map((expense) => (
                                            <TableRow key={expense.id}>
                                                <TableCell>{new Date(expense.fecha).toLocaleDateString()}</TableCell>
                                                <TableCell><Badge variant="secondary">{expense.categoria}</Badge></TableCell>
                                                <TableCell className="font-medium">{expense.descripcion}</TableCell>
                                                <TableCell>{expense.nombreUsuario || 'N/A'}</TableCell>
                                                <TableCell>
                                                    <Badge variant={getStatusVariant(expense.estado) as any}>{expense.estado}</Badge>
                                                </TableCell>
                                                <TableCell>${expense.monto.toFixed(2)}</TableCell>
                                                <TableCell className="text-right">
                                                    <AlertDialog>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                                    <span className="sr-only">Open menu</span>
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                                <DropdownMenuItem onClick={() => handleOpenEditModal(expense)}>Editar</DropdownMenuItem>
                                                                {expense.estado === 'Pendiente' && (
                                                                    <DropdownMenuItem onClick={() => handleMarkAsPaid(expense.id)}>
                                                                        Marcar como Pagado
                                                                    </DropdownMenuItem>
                                                                )}
                                                                <AlertDialogTrigger asChild>
                                                                     <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                                                                </AlertDialogTrigger>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                        <AlertDialogContent>
                                                          <AlertDialogHeader>
                                                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                              Esta acción no se puede deshacer. Esto eliminará permanentemente el gasto.
                                                            </AlertDialogDescription>
                                                          </AlertDialogHeader>
                                                          <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(expense.id)} className="bg-destructive hover:bg-destructive/90">
                                                              Eliminar
                                                            </AlertDialogAction>
                                                          </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
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
            <AddExpenseForm isOpen={isAddExpenseModalOpen} onOpenChange={setIsAddExpenseModalOpen} onExpenseAdded={fetchExpenses} />
            <EditExpenseForm isOpen={isEditExpenseModalOpen} onOpenChange={setIsEditExpenseModalOpen} expense={selectedExpense} onExpenseUpdated={fetchExpenses} />
        </SidebarProvider>
    );
}
