import React from 'react';
import { useAppMode } from '../../hooks/useAppMode';
import { cn } from '../../lib/utils';
import { ShoppingBag, Zap } from 'lucide-react';
import { CaptionText } from '../ui/Typography';

interface ModeBadgeProps {
  className?: string;
}

export const ModeBadge: React.FC<ModeBadgeProps> = ({ className }) => {
  const { mode } = useAppMode();
  
  if (mode === 'customer') {
    return (
      <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 bg-customer-subtle border border-customer-primary/20 rounded-full", className)}>
        <ShoppingBag size={14} className="text-customer-primary" />
        <CaptionText className="text-customer-badge-text font-bold uppercase tracking-wider text-[10px]">
          Khách hàng
        </CaptionText>
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 bg-partner-subtle border border-partner-primary/20 rounded-full", className)}>
      <Zap size={14} className="text-partner-primary" />
      <CaptionText className="text-partner-badge-text font-bold uppercase tracking-wider text-[10px]">
        Đối tác
      </CaptionText>
    </div>
  );
};
