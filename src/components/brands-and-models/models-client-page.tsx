
'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    // CORRECCIÓN: Usar 'all' en lugar de '' para evitar el error.
    // Si el usuario selecciona 'all', eliminamos el parámetro 'brand' de la URL.
    updateQueryParams('brand', brandId === 'all' ? '' : brandId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modelos</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {/* --- Input de búsqueda --- */}
          <Input
            type="search"
            placeholder="Buscar por nombre de modelo..."
            value={query}
            onChange={handleSearchChange}
            className="w-full"
          />
          {/* --- Select para filtrar por marca (CORREGIDO) --- */}
          <Select
            onValueChange={handleBrandChange}
            defaultValue={searchParams.get('brand') || 'all'}
          >
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="Filtrar por marca..." />
            </SelectTrigger>
            <SelectContent>
              {/* CORRECCIÓN: La opción para ver todo ahora tiene value="all" */}
              <SelectItem value="all">Todas las Marcas</SelectItem>
              {brands.map(brand => (
                <SelectItem key={brand.id} value={String(brand.id)}>
                  {brand.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {models.length > 0 ? (
            models.map(model => (
              <Card key={model.id} className="flex flex-col">
                  <CardHeader className="pb-2">
                      <p className="text-xs text-muted-foreground">{model.marca_nombre}</p>
                      <CardTitle className="text-lg">{model.nombre}</CardTitle>
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
