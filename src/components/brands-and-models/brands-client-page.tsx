
"use client";

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import { AddBrandForm } from '@/components/brands-and-models/add-brand-form';
import { AddModelForm } from '@/components/brands-and-models/add-model-form';
import { EditBrandForm } from '@/components/brands-and-models/edit-brand-form';
import type { BrandWithModels } from '@/actions/brands-actions';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type BrandsClientPageProps = {
    initialBrandsData: BrandWithModels[];
    totalPages: number;
};

export function BrandsClientPage({ initialBrandsData, totalPages }: BrandsClientPageProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, refresh } = useRouter();
  
  const currentPage = Number(searchParams.get('page')) || 1;

  const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);
  const [isAddModelModalOpen, setIsAddModelModalOpen] = useState(false);
  const [isEditBrandModalOpen, setIsEditBrandModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<BrandWithModels | null>(null);

  const handleOpenAddModel = (brand: BrandWithModels) => {
    setSelectedBrand(brand);
    setIsAddModelModalOpen(true);
  };

  const handleOpenEditModel = (brand: BrandWithModels) => {
    setSelectedBrand(brand);
    setIsEditBrandModalOpen(true);
  }
  
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleActionSuccess = () => {
    refresh();
  };


  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Catálogo de Marcas y Modelos</h1>
          <p className="text-muted-foreground">
            Administra las marcas y modelos de los dispositivos que manejas.
          </p>
        </div>
        <div className="flex w-full md:w-auto items-center gap-2">
          <form
             className="flex w-full md:w-auto items-center gap-2"
             onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const term = formData.get('search') as string;
                handleSearch(term);
             }}
          >
            <Input 
              type="search"
              name="search"
              placeholder="Buscar marca..." 
              className="w-full md:w-64"
              defaultValue={searchParams.get('q')?.toString()}
            />
            <Button type="submit"><Search className="h-4 w-4" /></Button>
          </form>
          <Button 
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            onClick={() => setIsAddBrandModalOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Agregar Marca</span>
          </Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {initialBrandsData.length > 0 ? (
          initialBrandsData.map((brand) => (
            <Card key={brand.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold">{brand.nombre}</h2>
                  <Badge variant="secondary">{brand.modelos.length} modelos</Badge>
                </div>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">País: {brand.pais_origen || 'No especificado'}</p>
                <div className="mt-4">
                  <h3 className="font-semibold">Modelos:</h3>
                  <div className="text-sm text-muted-foreground mt-2 h-20 overflow-y-auto">
                    {brand.modelos.length === 0
                      ? 'No hay modelos para esta marca.'
                      : brand.modelos.map(m => m.nombre).join(', ')}
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleOpenAddModel(brand)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Agregar Modelo
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleOpenEditModel(brand)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar Marca
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">No se encontraron marcas.</p>
        )}
      </div>
       {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href={`${pathname}?q=${searchParams.get('q') || ''}&page=${currentPage - 1}`} 
                  aria-disabled={currentPage <= 1}
                  className={currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    href={`${pathname}?q=${searchParams.get('q') || ''}&page=${i + 1}`}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  href={`${pathname}?q=${searchParams.get('q') || ''}&page=${currentPage + 1}`} 
                  aria-disabled={currentPage >= totalPages}
                  className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : undefined}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
      <AddBrandForm isOpen={isAddBrandModalOpen} onOpenChange={setIsAddBrandModalOpen} />
      <AddModelForm 
        isOpen={isAddModelModalOpen} 
        onOpenChange={setIsAddModelModalOpen} 
        brandName={selectedBrand?.nombre}
        brandId={selectedBrand?.id}
        onModelAdded={handleActionSuccess}
      />
      <EditBrandForm
        isOpen={isEditBrandModalOpen}
        onOpenChange={setIsEditBrandModalOpen}
        brand={selectedBrand}
        onBrandUpdated={handleActionSuccess}
       />
    </>
  );
}
