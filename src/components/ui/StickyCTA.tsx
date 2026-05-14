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
            'fixed bottom-0 left-0 right-0 z-40 bg-bg-base/90 backdrop-blur-xl border-t border-border-subtle',
            'px-4 pt-4 pb-[calc(env(safe-area-inset-bottom)+12px)]',
            'md:max-w-md md:mx-auto md:left-1/2 md:-translate-x-1/2 md:rounded-t-2xl md:border-x',
            className
          )}
        >
          <div className="flex items-center gap-4">
            {(title || subtitle) && (
              <div className="flex-1 min-w-0">
                {subtitle && (
                  <div className="text-text-muted text-[12px] font-medium uppercase tracking-wider truncate">
                    {subtitle}
                  </div>
                )}
                {title && (
                  <div className="text-text-primary text-[18px] font-semibold truncate">
                    {title}
                  </div>
                )}
              </div>
            )}
            
            <div className={cn('flex items-center gap-2', !(title || subtitle) ? 'w-full' : 'shrink-0')}>
              {secondaryAction && (
                <Button 
                  variant="secondary" 
                  size="md" 
                  className={cn(!(title || subtitle) ? 'flex-1' : '')}
                  {...secondaryAction}
                >
                  {secondaryAction.label}
                </Button>
              )}
              <Button 
                variant="accent" 
                size="lg" 
                className={cn(!(title || subtitle) ? 'flex-1' : '')}
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
