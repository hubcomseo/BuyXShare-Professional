export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type FulfillmentStatus = 'new' | 'processing' | 'shipped' | 'completed' | 'cancelled';
export type ReconciliationStatus = 'pending' | 'reconciled';
export type PaymentMethod = 'qr' | 'cod';
export type DeliveryMethod = 'standard' | 'express' | 'pickup';

export interface Order {
  id: string;
  orderCode: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerNote?: string;
  productId: string;
  supplierId: string;
  partnerId?: string;
  affiliateLinkId?: string;
  quantity: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  reconciliationStatus: ReconciliationStatus;
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  createdAt: string;
  paidAt?: string;
  processingAt?: string;
  shippedAt?: string;
  completedAt?: string;
  reconciledAt?: string;
}
