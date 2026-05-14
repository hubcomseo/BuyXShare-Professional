export interface Product {
  id: string;
  supplierId: string;
  name: string;
  brand: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  stock: number;
  images: string[];
  category: string;
  commissionRate: number;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  regCommission?: number; // Legacy, but keeping for compatibility if needed, though commissionRate is preferred now
  pubCommission?: number;
}
