import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Text, CaptionText } from '../ui/Typography';
import { Button } from '../ui';
import { StatusIcon } from '../icon';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = "Xác nhận",
  cancelLabel = "Hủy",
  onConfirm,
  onCancel,
  isDestructive = false
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onCancel}
        />
        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.95, y: 20 }}
           className="relative w-full max-w-sm bg-surface rounded-2xl p-6 shadow-md border border-border-subtle"
        >
           <div className="flex flex-col items-center text-center space-y-4">
              <StatusIcon status={isDestructive ? 'error' : 'warning'} size="md" withContainer />
              <div>
                <Text variant="h3" weight={600} color="dark" className="mb-2">{title}</Text>
                <CaptionText className="leading-relaxed">{message}</CaptionText>
              </div>
              <div className="flex gap-3 w-full pt-2">
                 <Button variant="ghost" fullWidth onClick={onCancel} className="rounded-md bg-surface-soft hover:bg-surface-elevated">
                   {cancelLabel}
                 </Button>
                 <Button variant={isDestructive ? "primary" : "primary"} fullWidth onClick={onConfirm} className={`rounded-md ${isDestructive ? 'bg-error hover:bg-error/90 text-white' : ''}`}>
                   {confirmLabel}
                 </Button>
              </div>
           </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
