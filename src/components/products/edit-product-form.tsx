
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
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

type Product = {
    sku: string;
    name: string;
    unit: string;
    coordinate: string;
};

type EditProductFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  product: Product | null;
};

export function EditProductForm({ isOpen, onOpenChange, product }: EditProductFormProps) {
    const [tieneVigencia, setTieneVigencia] = useState(false);
    const [esParteDeKit, setEsParteDeKit] = useState(false);

    const { register, handleSubmit, reset, setValue } = useForm({
        defaultValues: {
            sku: product?.sku || '',
            name: product?.name || '',
            unit: product?.unit || 'PZA',
            description: '',
            brand: '',
            provider: '',
            resupplyTime: '',
            avgCost: '0',
            listPrice: '0',
            minStock: '0',
            maxStock: '0',
        }
    });

    useEffect(() => {
        if (product) {
            reset({
                sku: product.sku,
                name: product.name,
                unit: product.unit,
            });
        }
    }, [product, reset]);

    const onSubmit = (data: any) => {
        console.log(data);
        onOpenChange(false);
    };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
            <DialogDescription>
                Actualiza los detalles del producto.
            </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
            {/* Columna Izquierda */}
            <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="product-name">Nombre del Producto</Label>
                    <Input id="product-name" {...register('name')} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea id="description" {...register('description')} />
                </div>
                </div>
                <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" {...register('sku')} disabled />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="brand">Marca</Label>
                    <Select onValueChange={(value) => setValue('brand', value)}>
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
                    <Select onValueChange={(value) => setValue('provider', value)}>
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
                        <Select onValueChange={(value) => setValue('unit', value)} defaultValue={product?.unit}>
                        <SelectTrigger id="unit">
                            <SelectValue placeholder="Seleccione una unidad" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="PZA">PZA</SelectItem>
                            <SelectItem value="KIT">KIT</SelectItem>
                            <SelectItem value="SRV">SRV</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="resupply-time">Tiempo para Resurtir (días)</Label>
                        <Input id="resupply-time" type="number" {...register('resupplyTime')} />
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="avg-cost">Costo Promedio</Label>
                        <Input id="avg-cost" type="number" {...register('avgCost')} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="list-price">Precio Lista</Label>
                        <Input id="list-price" type="number" {...register('listPrice')} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="min-stock">Mínimo</Label>
                        <Input id="min-stock" type="number" {...register('minStock')} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="max-stock">Máximo</Label>
                        <Input id="max-stock" type="number" {...register('maxStock')} />
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
            <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Guardar Cambios</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
