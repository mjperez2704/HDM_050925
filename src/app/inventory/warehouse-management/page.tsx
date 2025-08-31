
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import WarehouseManagementClientPage from '@/app/inventory/warehouse-management/client';
import { getWarehouseStructure } from '@/actions/inventory-actions';

export default async function WarehouseManagementPage() {
    const warehouseData = await getWarehouseStructure();

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-muted/40">
                <CustomSidebar />
                <div className="flex flex-1 flex-col">
                    <Header />
                    <main className="flex-1 p-4 md:p-8">
                        <WarehouseManagementClientPage initialWarehouseData={warehouseData} />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
