import React from 'react';
import { Badge, Button } from '../ui';
import { CardTitle } from '../ui/Typography';
import { LucideIcon } from 'lucide-react';

interface CampaignPerformanceCardProps {
  title: string;
  earn: string;
  icon: LucideIcon;
  colorClass: string;
  bgClass: string;
}

export const CampaignPerformanceCard: React.FC<CampaignPerformanceCardProps> = ({ title, earn, icon: Icon, colorClass, bgClass }) => {
  return (
    <div className="min-w-[240px] bg-surface rounded-xl p-5 border border-border-subtle shadow-sm group hover:border-partner-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${bgClass} rounded-lg flex items-center justify-center shadow-sm`}>
          <Icon size={22} className={colorClass} />
        </div>
        <div className="bg-partner-primary/10 text-partner-primary text-[10px] font-bold px-2 py-1 rounded-md tracking-wider">
          {earn}
        </div>
      </div>
      <CardTitle className="mb-4 text-base">{title}</CardTitle>
      <Button 
         variant="secondary"
         size="sm"
         fullWidth
         className="bg-bg-base hover:bg-surface-elevated hover:text-white border-border-subtle shadow-sm rounded-md h-10"
      >
         Lấy code
      </Button>
    </div>
  );
};
