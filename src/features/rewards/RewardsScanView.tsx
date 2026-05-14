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
    <div>
      {/* Header Overly */}
      <div>
         <IconButton 
            icon={<X size={24} color="white" />} label="Action" 
            onClick={() => navigate(-1)}
         />
         <div>
            <Text color="white" weight={600}>Scanner Active</Text>
         </div>
         <div /> {/* Spacer */}
      </div>

      {/* Camera Viewport Mockup */}
      <div>
         {/* The "Lens" Area */}
         <div>
            {/* Corners */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>

            {/* Scanning Line */}
            {isScanning && (
              <motion.div 
                initial={{ top: '10%' }}
                animate={{ top: '90%' }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            )}

            {/* Found Code UI */}
            <AnimatePresence>
              {hasResult && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <div>
                     <ShieldCheck size={48} />
                     <CaptionText color="white" weight={600}>Code Verified</CaptionText>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
         </div>

         {/* Hint Text */}
         <div>
            <Heading variant="h3" color="white">
               {hasResult ? 'Scan complete!' : 'Align QR Code'}
            </Heading>
            <CaptionText>
               {hasResult ? 'Redirecting to your reward status...' : 'Point your camera at the QR on your shipping label or store receipt.'}
            </CaptionText>
         </div>
      </div>

      {/* Result Bottom Sheet */}
      <AnimatePresence>
        {hasResult && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
          >
             <div />
             <div>
                <div>
                   <Zap size={18} />
                   <LabelText color="inherit" weight={600}>FOUND: ORD-12345</LabelText>
                </div>
                <Heading variant="h2" color="dark">Verified Purchase</Heading>
             </div>
             
             <div>
                <div>
                   <QrCode size={24} />
                </div>
                <div>
                   <BodyText weight={600}>DexSpace Lottery Ticket</BodyText>
                   <CaptionText>Issued: May 12, 2024</CaptionText>
                </div>
                <Badge variant="success">Confirmed</Badge>
             </div>

             <Button 
               fullWidth 
               size="xl" 
               onClick={() => navigate('/p/track?q=12345')}
             >
                VIEW REWARD STATUS
             </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
