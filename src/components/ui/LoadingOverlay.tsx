import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../store';
import { Logo } from '../Logo';

export const LoadingOverlay = () => {
  const { isLoading } = useStore();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-surface/60 backdrop-blur-sm flex flex-col items-center justify-center p-6"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full border-2 border-primary/10 border-t-primary"
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-text-primary/60 text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            Vui lòng đợi...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
