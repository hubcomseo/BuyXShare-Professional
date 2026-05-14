import React from 'react';
import { useAppMode } from '../../hooks/useAppMode';
import { cn } from '../../lib/utils';
import { ShoppingBag, Zap, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IconButton } from '../ui/IconButton';

interface ModeSwitchProps {
  className?: string;
}

export const ModeSwitch: React.FC<ModeSwitchProps> = ({ className }) => {
  const { mode, setMode } = useAppMode();
  const isPartner = mode === 'partner';

  return (
    <div className={cn("inline-flex items-center p-1 bg-surface-soft rounded-full border border-border-subtle", className)}>
      <button
        onClick={() => setMode('customer')}
        className={cn(
          "relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors z-10",
          !isPartner ? "text-white" : "text-text-muted hover:text-text-primary"
        )}
      >
        <ShoppingBag size={16} />
        <span>Khách hàng</span>
        {!isPartner && (
          <motion.div 
            layoutId="mode-switch-active"
            className="absolute inset-0 bg-customer-primary rounded-full -z-10 shadow-lg shadow-customer-primary/25"
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </button>
      
      <button
        onClick={() => setMode('partner')}
        className={cn(
          "relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors z-10",
          isPartner ? "text-bg-base" : "text-text-muted hover:text-text-primary"
        )}
      >
        <Zap size={16} />
        <span>Đối tác</span>
        {isPartner && (
          <motion.div 
            layoutId="mode-switch-active"
            className="absolute inset-0 bg-partner-primary rounded-full -z-10 shadow-lg shadow-partner-primary/25"
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </button>
    </div>
  );
};

export const ModeIconSwitcher: React.FC<ModeSwitchProps> = ({ className }) => {
  const { isPartner, setMode } = useAppMode();

  return (
    <div className={cn("relative z-10", className)}>
      <button
        onClick={() => setMode(isPartner ? 'customer' : 'partner')}
        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-surface-soft border border-border-subtle overflow-hidden"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={isPartner ? 'partner' : 'customer'}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              isPartner ? "text-partner-primary" : "text-customer-primary"
            )}
          >
            {isPartner ? <Zap size={20} /> : <ShoppingBag size={20} />}
          </motion.div>
        </AnimatePresence>
      </button>
    </div>
  );
};
