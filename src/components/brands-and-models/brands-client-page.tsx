
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { AddBrandForm } from '@/components/brands-and-models/add-brand-form';
import { AddModelForm } from '@/components/brands-and-models/add-model-form';
import type { BrandWithModels } from '@/actions/brands-actions';

type BrandsClientPageProps = {
    initialBrandsData: BrandWithModels[];
};

export function BrandsClientPage({ initialBrandsData }: BrandsClientPageProps) {
  const [brandsData, setBrandsData] = useState(initialBrandsData);
  const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);
  const [isAddModelModalOpen, setIsAddModelModalOpen] = useState(false);
  const [selectedBrandName, setSelectedBrandName] = useState<string | undefined>(undefined);

  const handleOpenAddModel = (brandName: string) => {
    setSelectedBrandName(brandName);
    setIsAddModelModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">Catálogo de Marcas y Modelos</h1>
          <p className="text-muted-foreground">
            Administra las marcas y modelos de los dispositivos que manejas.
          </p>
        </div>
        <Button 
          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          onClick={() => setIsAddBrandModalOpen(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Agregar Marca
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {brandsData.map((brand) => (
          <Card key={brand.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">{brand.nombre}</h2>
                <Badge variant="secondary">{brand.modelos.length} modelos</Badge>
              </div>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">País: {brand.pais_origen || 'No especificado'}</p>
              <div className="mt-4">
                <h3 className="font-semibold">Modelos:</h3>
                <div className="text-sm text-muted-foreground mt-2 h-20 overflow-y-auto">
                  {brand.modelos.length === 0
                    ? 'No hay modelos para esta marca.'
                    : brand.modelos.map(m => m.nombre).join(', ')}
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleOpenAddModel(brand.nombre)}>
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
      <AddBrandForm isOpen={isAddBrandModalOpen} onOpenChange={setIsAddBrandModalOpen} />
      <AddModelForm isOpen={isAddModelModalOpen} onOpenChange={setIsAddModelModalOpen} brandName={selectedBrandName} />
    </>
  );
}
