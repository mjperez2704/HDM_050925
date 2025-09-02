import { searchBrands, searchModels, getAllBrands } from "@/actions/brands-actions";
import { BrandsAndModelsClient } from "@/components/brands-and-models/brands-and-models-client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

// Definiendo los tipos de props que espera la página
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

// Esta página se ejecuta en el servidor
export default async function BrandsAndModelsPage({ searchParams }: BrandsAndModelsPageProps) {
  const query = searchParams.q || '';
  const brandId = searchParams.brand ? Number(searchParams.brand) : null;
  
  // Realizamos todas las consultas de datos aquí, en el servidor
  const [brandsResult, modelsResult, allBrandsResult] = await Promise.allSettled([
    searchBrands(query),
    searchModels(query, brandId),
    getAllBrands()
  ]);

  // Verificamos si las promesas se resolvieron correctamente
  const brands = brandsResult.status === 'fulfilled' ? brandsResult.value : { success: false, message: 'No se pudieron cargar las marcas.' };
  const models = modelsResult.status === 'fulfilled' ? modelsResult.value : { success: false, message: 'No se pudieron cargar los modelos.' };
  const allBrands = allBrandsResult.status === 'fulfilled' ? allBrandsResult.value : { success: false, message: 'No se pudo cargar la lista completa de marcas.' };

  return (
    // Ya no necesitamos el SidebarProvider, Header, etc. aquí.
    // El layout se encarga de eso.
    <div className="flex flex-col h-full">
        <div className="flex items-center mb-4">
            <h1 className="text-lg font-semibold md:text-2xl">Catálogo de Marcas y Modelos</h1>
        </div>
        
        {/* Pasamos los datos ya cargados al componente del cliente */}
        <BrandsAndModelsClient
            initialTab={searchParams.tab || 'brands'}
            brandsResult={brands}
            modelsResult={models}
            allBrandsResult={allBrands}
        />
    </div>
  );
}
