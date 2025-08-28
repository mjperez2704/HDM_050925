
"use client";

import { useState } from 'react';
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

const rolesData = [
    {
        name: 'Administrador',
        description: 'Acceso total al sistema.',
        permissionsCount: 0,
        permissions: [],
    },
    {
        name: 'Técnico',
        description: 'Acceso a órdenes de servicio e inventario de refacciones.',
        permissionsCount: 8,
        permissions: [
            'Inventario: ver',
            'Inventario: ajustar',
            'Inventario: transferir',
            'Inventario: ver_costos',
            'Reparaciones: ver',
        ],
    },
    {
        name: 'Ventas',
        description: 'Acceso a clientes, presupuestos y ventas.',
        permissionsCount: 0,
        permissions: [],
    },
    {
        name: 'Gerente',
        description: 'Acceso a reportes y supervisión de personal.',
        permissionsCount: 0,
        permissions: [],
    },
];

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
    const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
    const [isAddPermissionModalOpen, setIsAddPermissionModalOpen] = useState(false);
    const [isEditPermissionModalOpen, setIsEditPermissionModalOpen] = useState(false);
    const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);

    const handleOpenEditPermissionModal = (permission: Permission) => {
        setSelectedPermission(permission);
        setIsEditPermissionModalOpen(true);
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
                                        <Card key={role.name}>
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
                                                    <h4 className="text-sm font-semibold">Permisos Clave:</h4>
                                                    {role.permissions.length > 0 ? (
                                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                                            {role.permissions.slice(0, 5).map((permission, index) => (
                                                                <li key={index} className="flex items-center gap-2">
                                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                                    <span>{permission}</span>
                                                                </li>
                                                            ))}
                                                            {role.permissions.length > 5 && (
                                                                <li className="pl-6">y {role.permissions.length - 5} más...</li>
                                                            )}
                                                        </ul>
                                                    ) : (
                                                        <p className="text-sm text-muted-foreground">No hay permisos clave definidos.</p>
                                                    )}
                                                </div>
                                                <div className="flex justify-end items-center gap-4 mt-6 pt-4 border-t">
                                                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                                        <Edit className="h-4 w-4" />
                                                        Editar
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-destructive hover:text-destructive">
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
            <AddRoleForm isOpen={isAddRoleModalOpen} onOpenChange={setIsAddRoleModalOpen} />
            <AddPermissionForm isOpen={isAddPermissionModalOpen} onOpenChange={setIsAddPermissionModalOpen} />
            <EditPermissionForm isOpen={isEditPermissionModalOpen} onOpenChange={setIsEditPermissionModalOpen} permission={selectedPermission} />
        </SidebarProvider>
    );
}
