
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type AddSupplierFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddSupplierForm({ isOpen, onOpenChange }: AddSupplierFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Proveedor</DialogTitle>
          <DialogDescription>
            Completa los campos para registrar un nuevo proveedor.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="supplier-name">Razón Social</Label>
            <Input id="supplier-name" placeholder="Ej. Partes Express S.A. de C.V." className="border-destructive focus:border-destructive ring-offset-background focus-visible:ring-destructive" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplier-rfc">RFC</Label>
              <Input id="supplier-rfc" placeholder="Registro Federal de Contribuyentes" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="credit-days">Días de Crédito</Label>
              <Input id="credit-days" type="number" defaultValue="0" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplier-type">Tipo de Proveedor</Label>
              <Select>
                <SelectTrigger id="supplier-type">
                  <SelectValue placeholder="Productos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="productos">Productos</SelectItem>
                  <SelectItem value="servicios">Servicios</SelectItem>
                  <SelectItem value="mixto">Mixto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier-origin">Origen</Label>
              <Select>
                <SelectTrigger id="supplier-origin">
                  <SelectValue placeholder="Nacional" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nacional">Nacional</SelectItem>
                  <SelectItem value="internacional">Internacional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-person">Persona de Contacto</Label>
            <Input id="contact-person" placeholder="Ej. Juan Pérez" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplier-email">Email</Label>
              <Input id="supplier-email" type="email" placeholder="contacto@proveedor.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier-phone">Teléfono</Label>
              <Input id="supplier-phone" type="tel" placeholder="Ej. 55 1234 5678" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="supplier-address">Dirección</Label>
            <Textarea id="supplier-address" placeholder="Calle, número, colonia, ciudad, etc." />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
            Crear Proveedor
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
