import React from 'react';
import { Button, ButtonProps } from './Button';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface StickyCTAProps {
  primaryAction: ButtonProps & { label: string };
  secondaryAction?: ButtonProps & { label: string };
  title?: string;
  subtitle?: string;
  className?: string;
  visible?: boolean;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({
  primaryAction,
  secondaryAction,
  title,
  subtitle,
  className = '',
  visible = true,
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className={cn(
            'fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border-subtle shadow-lg shadow-black/5',
            'px-4 pt-4 pb-[calc(env(safe-area-inset-bottom)+12px)]',
            'md:max-w-md md:mx-auto md:left-1/2 md:-translate-x-1/2 md:rounded-t-3xl md:border-x',
            className
          )}
        >
          <div className="flex items-center gap-4">
            {(title || subtitle) && (
              <div className="flex-1 min-w-0">
                {subtitle && (
                  <div className="text-text-muted text-[11px] font-bold uppercase tracking-wider truncate mb-0.5">
                    {subtitle}
                  </div>
                )}
                {title && (
                  <div className="text-text-primary text-[21px] font-heading font-black italic truncate tracking-tighter leading-none">
                    {title}
                  </div>
                )}
              </div>
            )}
            
            <div className={cn('flex items-center gap-3', !(title || subtitle) ? 'w-full' : 'shrink-0')}>
              {secondaryAction && (
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className={cn(!(title || subtitle) ? 'flex-1' : '')}
                  {...secondaryAction}
                >
                  {secondaryAction.label}
                </Button>
              )}
              <Button 
                variant="buy" 
                size="lg" 
                className={cn(!(title || subtitle) ? 'flex-1' : '', "px-8")}
                important
                {...primaryAction}
              >
                {primaryAction.label}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
