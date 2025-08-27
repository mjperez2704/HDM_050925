
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, PlusCircle, Trash2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type AddPurchaseOrderFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

type ProductLine = {
  id: number;
  sku: string;
  quantity: number;
  cost: number;
};

export function AddPurchaseOrderForm({ isOpen, onOpenChange }: AddPurchaseOrderFormProps) {
  const [productLines, setProductLines] = useState<ProductLine[]>([
    { id: 1, sku: '', quantity: 1, cost: 0 },
  ]);

  const addProductLine = () => {
    setProductLines(prev => [...prev, { id: Date.now(), sku: '', quantity: 1, cost: 0 }]);
  };

  const removeProductLine = (id: number) => {
    setProductLines(prev => prev.filter(line => line.id !== id));
  };
  
  const total = productLines.reduce((sum, line) => sum + line.quantity * line.cost, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Crear Nueva Orden de Compra</DialogTitle>
          <DialogDescription>
            Completa los datos para generar una nueva orden de compra.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="provider">Proveedor</Label>
                    <Select>
                        <SelectTrigger id="provider">
                        <SelectValue placeholder="Seleccione un proveedor" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="prov1">Refacciones Móviles del Centro S.A.</SelectItem>
                        <SelectItem value="prov2">Accesorios Tech de México</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="emission-date">Fecha de Emisión</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn("w-full justify-start text-left font-normal", !Date && "text-muted-foreground")}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(new Date(), "PPP")}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" initialFocus />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="delivery-date">Fecha de Entrega Estimada</Label>
                     <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn("w-full justify-start text-left font-normal", !Date && "text-muted-foreground")}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(new Date(), "PPP")}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" initialFocus />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            
            <div className="mt-4">
                <h3 className="font-semibold mb-2">Detalle de Productos</h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40%]">Producto (SKU)</TableHead>
                            <TableHead>Cantidad</TableHead>
                            <TableHead>Costo Unitario</TableHead>
                            <TableHead>Subtotal</TableHead>
                            <TableHead><span className="sr-only">Quitar</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productLines.map((line, index) => (
                            <TableRow key={line.id}>
                                <TableCell>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione un SKU" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="par-ip15-pan">PAR-IP15-PAN - Pantalla iPhone 15</SelectItem>
                                            <SelectItem value="acc-cab-usbc">ACC-CAB-USBC - Cable USB-C 1m</SelectItem>
                                            <SelectItem value="equ-sam-s24">EQU-SAM-S24 - Samsung Galaxy S24</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Input type="number" defaultValue={line.quantity} className="w-24" />
                                </TableCell>
                                <TableCell>
                                    <Input type="number" defaultValue={line.cost} className="w-28" />
                                </TableCell>
                                <TableCell className="font-medium">
                                    ${(line.quantity * line.cost).toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon" onClick={() => removeProductLine(line.id)} disabled={productLines.length <= 1}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button variant="outline" size="sm" className="mt-4" onClick={addProductLine}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Agregar Producto
                </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-2">
                    <Label htmlFor="notes">Notas / Observaciones</Label>
                    <Textarea id="notes" placeholder="Agrega cualquier instrucción especial o nota para el proveedor..." />
                </div>
                <div className="flex flex-col items-end">
                    <div className="w-full max-w-sm space-y-2">
                         <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>IVA (16%):</span>
                            <span>${(total * 0.16).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                            <span>Total:</span>
                            <span>${(total * 1.16).toFixed(2)}</span>
                        </div>
                    </div>
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
            Crear Orden
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
