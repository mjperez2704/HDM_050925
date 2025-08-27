
"use client";

import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { Header } from '@/components/dashboard/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Mail, BarChart2, Calendar, DollarSign, Users } from 'lucide-react';
import { AddCampaignForm } from '@/components/crm/add-campaign-form';

const campaignsData = [
  {
    name: 'Campaña de Verano 2024',
    status: 'Activa',
    type: 'Email Marketing',
    startDate: '2024-07-01',
    endDate: '2024-08-31',
    budget: '$500.00',
    leads: 150,
    conversions: 25,
  },
  {
    name: 'Lanzamiento Nuevos Accesorios',
    status: 'Finalizada',
    type: 'Redes Sociales',
    startDate: '2024-06-15',
    endDate: '2024-07-15',
    budget: '$800.00',
    leads: 320,
    conversions: 45,
  },
  {
    name: 'Promoción Regreso a Clases',
    status: 'Pausada',
    type: 'Anuncios Google',
    startDate: '2024-08-01',
    endDate: '2024-09-01',
    budget: '$1,200.00',
    leads: 0,
    conversions: 0,
  }
];

export default function MarketingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Activa': return 'destructive';
      case 'Finalizada': return 'secondary';
      case 'Pausada': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <CustomSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">Campañas de Marketing</h1>
                <p className="text-muted-foreground">
                  Crea, gestiona y analiza el rendimiento de tus campañas.
                </p>
              </div>
              <Button 
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                onClick={() => setIsModalOpen(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Crear Campaña
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {campaignsData.map((campaign, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>{campaign.name}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                                <Mail className="h-4 w-4" />{campaign.type}
                            </CardDescription>
                        </div>
                        <Badge variant={getStatusVariant(campaign.status) as any}>{campaign.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />Fechas:</span>
                        <span>{campaign.startDate} - {campaign.endDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-2"><DollarSign className="h-4 w-4" />Presupuesto:</span>
                        <span className="font-semibold">{campaign.budget}</span>
                    </div>
                    <div className="border-t pt-4 mt-4 grid grid-cols-2 gap-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold">{campaign.leads}</p>
                            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Users className="h-3 w-3" />LEADS</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold">{campaign.conversions}</p>
                            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1"><BarChart2 className="h-3 w-3" />CONVERSIONES</p>
                        </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Ver Detalles</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
      <AddCampaignForm isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </SidebarProvider>
  );
}
