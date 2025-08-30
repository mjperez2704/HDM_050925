
"use client";

import { useState, useEffect } from 'react';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { AddRoleForm } from '@/components/security/add-role-form';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { AddPermissionForm } from '@/components/security/add-permission-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { EditPermissionForm } from '@/components/security/edit-permission-form';
import { EditRoleForm } from '@/components/security/edit-role-form';
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
import { getRolesWithDetails, deleteRole, RoleWithDetails } from '@/actions/roles-actions';
import { ReassignAndDeleteRoleDialog } from '@/components/security/reassign-and-delete-role-dialog';
import { useToast } from "@/hooks/use-toast";

const permissionsData = [
    { key: 'inventario:ver', module: 'Inventario', description: 'Permite ver el inventario' },
    { key: 'inventario:crear', module: 'Inventario', description: 'Permite crear productos' },
    { key: 'inventario:editar', module: 'Inventario', description: 'Permite editar productos' },
    { key: 'inventario:eliminar', module: 'Inventario', description: 'Permite eliminar productos' },
    { key: 'inventario:ver_coordenadas_ocultas', module: 'Inventario', description: 'Permite ver coordenadas ocultas' },
    { key: 'usuarios:ver', module: 'Usuarios', description: 'Permite ver la lista de usuarios' },
];

type Permission = typeof permissionsData[0];

export default function RolesPage() {
    const [rolesData, setRolesData] = useState<RoleWithDetails[]>([]);
    const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
    const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
    const [isAddPermissionModalOpen, setIsAddPermissionModalOpen] = useState(false);
    const [isEditPermissionModalOpen, setIsEditPermissionModalOpen] = useState(false);
    const [isReassignDialogOpen, setIsReassignDialogOpen] = useState(false);
    const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<RoleWithDetails | null>(null);
    const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
    const { toast } = useToast();

    const fetchRoles = async () => {
        const roles = await getRolesWithDetails();
        setRolesData(roles);
    };

    useEffect(() => {
        fetchRoles();
    }, []);
    
    const handleRoleUpdated = () => {
        fetchRoles();
        setIsEditRoleModalOpen(false);
    };

    const handleOpenEditRoleModal = (role: RoleWithDetails) => {
        setSelectedRole(role);
        setIsEditRoleModalOpen(true);
    };

    const handleOpenEditPermissionModal = (permission: Permission) => {
        setSelectedPermission(permission);
        setIsEditPermissionModalOpen(true);
    };

    const handleDeleteClick = (role: RoleWithDetails) => {
        setSelectedRole(role);
        if (role.usersCount > 0) {
            setIsReassignDialogOpen(true);
        } else {
            setIsConfirmDeleteDialogOpen(true);
        }
    };
    
    const handleConfirmDelete = async () => {
        if (!selectedRole) return;
        const result = await deleteRole(selectedRole.id);
        if (result.success) {
            toast({ title: "Éxito", description: result.message });
            fetchRoles();
        } else {
            toast({ variant: "destructive", title: "Error", description: result.message });
        }
        setIsConfirmDeleteDialogOpen(false);
        setSelectedRole(null);
    };

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-muted/40">
                <CustomSidebar />
                <div className="flex flex-1 flex-col">
                    <Header />
                    <main className="flex-1 p-4 md:p-8">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold">Roles y Permisos</h1>
                            <p className="text-muted-foreground">
                                Define qué pueden hacer los usuarios en el sistema.
                            </p>
                        </div>

                        <Tabs defaultValue="roles">
                            <TabsList className="mb-4">
                                <TabsTrigger value="roles">Roles</TabsTrigger>
                                <TabsTrigger value="permissions">Permisos</TabsTrigger>
                            </TabsList>
                            <TabsContent value="roles">
                                <div className="flex items-center justify-end mb-4">
                                     <Button 
                                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                        onClick={() => setIsAddRoleModalOpen(true)}
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Agregar Rol
                                    </Button>
                                </div>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {rolesData.map((role) => (
                                        <Card key={role.id}>
                                            <CardHeader>
                                                <div className="flex items-center justify-between">
                                                    <CardTitle>{role.name}</CardTitle>
                                                    <Badge variant={role.permissionsCount > 0 ? "default" : "secondary"}>
                                                        {role.permissionsCount} permisos
                                                    </Badge>
                                                </div>
                                                <CardDescription>{role.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-3">
                                                    <h4 className="text-sm font-semibold">Usuarios Activos en este Rol: {role.usersCount}</h4>
                                                </div>
                                                <div className="flex justify-end items-center gap-4 mt-6 pt-4 border-t">
                                                    <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => handleOpenEditRoleModal(role)}>
                                                        <Edit className="h-4 w-4" />
                                                        Editar
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        className="flex items-center gap-2 text-destructive hover:text-destructive"
                                                        onClick={() => handleDeleteClick(role)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        Eliminar
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="permissions">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle>Permisos del Sistema</CardTitle>
                                                <CardDescription>Administra los permisos que pueden ser asignados a los roles.</CardDescription>
                                            </div>
                                            <Button 
                                                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                                onClick={() => setIsAddPermissionModalOpen(true)}
                                            >
                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                Agregar Permiso
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Clave</TableHead>
                                                    <TableHead>Módulo</TableHead>
                                                    <TableHead>Descripción</TableHead>
                                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {permissionsData.map((permission) => (
                                                    <TableRow key={permission.key}>
                                                        <TableCell className="font-mono text-xs">{permission.key}</TableCell>
                                                        <TableCell>{permission.module}</TableCell>
                                                        <TableCell>{permission.description}</TableCell>
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
                                                                        <DropdownMenuItem onClick={() => handleOpenEditPermissionModal(permission)}>
                                                                            Editar
                                                                        </DropdownMenuItem>
                                                                        <AlertDialogTrigger asChild>
                                                                            <DropdownMenuItem className="text-destructive">
                                                                                Eliminar
                                                                            </DropdownMenuItem>
                                                                        </AlertDialogTrigger>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                                 <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Esta acción no se puede deshacer. Esto eliminará permanentemente el permiso.
                                                                    </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                    <AlertDialogAction className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction>
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
                            </TabsContent>
                        </Tabs>
                    </main>
                </div>
            </div>
            <AddRoleForm isOpen={isAddRoleModalOpen} onOpenChange={setIsAddRoleModalOpen} onRoleAdded={fetchRoles} />
            <EditRoleForm isOpen={isEditRoleModalOpen} onOpenChange={setIsEditRoleModalOpen} role={selectedRole} onRoleUpdated={handleRoleUpdated} />
            <AddPermissionForm isOpen={isAddPermissionModalOpen} onOpenChange={setIsAddPermissionModalOpen} />
            <EditPermissionForm isOpen={isEditPermissionModalOpen} onOpenChange={setIsEditPermissionModalOpen} permission={selectedPermission} />
             {selectedRole && (
                <>
                    <ReassignAndDeleteRoleDialog
                        isOpen={isReassignDialogOpen}
                        onOpenChange={setIsReassignDialogOpen}
                        roleToDelete={selectedRole}
                        allRoles={rolesData}
                        onDeletionCompleted={fetchRoles}
                    />
                    <AlertDialog open={isConfirmDeleteDialogOpen} onOpenChange={setIsConfirmDeleteDialogOpen}>
                         <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro de eliminar el rol "{selectedRole.name}"?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará permanentemente el rol y todos sus permisos asociados.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setSelectedRole(null)}>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">
                                    Eliminar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            )}
        </SidebarProvider>
    );
}
