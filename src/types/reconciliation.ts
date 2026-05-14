export interface ReconciliationBatch {
  id: string;
  month: string;
  supplierId: string;
  totalOrders: number;
  grossRevenue: number;
  partnerCommission: number;
  platformFee: number;
  supplierPayable: number;
  status: 'draft' | 'confirmed' | 'paid';
  createdAt: string;
}
