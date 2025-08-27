
"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import {
  LineChart,
  FileText,
  FileCog,
  MessagesSquare,
  Book,
  MessageSquare,
  Settings,
  Palette,
  Building2,
  Database,
  FileLock,
  Hammer,
  Clipboard,
  BookUser,
  Warehouse,
  Box,
  Home,
  ArrowRightLeft,
  Landmark,
  Users,
  Calculator,
  FileDown,
  FileUp,
  HeartHandshake,
  Briefcase,
  Megaphone,
  LayoutGrid,
  Shield,
  Fingerprint,
  Smartphone,
  Tags,
  Wrench,
  Contact,
  Truck,
  ShoppingCart,
  Phone,
} from "lucide-react";
import { SidebarItem, SidebarSubItem } from "./sidebar-item";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r bg-card p-4 md:flex">
      <div className="flex items-center gap-2 mb-4">
        <Phone className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold">Hospital del Móvil</h1>
      </div>
      <div className="flex-1 space-y-2">
        <Link href="/">
          <SidebarItem icon={LayoutGrid} label="Dashboard" isActive={pathname === '/'} />
        </Link>
        <SidebarItem icon={Shield} label="Seguridad">
          <SidebarSubItem icon={Users} label="Usuarios" />
          <SidebarSubItem icon={Fingerprint} label="Roles y Permisos" />
        </SidebarItem>
        <SidebarItem icon={Smartphone} label="Catálogos">
          <Link href="/products">
            <SidebarSubItem icon={Box} label="Productos" isActive={pathname === '/products'} />
          </Link>
          <Link href="/brands-and-models">
            <SidebarSubItem icon={Tags} label="Marcas y Modelos" isActive={pathname === '/brands-and-models'} />
          </Link>
          <SidebarSubItem icon={Wrench} label="Herramientas" />
        </SidebarItem>
        <SidebarItem icon={Contact} label="Contactos">
          <SidebarSubItem icon={Users} label="Clientes" />
          <SidebarSubItem icon={Truck} label="Proveedores" />
        </SidebarItem>
        <SidebarItem icon={Wrench} label="Operaciones">
          <SidebarSubItem icon={Briefcase} label="Ventas y Presupuestos" />
          <SidebarSubItem icon={ShoppingCart} label="Compras" />
          <SidebarSubItem icon={Wrench} label="Reparaciones" />
        </SidebarItem>
        <SidebarItem icon={Warehouse} label="Inventario">
          <Link href="/inventory">
            <SidebarSubItem icon={Box} label="Inventario General" isActive={pathname === '/inventory'} />
          </Link>
          <SidebarSubItem icon={Home} label="Gestión de Almacén" />
          <SidebarSubItem icon={ArrowRightLeft} label="Traslados" />
          <SidebarSubItem icon={FileCog} label="Ajustes" />
        </SidebarItem>
        <SidebarItem icon={Landmark} label="Administración">
            <SidebarSubItem icon={Contact} label="Empleados" />
            <SidebarSubItem icon={Users} label="Vendedores" />
            <SidebarSubItem icon={FileText} label="Facturación" />
            <SidebarSubItem icon={Calculator} label="Gastos" />
            <SidebarSubItem icon={FileDown} label="Cuentas por Cobrar" />
            <SidebarSubItem icon={FileUp} label="Cuentas por Pagar" />
        </SidebarItem>
        <SidebarItem icon={HeartHandshake} label="CRM">
            <SidebarSubItem icon={Briefcase} label="Oportunidades" />
            <SidebarSubItem icon={Megaphone} label="Marketing" />
            <SidebarSubItem icon={MessageSquare} label="Soporte y Quejas" />
        </SidebarItem>
        <SidebarItem icon={LineChart} label="Reportes">
          <SidebarSubItem icon={FileText} label="Predeterminados" />
          <SidebarSubItem icon={FileCog} label="Personalizados" />
        </SidebarItem>
        <SidebarItem icon={MessagesSquare} label="Comunicación">
          <SidebarSubItem icon={Book} label="Bitácora" />
          <SidebarSubItem icon={MessageSquare} label="Solicitudes" />
          <SidebarSubItem icon={MessageSquare} label="Chat Interno" />
        </SidebarItem>
        <SidebarItem icon={Settings} label="Configuraciones">
          <Link href="/settings/appearance">
            <SidebarSubItem icon={Palette} label="Apariencia" isActive={pathname === '/settings/appearance'} />
          </Link>
          <Link href="/settings/company-data">
            <SidebarSubItem icon={Building2} label="Datos Empresa" isActive={pathname === '/settings/company-data'} />
          </Link>
          <SidebarSubItem icon={Database} label="Base de Datos" />
          <SidebarSubItem icon={FileLock} label="Aviso de Privacidad" />
          <Link href="/settings/policies">
            <SidebarSubItem icon={FileText} label="Políticas y Reglamentos" isActive={pathname === '/settings/policies'} />
          </Link>
          <Link href="/settings/business-rules">
            <SidebarSubItem icon={Hammer} label="Reglas de Negocio" isActive={pathname === '/settings/business-rules'} />
          </Link>
          <SidebarSubItem icon={Clipboard} label="Formatos" />
          <Link href="/settings/manuals">
            <SidebarSubItem icon={BookUser} label="Manuales" isActive={pathname === '/settings/manuals'}/>
          </Link>
        </SidebarItem>
      </div>
      <div className="mt-auto">
        <div className="flex items-center p-2 rounded-md">
            <Avatar className="h-9 w-9 mr-3">
                <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <span className="text-sm text-foreground">Manuales</span>
        </div>
      </div>
    </aside>
  );
}

    