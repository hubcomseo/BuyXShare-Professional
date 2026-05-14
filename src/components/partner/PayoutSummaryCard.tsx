import React from 'react';
import { Button } from '../ui';
import { Card } from '../ui/Card';
import { Heading, CaptionText } from '../ui/Typography';
import { formatMoney } from '../../utils/money';
import { AlertCircle } from 'lucide-react';

interface PayoutSummaryCardProps {
  balance: number;
  minThreshold: number;
  onRequestPayout: () => void;
  isRequesting: boolean;
}

export const PayoutSummaryCard = ({ balance, minThreshold, onRequestPayout, isRequesting }: PayoutSummaryCardProps) => {
  const isEligible = balance >= minThreshold;

  return (
    <Card className="p-6 bg-gradient-to-br from-partner-soft to-bg-soft border border-partner-primary/20 shadow-md shadow-partner-primary/10 relative overflow-hidden group">
       <div className="absolute top-0 right-0 w-48 h-48 bg-partner-primary/20 rounded-full blur-[60px] -mr-24 -mt-24 group-hover:bg-partner-primary/30 transition-all duration-700" />
       <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-2 h-2 rounded-full bg-partner-primary animate-pulse"></div>
             <CaptionText className="text-white/70" weight={600}>Số dư khả dụng</CaptionText>
          </div>
          <Heading variant="h1" className="text-white">
             {formatMoney(balance).split('đ')[0]}
             <span className="text-lg text-partner-primary ml-1">VND</span>
          </Heading>
       </div>
       
       <Button 
         disabled={!isEligible}
         onClick={onRequestPayout}
         variant={isEligible ? "primary" : "secondary"}
         size="md"
         fullWidth
         loading={isRequesting}
         className="mt-8 shadow-xl shadow-partner-primary/20 text-white font-black bg-partner-primary hover:bg-partner-strong border-none"
       >
          RÚT TIỀN NGAY
       </Button>

       {!isEligible && (
         <div className="mt-4 flex items-center justify-center gap-2 relative z-10">
            <AlertCircle size={10} className="text-white/50" />
            <CaptionText className="text-white/50" weight={600}>Tối thiểu: {formatMoney(minThreshold)}</CaptionText>
         </div>
       )}
    </Card>
  );
};
