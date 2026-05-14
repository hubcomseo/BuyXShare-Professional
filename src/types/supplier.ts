export interface Supplier {
  id: string;
  name: string;
  contactEmail: string;
  contactPhone: string;
  status: 'active' | 'inactive';
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  payableAmount: number;
}
