
"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Camera, Trash2 } from "lucide-react";
import Image from "next/image";

type EquipmentReceptionFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const initialChecklist = [
    { id: 'pantalla', part: 'Pantalla', checked: false, status: '', observations: '' },
    { id: 'camara_frontal', part: 'Cámara Frontal', checked: false, status: '', observations: '' },
    { id: 'camara_trasera', part: 'Cámara Trasera', checked: false, status: '', observations: '' },
    { id: 'bateria', part: 'Batería', checked: false, status: '', observations: '' },
    { id: 'microfono', part: 'Micrófono', checked: false, status: '', observations: '' },
    { id: 'altavoz', part: 'Altavoz', checked: false, status: '', observations: '' },
    { id: 'puerto_carga', part: 'Puerto de Carga', checked: false, status: '', observations: '' },
    { id: 'botones_volumen', part: 'Botones de Volumen', checked: false, status: '', observations: '' },
    { id: 'boton_encendido', part: 'Boton de Encendido', checked: false, status: '', observations: '' },
];

export function EquipmentReceptionForm({ isOpen, onOpenChange }: EquipmentReceptionFormProps) {
  const [checklist, setChecklist] = useState(initialChecklist);
  const [photos, setPhotos] = useState<string[]>([]);

  const handleChecklistChange = (id: string, field: string, value: any) => {
    setChecklist(prev => 
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    );
  };
  
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newPhotos = Array.from(event.target.files).map(file => URL.createObjectURL(file));
      setPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Recepción de Equipo para Diagnóstico</DialogTitle>
          <DialogDescription>
            Complete los datos del cliente, equipo y realice el checklist de diagnóstico inicial.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 max-h-[70vh] overflow-y-auto pr-4">
          {/* Columna Izquierda: Datos Cliente y Equipo */}
          <div className="space-y-6">
            <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-4">Datos del Cliente</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="client-name">Nombre del Cliente</Label>
                        <Input id="client-name" placeholder="Ej. Juan Pérez" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="client-phone">Teléfono</Label>
                        <Input id="client-phone" type="tel" placeholder="Ej. 55 1234 5678" />
                    </div>
                </div>
            </div>
            <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-4">Datos del Equipo</h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="brand">Marca</Label>
                            <Input id="brand" placeholder="Ej. Apple" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="model">Modelo</Label>
                            <Input id="model" placeholder="Ej. iPhone 14 Pro" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="imei">IMEI / Serie</Label>
                            <Input id="imei" placeholder="Número de serie o IMEI" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="color">Color</Label>
                            <Input id="color" placeholder="Ej. Negro espacial" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="reported-issue">Falla Reportada por el Cliente</Label>
                        <Textarea id="reported-issue" placeholder="Describa el problema que reporta el cliente..." />
                    </div>
                </div>
            </div>
             <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-4">Fotografías del Equipo</h3>
                <div className="grid grid-cols-3 gap-2">
                    {photos.map((photo, index) => (
                        <div key={index} className="relative group">
                            <Image src={photo} alt={`Foto ${index + 1}`} width={100} height={100} className="rounded-md object-cover w-full h-24" />
                            <Button variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removePhoto(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <Label htmlFor="photo-upload" className="w-full">
                        <div className="flex items-center justify-center gap-2 border-2 border-dashed rounded-md p-4 cursor-pointer hover:bg-muted">
                            <Camera className="h-5 w-5" />
                            <span>Agregar Fotos</span>
                        </div>
                        <Input id="photo-upload" type="file" multiple accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    </Label>
                </div>
            </div>
          </div>
          
          {/* Columna Derecha: Checklist */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-4">Checklist de Diagnóstico</h3>
            <div className="overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[50px] text-center">Revisado</TableHead>
                        <TableHead>Parte</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Observaciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {checklist.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="text-center">
                                <Checkbox 
                                    checked={item.checked} 
                                    onCheckedChange={(checked) => handleChecklistChange(item.id, 'checked', checked)}
                                />
                            </TableCell>
                            <TableCell className="font-medium">{item.part}</TableCell>
                            <TableCell>
                                <Select onValueChange={(value) => handleChecklistChange(item.id, 'status', value)} value={item.status}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bueno">Bueno</SelectItem>
                                        <SelectItem value="regular">Regular</SelectItem>
                                        <SelectItem value="malo">Malo</SelectItem>
                                        <SelectItem value="no_aplica">No Aplica</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                            <TableCell>
                            <Input 
                                placeholder="Notas..." 
                                value={item.observations}
                                onChange={(e) => handleChecklistChange(item.id, 'observations', e.target.value)}
                            />
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
            Crear Orden de Servicio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
