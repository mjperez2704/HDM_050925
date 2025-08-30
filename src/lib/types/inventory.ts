
import type { Product } from './product';

export type StockDetail = {
  warehouse: string;
  section: string;
  coordinate: string;
  quantity: number;
  visible: boolean;
};

export type ProductWithStockDetails = Product & {
  details: StockDetail[];
};

export type ProductWithStock = ProductWithStockDetails & {
  visibleStock: number;
};
