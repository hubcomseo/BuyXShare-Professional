export interface Partner {
  id: string;
  userId: string;
  type: 'registered' | 'public';
  commissionRate: number;
  monthlyRevenueCommitment: number;
  totalClicks: number;
  totalOrders: number;
  totalRevenue: number;
  pendingCommission: number;
  confirmedCommission: number;
  paidCommission: number;
}
