
"use client";

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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const initialChecklist = [
    { id: 'pantalla', part: 'Pantalla', checked: true, status: 'Malo', observations: 'Cristal estrellado' },
    { id: 'camara_frontal', part: 'Cámara Frontal', checked: true, status: 'Bueno', observations: '' },
    { id: 'camara_trasera', part: 'Cámara Trasera', checked: true, status: 'Bueno', observations: '' },
    { id: 'bateria', part: 'Batería', checked: true, status: 'Regular', observations: 'Retiene poca carga' },
    { id: 'microfono', part: 'Micrófono', checked: true, status: 'Bueno', observations: '' },
    { id: 'altavoz', part: 'Altavoz', checked: true, status: 'Bueno', observations: '' },
    { id: 'puerto_carga', part: 'Puerto de Carga', checked: true, status: 'Bueno', observations: '' },
];

type RepairOrder = {
  folio: string;
  client: string;
  equipment: string;
  reportedIssue: string;
  assignedTechnician: string;
  status: string;
};

type RepairDetailsModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  repairOrder: RepairOrder | null;
};

export function RepairDetailsModal({ isOpen, onOpenChange, repairOrder }: RepairDetailsModalProps) {
  if (!repairOrder) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Detalle de Orden de Servicio</DialogTitle>
          <DialogDescription>
            Folio: <span className="font-semibold text-primary">{repairOrder.folio}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[70vh] overflow-y-auto pr-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-semibold mb-2">Información del Cliente y Equipo</h3>
                    <div className="space-y-2 text-sm">
                        <p><span className="font-medium text-muted-foreground">Cliente:</span> {repairOrder.client}</p>
                        <p><span className="font-medium text-muted-foreground">Equipo:</span> {repairOrder.equipment}</p>
                        <p><span className="font-medium text-muted-foreground">Técnico:</span> {repairOrder.assignedTechnician}</p>
                    </div>
                </div>
                 <div>
                    <h3 className="font-semibold mb-2">Estado y Falla Reportada</h3>
                    <div className="space-y-2 text-sm">
                       <p className="flex items-center gap-2">
                            <span className="font-medium text-muted-foreground">Estado:</span> <Badge variant="secondary">{repairOrder.status}</Badge>
                        </p>
                        <p><span className="font-medium text-muted-foreground">Falla Reportada:</span> {repairOrder.reportedIssue}</p>
                    </div>
                </div>
            </div>
            <Separator />
             <div>
                <h3 className="font-semibold mb-4">Checklist de Diagnóstico Inicial</h3>
                <div className="space-y-3">
                    {initialChecklist.map(item => (
                        <div key={item.id} className="p-3 border rounded-md">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">{item.part}</span>
                                <Badge variant={item.status === 'Bueno' ? 'default' : 'destructive'}>{item.status}</Badge>
                            </div>
                            {item.observations && (
                                <p className="text-xs text-muted-foreground mt-1">Obs: {item.observations}</p>
                            )}
                        </div>
                    ))}
                </div>
             </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
