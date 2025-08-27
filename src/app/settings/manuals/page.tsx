
"use client";

import { Sidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Upload, BookOpen, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export default function ManualsPage() {
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
                        <DropdownMenuItem>My Account</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex-1 p-4 md:p-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold">Manuales</h1>
                        <p className="text-muted-foreground">
                            Sube y administra los manuales técnicos, guías de usuario y otros documentos importantes.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Cargar Nuevo Manual</CardTitle>
                                <CardDescription>Selecciona un archivo (PDF, DOCX, TXT) para subir al sistema.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Haz clic para cargar</span> o arrastra y suelta</p>
                                            <p className="text-xs text-muted-foreground">PDF, DOC, DOCS, TXT</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                </div>
                                <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Subir Manual</Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Consultar Manuales</CardTitle>
                                <CardDescription>Filtra para encontrar el manual que necesitas.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="manual-type">Tipo de Manual</Label>
                                    <Select>
                                        <SelectTrigger id="manual-type">
                                            <SelectValue placeholder="Selecciona un tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="tecnico">Técnico</SelectItem>
                                            <SelectItem value="usuario">Usuario</SelectItem>
                                            <SelectItem value="componentes">Componentes</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="brand">Marca</Label>
                                     <Select>
                                        <SelectTrigger id="brand">
                                            <SelectValue placeholder="Selecciona una marca" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="apple">Apple</SelectItem>
                                            <SelectItem value="samsung">Samsung</SelectItem>
                                            <SelectItem value="huawei">Huawei</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="model">Modelo</Label>
                                     <Select>
                                        <SelectTrigger id="model">
                                            <SelectValue placeholder="Selecciona un modelo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="iphone15">iPhone 15</SelectItem>
                                            <SelectItem value="s24ultra">Galaxy S24 Ultra</SelectItem>
                                            <SelectItem value="p60pro">P60 Pro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="md:col-span-3 flex justify-end">
                                     <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                        <Search className="mr-2 h-4 w-4" />
                                        Buscar Manual
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}
