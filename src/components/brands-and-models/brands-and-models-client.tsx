"use client"; // ¡La directiva más importante!

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrandsClientPage } from "@/components/brands-and-models/brands-client-page";
import { ModelsClientPage } from "@/components/brands-and-models/models-client-page";
import type { Brand, ModelWithBrand } from "@/actions/brands-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

// Definimos la estructura de los resultados que esperamos
type ActionResult<T> = {
    success: boolean;
    data?: T;
    message?: string;
};

// Definimos los props que este componente recibe de la página del servidor
type BrandsAndModelsClientProps = {
    initialTab: string;
    brandsResult: ActionResult<Brand[]>;
    modelsResult: ActionResult<ModelWithBrand[]>;
    allBrandsResult: ActionResult<Brand[]>;
};

// Componente para mostrar errores de carga de datos
const DataError = ({ message }: { message: string }) => (
    <Alert variant="destructive" className="mt-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error al Cargar Datos</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
    </Alert>
);

export function BrandsAndModelsClient({
    initialTab,
    brandsResult,
    modelsResult,
    allBrandsResult,
}: BrandsAndModelsClientProps) {
  
  return (
    <Tabs defaultValue={initialTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-lg">
        <TabsTrigger value="brands">Marcas</TabsTrigger>
        <TabsTrigger value="models">Modelos</TabsTrigger>
      </TabsList>

      <TabsContent value="brands" className="mt-6">
        {brandsResult.success && brandsResult.data ? 
          <BrandsClientPage initialBrandsData={brandsResult.data} /> : 
          <DataError message={brandsResult.message || 'Error desconocido al cargar marcas.'} />
        }
      </TabsContent>

      <TabsContent value="models" className="mt-6">
        {modelsResult.success && modelsResult.data && allBrandsResult.success && allBrandsResult.data ? 
          <ModelsClientPage models={modelsResult.data} brands={allBrandsResult.data} /> : 
          <DataError message={modelsResult.message || allBrandsResult.message || 'Error desconocido al cargar modelos.'} />
        }
      </TabsContent>
    </Tabs>
  );
}
