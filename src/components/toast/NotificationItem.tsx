import React from 'react';
import { motion } from 'motion/react';
import { Text, CaptionText } from '../ui/Typography';
import { IconContainer, AppIcon } from '../icon';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface NotificationItemProps {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead?: boolean;
  icon: LucideIcon;
  iconColor?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'customer' | 'partner';
  onClick?: () => void;
  className?: string;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  message,
  time,
  isRead = false,
  icon,
  iconColor = 'primary',
  onClick,
  className
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full flex items-start gap-4 p-4 text-left transition-colors relative",
        !isRead ? "bg-primary/5" : "bg-transparent hover:bg-black/5",
        className
      )}
    >
      <IconContainer 
        variant="soft" 
        color={iconColor} 
        size="md" 
        shape="circle" 
        className={cn("shrink-0", !isRead && "shadow-sm border border-primary/10")}
      >
        <AppIcon icon={icon} size="md" />
      </IconContainer>
      
      <div className="flex-1 min-w-0 pr-2">
        <Text variant="body-sm" weight={!isRead ? 600 : 500} color="dark" className="mb-0.5">
          {title}
        </Text>
        <CaptionText className={cn("line-clamp-2", !isRead ? "text-text-primary" : "text-text-muted")}>
          {message}
        </CaptionText>
        <CaptionText className="text-text-disabled mt-1.5 font-medium">
          {time}
        </CaptionText>
      </div>
      
      {!isRead && (
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary" />
      )}
    </motion.button>
  );
};
