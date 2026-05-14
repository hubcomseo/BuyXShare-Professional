import React from 'react';
import { CheckCircle2, Clock, Truck, PackageCheck, ShieldCheck, Wallet, CreditCard } from 'lucide-react';
import { Order } from '../../types/order';

import { CaptionText } from '../ui/Typography';

interface OrderTimelineProps {
  order: Order;
}

export const OrderTimeline = ({ order }: OrderTimelineProps) => {
  const steps = [
    { 
      id: 'created',
      label: 'Order Created', 
      icon: Clock, 
      time: order.createdAt,
      isDone: true,
      color: 'text-primary-light'
    },
    { 
      id: 'paid',
      label: 'Payment Successful', 
      icon: CreditCard, 
      time: order.paidAt,
      isDone: order.paymentStatus === 'paid',
      color: 'text-primary-light'
    },
    { 
      id: 'processing',
      label: 'Supplier Processing', 
      icon: PackageCheck, 
      time: order.processingAt,
      isDone: ['processing', 'shipped', 'completed'].includes(order.fulfillmentStatus),
      color: 'text-amber-500'
    },
    { 
      id: 'shipped',
      label: 'Shipped', 
      icon: Truck, 
      time: order.shippedAt,
      isDone: ['shipped', 'completed'].includes(order.fulfillmentStatus),
      color: 'text-blue-500'
    },
    { 
      id: 'completed',
      label: 'Order Delivered', 
      icon: CheckCircle2, 
      time: order.completedAt,
      isDone: order.fulfillmentStatus === 'completed',
      color: 'text-emerald-500'
    },
    { 
      id: 'reconciled',
      label: 'Verified & Rewards Issued', 
      icon: ShieldCheck, 
      time: order.reconciledAt,
      isDone: order.reconciliationStatus === 'reconciled',
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="space-y-6 relative">
      {/* Connector Line */}
      <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-border-subtle" />

      {steps.map((step, i) => {
        const Icon = step.icon;
        const isActive = step.isDone;
        
        return (
          <div key={step.id} className="flex gap-4 relative">
             <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 z-10 transition-all ${isActive ? `${step.color} bg-surface-elevated shadow-lg shadow-black/20` : 'bg-surface text-text-muted'}`}>
                {isActive ? <Icon size={20} strokeWidth={2.5} /> : <Icon size={20} />}
             </div>
             <div className="pt-2">
                <CaptionText weight={600} color={isActive ? 'dark' : 'muted'} className="uppercase tracking-widest">{step.label}</CaptionText>
                {step.time ? (
                  <CaptionText color="muted" className="mt-0.5">
                    {new Date(step.time).toLocaleString('vi-VN', { 
                      day: '2-digit', month: '2-digit', year: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </CaptionText>
                ) : (
                  <CaptionText color="muted" className="opacity-40 mt-0.5 italic">Pending</CaptionText>
                )}
             </div>
          </div>
        );
      })}
    </div>
  );
};
