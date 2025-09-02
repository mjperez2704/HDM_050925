"use client"; 

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrandsClientPage } from "@/components/brands-and-models/brands-client-page";
import { ModelsClientPage } from "@/components/brands-and-models/models-client-page";
import type { Brand, ModelWithBrand } from "@/actions/brands-actions";

type BrandsAndModelsClientProps = {
    initialTab: string;
    brands: Brand[];
    models: ModelWithBrand[];
    allBrands: Brand[];
};

export function BrandsAndModelsClient({
    initialTab,
    brands,
    models,
    allBrands,
}: BrandsAndModelsClientProps) {
  
  return (
    <Tabs defaultValue={initialTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-lg">
        <TabsTrigger value="brands">Marcas</TabsTrigger>
        <TabsTrigger value="models">Modelos</TabsTrigger>
      </TabsList>

      <TabsContent value="brands" className="mt-6">
          <BrandsClientPage initialBrandsData={brands} /> 
      </TabsContent>

      <TabsContent value="models" className="mt-6">
          <ModelsClientPage models={models} brands={allBrands} /> 
      </TabsContent>
    </Tabs>
  );
}
