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

  let accentColor = 'bg-white/10';
  let accentBorder = 'group-hover:border-white/20';
  let accentText = 'text-primary';

  if (isWinner) {
    accentColor = 'bg-accent';
    accentBorder = 'group-hover:border-accent/40';
    accentText = 'text-accent';
  } else if (isConfirmed) {
    accentColor = 'bg-primary';
    accentBorder = 'group-hover:border-primary/40';
    accentText = 'text-primary';
  } else if (isExpired) {
    accentColor = 'bg-red-500/50';
    accentBorder = 'group-hover:border-red-500/20';
    accentText = 'text-red-500';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => navigate(`/app/rewards/${id}`)}
      className="relative group h-24 sm:h-28"
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${isWinner ? 'from-accent/0 via-accent/30 to-accent/0' : 'from-primary/0 via-primary/10 to-primary/0'} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none`}></div>
      <div className={`h-full bg-bg-base border border-white/10 rounded-2xl flex items-center overflow-hidden shadow-md ${accentBorder} transition-all duration-300 cursor-pointer relative z-10`}>
        {/* Glow behind */}
        <div className={`absolute top-0 right-0 w-24 h-24 ${isWinner ? 'bg-accent/10' : 'bg-primary/10'} blur-2xl rounded-full -mr-12 -mt-12 pointer-events-none border border-border-subtle shadow-sm group-hover:scale-150 transition-transform duration-1000`} />

        {/* Color Accent Line */}
        <div className={`w-1.5 h-full ${accentColor} ${isWinner ? 'animate-pulse' : ''}`} />
        
        {/* Main Ticket Info */}
        <div className="flex-1 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
             <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                   <Text variant="label" weight={600} className={`text-[8px] sm:text-[9px] uppercase tracking-[0.25em] truncate block ${accentText}`}>{rewardType}</Text>
                   {isWinner && <div className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />}
                </div>
                <div className={`text-xl sm:text-3xl font-black text-white italic tracking-tighter leading-none drop-shadow-md pb-0.5 ${isExpired ? 'opacity-40 line-through decoration-red-500/50' : ''}`}>{ticketCode}</div>
                <div className="flex items-center gap-2 sm:hidden pt-0.5">
                   <CaptionText className="text-[8px] text-white/30 uppercase font-bold">SEQ: #{sequence || '---'}</CaptionText>
                   <div className="w-1 h-1 rounded-sm bg-white/10" />
                   <CaptionText className="text-[8px] text-white/30 font-mono tracking-tighter truncate max-w-[80px]">ORD: {orderId}</CaptionText>
                </div>
             </div>
             
             {/* Divider */}
             <div className="hidden sm:block h-12 w-px bg-white/5 border-l border-dashed border-white/10" />
             
             {/* Sequence Data (Desktop) */}
             <div className="hidden sm:flex flex-col gap-1">
                <Text variant="label" weight={600} className="text-[9px] text-white/20 uppercase tracking-[0.2em]">SEQUENCE</Text>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-white/40 font-black">#</span>
                  <Text variant="body-md" weight={600} className={`text-white/80 ${isExpired ? 'opacity-40' : ''}`}>{sequence || '---'}</Text>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 relative z-10">
             <div className="text-right hidden xs:block">
                <RewardStatusBadge status={status} size="xs" type="short" />
                <CaptionText className="text-[9px] text-white/20 block mt-1.5 font-mono hidden sm:block truncate max-w-[100px]">ID: {orderId}</CaptionText>
             </div>
             <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300
               ${isWinner ? 'bg-accent text-dark border-accent shadow-[0_0_15px_rgba(0,217,145,0.4)]' : 
                 isConfirmed ? 'bg-white/5 text-white/40 border-white/10 group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 
                 'bg-white/5 text-white/20 border-border-subtle shadow-sm'}`}>
                {isWinner ? <Award size={18} className="animate-pulse" /> : <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />}
             </div>
          </div>
        </div>

        {/* Subtle Perforation pattern over ticket body */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.02] mix-blend-overlay pointer-events-none"></div>

      </div>
    </motion.div>
  );
};
