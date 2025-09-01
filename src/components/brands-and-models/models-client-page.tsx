
'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from 'lucide-react';
import type { ModelWithBrand, Brand } from '@/actions/brands-actions';

interface ModelsClientPageProps {
  models: ModelWithBrand[];
  brands: Brand[];
}

export function ModelsClientPage({ models, brands }: ModelsClientPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  // Helper para actualizar la URL con nuevos parámetros de búsqueda
  const updateQueryParams = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) {
      current.set(key, value);
    } else {
      current.delete(key);
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  // --- MANEJADORES DE EVENTOS ---
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    updateQueryParams('q', e.target.value);
  };

  const handleBrandChange = (brandId: string) => {
    updateQueryParams('brand', brandId === 'all' ? '' : brandId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modelos</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Input
            type="search"
            placeholder="Buscar por nombre de modelo..."
            value={query}
            onChange={handleSearchChange}
            className="w-full flex-grow"
          />
          <Select
            onValueChange={handleBrandChange}
            defaultValue={searchParams.get('brand') || 'all'}
          >
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="Filtrar por marca..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Marcas</SelectItem>
              {brands.map(brand => (
                <SelectItem key={brand.id} value={String(brand.id)}>
                  {brand.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
           <Button className="w-full sm:w-auto bg-destructive hover:bg-destructive/90 text-destructive-foreground">
              <PlusCircle className="mr-2 h-4 w-4" />
              Agregar Modelo
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {models.length > 0 ? (
            models.map(model => (
              <Card key={model.id} className="flex flex-col">
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div>
                      <p className="text-xs text-muted-foreground">{model.marca_nombre}</p>
                      <CardTitle className="text-lg">{model.nombre}</CardTitle>
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
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground col-span-full mt-6">
              No se encontraron modelos con los filtros actuales.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
