import { Sidebar } from '@/components/sidebar/sidebar';
import { Header } from '@/components/dashboard/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const brandsData = [
  {
    name: 'APPLE',
    country: 'USA',
    models: [],
  },
  {
    name: 'HUAWEI',
    country: 'CHINA',
    models: [],
  },
  {
    name: 'SAMSUNG',
    country: 'COREA DEL SUR',
    models: [],
  },
];

export default function BrandsAndModelsPage() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-1 flex-col bg-background">
        <Header />
        <main className="flex-1 p-4 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">Catálogo de Marcas y Modelos</h1>
              <p className="text-muted-foreground">
                Administra las marcas y modelos de los dispositivos que manejas.
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <PlusCircle className="mr-2 h-4 w-4" />
              Agregar Marca
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {brandsData.map((brand) => (
              <Card key={brand.name}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold">{brand.name}</h2>
                    <Badge variant="secondary">{brand.models.length} modelos</Badge>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">País: {brand.country}</p>
                  <div className="mt-4">
                    <h3 className="font-semibold">Modelos:</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {brand.models.length === 0
                        ? 'No hay modelos para esta marca.'
                        : brand.models.join(', ')}
                    </p>
                  </div>
                  <div className="mt-6 flex gap-2">
                    <Button variant="outline" size="sm">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Agregar Modelo
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Editar Marca
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
