
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { BrandsClientPage } from '@/components/brands-and-models/brands-client-page';
import { getBrandsWithModels } from '@/actions/brands-actions';

export default async function BrandsAndModelsPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    page?: string;
  };
}) {
  const query = searchParams?.q || '';
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = 6; // Puedes ajustar este valor

  const { brands, totalPages } = await getBrandsWithModels(query, currentPage, itemsPerPage);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <CustomSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-8">
            <BrandsClientPage 
              initialBrandsData={brands}
              totalPages={totalPages}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
