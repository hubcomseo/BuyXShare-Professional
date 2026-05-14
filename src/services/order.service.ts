import { Order } from '../types/order';

interface CreateOrderDTO {
  productId: string;
  checkoutInfo: {
    name: string;
    phone: string;
    address: string;
    note?: string;
  };
  deliveryMethod: 'standard' | 'express' | 'pickup';
  paymentMethod: 'qr' | 'cod';
  partnerId?: string;
}

export const orderService = {
  createOrder: async (data: CreateOrderDTO, userId: string): Promise<Order> => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getOrders: async (userId: string): Promise<Order[]> => {
    const res = await fetch('/api/orders', {
      headers: { 'x-user-id': userId }
    });
    return res.json();
  },
  updateOrderStatus: async (id: string, fulfillmentStatus: string): Promise<Order> => {
    const res = await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fulfillmentStatus })
    });
    return res.json();
  },
  simulatePayment: async (id: string): Promise<any> => {
    const res = await fetch(`/api/orders/${id}/simulate-payment`, {
      method: 'POST'
    });
    return res.json();
  }
};
