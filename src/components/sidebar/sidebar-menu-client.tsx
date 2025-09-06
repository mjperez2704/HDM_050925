
"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { SidebarItem, SidebarSubItem } from "./sidebar-item";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import type { LucideIcon } from "lucide-react";

// Definimos los tipos para la estructura del menú que recibiremos del servidor
export type SubItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type MenuItem = {
  label: string;
  icon: LucideIcon;
  isLink?: boolean;
  href?: string;
  subItems?: SubItem[];
  hasAccess: boolean;
};

type SidebarMenuClientProps = {
  menuStructure: MenuItem[];
};

export function SidebarMenuClient({ menuStructure }: SidebarMenuClientProps) {
  const pathname = usePathname();

  return (
    <>
      {menuStructure.map((item, index) => {
        // Si el usuario no tiene acceso al grupo entero de menú, no renderizamos nada.
        if (!item.hasAccess) return null;

        // Si es un enlace directo (como el Dashboard)
        if (item.isLink && item.href) {
          return (
            <SidebarMenuItem key={index}>
              <Link href={item.href}>
                <SidebarMenuButton isActive={pathname === item.href} icon={item.icon}>
                  {item.label}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          );
        }

        // Si es un grupo de menú con sub-items
        return (
          <SidebarItem key={index} icon={item.icon} label={item.label}>
            {item.subItems?.map((subItem, subIndex) => {
              return (
                <Link key={subIndex} href={subItem.href} aria-label={subItem.label}>
                  <SidebarSubItem icon={subItem.icon} label={subItem.label} isActive={pathname === subItem.href} />
                </Link>
              );
            })}
          </SidebarItem>
        );
      })}
    </>
  );
}
