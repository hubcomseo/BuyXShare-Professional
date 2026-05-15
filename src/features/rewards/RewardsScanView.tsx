import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, QrCode, Zap, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Text, Heading, BodyText, LabelText, CaptionText } from '../../components/ui/Typography';
import { IconButton, Button, Badge } from '../../components/ui';

export const RewardsScanView = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(true);
  const [hasResult, setHasResult] = useState(false);

  useEffect(() => {
    // Simulate finding a code after 3 seconds
    const timer = setTimeout(() => {
      setIsScanning(false);
      setHasResult(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col font-sans">
      {/* Header Overlay */}
      <div className="absolute top-0 inset-x-0 p-6 flex items-center justify-between z-50 pt-12">
         <IconButton 
            icon={<X size={24} className="text-white" strokeWidth={2.5} />} 
            label="Close" 
            variant="ghost"
            className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/20"
            onClick={() => navigate(-1)}
         />
         <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-customer-primary animate-pulse shadow-[0_0_8px_var(--color-customer-primary)]"></div>
            <Text color="white" weight={800} className="uppercase tracking-[2px] text-[10px] italic">Scanner Active</Text>
         </div>
         <div className="w-12 h-12" /> {/* Spacer */}
      </div>

      {/* Camera Viewport Mockup */}
      <div className="flex-1 flex flex-col items-center justify-center p-10 relative">
         {/* Background noise/texture for camera feel */}
         <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

         {/* The "Lens" Area */}
         <div className="relative w-full max-w-[280px] aspect-square group">
            {/* Corners */}
            <div className="absolute -top-1 -left-1 w-10 h-10 border-t-4 border-l-4 border-customer-primary rounded-tl-3xl shadow-lg shadow-customer-primary/20"></div>
            <div className="absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-customer-primary rounded-tr-3xl shadow-lg shadow-customer-primary/20"></div>
            <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-customer-primary rounded-bl-3xl shadow-lg shadow-customer-primary/20"></div>
            <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-4 border-r-4 border-customer-primary rounded-br-3xl shadow-lg shadow-customer-primary/20"></div>

            {/* Inner Border */}
            <div className="absolute inset-2 border-2 border-white/10 rounded-2xl"></div>

            {/* Scanning Line */}
            {isScanning && (
              <motion.div 
                initial={{ top: '10%' }}
                animate={{ top: '90%' }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-4 right-4 h-1 bg-gradient-to-r from-transparent via-customer-primary to-transparent z-10 shadow-[0_0_15px_var(--color-customer-primary)]"
              />
            )}

            {/* Found Code UI */}
            <AnimatePresence>
              {hasResult && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-reward-primary/20 backdrop-blur-[2px] rounded-2xl z-20"
                >
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-white rounded-[2rem] flex flex-col items-center justify-center text-reward-primary shadow-2xl shadow-reward-primary/40 mb-3"
                  >
                     <ShieldCheck size={48} strokeWidth={2.5} />
                  </motion.div>
                  <CaptionText color="white" weight={800} className="uppercase tracking-widest text-[11px] italic bg-reward-primary px-3 py-1 rounded-full">{hasResult ? 'Code Verified' : ''}</CaptionText>
                </motion.div>
              )}
            </AnimatePresence>
         </div>

         {/* Hint Text */}
         <div className="mt-12 text-center space-y-4 max-w-[300px]">
            <Heading level={2} color="white" className="text-2xl font-black italic uppercase tracking-tighter">
               {hasResult ? 'Scan complete!' : 'Align QR Code'}
            </Heading>
            <CaptionText weight={500} className="text-white/60 leading-relaxed text-sm">
               {hasResult ? 'Redirecting to your reward status...' : 'Point your camera at the QR on your shipping label or store receipt.'}
            </CaptionText>
         </div>
      </div>

      {/* Result Bottom Sheet */}
      <AnimatePresence>
        {hasResult && (
          <motion.div 
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-0 inset-x-0 bg-white rounded-t-[3rem] p-8 pb-12 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] z-50"
          >
             <div className="w-12 h-1.5 bg-bg-soft rounded-full mx-auto mb-8 shadow-inner" />
             
             <div className="flex flex-col gap-8">
                <div className="space-y-4">
                   <div className="flex items-center gap-3 bg-reward-soft px-4 py-2 w-fit rounded-full border border-reward-primary/20">
                      <Zap size={18} className="text-reward-primary animate-pulse" strokeWidth={2.5} />
                      <LabelText color="dark" weight={800} className="uppercase italic tracking-tighter text-xs text-reward-primary">FOUND: ORD-12345</LabelText>
                   </div>
                   <Heading level={2} color="dark" className="text-3xl font-black tracking-tighter uppercase italic leading-none">Verified Purchase</Heading>
                </div>
                
                <div className="flex items-center gap-5 p-6 bg-bg-soft rounded-3xl border border-border-subtle relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-customer-primary/5 rounded-full blur-2xl group-hover:bg-customer-primary/10 transition-colors"></div>
                   <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0 border border-border-subtle">
                      <QrCode size={32} className="text-customer-primary" strokeWidth={1.5} />
                   </div>
                   <div className="flex-1 space-y-1">
                      <BodyText weight={800} className="text-lg uppercase italic tracking-tight leading-none text-text-primary">DEXSPACE TICKET</BodyText>
                      <CaptionText weight={600} className="text-[11px] text-text-disabled uppercase tracking-widest font-mono">Issued: May 12, 2024</CaptionText>
                   </div>
                   <Badge variant="reward" size="sm" className="font-bold">Confirmed</Badge>
                </div>

                <Button 
                   fullWidth 
                   size="xl" 
                   variant="customer"
                   className="h-16 rounded-2xl font-black italic tracking-tighter uppercase text-lg shadow-xl shadow-customer-primary/20"
                   onClick={() => navigate('/p/track?q=12345')}
                >
                   VIEW REWARD STATUS
                </Button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
