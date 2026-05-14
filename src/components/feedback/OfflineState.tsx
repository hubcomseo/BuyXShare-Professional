import React from 'react';
import { WifiOff, RefreshCcw } from 'lucide-react';
import { Text, CaptionText } from '../ui/Typography';
import { Button } from '../ui';
import { motion } from 'motion/react';
import { AppIcon, IconContainer } from '../icon';

export const OfflineState: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => {
  return (
    <div className="py-20 px-6 text-center flex flex-col items-center justify-center space-y-6">
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <IconContainer size="empty" variant="outline" color="surface" shape="circle" className="border-border-subtle bg-surface-elevated">
           <AppIcon icon={WifiOff} size="xl" className="text-text-muted" />
        </IconContainer>
      </motion.div>
      <div className="max-w-[280px]">
        <Text variant="h3" weight={600} color="dark" className="mb-2">Không có kết nối</Text>
        <CaptionText className="leading-relaxed">Vui lòng kiểm tra lại kết nối mạng của bạn và thử lại.</CaptionText>
      </div>
      {onRetry && (
        <Button variant="primary" onClick={onRetry} leftIcon={<RefreshCcw size={16} />} className="rounded-full px-8 shadow-md">
          Thử lại
        </Button>
      )}
    </div>
  );
};
