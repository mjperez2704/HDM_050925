
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { getProducts } from '@/actions/products-actions';
import { checkUserPermission } from '@/actions/auth-actions';
import { InventoryClientPage } from '@/components/inventory/InventoryClientPage';

// ID del permiso para "VER EXISTENCIAS TOTALES"
const VIEW_TOTAL_STOCK_PERMISSION_ID = 7;

export default async function InventoryPage() {
    // Estas llamadas ahora se hacen en el servidor
    const inventoryData = await getProducts();
    const hasTotalStockPermission = await checkUserPermission(VIEW_TOTAL_STOCK_PERMISSION_ID);

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-muted/40">
                <CustomSidebar />
                <div className="flex flex-1 flex-col">
                    <Header />
                    <main className="flex-1 p-4 md:p-8">
                       <InventoryClientPage 
                            initialInventoryData={inventoryData} 
                            hasTotalStockPermission={hasTotalStockPermission}
                       />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
