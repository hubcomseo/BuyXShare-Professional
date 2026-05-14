import React from 'react';
import { Package } from 'lucide-react';
import { TabStatus } from './OrderStatusTabs';
import { EmptyState } from '../feedback';

interface OrderEmptyStateProps {
  activeTab: TabStatus;
  setActiveTab: (tab: TabStatus) => void;
}

export const OrderEmptyState = ({ activeTab, setActiveTab }: OrderEmptyStateProps) => {
  return (
    <EmptyState
       icon={Package}
       title={activeTab === 'all' ? "Chưa có đơn hàng" : "Trống"}
       description={activeTab === 'all' ? "Hãy bắt đầu mua sắm ngay" : "Không tìm thấy đơn hàng phù hợp"}
       actionLabel={activeTab !== 'all' ? "Xem tất cả" : undefined}
       onAction={activeTab !== 'all' ? () => setActiveTab('all') : undefined}
    />
  );
}
