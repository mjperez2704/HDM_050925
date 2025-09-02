
import { CustomSidebar } from '@/components/sidebar/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { getInventoryStockDetails } from '@/actions/inventory-actions';
import { checkUserPermission } from '@/actions/auth-actions';
import { InventoryClientPage } from '@/components/inventory/InventoryClientPage';
import type { ProductWithStock } from '@/lib/types/inventory';

// ID del permiso para "VER EXISTENCIAS TOTALES"
const VIEW_TOTAL_STOCK_PERMISSION_ID = 7;

export default async function InventoryPage() {
    // 1. Verificar permisos y obtener datos en el servidor
    const [inventoryDetails, hasTotalStockPermission] = await Promise.all([
        getInventoryStockDetails(),
        checkUserPermission(VIEW_TOTAL_STOCK_PERMISSION_ID)
    ]);

    // 2. Procesar los datos y calcular el stock visible en el servidor
    const inventoryData: ProductWithStock[] = inventoryDetails.map(item => {
        // Calcular el stock visible sumando solo las cantidades de coordenadas visibles
        const visibleStock = item.details
            .filter(detail => detail.visible)
            .reduce((sum, detail) => sum + detail.quantity, 0);

        return {
            ...item,
            visibleStock: visibleStock,
        };
    });

    // 3. Pasar los datos pre-procesados al componente del cliente
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
