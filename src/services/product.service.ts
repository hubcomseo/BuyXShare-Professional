import { Product } from '../types/product';

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    const res = await fetch('/api/products');
    return res.json();
  },
  getProductById: async (id: string): Promise<Product> => {
    const res = await fetch(`/api/products/${id}`);
    return res.json();
  },
  getProductBySlug: async (slug: string, partnerId?: string): Promise<Product> => {
    const url = new URL(`${window.location.origin}/api/products/slug/${slug}`);
    if (partnerId) url.searchParams.append('partnerId', partnerId);
    const res = await fetch(url.toString());
    return res.json();
  }
};
