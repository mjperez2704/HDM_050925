
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { BrandsClientPage } from '@/components/brands-and-models/brands-client-page';
import { getBrandsWithModels } from '@/actions/brands-actions';

export default async function BrandsAndModelsPage() {
  const brandsData = await getBrandsWithModels();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <CustomSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-8">
            <BrandsClientPage initialBrandsData={brandsData} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
