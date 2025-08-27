
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type AddLogEntryFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddLogEntryForm({ isOpen, onOpenChange }: AddLogEntryFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Registro a Bitácora</DialogTitle>
          <DialogDescription>
            Añade un nuevo evento manualmente a la bitácora del sistema.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="log-user">Usuario</Label>
            <Select>
                <SelectTrigger id="log-user">
                    <SelectValue placeholder="Selecciona un usuario" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="tecnico1">Técnico 1</SelectItem>
                </SelectContent>
            </Select>
          </div>
           <div className="space-y-2">
            <Label htmlFor="log-action">Acción</Label>
            <Select>
                <SelectTrigger id="log-action">
                    <SelectValue placeholder="Selecciona una acción" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="create">Creación</SelectItem>
                    <SelectItem value="update">Actualización</SelectItem>
                    <SelectItem value="delete">Eliminación</SelectItem>
                    <SelectItem value="info">Informativo</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="log-description">Descripción</Label>
            <Textarea id="log-description" placeholder="Describe el evento..." />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Guardar Registro</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
