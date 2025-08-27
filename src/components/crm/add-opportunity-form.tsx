
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type AddOpportunityFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddOpportunityForm({ isOpen, onOpenChange }: AddOpportunityFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Crear Nueva Oportunidad</DialogTitle>
          <DialogDescription>
            Completa los campos para registrar una nueva oportunidad de venta.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="opportunity-name">Nombre de la Oportunidad</Label>
            <Input id="opportunity-name" placeholder="Ej. Renovación de equipos - Cliente X" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
              <Label htmlFor="client">Cliente</Label>
              <Select>
                <SelectTrigger id="client">
                  <SelectValue placeholder="Seleccione un cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client1">Empresa ABC S.A. de C.V.</SelectItem>
                  <SelectItem value="client2">Prospecto Web</SelectItem>
                  <SelectItem value="client3">Distribuidor del Norte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stage">Etapa</Label>
              <Select>
                <SelectTrigger id="stage">
                  <SelectValue placeholder="Seleccione una etapa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="calificacion">Calificación</SelectItem>
                  <SelectItem value="propuesta">Propuesta</SelectItem>
                  <SelectItem value="negociacion">Negociación</SelectItem>
                  <SelectItem value="ganada">Ganada</SelectItem>
                  <SelectItem value="perdida">Perdida</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Valor Estimado</Label>
              <Input id="value" type="number" placeholder="$0.00" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="close-date">Fecha de Cierre Estimada</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal",!Date && "text-muted-foreground")}
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
          <div className="space-y-2">
              <Label htmlFor="assigned-to">Asignado a</Label>
              <Select>
                <SelectTrigger id="assigned-to">
                  <SelectValue placeholder="Seleccione un vendedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user1">Ana García</SelectItem>
                  <SelectItem value="user2">Juan Pérez</SelectItem>
                  <SelectItem value="user3">Luisa Hernández</SelectItem>
                </SelectContent>
              </Select>
            </div>
           <div className="space-y-2">
            <Label htmlFor="notes">Notas (Opcional)</Label>
            <Textarea id="notes" placeholder="Agrega cualquier detalle relevante aquí..." />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
            Guardar Oportunidad
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
