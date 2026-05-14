export type TicketStatus = 'pending' | 'confirmed' | 'winner' | 'expired';

export interface RewardTicket {
  id: string;
  orderId: string;
  customerPhone: string;
  ticketCode: string;
  status: TicketStatus;
  rewardType: 'DexSpace Lottery';
  issuedAt: string;
  confirmedAt?: string;
  sequence?: string;
  // Deprecated fields
  customerId?: string;
  ticketNumber?: string;
  createdAt?: string;
}

export interface TrackRewardResult {
  tickets: RewardTicket[];
  orders: any[];
}
