
"use client";

import { Sidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, CheckCircle2 } from 'lucide-react';

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

export default function RolesPage() {
    return (
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
                        <DropdownMenuItem>Mi Cuenta</DropdownMenuItem>
                        <DropdownMenuItem>Configuración</DropdownMenuItem>
                        <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex-1 p-4 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold">Roles y Permisos</h1>
                            <p className="text-muted-foreground">
                                Define qué pueden hacer los usuarios en el sistema.
                            </p>
                        </div>
                        <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
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
                </main>
            </div>
        </div>
    );
}
