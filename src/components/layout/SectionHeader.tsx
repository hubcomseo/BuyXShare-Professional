import React from 'react';
import { cn } from '../../lib/utils';
import { SectionTitle, CaptionText } from '../ui/Typography';
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
    <div className={cn("flex flex-row items-center justify-between mb-4", className)}>
      <div className="flex flex-col flex-1 min-w-0">
        <SectionTitle size="sm" className="truncate leading-tight">
          {title}
        </SectionTitle>
        {description && (
          <CaptionText className="truncate mt-0.5">
            {description}
          </CaptionText>
        )}
      </div>
      {action && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={action.onClick}
          rightIcon={<ChevronRight size={16} />}
          className="text-primary hover:bg-primary/5 pr-1 -mr-2 shrink-0 h-8"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};
