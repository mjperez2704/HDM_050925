
"use client";

import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Building, Phone, Globe, Upload } from 'lucide-react';
import Image from 'next/image';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';

export default function CompanyDataPage() {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-muted/40">
                <CustomSidebar />
                <div className="flex flex-1 flex-col">
                    <Header />
                    <main className="flex-1 p-4 md:p-8">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold">Datos de la Empresa</h1>
                            <p className="text-muted-foreground">
                                Administra la información fiscal y de contacto de tu empresa.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                            <div className="lg:col-span-2 space-y-8">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <Building className="h-6 w-6" />
                                            <div>
                                                <CardTitle>Información Fiscal</CardTitle>
                                                <CardDescription>Datos para facturación y registros oficiales.</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="razon-social">Nombre o Razón Social</Label>
                                                <Input id="razon-social" defaultValue="Hospital del Móvil S.A. de C.V." />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="nombre-comercial">Nombre Comercial</Label>
                                                <Input id="nombre-comercial" defaultValue="Hospital del Móvil" />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="rfc">RFC</Label>
                                                <Input id="rfc" defaultValue="HMO123456789" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="regimen-fiscal">Régimen Fiscal</Label>
                                                <Input id="regimen-fiscal" defaultValue="Régimen de Incorporación Fiscal" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-4">Dirección Fiscal</h3>
                                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="calle">Calle</Label>
                                                    <Input id="calle" defaultValue="Av. Siempre Viva" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="numero-exterior">Número Exterior</Label>
                                                    <Input id="numero-exterior" defaultValue="742" />
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="numero-interior">Número Interior (opcional)</Label>
                                                    <Input id="numero-interior" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="colonia">Colonia</Label>
                                                    <Input id="colonia" defaultValue="Centro" />
                                                </div>
                                            </div>
                                        </div>
                                         <div className="grid md:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="cp">Código Postal</Label>
                                                <Input id="cp" defaultValue="08000" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="municipio">Ciudad / Municipio</Label>
                                                <Input id="municipio" defaultValue="Springfield" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="estado">Estado</Label>
                                                <Input id="estado" defaultValue="CDMX" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <Phone className="h-6 w-6" />
                                            <div>
                                                <CardTitle>Información de Contacto</CardTitle>
                                                <CardDescription>Datos de contacto público y administrativo.</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                         <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="tel-principal">Teléfono Principal</Label>
                                                <Input id="tel-principal" defaultValue="55-1234-5678" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="tel-secundario">Teléfono Secundario (opcional)</Label>
                                                <Input id="tel-secundario" defaultValue="55-9876-5432" />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email de Contacto</Label>
                                                <Input id="email" type="email" defaultValue="contacto@hospitaldelmovil.com" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="website">Sitio Web (opcional)</Label>
                                                <Input id="website" type="url" defaultValue="https://www.hospitaldelmovil.com" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="lg:col-span-1">
                                <Card>
                                    <CardHeader>
                                         <div className="flex items-center gap-3">
                                            <Globe className="h-6 w-6" />
                                            <div>
                                                <CardTitle>Logotipo</CardTitle>
                                                <CardDescription>Sube el logotipo de tu empresa.</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex flex-col items-center justify-center space-y-4">
                                        <div className="w-48 h-32 rounded-lg bg-muted flex items-center justify-center p-4">
                                             <Image 
                                                src="https://picsum.photos/200/100" 
                                                alt="Logotipo de la empresa" 
                                                width={192} 
                                                height={128} 
                                                data-ai-hint="logo electronics"
                                                className="object-contain rounded-md"
                                            />
                                        </div>
                                        <Button variant="outline">
                                            <Upload className="mr-2 h-4 w-4" />
                                            Cambiar Logotipo
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <div className="flex justify-end mt-8">
                            <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Guardar Cambios</Button>
                        </div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
