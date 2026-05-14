export type CommissionStatus = 'pending' | 'confirmed' | 'paid' | 'cancelled';

export interface Commission {
  id: string;
  orderId: string;
  partnerId: string;
  productId: string;
  commissionRate: number;
  orderAmount: number;
  commissionAmount: number;
  status: CommissionStatus;
  confirmedAt?: string;
  paidAt?: string;
  createdAt?: string;
}
