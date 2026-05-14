import React from 'react';
import { cn } from '../../lib/utils';
import { ShieldCheck, Zap } from 'lucide-react';
import { Badge } from '../ui';

export const PartnerModeBadge = ({ isRegistered = false, className }: { isRegistered?: boolean, className?: string }) => {
  return (
    <Badge 
      variant="partner" 
      size="sm" 
      uppercase 
      className={cn("gap-1.5", className)}
    >
      {isRegistered ? <ShieldCheck size={12} /> : <Zap size={12} />}
      Đối tác {isRegistered ? '(12%)' : '(5%)'}
    </Badge>
  );
};
