import React from 'react';
import { Text, CaptionText } from '../ui';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PartnerMetricCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  colorClass: string;
  bgClass: string;
  className?: string;
  onClick?: () => void;
}

export const PartnerMetricCard: React.FC<PartnerMetricCardProps> = ({ label, value, icon: Icon, colorClass, bgClass, className, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "p-4 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:bg-surface-elevated transition-all duration-300 bg-surface",
        className,
        onClick && "cursor-pointer active:scale-95"
      )}
    >
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm", bgClass)}>
        <Icon size={18} className={colorClass} />
      </div>
      <Text variant="body-sm" color="white" weight={600} className="leading-none mb-1 text-lg">{value}</Text>
      <CaptionText className="text-[11px] uppercase tracking-wider">{label}</CaptionText>
    </div>
  );
};
