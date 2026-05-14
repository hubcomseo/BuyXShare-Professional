import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { Text, CaptionText } from '../ui/Typography';
import { Button } from '../ui';
import { StatusIcon } from '../icon';

interface SuccessStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction
}) => {
  return (
    <div className="py-16 px-6 text-center flex flex-col items-center justify-center space-y-8">
       <motion.div
         initial={{ scale: 0, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ type: "spring", stiffness: 200, damping: 20 }}
         className="relative"
       >
          <StatusIcon status="success" size="empty" withContainer />
          <div className="absolute inset-0 bg-success/20 rounded-full blur-xl animate-pulse"></div>
       </motion.div>

       <div className="space-y-2 max-w-[280px]">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
             <Text variant="h3" weight={600} color="dark">{title}</Text>
          </motion.div>
          {description && (
             <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
               <CaptionText className="leading-relaxed">{description}</CaptionText>
             </motion.div>
          )}
       </div>

       <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="w-full max-w-[280px] space-y-3">
          {actionLabel && onAction && (
             <Button variant="primary" fullWidth onClick={onAction} className="rounded-full shadow-lg shadow-primary/20">
               {actionLabel}
             </Button>
          )}
          {secondaryActionLabel && onSecondaryAction && (
             <Button variant="ghost" fullWidth onClick={onSecondaryAction} className="rounded-full">
               {secondaryActionLabel}
             </Button>
          )}
       </motion.div>
    </div>
  );
};
