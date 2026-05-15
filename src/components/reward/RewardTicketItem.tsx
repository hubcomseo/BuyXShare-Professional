import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Award } from 'lucide-react';
import { Text, CaptionText } from '../ui/Typography';
import { RewardStatusBadge } from '../ui';
import { useNavigate } from 'react-router-dom';

interface RewardTicketItemProps {
  id: string;
  status: string; // 'pending' | 'confirmed' | 'winner' | 'expired'
  rewardType: string;
  ticketCode: string;
  sequence?: string | number;
  orderId?: string;
  index?: number;
}

export const RewardTicketItem: React.FC<RewardTicketItemProps> = ({
  id, status, rewardType, ticketCode, sequence, orderId, index = 0
}) => {
  const navigate = useNavigate();
  const isWinner = status === 'winner';
  const isConfirmed = status === 'confirmed';
  const isExpired = status === 'expired';

  let accentColor = 'bg-border-default';
  let accentBorder = 'group-hover:border-customer-primary/30';
  let accentText = 'text-text-muted';

  if (isWinner) {
    accentColor = 'bg-reward-primary';
    accentBorder = 'group-hover:border-reward-primary/40';
    accentText = 'text-reward-text';
  } else if (isConfirmed) {
    accentColor = 'bg-customer-primary';
    accentBorder = 'group-hover:border-customer-primary/40';
    accentText = 'text-customer-primary';
  } else if (isExpired) {
    accentColor = 'bg-text-disabled';
    accentBorder = 'group-hover:border-border-default';
    accentText = 'text-text-disabled';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => navigate(`/app/rewards/${id}`)}
      className="relative group h-24 sm:h-28"
    >
      <div className={`h-full bg-surface border border-border-subtle rounded-2xl flex items-center overflow-hidden shadow-sm ${accentBorder} transition-all duration-300 cursor-pointer relative z-10`}>
        {/* Glow behind */}
        <div className={`absolute top-0 right-0 w-24 h-24 ${isWinner ? 'bg-reward-primary/10' : 'bg-customer-primary/5'} blur-2xl rounded-full -mr-12 -mt-12 pointer-events-none group-hover:scale-150 transition-transform duration-1000`} />

        {/* Color Accent Line */}
        <div className={`w-1.5 h-full ${accentColor} ${isWinner ? 'animate-pulse' : ''}`} />
        
        {/* Main Ticket Info */}
        <div className="flex-1 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
             <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                   <Text variant="label" weight={700} className={`text-[9px] sm:text-[10px] uppercase tracking-[0.1em] truncate block ${accentText}`}>{rewardType}</Text>
                   {isWinner && <div className="h-1.5 w-1.5 rounded-full bg-reward-primary animate-ping" />}
                </div>
                <div className={`text-2xl sm:text-3xl font-black text-text-primary italic tracking-tight leading-none pb-0.5 ${isExpired ? 'opacity-40 line-through' : ''}`}>{ticketCode}</div>
                <div className="flex items-center gap-2 sm:hidden pt-0.5">
                   <CaptionText className="text-[9px] text-text-muted uppercase font-bold">SEQ: #{sequence || '---'}</CaptionText>
                   <div className="w-1 h-1 rounded-full bg-border-default" />
                   <CaptionText className="text-[9px] text-text-muted font-mono tracking-tighter truncate max-w-[80px]">ORD: {orderId}</CaptionText>
                </div>
             </div>
             
             {/* Divider */}
             <div className="hidden sm:block h-12 w-px bg-border-subtle border-l border-dashed border-border-default" />
             
             {/* Sequence Data (Desktop) */}
             <div className="hidden sm:flex flex-col gap-1">
                <Text variant="label" weight={700} className="text-[10px] text-text-disabled uppercase tracking-[0.1em]">SEQUENCE</Text>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-text-disabled font-black">#</span>
                  <Text variant="body-md" weight={700} className={`text-text-primary ${isExpired ? 'opacity-40' : ''}`}>{sequence || '---'}</Text>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 relative z-10">
             <div className="text-right hidden xs:block">
                <RewardStatusBadge status={status} size="xs" type="short" />
                <CaptionText className="text-[9px] text-text-disabled block mt-1.5 font-mono hidden sm:block truncate max-w-[100px]">ID: {orderId}</CaptionText>
             </div>
             <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300
               ${isWinner ? 'bg-reward-soft text-reward-text border-reward-primary/30 shadow-md shadow-reward-primary/20' : 
                 isConfirmed ? 'bg-customer-soft text-customer-primary border-customer-primary/20 hover:bg-customer-primary hover:text-text-inverse hover:border-customer-primary lg:group-hover:shadow-md lg:group-hover:shadow-customer-primary/20' : 
                 'bg-bg-soft text-text-muted border-border-default shadow-sm'}`}>
                {isWinner ? <Award size={20} className="animate-pulse" /> : <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />}
             </div>
          </div>
        </div>

        {/* Subtle Perforation effect */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 w-4 h-4 rounded-full bg-bg-base border-r border-border-default"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 w-4 h-4 rounded-full bg-bg-base border-l border-border-default"></div>

      </div>
    </motion.div>
  );
};
