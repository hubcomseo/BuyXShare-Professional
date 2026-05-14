import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { Text } from '../ui/Typography';
import { cn } from '../../lib/utils';
import { StatusIcon } from '../icon';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  id: string;
  variant: ToastVariant;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
  visible: boolean;
}

const variantStyles: Record<ToastVariant, { bg: string, icon: React.FC<any>, iconColor: string }> = {
  success: { bg: 'bg-emerald-50 border-emerald-200', icon: CheckCircle2, iconColor: 'text-emerald-500' },
  error: { bg: 'bg-rose-50 border-rose-200', icon: XCircle, iconColor: 'text-rose-500' },
  warning: { bg: 'bg-amber-50 border-amber-200', icon: AlertCircle, iconColor: 'text-amber-500' },
  info: { bg: 'bg-blue-50 border-blue-200', icon: Info, iconColor: 'text-blue-500' }
};

export const Toast: React.FC<ToastProps> = ({ id, variant, title, message, duration = 3000, onClose, visible }) => {
  const { bg } = variantStyles[variant];

  React.useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => onClose(id), duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, id, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
           layout
           initial={{ opacity: 0, y: 50, scale: 0.95 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
           className={cn("p-4 rounded-2xl border shadow-lg flex items-start gap-3 w-full max-w-sm pointer-events-auto", bg)}
        >
           <StatusIcon status={variant} size="md" className="shrink-0 mt-0.5" />
           <div className="flex-1 min-w-0">
             <Text variant="body-sm" weight={600} color="dark">{title}</Text>
             {message && <Text variant="caption" className="text-text-primary/70 mt-0.5">{message}</Text>}
           </div>
           <button onClick={() => onClose(id)} className="p-1 -mr-1 rounded-full hover:bg-black/5 text-text-primary/50 transition-colors">
              <X size={16} />
           </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
