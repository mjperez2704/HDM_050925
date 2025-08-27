
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

type AddClientFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddClientForm({ isOpen, onOpenChange }: AddClientFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Cliente</DialogTitle>
          <DialogDescription>
            Completa los campos para registrar un nuevo cliente.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="client-name">Nombre / Razón Social</Label>
            <Input id="client-name" placeholder="Ej. Juan Pérez" className="border-destructive focus:border-destructive ring-offset-background focus-visible:ring-destructive" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client-type">Tipo de Cliente</Label>
            <Select>
              <SelectTrigger id="client-type">
                <SelectValue placeholder="Cliente Final" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="final">Cliente Final</SelectItem>
                <SelectItem value="distribuidor">Distribuidor</SelectItem>
                <SelectItem value="empresa">Empresa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client-email">Email</Label>
              <Input id="client-email" type="email" placeholder="contacto@ejemplo.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-phone">Teléfono</Label>
              <Input id="client-phone" type="tel" placeholder="Ej. 55 1234 5678" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="client-rfc">RFC (Opcional)</Label>
            <Input id="client-rfc" placeholder="Registro Federal de Contribuyentes" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
            Crear Cliente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
