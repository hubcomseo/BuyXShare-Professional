import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Text } from '../ui/Typography';
import { cn } from '../../lib/utils';
import { StatusIcon } from '../icon';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id?: string;
  variant?: ToastVariant;
  title: string;
  message?: string;
  onClose?: () => void;
  visible?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const variantStyles: Record<ToastVariant, { bg: string }> = {
  success: { bg: 'bg-surface border-success/20 text-text-primary' },
  error: { bg: 'bg-surface border-error/20 text-text-primary' },
  warning: { bg: 'bg-surface border-warning/20 text-text-primary' },
  info: { bg: 'bg-surface border-info/20 text-text-primary' }
};

export const Toast: React.FC<ToastProps> = ({ 
  variant = 'info', 
  title, 
  message, 
  onClose, 
  visible = true,
  className,
  icon
}) => {
  const { bg } = variantStyles[variant];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
           layout
           initial={{ opacity: 0, y: 50, scale: 0.95 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
           className={cn(
             "p-4 rounded-xl border shadow-lg flex items-start gap-3 w-full max-w-sm pointer-events-auto", 
             bg,
             className
           )}
        >
           {icon ? (
             <div className="shrink-0 mt-0.5">{icon}</div>
           ) : (
             <StatusIcon status={variant} size="md" className="shrink-0 mt-0.5" />
           )}
           <div className="flex-1 min-w-0">
             <Text variant="body-sm" weight={600} color="dark">{title}</Text>
             {message && <Text variant="caption" className="text-text-primary/70 mt-0.5 leading-relaxed">{message}</Text>}
           </div>
           {onClose && (
             <button onClick={onClose} className="p-1 -mr-1 rounded-full hover:bg-black/5 text-text-primary/50 transition-colors">
                <X size={16} />
             </button>
           )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
