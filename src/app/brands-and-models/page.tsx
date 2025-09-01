
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { searchBrands, searchModels, getAllBrands } from "@/actions/brands-actions";
import { BrandsClientPage } from "@/components/brands-and-models/brands-client-page";
import { ModelsClientPage } from "@/components/brands-and-models/models-client-page";
import { CustomSidebar } from "@/components/sidebar/sidebar";
import { Header } from "@/components/dashboard/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Brand, ModelWithBrand } from "@/actions/brands-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

type BrandsAndModelsPageProps = {
  searchParams: {
    tab?: string;
    q?: string;
    brand?: string;
  };
};

// Componente para mostrar errores de carga de datos
const DataError = ({ message }: { message: string }) => (
    <Alert variant="destructive" className="mt-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error al Cargar Datos</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
    </Alert>
);

export default async function BrandsAndModelsPage({ searchParams }: BrandsAndModelsPageProps) {
  const currentTab = searchParams.tab || 'brands';
  const query = searchParams.q || '';
  const brandId = searchParams.brand ? Number(searchParams.brand) : null;

  const [brandsResult, modelsResult, allBrandsResult] = await Promise.all([
    searchBrands(query),
    searchModels(query, brandId),
    getAllBrands()
  ]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <CustomSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-8">
            <Tabs defaultValue={currentTab} className="w-full">
              <div className="flex items-center mb-4">
                <h1 className="text-lg font-semibold md:text-2xl">Catálogo de Marcas y Modelos</h1>
              </div>
              <TabsList className="grid w-full grid-cols-2 max-w-lg">
                <TabsTrigger value="brands">Marcas</TabsTrigger>
                <TabsTrigger value="models">Modelos</TabsTrigger>
              </TabsList>

              <TabsContent value="brands" className="mt-6">
                {brandsResult.success ? 
                  <BrandsClientPage initialBrandsData={brandsResult.data} /> : 
                  <DataError message={brandsResult.message} />}
              </TabsContent>

              <TabsContent value="models" className="mt-6">
                {modelsResult.success && allBrandsResult.success ? 
                  <ModelsClientPage models={modelsResult.data} brands={allBrandsResult.data} /> : 
                  <DataError message={modelsResult.message || allBrandsResult.message || 'Error desconocido'} />}
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
