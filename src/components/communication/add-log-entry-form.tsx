
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
import { Input } from "@/components/ui/input";

type AddLogEntryFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddLogEntryForm({ isOpen, onOpenChange }: AddLogEntryFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Agregar Registro a Bitácora</DialogTitle>
          <DialogDescription>
            Añade un nuevo evento manualmente a la bitácora del sistema.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
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
                      <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="log-module">Módulo Afectado</Label>
            <Select>
                <SelectTrigger id="log-module">
                    <SelectValue placeholder="Selecciona un módulo" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="usuarios">Usuarios</SelectItem>
                    <SelectItem value="roles">Roles y Permisos</SelectItem>
                    <SelectItem value="productos">Productos</SelectItem>
                    <SelectItem value="marcas_modelos">Marcas y Modelos</SelectItem>
                    <SelectItem value="herramientas">Herramientas</SelectItem>
                    <SelectItem value="clientes">Clientes</SelectItem>
                    <SelectItem value="proveedores">Proveedores</SelectItem>
                    <SelectItem value="ventas_presupuestos">Ventas y Presupuestos</SelectItem>
                    <SelectItem value="compras">Compras</SelectItem>
                    <SelectItem value="reparaciones">Reparaciones</SelectItem>
                    <SelectItem value="inventario_general">Inventario General</SelectItem>
                    <SelectItem value="gestion_almacen">Gestión de Almacén</SelectItem>
                    <SelectItem value="traslados">Traslados</SelectItem>
                    <SelectItem value="ajustes">Ajustes</SelectItem>
                    <SelectItem value="empleados">Empleados</SelectItem>
                    <SelectItem value="vendedores">Vendedores</SelectItem>
                    <SelectItem value="facturacion">Facturación</SelectItem>
                    <SelectItem value="gastos">Gastos</SelectItem>
                    <SelectItem value="cuentas_cobrar">Cuentas por Cobrar</SelectItem>
                    <SelectItem value="cuentas_pagar">Cuentas por Pagar</SelectItem>
                    <SelectItem value="oportunidades">Oportunidades</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="soporte_quejas">Soporte y Quejas</SelectItem>
                    <SelectItem value="reportes_predeterminados">Reportes Predeterminados</SelectItem>
                    <SelectItem value="reportes_personalizados">Reportes Personalizados</SelectItem>
                    <SelectItem value="bitacora">Bitácora</SelectItem>
                    <SelectItem value="solicitudes">Solicitudes</SelectItem>
                    <SelectItem value="chat_interno">Chat Interno</SelectItem>
                    <SelectItem value="apariencia">Apariencia</SelectItem>
                    <SelectItem value="datos_empresa">Datos Empresa</SelectItem>
                    <SelectItem value="base_de_datos">Base de Datos</SelectItem>
                    <SelectItem value="aviso_privacidad">Aviso de Privacidad</SelectItem>
                    <SelectItem value="politicas_reglamentos">Políticas y Reglamentos</SelectItem>
                    <SelectItem value="reglas_negocio">Reglas de Negocio</SelectItem>
                    <SelectItem value="formatos">Formatos</SelectItem>
                    <SelectItem value="manuales">Manuales</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="identifier-type">Tipo de Identificador</Label>
              <Select>
                <SelectTrigger id="identifier-type">
                  <SelectValue placeholder="Seleccione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">ID</SelectItem>
                  <SelectItem value="sku">SKU</SelectItem>
                  <SelectItem value="folio">Folio</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="identifier-value">Valor</Label>
              <Input id="identifier-value" placeholder="Valor del identificador" />
            </div>
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
