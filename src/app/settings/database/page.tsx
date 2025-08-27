
"use client";

import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, TestTubeDiagonal, Save } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';

export default function DatabaseSettingsPage() {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-muted/40">
                <CustomSidebar />
                <div className="flex flex-1 flex-col">
                    <Header />
                    <main className="flex-1 p-4 md:p-8">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold">Ajustes de Base de Datos</h1>
                            <p className="text-muted-foreground">
                                Configura y prueba la conexión a tu base de datos MySQL.
                            </p>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Credenciales de Conexión</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <Alert variant="destructive">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Advertencia de Seguridad</AlertTitle>
                                    <AlertDescription>
                                        Guardar estos cambios reescribirá el archivo `.env` del servidor. La aplicación podría requerir un reinicio para aplicar los nuevos ajustes.
                                    </AlertDescription>
                                </Alert>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="host">Host</Label>
                                        <Input id="host" placeholder="ej. 127.0.0.1 o la IP de su servidor" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="user">Usuario</Label>
                                            <Input id="user" placeholder="ej. admin" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="db-name">Nombre de la Base de Datos</Label>
                                            <Input id="db-name" placeholder="ej. mi_tienda_db" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="password">Contraseña</Label>
                                            <Input id="password" type="password" placeholder="Dejar en blanco para no cambiar" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="port">Puerto</Label>
                                            <Input id="port" defaultValue="3306" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <Button variant="outline">
                                        <TestTubeDiagonal className="mr-2 h-4 w-4" />
                                        Probar Conexión
                                    </Button>
                                    <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                                        <Save className="mr-2 h-4 w-4" />
                                        Guardar Cambios
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
