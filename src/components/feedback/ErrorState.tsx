import React from 'react';
import { Text, CaptionText } from '../ui/Typography';
import { Button } from '../ui';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';
import { StatusIcon } from '../icon';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Có lỗi xảy ra",
  description = "Không thể tải dữ liệu lúc này. Vui lòng thử lai.",
  onRetry,
  className
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("py-16 px-6 text-center flex flex-col items-center justify-center space-y-6", className)}
    >
      <div className="relative">
         <StatusIcon status="error" size="xl" withContainer />
         <div className="absolute inset-0 bg-error/20 rounded-full blur-xl mix-blend-overlay"></div>
      </div>
      <div className="max-w-[280px]">
        <Text variant="h3" weight={600} color="dark" className="mb-2">{title}</Text>
        <CaptionText className="leading-relaxed">{description}</CaptionText>
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} leftIcon={<RefreshCcw size={16} />} className="rounded-full px-6 border-border-subtle hover:bg-surface-elevated">
          Thử lại
        </Button>
      )}
    </motion.div>
  );
};
