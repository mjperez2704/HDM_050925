"use client";

import {
  LineChart,
  FileText,
  FileCog,
  MessagesSquare,
  Book,
  MessageSquare,
  MessageCircle,
  Settings,
  Palette,
  Building2,
  Database,
  FileLock,
  Hammer,
  Clipboard,
  BookUser,
} from "lucide-react";
import { SidebarItem, SidebarSubItem } from "./sidebar-item";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r bg-card p-4 md:flex">
      <div className="flex-1 space-y-2">
        <SidebarItem icon={LineChart} label="Reportes">
          <SidebarSubItem icon={FileText} label="Predeterminados" />
          <SidebarSubItem icon={FileCog} label="Personalizados" />
        </SidebarItem>
        <SidebarItem icon={MessagesSquare} label="Comunicación">
          <SidebarSubItem icon={Book} label="Bitácora" />
          <SidebarSubItem icon={MessageSquare} label="Solicitudes" />
          <SidebarSubItem icon={MessageCircle} label="Chat Interno" />
        </SidebarItem>
        <SidebarItem icon={Settings} label="Configuraciones">
          <SidebarSubItem icon={Palette} label="Apariencia" />
          <SidebarSubItem icon={Building2} label="Datos Empresa" />
          <SidebarSubItem icon={Database} label="Base de Datos" />
          <SidebarSubItem icon={FileLock} label="Aviso de Privacidad" />
          <SidebarSubItem icon={FileText} label="Políticas y Reglamentos" />
          <SidebarSubItem icon={Hammer} label="Reglas de Negocio" />
          <SidebarSubItem icon={Clipboard} label="Formatos" />
          <SidebarSubItem icon={BookUser} label="Manuales" />
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
