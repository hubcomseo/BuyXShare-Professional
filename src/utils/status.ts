import { CommissionStatus } from '../types/commission';
import { TicketStatus } from '../types/reward';

export const getOrderStatusLabel = (status: any) => {
  const labels: any = {
    new: 'Đơn mới',
    processing: 'Đang xử lý',
    shipped: 'Đang giao',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy',
    pending: 'Chờ thanh toán',
    paid: 'Đã thanh toán',
    failed: 'Thất bại',
    refunded: 'Hoàn tiền'
  };
  return labels[status] || status;
};

export const getCommissionStatusLabel = (status: CommissionStatus) => {
  const labels: Record<CommissionStatus, string> = {
    pending: 'Chờ xử lý',
    confirmed: 'Đã xác nhận',
    paid: 'Đã thanh toán',
    cancelled: 'Đã hủy'
  };
  return labels[status] || status;
};

export const formatStatus = (status: string) => {
  const allLabels: Record<string, string> = {
    pending: 'Chờ xử lý',
    confirmed: 'Đã xác nhận',
    paid: 'Đã thanh toán',
    cancelled: 'Đã hủy',
    completed: 'Hoàn thành',
    new: 'Mới',
    processing: 'Đang xử lý',
    shipped: 'Đang giao'
  };
  return allLabels[status] || status;
};

export const getTicketStatusLabel = (status: TicketStatus) => {
  const labels: Record<TicketStatus, string> = {
    pending: 'Chờ đối soát',
    confirmed: 'Đã phát hành',
    expired: 'Hết hạn',
    winner: 'Đã trúng thưởng'
  };
  return labels[status] || status;
};
