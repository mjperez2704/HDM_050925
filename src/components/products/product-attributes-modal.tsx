
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Product = {
  sku: string;
  name: string;
  attributes?: Record<string, string>;
};

type ProductAttributesModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  product: Product | null;
};

export function ProductAttributesModal({ isOpen, onOpenChange, product }: ProductAttributesModalProps) {
  if (!product) return null;

  const productAttributes = product.attributes || {};
  const hasAttributes = Object.keys(productAttributes).length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Atributos Adicionales</DialogTitle>
          <DialogDescription>
            {product.name}
          </DialogDescription>
          <div className="pt-2">
            <Badge variant="secondary">SKU: {product.sku}</Badge>
          </div>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {hasAttributes ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              {Object.entries(productAttributes).map(([key, value]) => (
                <div key={key} className="text-sm">
                  {value && (
                    <>
                      <span className="font-semibold capitalize">{key.replace('_', ' ')}:</span>
                      <p className="text-muted-foreground">{value}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Este producto no tiene atributos adicionales registrados.
            </p>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
