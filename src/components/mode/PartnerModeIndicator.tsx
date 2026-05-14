import React from 'react';
import { cn } from '../../lib/utils';
import { Zap } from 'lucide-react';
import { Text } from '../ui/Typography';

interface PartnerModeIndicatorProps {
  className?: string;
  showLabel?: boolean;
}

export const PartnerModeIndicator: React.FC<PartnerModeIndicatorProps> = ({ className, showLabel = true }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
       <div className="w-8 h-8 rounded-full bg-partner-subtle flex items-center justify-center border border-partner-primary/20 shrink-0">
          <Zap size={14} className="text-partner-primary" />
       </div>
       {showLabel && (
         <div className="flex flex-col">
            <Text variant="caption" weight={600} className="text-partner-badge-text text-[10px] uppercase tracking-wider">Chế độ</Text>
            <Text variant="body-sm" weight={600} className="text-white leading-tight">Đối tác</Text>
         </div>
       )}
    </div>
  );
};
