import React from 'react';
import { Button } from '../ui';
import { cn } from '../../lib/utils';
import { PaymentStatus, FulfillmentStatus } from '../../types/order';

export type TabStatus = 'all' | PaymentStatus | FulfillmentStatus;

interface OrderStatusTabsProps {
  activeTab: TabStatus;
  setActiveTab: (tab: TabStatus) => void;
  tabs: { id: string; label: string; count: number; icon: React.ReactNode }[];
}

export const OrderStatusTabs = ({ activeTab, setActiveTab, tabs }: OrderStatusTabsProps) => {
  return (
    <div className="overflow-x-auto no-scrollbar px-4">
      <div className="flex gap-2 pb-2 snap-x">
        {tabs.map(tab => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabStatus)}
            className={cn(
              "px-4 py-2.5 rounded-full text-[13px] font-semibold whitespace-nowrap snap-center transition-all cursor-pointer shadow-sm border flex items-center gap-2",
              activeTab === tab.id 
                ? "bg-primary text-white border-primary shadow-primary/20" 
                : "bg-surface text-text-secondary border-border-subtle hover:border-primary/30"
            )}
          >
            {tab.icon && <span className={cn(activeTab === tab.id ? "opacity-90" : "opacity-60")}>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span className={cn(
                "ml-1 font-black text-[11px] px-1.5 py-0.5 rounded-full",
                activeTab === tab.id ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
              )}>
                {tab.count}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
