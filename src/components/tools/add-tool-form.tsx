
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

type AddToolFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddToolForm({ isOpen, onOpenChange }: AddToolFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Agregar Nueva Herramienta</DialogTitle>
          <DialogDescription>
            Completa los campos para registrar una nueva herramienta en el sistema.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tool-code">Código / SKU</Label>
              <Input id="tool-code" placeholder="Ej. HER-004" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="tool-name">Nombre de la Herramienta</Label>
              <Input id="tool-name" placeholder="Ej. Pinzas antiestáticas" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tool-description">Descripción (Opcional)</Label>
            <Textarea id="tool-description" placeholder="Agrega detalles como marca, modelo, etc." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
              <Label htmlFor="tool-status">Estado Inicial</Label>
              <Select defaultValue="Disponible">
                <SelectTrigger id="tool-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Disponible">Disponible</SelectItem>
                  <SelectItem value="En Mantenimiento">En Mantenimiento</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="tool-location">Ubicación</Label>
                <Input id="tool-location" placeholder="Ej. Taller" />
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
            Guardar Herramienta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
