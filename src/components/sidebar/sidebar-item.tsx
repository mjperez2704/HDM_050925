
"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  children?: React.ReactNode;
  isActive?: boolean;
};

export function SidebarItem({ icon: Icon, label, children, isActive }: SidebarItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubItems = React.Children.count(children) > 0;

  const toggleOpen = () => {
    if (hasSubItems) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <div
        onClick={toggleOpen}
        className={cn(
            "flex items-center p-2 rounded-md cursor-pointer text-sm",
            isActive 
                ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                : "text-foreground hover:bg-muted",
            isOpen && "bg-muted"
        )}
      >
        <Icon className="mr-3 h-5 w-5" />
        <span className="flex-1">{label}</span>
        {hasSubItems && (
          isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
        )}
      </div>
      {hasSubItems && isOpen && (
        <div className="pl-6 mt-2 space-y-2 border-l border-border ml-3">
          {children}
        </div>
      )}
    </div>
  );
}

type SidebarSubItemProps = {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
};

export function SidebarSubItem({ icon: Icon, label, isActive }: SidebarSubItemProps) {
  return (
    <div className={cn(
        "flex items-center p-2 rounded-md cursor-pointer text-sm",
        isActive 
            ? "bg-sidebar-accent text-sidebar-accent-foreground" 
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
    )}>
      <Icon className="mr-3 h-5 w-5" />
      <span>{label}</span>
    </div>
  );
}
