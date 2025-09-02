
"use client";

import { SidebarProvider } from '@/components/ui/sidebar';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Header } from '@/components/dashboard/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function RequestsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <CustomSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-8">
            <Card>
              <CardHeader>
                <CardTitle>Solicitudes</CardTitle>
                <CardDescription>Módulo de Solicitudes. Próximamente.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-12">
                  <p>Esta sección está en desarrollo.</p>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
