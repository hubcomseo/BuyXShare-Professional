import { Supplier } from '../types/supplier';
import { Product } from '../types/product';
import { Order } from '../types/order';

export const supplierService = {
  getStats: async (supplierId: string) => {
    const res = await fetch('/api/supplier/stats', {
      headers: { 'x-user-id': supplierId }
    });
    return res.json();
  },
  getProducts: async (supplierId: string): Promise<Product[]> => {
    const res = await fetch(`/api/supplier/products`, {
      headers: { 'x-user-id': supplierId }
    });
    return res.json();
  },
  createProduct: async (supplierId: string, data: Partial<Product>) => {
    const res = await fetch('/api/supplier/products', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-user-id': supplierId
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  updateProduct: async (productId: string, data: Partial<Product>) => {
    const res = await fetch(`/api/supplier/products/${productId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getOrders: async (supplierId: string): Promise<Order[]> => {
    const res = await fetch('/api/supplier/orders', {
      headers: { 'x-user-id': supplierId }
    });
    return res.json();
  },
  getReconciliations: async (supplierId: string) => {
    const res = await fetch('/api/supplier/reconciliations', {
      headers: { 'x-user-id': supplierId }
    });
    return res.json();
  }
};
