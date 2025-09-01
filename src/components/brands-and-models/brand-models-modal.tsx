
"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from 'lucide-react';
import { getModelsByBrandId, type Model } from '@/actions/brands-actions';
import type { Brand } from '@/actions/brands-actions';

type BrandModelsModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  brand: Brand | null;
};

export function BrandModelsModal({ isOpen, onOpenChange, brand }: BrandModelsModalProps) {
  const [models, setModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && brand) {
      setIsLoading(true);
      getModelsByBrandId(brand.id)
        .then(data => {
          setModels(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen, brand]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Modelos de {brand?.nombre}</DialogTitle>
          <DialogDescription>
            Esta es la lista de modelos registrados para esta marca.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : models.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {models.map(model => (
                <Badge key={model.id} variant="secondary">{model.nombre}</Badge>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground py-10">
              No hay modelos registrados para esta marca.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
