
"use client";

import { Sidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export default function PoliciesPage() {
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
                        <h1 className="text-3xl font-bold">Políticas y Reglamentos</h1>
                        <p className="text-muted-foreground">
                            Define las políticas y reglamentos internos de la empresa.
                        </p>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Editor de Políticas</CardTitle>
                            <CardDescription>
                                Utiliza el siguiente editor para redactar y dar formato a las políticas de la empresa. El contenido se guardará y será visible para los empleados correspondientes.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-md p-2 mb-4">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Select defaultValue="arial">
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="Font" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="arial">Sans-serif (Arial)</SelectItem>
                                            <SelectItem value="times">Serif (Times New Roman)</SelectItem>
                                            <SelectItem value="mono">Mono (Courier New)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select defaultValue="14">
                                        <SelectTrigger className="w-[80px]">
                                            <SelectValue placeholder="Size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="12">12</SelectItem>
                                            <SelectItem value="14">14</SelectItem>
                                            <SelectItem value="16">16</SelectItem>
                                            <SelectItem value="18">18</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div className="flex items-center gap-1">
                                        <Button variant="outline" size="icon"><Bold className="h-4 w-4" /></Button>
                                        <Button variant="outline" size="icon"><Italic className="h-4 w-4" /></Button>
                                        <Button variant="outline" size="icon"><Underline className="h-4 w-4" /></Button>
                                    </div>
                                     <div className="flex items-center gap-1">
                                        <Button variant="outline" size="icon"><AlignLeft className="h-4 w-4" /></Button>
                                        <Button variant="outline" size="icon"><AlignCenter className="h-4 w-4" /></Button>
                                        <Button variant="outline" size="icon"><AlignRight className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            </div>
                            <Textarea 
                                placeholder="Escribe aquí las políticas y reglamentos..."
                                className="min-h-[400px] text-base"
                            />
                        </CardContent>
                    </Card>
                    <div className="flex justify-start mt-8">
                        <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Guardar Cambios</Button>
                    </div>
                </main>
            </div>
        </div>
    );
}
