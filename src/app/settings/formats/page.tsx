
"use client";

import { useState } from 'react';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Upload, GripVertical, ZoomIn, ZoomOut, PlusCircle, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const dbTables: { [key: string]: { label: string; fields: { label: string; field: string }[] } } = {
  'ventas': {
    label: 'Ventas (Tickets, Facturas)',
    fields: [
      { label: 'Folio de Venta', field: 'folio_venta' },
      { label: 'Fecha', field: 'fecha' },
      { label: 'Cliente', field: 'cliente_nombre' },
      { label: 'Total', field: 'total' },
      { label: 'Subtotal', field: 'subtotal' },
      { label: 'IVA', field: 'iva' },
      { label: 'Detalle de Productos', field: 'productos_detalle' },
    ]
  },
  'reparaciones': {
    label: 'Órdenes de Reparación',
    fields: [
      { label: 'Folio de Orden', field: 'folio_os' },
      { label: 'Cliente', field: 'cliente_nombre' },
      { label: 'Equipo', field: 'equipo_modelo' },
      { label: 'Falla Reportada', field: 'falla_reportada' },
      { label: 'Técnico Asignado', field: 'tecnico_nombre' },
      { label: 'Fecha de Recepción', field: 'fecha_recepcion' },
    ]
  },
  'compras': {
    label: 'Órdenes de Compra',
    fields: [
      { label: 'Folio de Compra', field: 'folio_oc' },
      { label: 'Proveedor', field: 'proveedor_nombre' },
      { label: 'Fecha de Emisión', field: 'fecha_emision' },
      { label: 'Fecha de Entrega', field: 'fecha_entrega' },
      { label: 'Total a Pagar', field: 'total' },
    ]
  }
};

