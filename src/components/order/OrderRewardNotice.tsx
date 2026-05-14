import React from 'react';
import { Sparkles, Ticket } from 'lucide-react';
import { CaptionText, Text } from '../ui/Typography';
import { Button } from '../ui';
import { RewardTicket } from '../../types/reward';
import { useNavigate } from 'react-router-dom';

interface OrderRewardNoticeProps {
  reward: RewardTicket;
}

export const OrderRewardNotice = ({ reward }: OrderRewardNoticeProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative group overflow-hidden bg-surface rounded-3xl p-6 border border-primary/20 shadow-sm hover:shadow-md transition-all">
       <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
       <div className="flex gap-4 relative z-10">
         <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
           <Ticket size={24} />
         </div>
         <div className="flex-1 space-y-2">
           <div>
             <div className="flex items-center gap-1.5 mb-1.5">
               <Sparkles size={14} className="text-primary" />
               <CaptionText color="primary" weight={600} className="uppercase tracking-widest text-[10px]">Có vé thưởng</CaptionText>
             </div>
             <Text variant="body-sm" weight={600}>Bạn nhận được 1 vé thưởng từ đơn hàng này!</Text>
           </div>
           
           <Button variant="soft-primary" size="sm" className="rounded-xl mt-2" onClick={() => navigate('/app/rewards')}>Xem vé thưởng</Button>
         </div>
       </div>
    </div>
  );
};
