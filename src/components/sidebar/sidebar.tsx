
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
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

export function CustomSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4">
            <h1 className="text-xl font-bold text-center">HOSPITAL DEL MOVIL</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
        <SidebarMenuItem>
          <Link href="/dashboard" className="w-full">
            <SidebarMenuButton isActive={pathname === '/dashboard'} icon={LayoutGrid} >
                Dashboard
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarItem icon={Shield} label="Seguridad">
          <Link href="/security/users">
            <SidebarSubItem icon={Users} label="Usuarios" isActive={pathname === '/security/users'} />
          </Link>
          <Link href="/security/roles">
            <SidebarSubItem icon={Fingerprint} label="Roles y Permisos" isActive={pathname === '/security/roles'} />
          </Link>
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
          <Link href="/contacts/clients">
            <SidebarSubItem icon={Users} label="Clientes" isActive={pathname === '/contacts/clients'} />
          </Link>
          <Link href="/contacts/suppliers">
            <SidebarSubItem icon={Truck} label="Proveedores" isActive={pathname === '/contacts/suppliers'} />
          </Link>
        </SidebarItem>
        <SidebarItem icon={Wrench} label="Operaciones">
          <SidebarSubItem icon={Briefcase} label="Ventas y Presupuestos" />
          <Link href="/operations/purchases">
            <SidebarSubItem icon={ShoppingCart} label="Compras" isActive={pathname === '/operations/purchases'} />
          </Link>
          <Link href="/operations/repairs">
            <SidebarSubItem icon={Wrench} label="Reparaciones" isActive={pathname === '/operations/repairs'} />
          </Link>
        </SidebarItem>
        <SidebarItem icon={Warehouse} label="Inventario">
          <Link href="/inventory">
            <SidebarSubItem icon={Box} label="Inventario General" isActive={pathname === '/inventory'} />
          </Link>
          <Link href="/inventory/warehouse-management">
             <SidebarSubItem icon={Home} label="Gestión de Almacén" isActive={pathname === '/inventory/warehouse-management'} />
          </Link>
          <Link href="/inventory/transfers">
            <SidebarSubItem icon={ArrowRightLeft} label="Traslados" isActive={pathname === '/inventory/transfers'} />
          </Link>
          <Link href="/inventory/adjustments">
            <SidebarSubItem icon={FileCog} label="Ajustes" isActive={pathname === '/inventory/adjustments'} />
          </Link>
        </SidebarItem>
        <SidebarItem icon={Landmark} label="Administración">
            <Link href="/administration/employees">
              <SidebarSubItem icon={Contact} label="Empleados" isActive={pathname === '/administration/employees'} />
            </Link>
            <Link href="/administration/vendedores">
              <SidebarSubItem icon={Users} label="Vendedores" isActive={pathname === '/administration/vendedores'} />
            </Link>
            <SidebarSubItem icon={FileText} label="Facturación" />
            <Link href="/administration/expenses">
             <SidebarSubItem icon={Calculator} label="Gastos" isActive={pathname === '/administration/expenses'} />
            </Link>
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
          <Link href="/communication/log">
            <SidebarSubItem icon={Book} label="Bitácora" isActive={pathname === '/communication/log'} />
          </Link>
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
          <Link href="/settings/database">
            <SidebarSubItem icon={Database} label="Base de Datos" isActive={pathname === '/settings/database'} />
          </Link>
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
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
