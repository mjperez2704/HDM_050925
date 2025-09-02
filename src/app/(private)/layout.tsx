import { CustomSidebar } from "@/components/sidebar/sidebar";
import { Header } from "@/components/dashboard/header";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <CustomSidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
