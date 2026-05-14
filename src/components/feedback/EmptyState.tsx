import React from 'react';
import { Text, CaptionText } from '../ui/Typography';
import { Button } from '../ui';
import { LucideIcon, PackageOpen } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';
import { AppIcon, IconContainer } from '../icon';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon = PackageOpen,
  actionLabel,
  onAction,
  className
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("py-20 px-6 text-center flex flex-col items-center justify-center space-y-6", className)}
    >
      <IconContainer size="empty" variant="soft" color="surface" shape="circle" className="border border-dashed border-border-subtle relative bg-surface-soft">
         <AppIcon icon={Icon} size="empty" className="text-text-disabled" />
         <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl mix-blend-overlay"></div>
      </IconContainer>
      <div className="max-w-[280px]">
        <Text variant="h3" weight={600} color="dark" className="mb-2">{title}</Text>
        {description && <CaptionText className="leading-relaxed">{description}</CaptionText>}
      </div>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction} className="rounded-full px-8 shadow-md">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};
