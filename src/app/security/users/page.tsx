
"use client";

import { useState, useEffect } from 'react';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { AddUserForm } from '@/components/security/add-user-form';
import { EditUserForm } from '@/components/security/edit-user-form';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { PinConfirmationModal } from '@/components/security/pin-confirmation-modal';
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
import { getUsers, deleteUser, toggleUserStatus, updateUserPin } from '@/actions/users-actions';
import type { UserWithRole } from '@/lib/types/security';
import { useToast } from "@/hooks/use-toast";

export default function UsersPage() {
    const [usersData, setUsersData] = useState<UserWithRole[]>([]);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
    const { toast } = useToast();

    const fetchUsers = async () => {
        const users = await getUsers();
        setUsersData(users);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleOpenEditModal = (user: UserWithRole) => {
        setSelectedUser(user);
        setIsEditUserModalOpen(true);
    };
    
    const handleOpenPinModal = (user: UserWithRole) => {
        setSelectedUser(user);
        setIsPinModalOpen(true);
    };

    const handleDeleteUser = async (id: number) => {
        const result = await deleteUser(id);
        if (!result.success) {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.message,
            });
        } else {
            toast({
                title: "Éxito",
                description: result.message,
            });
            fetchUsers();
        }
    };
    
    const handleToggleStatus = async (user: UserWithRole) => {
        const result = await toggleUserStatus(user.id, user.activo);
        if (!result.success) {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.message,
            });
        } else {
            toast({
                title: "Éxito",
                description: result.message,
            });
            fetchUsers();
        }
    };

    const handlePinConfirm = async (pin: string) => {
        if (!selectedUser) return;

        const result = await updateUserPin(selectedUser.id, pin);
        if (!result.success) {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.message,
            });
        } else {
            toast({
                title: "Éxito",
                description: result.message,
            });
        }
        setIsPinModalOpen(false);
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
                                        <CardTitle>Usuarios</CardTitle>
                                        <CardDescription>Administra los usuarios del sistema y sus roles.</CardDescription>
                                    </div>
                                    <Button 
                                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                        onClick={() => setIsAddUserModalOpen(true)}
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Agregar Usuario
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nombre</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Rol</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead><span className="sr-only">Actions</span></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {usersData.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell className="font-medium">{user.nombre}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.rol}</TableCell>
                                                <TableCell>
                                                    <Badge variant={user.activo ? 'destructive' : 'secondary'}>{user.activo ? 'Activo' : 'Inactivo'}</Badge>
                                                </TableCell>
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
                                                                <DropdownMenuItem onClick={() => handleOpenEditModal(user)}>Editar</DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => handleOpenPinModal(user)}>
                                                                    Cambiar PIN de Usuario
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => handleToggleStatus(user)}>
                                                                    {user.activo ? 'Desactivar' : 'Activar'}
                                                                </DropdownMenuItem>
                                                                <AlertDialogTrigger asChild>
                                                                    <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                                                                </AlertDialogTrigger>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Esta acción no se puede deshacer. Esto eliminará permanentemente el usuario.
                                                            </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                            <AlertDialogAction 
                                                                className="bg-destructive hover:bg-destructive/90"
                                                                onClick={() => handleDeleteUser(user.id)}
                                                            >
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
            <AddUserForm isOpen={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen} onUserAdded={fetchUsers} />
            <EditUserForm isOpen={isEditUserModalOpen} onOpenChange={setIsEditUserModalOpen} user={selectedUser} onUserUpdated={fetchUsers} />
            <PinConfirmationModal
                isOpen={isPinModalOpen}
                onOpenChange={setIsPinModalOpen}
                onConfirm={handlePinConfirm}
            />
        </SidebarProvider>
    );
}
