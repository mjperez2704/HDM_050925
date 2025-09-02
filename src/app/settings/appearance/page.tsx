
"use client";

import { useState } from 'react';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Palette, Image as ImageIcon, Monitor, MonitorPlay, Upload, Clock } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';

export default function AppearancePage() {
    const [primaryColor, setPrimaryColor] = useState("#990000");
    const [accentColor, setAccentColor] = useState("#b80200");
    const [backgroundColor, setBackgroundColor] = useState("#F0F8FF");

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-muted/40">
                <CustomSidebar />
                <div className="flex flex-1 flex-col">
                    <Header />
                    <main className="flex-1 p-4 md:p-8">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold">Apariencia</h1>
                            <p className="text-muted-foreground">
                                Personaliza la apariencia del sistema. Los cambios se reflejarán en tiempo real.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <Palette className="h-6 w-6" />
                                        <div>
                                            <CardTitle>Colores del Tema</CardTitle>
                                            <CardDescription>Define la paleta de colores principal de la aplicación.</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="primary-color" className="flex items-center gap-2">
                                            <Palette className="h-4 w-4" />
                                            Color Primario (Botones, Títulos)
                                        </Label>
                                        <div className="flex items-center gap-2">
                                            <Input id="primary-color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
                                            <Input 
                                                type="color" 
                                                value={primaryColor} 
                                                onChange={(e) => setPrimaryColor(e.target.value)}
                                                className="w-10 h-10 p-1 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="accent-color" className="flex items-center gap-2">
                                            <ImageIcon className="h-4 w-4" />
                                            Color de Acento (Énfasis, Hover)
                                        </Label>
                                        <div className="flex items-center gap-2">
                                            <Input id="accent-color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
                                            <Input 
                                                type="color" 
                                                value={accentColor} 
                                                onChange={(e) => setAccentColor(e.target.value)}
                                                className="w-10 h-10 p-1 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="background-color" className="flex items-center gap-2">
                                            <Monitor className="h-4 w-4" />
                                            Color de Fondo
                                        </Label>
                                        <div className="flex items-center gap-2">
                                            <Input id="background-color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
                                            <Input 
                                                type="color" 
                                                value={backgroundColor} 
                                                onChange={(e) => setBackgroundColor(e.target.value)}
                                                className="w-10 h-10 p-1 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <MonitorPlay className="h-6 w-6" />
                                        <div>
                                            <CardTitle>Pantalla de Bienvenida</CardTitle>
                                            <CardDescription>Configura la presentación inicial de la aplicación.</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2">
                                            <Upload className="h-4 w-4" />
                                            Video/Imagen de Fondo
                                        </Label>
                                        <p className="text-sm text-muted-foreground">Sube un archivo PNG, JPG, GIF o MP4.</p>
                                        <Button variant="outline">Cargar Archivo</Button>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="duration" className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            Duración (segundos)
                                        </Label>
                                        <Input id="duration" type="number" defaultValue="5" />
                                    </div>
                                </CardContent>
                            </Card>
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
