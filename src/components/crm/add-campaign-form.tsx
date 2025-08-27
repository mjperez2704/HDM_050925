
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

type AddCampaignFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddCampaignForm({ isOpen, onOpenChange }: AddCampaignFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Crear Nueva Campaña</DialogTitle>
          <DialogDescription>
            Completa los campos para configurar una nueva campaña de marketing.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="campaign-name">Nombre de la Campaña</Label>
            <Input id="campaign-name" placeholder="Ej. Promoción de Verano" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-type">Tipo de Campaña</Label>
              <Select>
                <SelectTrigger id="campaign-type">
                  <SelectValue placeholder="Seleccione un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email Marketing</SelectItem>
                  <SelectItem value="social">Redes Sociales</SelectItem>
                  <SelectItem value="google">Anuncios Google</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign-status">Estado</Label>
              <Select>
                <SelectTrigger id="campaign-status">
                  <SelectValue placeholder="Seleccione un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planificada">Planificada</SelectItem>
                  <SelectItem value="activa">Activa</SelectItem>
                  <SelectItem value="pausada">Pausada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Fecha de Inicio</Label>
              <Popover>
                  <PopoverTrigger asChild>
                      <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal",!Date && "text-muted-foreground")}>
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
              <Label htmlFor="end-date">Fecha de Fin</Label>
              <Popover>
                  <PopoverTrigger asChild>
                      <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal",!Date && "text-muted-foreground")}>
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
              <Label htmlFor="budget">Presupuesto</Label>
              <Input id="budget" type="number" placeholder="$0.00" />
            </div>
           <div className="space-y-2">
            <Label htmlFor="objective">Objetivo (Opcional)</Label>
            <Textarea id="objective" placeholder="Describe el objetivo principal de la campaña..." />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
            Guardar Campaña
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
