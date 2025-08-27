
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

type AddExpenseFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddExpenseForm({ isOpen, onOpenChange }: AddExpenseFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Gasto</DialogTitle>
          <DialogDescription>
            Completa los campos para registrar un nuevo gasto en el sistema.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="expense-description">Descripción</Label>
            <Input id="expense-description" placeholder="Ej. Pago de servicio de Internet" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expense-category">Categoría</Label>
              <Select>
                <SelectTrigger id="expense-category">
                  <SelectValue placeholder="Seleccione una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="servicios">Servicios</SelectItem>
                  <SelectItem value="renta">Renta</SelectItem>
                  <SelectItem value="nomina">Nómina</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="otros">Otros</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
              <Label htmlFor="expense-amount">Monto</Label>
              <Input id="expense-amount" type="number" placeholder="$0.00" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="expense-date">Fecha del Gasto</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !Date && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(new Date(), "PPP")}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                        mode="single"
                        initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expense-status">Estado del Gasto</Label>
              <Select>
                <SelectTrigger id="expense-status">
                  <SelectValue placeholder="Seleccione un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pagado">Pagado</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
           <div className="space-y-2">
            <Label htmlFor="expense-notes">Notas Adicionales (Opcional)</Label>
            <Textarea id="expense-notes" placeholder="Agrega cualquier detalle relevante aquí..." />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
            Guardar Gasto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
