
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
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

type AddProductFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddProductForm({ isOpen, onOpenChange }: AddProductFormProps) {
  const [tieneVigencia, setTieneVigencia] = useState(false);
  const [esParteDeKit, setEsParteDeKit] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Producto</DialogTitle>
          <DialogDescription>
            Complete los campos para registrar un nuevo producto en el catálogo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
          {/* Columna Izquierda */}
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Nombre del Producto</Label>
                <Input id="product-name" placeholder="Ej. Pantalla iPhone 15" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" placeholder="Descripción detallada del producto" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" placeholder="SKU-AUTO-12345" />
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox id="generate-sku" defaultChecked />
                <Label htmlFor="generate-sku" className="text-sm font-normal">
                  Generar automáticamente
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                <Label htmlFor="brand">Marca</Label>
                <Select>
                  <SelectTrigger id="brand">
                    <SelectValue placeholder="Seleccione una marca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="samsung">Samsung</SelectItem>
                    <SelectItem value="huawei">Huawei</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="provider">Proveedor</Label>
                <Select>
                  <SelectTrigger id="provider">
                    <SelectValue placeholder="Seleccione un proveedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prov1">Proveedor 1</SelectItem>
                    <SelectItem value="prov2">Proveedor 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="unit">Unidad</Label>
                    <Select>
                    <SelectTrigger id="unit">
                        <SelectValue placeholder="Seleccione una unidad" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pza">PZA</SelectItem>
                        <SelectItem value="kit">KIT</SelectItem>
                        <SelectItem value="srv">SRV</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="resupply-time">Tiempo para Resurtir (días)</Label>
                    <Input id="resupply-time" type="number" placeholder="Ej. 15" />
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="avg-cost">Costo Promedio</Label>
                    <Input id="avg-cost" type="number" defaultValue="0" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="list-price">Precio Lista</Label>
                    <Input id="list-price" type="number" defaultValue="0" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="min-stock">Mínimo</Label>
                    <Input id="min-stock" type="number" defaultValue="0" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="max-stock">Máximo</Label>
                    <Input id="max-stock" type="number" defaultValue="0" />
                </div>
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="inventoriable">Inventariable</Label>
              <Switch id="inventoriable" defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="blocked">Bloqueado (Inactivo)</Label>
              <Switch id="blocked" />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="has-expiry">Tiene Vigencia</Label>
              <Switch id="has-expiry" checked={tieneVigencia} onCheckedChange={setTieneVigencia} />
            </div>
            {tieneVigencia && (
                <div className="space-y-2 rounded-lg border p-3">
                    <Label htmlFor="expiry-days">Días de Vigencia</Label>
                    <Input id="expiry-days" type="number" defaultValue="1" />
                </div>
            )}
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="is-kit-part">Es Parte de un Kit</Label>
              <Switch id="is-kit-part" checked={esParteDeKit} onCheckedChange={setEsParteDeKit} />
            </div>
            {esParteDeKit && (
                 <div className="space-y-2 rounded-lg border p-3">
                    <Label htmlFor="kit-sku">Clave del Kit</Label>
                    <Input id="kit-sku" placeholder="SKU del producto kit" />
                </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Guardar Producto</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
