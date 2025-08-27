
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

type AddTicketFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddTicketForm({ isOpen, onOpenChange }: AddTicketFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Ticket</DialogTitle>
          <DialogDescription>
            Completa los campos para registrar una nueva solicitud o queja.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
            <div className="space-y-2">
                <Label htmlFor="client">Cliente</Label>
                <Select>
                    <SelectTrigger id="client">
                    <SelectValue placeholder="Seleccione un cliente" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="client1">Carlos Sánchez López</SelectItem>
                    <SelectItem value="client2">Oficina Creativa SA de CV</SelectItem>
                    <SelectItem value="client3">Ana García</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input id="subject" placeholder="Ej. Problema con mi última reparación" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Descripción del Problema</Label>
                <Textarea id="description" placeholder="Proporcione todos los detalles posibles sobre el problema..." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="priority">Prioridad</Label>
                <Select>
                    <SelectTrigger id="priority">
                    <SelectValue placeholder="Seleccione la prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="baja">Baja</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div className="space-y-2">
                <Label htmlFor="department">Asignar a</Label>
                <Select>
                    <SelectTrigger id="department">
                    <SelectValue placeholder="Seleccione un departamento" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="soporte">Soporte Técnico</SelectItem>
                    <SelectItem value="ventas">Ventas</SelectItem>
                    <SelectItem value="admin">Administración</SelectItem>
                    </SelectContent>
                </Select>
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
            Crear Ticket
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