export default function FormatsPage() {
  const [selectedDocument, setSelectedDocument] = useState<string>('ticket-venta');
  const [selectedTable, setSelectedTable] = useState<string>('ventas');
  const [paperSize, setPaperSize] = useState<string>('carta');
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [bodyImage, setBodyImage] = useState<string | null>(null);
  const [footerImage, setFooterImage] = useState<string | null>(null);

  const [headerWatermark, setHeaderWatermark] = useState(false);
  const [bodyWatermark, setBodyWatermark] = useState(false);
  const [footerWatermark, setFooterWatermark] = useState(false);

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
                        <div className="flex items-center gap-2">
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
                            <Button variant="outline" size="icon"><PlusCircle className="h-4 w-4" /></Button>
                        </div>
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
                    <CardDescription>Selecciona una tabla y arrastra sus campos.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="space-y-2">
                      <Label>Tabla de la Base de Datos</Label>
                      <Select value={selectedTable} onValueChange={setSelectedTable}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una tabla..." />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(dbTables).map(([key, value]) => (
                            <SelectItem key={key} value={key}>{value.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                        {dbTables[selectedTable]?.fields.map(field => (
                        <div key={field.field} className="flex items-center p-2 rounded-md bg-muted cursor-grab active:cursor-grabbing">
                            <GripVertical className="h-5 w-5 text-muted-foreground mr-2" />
                            <span className="text-sm">{field.label}</span>
                        </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Rotulación (Branding)</CardTitle>
                    <CardDescription>Sube las imágenes para tu formato.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 border p-3 rounded-md">
                      <Label htmlFor="header-upload">Encabezado</Label>
                      <Button asChild variant="outline" className="w-full">
                        <label className="cursor-pointer">
                          <Upload className="mr-2 h-4 w-4" />
                          Cargar Imagen
                          <input id="header-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setHeaderImage)} />
                        </label>
                      </Button>
                      <div className="flex items-center space-x-2 pt-2">
                        <Switch id="header-watermark" checked={headerWatermark} onCheckedChange={setHeaderWatermark} />
                        <Label htmlFor="header-watermark">Aplicar Marca de Agua</Label>
                      </div>
                    </div>
                    <div className="space-y-2 border p-3 rounded-md">
                      <Label htmlFor="body-upload">Cuerpo del Documento</Label>
                      <Button asChild variant="outline" className="w-full">
                         <label className="cursor-pointer">
                          <Upload className="mr-2 h-4 w-4" />
                          Cargar Imagen de Fondo
                          <input id="body-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setBodyImage)} />
                         </label>
                      </Button>
                       <div className="flex items-center space-x-2 pt-2">
                        <Switch id="body-watermark" checked={bodyWatermark} onCheckedChange={setBodyWatermark} />
                        <Label htmlFor="body-watermark">Aplicar Marca de Agua</Label>
                      </div>
                    </div>
                    <div className="space-y-2 border p-3 rounded-md">
                      <Label htmlFor="footer-upload">Pie de Página</Label>
                      <Button asChild variant="outline" className="w-full">
                         <label className="cursor-pointer">
                          <Upload className="mr-2 h-4 w-4" />
                          Cargar Imagen
                          <input id="footer-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setFooterImage)} />
                         </label>
                      </Button>
                      <div className="flex items-center space-x-2 pt-2">
                        <Switch id="footer-watermark" checked={footerWatermark} onCheckedChange={setFooterWatermark} />
                        <Label htmlFor="footer-watermark">Aplicar Marca de Agua</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Columna de Previsualización */}
              <div className="lg:col-span-2">
                 <Card className="sticky top-20">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Previsualización</CardTitle>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" onClick={() => setZoomLevel(prev => prev - 0.1)}>
                                    <ZoomOut className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" onClick={() => setZoomLevel(prev => prev + 0.1)}>
                                    <ZoomIn className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="border rounded-md p-2 mt-4">
                            <div className="flex items-center gap-2 flex-wrap">
                                <Select defaultValue="arial">
                                    <SelectTrigger className="w-[150px] h-8"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="arial">Sans-serif (Arial)</SelectItem>
                                        <SelectItem value="times">Serif (Times New Roman)</SelectItem>
                                        <SelectItem value="mono">Mono (Courier New)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select defaultValue="14">
                                    <SelectTrigger className="w-[80px] h-8"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="12">12</SelectItem>
                                        <SelectItem value="14">14</SelectItem>
                                        <SelectItem value="16">16</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="flex items-center gap-1">
                                    <Button variant="outline" size="icon" className="h-8 w-8"><Bold className="h-4 w-4" /></Button>
                                    <Button variant="outline" size="icon" className="h-8 w-8"><Italic className="h-4 w-4" /></Button>
                                    <Button variant="outline" size="icon" className="h-8 w-8"><Underline className="h-4 w-4" /></Button>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button variant="outline" size="icon" className="h-8 w-8"><AlignLeft className="h-4 w-4" /></Button>
                                    <Button variant="outline" size="icon" className="h-8 w-8"><AlignCenter className="h-4 w-4" /></Button>
                                    <Button variant="outline" size="icon" className="h-8 w-8"><AlignRight className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center p-4 bg-muted/50 overflow-auto">
                        <div 
                            className={cn("bg-white shadow-lg p-4 transition-all duration-300 ease-in-out origin-top-left", getPaperSizeClass())}
                            style={{ transform: `scale(${zoomLevel})` }}
                        >
                            <div className="h-full border-2 border-dashed border-gray-300 rounded-md flex flex-col relative">
                                <header className="p-2 border-b-2 border-dashed border-gray-300 min-h-[80px] flex items-center justify-center relative">
                                    {headerImage && (
                                        <Image src={headerImage} alt="Header" layout="fill" className={cn("object-contain", headerWatermark && "opacity-20")} />
                                    )}
                                    <span className="text-xs text-muted-foreground z-10">Área del Encabezado</span>
                                </header>
                                <main className="flex-1 p-4 flex items-center justify-center relative">
                                     {bodyImage && (
                                        <Image src={bodyImage} alt="Body background" layout="fill" className={cn("object-cover", bodyWatermark && "opacity-20")} />
                                    )}
                                    <div className="text-center text-muted-foreground z-10">
                                        <p>Arrastra y suelta los campos aquí</p>
                                        <p className="text-xs mt-2">(Cuerpo del Documento)</p>
                                    </div>
                                </main>
                                <footer className="p-2 border-t-2 border-dashed border-gray-300 min-h-[50px] flex items-center justify-center relative">
                                     {footerImage && (
                                        <Image src={footerImage} alt="Footer" layout="fill" className={cn("object-contain", footerWatermark && "opacity-20")} />
                                    )}
                                    <span className="text-xs text-muted-foreground z-10">Área del Pie de Página</span>
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
