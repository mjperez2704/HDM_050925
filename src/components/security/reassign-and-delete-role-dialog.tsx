
"use client";

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { deleteRole, RoleWithDetails } from '@/actions/roles-actions';
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from 'lucide-react';

type ReassignAndDeleteRoleDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  roleToDelete: RoleWithDetails;
  allRoles: RoleWithDetails[];
  onDeletionCompleted: () => void;
};

export function ReassignAndDeleteRoleDialog({
  isOpen,
  onOpenChange,
  roleToDelete,
  allRoles,
  onDeletionCompleted,
}: ReassignAndDeleteRoleDialogProps) {
  const { toast } = useToast();
  const [newRoleId, setNewRoleId] = useState<number | null>(null);

  const handleConfirm = async () => {
    if (!newRoleId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debe seleccionar un nuevo rol para los usuarios.",
      });
      return;
    }
    
    const result = await deleteRole(roleToDelete.id, newRoleId);
    if (result.success) {
      toast({ title: "Éxito", description: result.message });
      onDeletionCompleted();
    } else {
      toast({ variant: "destructive", title: "Error", description: result.message });
    }
    onOpenChange(false);
  };
  
  const availableRoles = allRoles.filter(role => role.id !== roleToDelete.id);

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" />
            Atención: Usuarios Activos Detectados
          </AlertDialogTitle>
          <AlertDialogDescription>
            El rol <span className="font-bold">"{roleToDelete.name}"</span> tiene <span className="font-bold">{roleToDelete.usersCount}</span> usuario(s) activo(s) asignado(s).
            Para poder eliminar este rol, debe reasignar estos usuarios a un nuevo rol.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4">
            <Label htmlFor="new-role-select">Seleccionar Nuevo Rol</Label>
            <Select onValueChange={(value) => setNewRoleId(Number(value))}>
                <SelectTrigger id="new-role-select">
                    <SelectValue placeholder="Elija un rol de destino..." />
                </SelectTrigger>
                <SelectContent>
                    {availableRoles.map(role => (
                        <SelectItem key={role.id} value={String(role.id)}>{role.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className="bg-destructive hover:bg-destructive/90"
            disabled={!newRoleId}
          >
            Reasignar y Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
