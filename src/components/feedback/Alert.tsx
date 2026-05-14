import React from 'react';
import { AlertTriangle, Info, CheckCircle2, XCircle } from 'lucide-react';
import { Text, CaptionText } from '../ui/Typography';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';
import { StatusIcon } from '../icon';

type AlertVariant = 'info' | 'warning' | 'error' | 'success';

interface AlertProps {
  variant?: AlertVariant;
  title: string;
  message?: string;
  action?: React.ReactNode;
  className?: string;
}

const variantConfig: Record<AlertVariant, { bg: string, border: string, titleColor: string }> = {
  info: { bg: 'bg-info/10', border: 'border-info/20', titleColor: 'text-info' },
  warning: { bg: 'bg-warning/10', border: 'border-warning/20', titleColor: 'text-warning-dark' },
  error: { bg: 'bg-error/10', border: 'border-error/20', titleColor: 'text-error' },
  success: { bg: 'bg-success/10', border: 'border-success/20', titleColor: 'text-success' },
};

export const Alert: React.FC<AlertProps> = ({ variant = 'info', title, message, action, className }) => {
  const config = variantConfig[variant];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("p-4 rounded-xl border flex items-start gap-3", config.bg, config.border, className)}
    >
      <StatusIcon status={variant} size="md" className="shrink-0 mt-0.5" />
      <div className="flex-1 space-y-1">
        <Text variant="body-sm" weight={600} className={config.titleColor}>{title}</Text>
        {message && <CaptionText className="text-opacity-80">{message}</CaptionText>}
        {action && <div className="mt-2">{action}</div>}
      </div>
    </motion.div>
  );
};
