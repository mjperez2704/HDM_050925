
"use client";

import { useState } from 'react';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Upload, GripVertical } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const documentFields: { [key: string]: { label: string; field: string }[] } = {
  'ticket-venta': [
    { label: 'Folio de Venta', field: 'folio_venta' },
    { label: 'Fecha', field: 'fecha' },
    { label: 'Cliente', field: 'cliente_nombre' },
    { label: 'Total', field: 'total' },
    { label: 'Subtotal', field: 'subtotal' },
    { label: 'IVA', field: 'iva' },
    { label: 'Detalle de Productos', field: 'productos_detalle' },
  ],
  'orden-reparacion': [
    { label: 'Folio de Orden', field: 'folio_os' },
    { label: 'Cliente', field: 'cliente_nombre' },
    { label: 'Equipo', field: 'equipo_modelo' },
    { label: 'Falla Reportada', field: 'falla_reportada' },
    { label: 'Técnico Asignado', field: 'tecnico_nombre' },
    { label: 'Fecha de Recepción', field: 'fecha_recepcion' },
  ],
  'orden-compra': [
    { label: 'Folio de Compra', field: 'folio_oc' },
    { label: 'Proveedor', field: 'proveedor_nombre' },
    { label: 'Fecha de Emisión', field: 'fecha_emision' },
    { label: 'Fecha de Entrega', field: 'fecha_entrega' },
    { label: 'Total a Pagar', field: 'total' },
  ],
};

export default function FormatsPage() {
  const [selectedDocument, setSelectedDocument] = useState<string>('ticket-venta');
  const [paperSize, setPaperSize] = useState<string>('carta');
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [footerImage, setFooterImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setImage: (url: string | null) => void) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setImage(fileUrl);
    }
  };

  const getPaperSizeClass = () => {
    switch (paperSize) {
      case 'carta': return 'w-full h-[600px]';
      case 'oficio': return 'w-full h-[700px]';
      case 'recibo': return 'w-full h-[400px]';
      case 'ticket-80mm': return 'w-[280px] h-[500px]';
      case 'ticket-58mm': return 'w-[210px] h-[500px]';
      default: return 'w-full h-[600px]';
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <CustomSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Editor de Formatos de Documento</h1>
              <p className="text-muted-foreground">
                Personaliza la apariencia de tus documentos impresos.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Columna de Controles */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración del Formato</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>1. Selecciona el Tipo de Documento</Label>
                      <Select value={selectedDocument} onValueChange={setSelectedDocument}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un documento..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ticket-venta">Ticket de Venta</SelectItem>
                          <SelectItem value="orden-reparacion">Orden de Reparación</SelectItem>
                          <SelectItem value="orden-compra">Orden de Compra</SelectItem>
                          <SelectItem value="cotizacion">Cotización</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                     <div className="space-y-2">
                      <Label>2. Selecciona el Tamaño de Papel</Label>
                      <Select value={paperSize} onValueChange={setPaperSize}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tamaño..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="carta">Hoja Tamaño CARTA</SelectItem>
                          <SelectItem value="oficio">Hoja Tamaño OFICIO</SelectItem>
                          <SelectItem value="recibo">Recibo (Media Carta)</SelectItem>
                          <SelectItem value="ticket-80mm">Ticket de Venta (80mm)</SelectItem>
                          <SelectItem value="ticket-58mm">Ticket de Venta (58mm)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Campos Disponibles</CardTitle>
                    <CardDescription>Arrastra los campos a la previsualización.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 max-h-60 overflow-y-auto">
                    {documentFields[selectedDocument]?.map(field => (
                      <div key={field.field} className="flex items-center p-2 rounded-md bg-muted cursor-grab active:cursor-grabbing">
                        <GripVertical className="h-5 w-5 text-muted-foreground mr-2" />
                        <span className="text-sm">{field.label}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Rotulación (Branding)</CardTitle>
                    <CardDescription>Sube las imágenes para tu formato.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="header-upload">Imagen de Encabezado</Label>
                      <Button asChild variant="outline" className="w-full">
                        <label className="cursor-pointer">
                          <Upload className="mr-2 h-4 w-4" />
                          Cargar Encabezado
                          <input id="header-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setHeaderImage)} />
                        </label>
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="footer-upload">Imagen de Pie de Página</Label>
                      <Button asChild variant="outline" className="w-full">
                         <label className="cursor-pointer">
                          <Upload className="mr-2 h-4 w-4" />
                          Cargar Pie de Página
                          <input id="footer-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setFooterImage)} />
                         </label>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Columna de Previsualización */}
              <div className="lg:col-span-2">
                 <Card className="sticky top-20">
                    <CardHeader>
                        <CardTitle>Previsualización</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center p-4 bg-muted/50">
                        <div className={cn("bg-white shadow-lg p-4 transition-all duration-300 ease-in-out", getPaperSizeClass())}>
                            <div className="h-full border-2 border-dashed border-gray-300 rounded-md flex flex-col">
                                <header className="p-2 border-b-2 border-dashed border-gray-300 min-h-[80px] flex items-center justify-center">
                                    {headerImage ? (
                                        <Image src={headerImage} alt="Header" width={200} height={50} className="object-contain" />
                                    ) : (
                                        <span className="text-xs text-muted-foreground">Área del Encabezado</span>
                                    )}
                                </header>
                                <main className="flex-1 p-4 flex items-center justify-center">
                                    <div className="text-center text-muted-foreground">
                                        <p>Arrastra y suelta los campos aquí</p>
                                        <p className="text-xs mt-2">(Cuerpo del Documento)</p>
                                    </div>
                                </main>
                                <footer className="p-2 border-t-2 border-dashed border-gray-300 min-h-[50px] flex items-center justify-center">
                                     {footerImage ? (
                                        <Image src={footerImage} alt="Footer" width={200} height={30} className="object-contain" />
                                    ) : (
                                        <span className="text-xs text-muted-foreground">Área del Pie de Página</span>
                                    )}
                                </footer>
                            </div>
                        </div>
                    </CardContent>
                 </Card>
              </div>
            </div>
             <div className="flex justify-end mt-8">
                <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Guardar Formato</Button>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
