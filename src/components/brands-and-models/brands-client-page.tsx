
"use client";

import { useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, Search, Loader2, MoreHorizontal } from 'lucide-react';
import { AddBrandForm } from '@/components/brands-and-models/add-brand-form';
import { AddModelForm } from '@/components/brands-and-models/add-model-form';
import { EditBrandForm } from '@/components/brands-and-models/edit-brand-form';
import { BrandModelsModal } from '@/components/brands-and-models/brand-models-modal';
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


type BrandsClientPageProps = {
    initialBrandsData: Brand[];
};

export function BrandsClientPage({ initialBrandsData }: BrandsClientPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);
  const [isAddModelModalOpen, setIsAddModelModalOpen] = useState(false);
  const [isEditBrandModalOpen, setIsEditBrandModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isBrandModelsModalOpen, setIsBrandModelsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const handleActionSuccess = () => router.refresh();

  const handleOpenBrandModels = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsBrandModelsModalOpen(true);
  };
  
  const handleOpenAddModel = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsAddModelModalOpen(true);
  };
  
  const handleOpenEditModel = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsEditBrandModalOpen(true);
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    const params = new URLSearchParams(searchParams);
    if (newQuery) {
      params.set('q', newQuery);
    } else {
      params.delete('q');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };


  return (
    <>
      <Card>
        <CardHeader>
           <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex-grow">
              <Input
                type="search"
                placeholder="Buscar por nombre de marca..."
                value={query}
                onChange={handleSearch}
                className="w-full"
              />
            </div>
             <Button 
                className="w-full sm:w-auto bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                onClick={() => setIsAddBrandModalOpen(true)}
            >
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar Marca
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {initialBrandsData.map((brand) => (
              <Card key={brand.id}>
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <div>
                      <h2 className="text-lg font-bold">{brand.nombre}</h2>
                      <p className="text-sm text-muted-foreground">{brand.pais_origen || 'Sin país de origen'}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleOpenEditModel(brand)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleOpenDeleteAlert(brand)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                     <Badge 
                        variant="secondary" 
                        className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                        onClick={() => handleOpenBrandModels(brand)}
                      >
                        {brand.modelos_count} {brand.modelos_count === 1 ? 'modelo' : 'modelos'}
                      </Badge>
                     <Button variant="outline" size="sm" onClick={() => handleOpenAddModel(brand)}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Modelo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* --- Modales y Diálogos --- */}
      <AddBrandForm isOpen={isAddBrandModalOpen} onOpenChange={setIsAddBrandModalOpen} onBrandAdded={handleActionSuccess} />
      <AddModelForm isOpen={isAddModelModalOpen} onOpenChange={setIsAddModelModalOpen} brandName={selectedBrand?.nombre} brandId={selectedBrand?.id} onModelAdded={handleActionSuccess} />
      <EditBrandForm isOpen={isEditBrandModalOpen} onOpenChange={setIsEditBrandModalOpen} brand={selectedBrand} onBrandUpdated={handleActionSuccess} />
      
      <BrandModelsModal 
        isOpen={isBrandModelsModalOpen} 
        onOpenChange={setIsBrandModelsModalOpen} 
        brand={selectedBrand}
      />

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro de que quieres eliminar la marca "{selectedBrand?.nombre}"?</AlertDialogTitle>
                <AlertDialogDescription>
                    Esta acción no se puede deshacer. Se eliminará permanentemente la marca.
                    Si la marca tiene modelos asociados, la eliminación fallará.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteBrand} className="bg-destructive hover:bg-destructive/90">
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Eliminar'}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
