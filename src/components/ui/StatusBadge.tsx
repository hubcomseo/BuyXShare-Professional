import React from 'react';
import { Badge, BadgeProps, BadgeSize, BadgeVariant } from './Badge';

// --- Types ---

export type StatusAction = 'full' | 'short';

export interface BaseStatusBadgeProps extends Omit<BadgeProps, 'children' | 'variant'> {
  status: string;
  type?: StatusAction;
}

// --- Status Configs ---

const PAYMENT_STATUS: Record<string, { label: string; short: string; variant: BadgeVariant }> = {
  pending: { label: 'Chờ thanh toán', short: 'Chờ TT', variant: 'warning' },
  paid: { label: 'Đã thanh toán', short: 'Đã TT', variant: 'success' },
  failed: { label: 'Thanh toán lỗi', short: 'Lỗi TT', variant: 'error' },
  refunded: { label: 'Đã hoàn tiền', short: 'Hoàn tiền', variant: 'neutral' },
  cod_pending: { label: 'Chờ thanh toán COD', short: 'COD', variant: 'warning' },
};

const FULFILLMENT_STATUS: Record<string, { label: string; short: string; variant: BadgeVariant }> = {
  new: { label: 'Đơn mới', short: 'Mới', variant: 'info' },
  processing: { label: 'Đang xử lý', short: 'Xử lý', variant: 'customer' },
  shipped: { label: 'Đang giao', short: 'Giao', variant: 'info' },
  delivered: { label: 'Hoàn tất', short: 'Xong', variant: 'success' },
  completed: { label: 'Hoàn tất', short: 'Xong', variant: 'success' },
  cancelled: { label: 'Đã hủy', short: 'Hủy', variant: 'error' },
};

const COMMISSION_STATUS: Record<string, { label: string; short: string; variant: BadgeVariant }> = {
  pending: { label: 'Chờ đối soát', short: 'Chờ ĐS', variant: 'warning' },
  confirmed: { label: 'Đã xác nhận', short: 'Xác nhận', variant: 'commission' },
  paid: { label: 'Đã chi trả', short: 'Đã trả', variant: 'success' },
  cancelled: { label: 'Đã hủy', short: 'Hủy', variant: 'error' },
};

const REWARD_STATUS: Record<string, { label: string; short: string; variant: BadgeVariant }> = {
  pending: { label: 'Vé chờ xác nhận', short: 'Chờ', variant: 'warning' },
  confirmed: { label: 'Vé hợp lệ', short: 'Hợp lệ', variant: 'reward' },
  winner: { label: 'Trúng thưởng', short: 'Trúng', variant: 'success' },
  expired: { label: 'Hết hạn', short: 'Hết hạn', variant: 'neutral' },
};

const STOCK_STATUS: Record<string, { label: string; short: string; variant: BadgeVariant }> = {
  in_stock: { label: 'Còn hàng', short: 'Còn', variant: 'success' },
  low_stock: { label: 'Sắp hết hàng', short: 'Sắp hết', variant: 'warning' },
  out_of_stock: { label: 'Hết hàng', short: 'Hết', variant: 'error' },
};

const CAMPAIGN_STATUS: Record<string, { label: string; short: string; variant: BadgeVariant }> = {
  active: { label: 'Đang diễn ra', short: 'Mở', variant: 'success' },
  ended: { label: 'Đã kết thúc', short: 'Đóng', variant: 'neutral' },
  upcoming: { label: 'Sắp diễn ra', short: 'Sắp', variant: 'info' },
};

const RECONCILIATION_STATUS: Record<string, { label: string; short: string; variant: BadgeVariant }> = {
  pending: { label: 'Chờ đối soát', short: 'Chờ', variant: 'warning' },
  matched: { label: 'Khớp', short: 'Khớp', variant: 'success' },
  unmatched: { label: 'Lệch', short: 'Lệch', variant: 'error' },
};

// --- Components ---

export const StatusBadge: React.FC<BaseStatusBadgeProps & { config: Record<string, { label: string; short: string; variant: BadgeVariant }> }> = ({ status, config, type = 'full', ...props }) => {
  const item = config[status] || { label: status, short: status, variant: 'neutral' };
  return (
    <Badge variant={item.variant} {...props}>
      {type === 'short' ? item.short : item.label}
    </Badge>
  );
};

export const PaymentStatusBadge: React.FC<BaseStatusBadgeProps> = ({ status, type = 'full', ...props }) => {
  return <StatusBadge status={status} config={PAYMENT_STATUS} type={type} {...props} />;
};

export const FulfillmentStatusBadge: React.FC<BaseStatusBadgeProps> = ({ status, type = 'full', ...props }) => {
  return <StatusBadge status={status} config={FULFILLMENT_STATUS} type={type} {...props} />;
};

export const CommissionStatusBadge: React.FC<BaseStatusBadgeProps> = ({ status, type = 'full', ...props }) => {
  return <StatusBadge status={status} config={COMMISSION_STATUS} type={type} {...props} />;
};

export const RewardStatusBadge: React.FC<BaseStatusBadgeProps> = ({ status, type = 'full', ...props }) => {
  return <StatusBadge status={status} config={REWARD_STATUS} type={type} {...props} />;
};

export const ProductStockBadge: React.FC<BaseStatusBadgeProps> = ({ status, type = 'full', ...props }) => {
  return <StatusBadge status={status} config={STOCK_STATUS} type={type} {...props} />;
};

export const CampaignStatusBadge: React.FC<BaseStatusBadgeProps> = ({ status, type = 'full', ...props }) => {
  return <StatusBadge status={status} config={CAMPAIGN_STATUS} type={type} {...props} />;
};

export const ReconciliationStatusBadge: React.FC<BaseStatusBadgeProps> = ({ status, type = 'full', ...props }) => {
  return <StatusBadge status={status} config={RECONCILIATION_STATUS} type={type} {...props} />;
};

export const ProductCommissionBadge: React.FC<Omit<BadgeProps, 'children'> & { amount: string }> = ({ amount, ...props }) => {
  return (
    <Badge variant="commission" {...props}>
      {amount}
    </Badge>
  );
};

export const PartnerTypeBadge: React.FC<Omit<BadgeProps, 'children'> & { type: string }> = ({ type, ...props }) => {
  return (
    <Badge variant="partner" {...props}>
      {type}
    </Badge>
  );
};

export const ModeBadge: React.FC<Omit<BadgeProps, 'children'> & { mode: 'customer' | 'partner' }> = ({ mode, ...props }) => {
  return (
    <Badge variant={mode === 'customer' ? 'customer' : 'partner'} {...props}>
      {mode === 'customer' ? 'MUA HÀNG' : 'ĐỐI TÁC'}
    </Badge>
  );
};
