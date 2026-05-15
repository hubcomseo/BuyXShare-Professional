import React from 'react';
import { cn } from '../../lib/utils';
import { SectionTitle, CaptionText, PromoTitle, Eyebrow } from '../ui/Typography';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui';

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  description, 
  action, 
  className
}) => {
  return (
    <div className={cn("flex flex-row items-center justify-between py-1", className)}>
      <div className="flex flex-col flex-1 min-w-0">
        <PromoTitle className="truncate leading-none">
          {title}
        </PromoTitle>
        {description && (
          <Eyebrow className="truncate mt-0.5">
            {description}
          </Eyebrow>
        )}
      </div>
      {action && (
        <Button 
          variant="ghost" 
          size="xs" 
          onClick={action.onClick}
          rightIcon={<ChevronRight size={14} />}
          className="text-primary hover:bg-transparent pr-0 -mr-1 shrink-0 h-6"
        >
          <Eyebrow color="primary" weight={700} className="tracking-widest text-[10px]">
            {action.label}
          </Eyebrow>
        </Button>
      )}
    </div>
  );
};
