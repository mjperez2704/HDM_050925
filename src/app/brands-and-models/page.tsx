import { getAllBrands, searchBrands, searchModels } from "@/actions/brands-actions";
import { BrandsAndModelsClient } from "@/components/brands-and-models/brands-and-models-client";
import { CustomSidebar } from "@/components/sidebar/sidebar";
import { Header } from "@/components/dashboard/header";
import { SidebarProvider } from "@/components/ui/sidebar";

type BrandsAndModelsPageProps = {
  searchParams: {
    tab?: string;
    q?: string;
    brand?: string;
  };
};

export default async function BrandsAndModelsPage({ searchParams }: BrandsAndModelsPageProps) {
  const query = searchParams.q || '';
  const brandId = searchParams.brand ? Number(searchParams.brand) : null;
  
  const [brandsResult, modelsResult, allBrandsResult] = await Promise.all([
    searchBrands(query),
    searchModels(query, brandId),
    getAllBrands() // Se usa para el filtro de modelos
  ]);

  const brands = brandsResult.success ? brandsResult.data : [];
  const models = modelsResult.success ? modelsResult.data : [];
  const allBrands = allBrandsResult.success ? allBrandsResult.data : [];

  return (
    <SidebarProvider>
        <div className="flex min-h-screen w-full bg-muted/40">
            <CustomSidebar />
            <div className="flex flex-1 flex-col">
                <Header />
                <main className="flex-1 p-4 md:p-8">
                    <div className="flex items-center mb-4">
                        <h1 className="text-lg font-semibold md:text-2xl">Catálogo de Marcas y Modelos</h1>
                    </div>
                    <BrandsAndModelsClient
                        initialTab={searchParams.tab || 'brands'}
                        brands={brands}
                        models={models}
                        allBrands={allBrands}
                    />
                </main>
            </div>
        </div>
    </SidebarProvider>
  );
}
