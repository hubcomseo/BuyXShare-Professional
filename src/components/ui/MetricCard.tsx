import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from './Card';
import { useAppMode } from '../../hooks/useAppMode';
import { Text, MetricText, LabelText, CaptionText } from './Typography';
import { cn } from '../../lib/utils';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  color?: string;
  bg?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  label, 
  value, 
  icon: Icon, 
  trend, 
  trendType = 'neutral',
  color,
  bg,
  className
}) => {
  const { isPartner } = useAppMode();
  
  const defaultColor = color || (isPartner ? 'text-partner-primary' : 'text-customer-primary');
  const defaultBg = bg || (isPartner ? 'bg-partner-soft' : 'bg-customer-soft');

  return (
    <Card className={cn("p-5 flex flex-col gap-4 card-hover", className)}>
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", defaultBg, defaultColor)}>
        <Icon size={24} />
      </div>
      <div>
        <LabelText uppercase className="tracking-widest mb-1">{label}</LabelText>
        <MetricText size="sm">{value}</MetricText>
        {trend && (
          <CaptionText weight={500} className="mt-2 flex items-center gap-1" color={
            trendType === 'positive' ? 'success' : 
            trendType === 'negative' ? 'error' : 
            'muted'
          }>
            {trend}
          </CaptionText>
        )}
      </div>
    </Card>
  );
};
