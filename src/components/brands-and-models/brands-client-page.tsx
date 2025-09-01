
"use client";

import { useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, Search, Loader2 } from 'lucide-react';
import { AddBrandForm } from '@/components/brands-and-models/add-brand-form';
import { AddModelForm } from '@/components/brands-and-models/add-model-form';
import { EditBrandForm } from '@/components/brands-and-models/edit-brand-form';
import { BrandModelsModal } from '@/components/brands-and-models/brand-models-modal'; // 1. Importar el nuevo modal
import { deleteBrand } from '@/actions/brands-actions';
import type { Brand } from '@/actions/brands-actions';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';

type BrandsClientPageProps = {
    initialBrandsData: Brand[];
};

export function BrandsClientPage({ initialBrandsData }: BrandsClientPageProps) {
  const { refresh } = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);
  const [isAddModelModalOpen, setIsAddModelModalOpen] = useState(false);
  const [isEditBrandModalOpen, setIsEditBrandModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isBrandModelsModalOpen, setIsBrandModelsModalOpen] = useState(false); // 2. Estado para el modal de modelos
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const handleActionSuccess = () => refresh();

  const handleOpenBrandModels = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsBrandModelsModalOpen(true);
  };

  const handleOpenDeleteAlert = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteBrand = () => {
    if (!selectedBrand) return;

    startTransition(async () => {
      const result = await deleteBrand(selectedBrand.id);
      if (result.success) {
        toast({ title: "Éxito", description: result.message });
        handleActionSuccess();
      } else {
        toast({ variant: "destructive", title: "Error", description: result.message });
      }
      setIsDeleteAlertOpen(false);
    });
  };

  // ... (otros handlers como handleOpenAddModel, handleOpenEditModel, handleSearch no cambian)

  return (
    <>
      {/* ... (código del encabezado y búsqueda sin cambios) ... */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {initialBrandsData.map((brand) => (
          <Card key={brand.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                 <h2 className="text-lg font-bold">{brand.nombre}</h2>
                  {/* 3. Conectar el badge para abrir el modal de modelos */}
                  <Badge 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={() => handleOpenBrandModels(brand)}
                  >
                    {brand.modelos_count} {brand.modelos_count === 1 ? 'modelo' : 'modelos'}
                  </Badge>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleOpenDeleteAlert(brand)} disabled={isPending}>
                 {isPending && selectedBrand?.id === brand.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 text-destructive" />}
              </Button>
            </CardHeader>
            <CardContent>
               {/* ... (contenido de la tarjeta y botones sin cambios) ... */}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- Modales y Diálogos --- */}
      <AddBrandForm isOpen={isAddBrandModalOpen} onOpenChange={setIsAddBrandModalOpen} onBrandAdded={handleActionSuccess} />
      <AddModelForm isOpen={isAddModelModalOpen} onOpenChange={setIsAddModelModalOpen} brandName={selectedBrand?.nombre} brandId={selectedBrand?.id} onModelAdded={handleActionSuccess} />
      <EditBrandForm isOpen={isEditBrandModalOpen} onOpenChange={setIsEditBrandModalOpen} brand={selectedBrand} onBrandUpdated={handleActionSuccess} />
      
      {/* 4. Renderizar el nuevo modal */}
      <BrandModelsModal 
        isOpen={isBrandModelsModalOpen} 
        onOpenChange={setIsBrandModelsModalOpen} 
        brand={selectedBrand}
      />

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>{/* ... */}</AlertDialog>
    </>
  );
}

// El resto del código de la página del cliente se mantiene igual pero se omite aquí por brevedad.
