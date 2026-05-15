import React from 'react';
import { motion } from 'motion/react';
import { Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Text, Heading } from '../ui/Typography';
import { Button } from '../ui';

interface JackpotWinnerCardProps {
  id: string;
  ticketCode: string;
}

export const JackpotWinnerCard: React.FC<JackpotWinnerCardProps> = ({ id, ticketCode }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group w-full"
    >
       <div className="bg-bg-base rounded-xl sm:rounded-2xl border border-accent/40 shadow-xl shadow-accent/40 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/60 hover:border-accent/80 group-hover:-translate-y-1 p-5 sm:p-8 relative flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-8 min-h-[120px] overflow-hidden">
             {/* Glows */}
             <div className="absolute right-0 top-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none transition-all duration-1000 group-hover:bg-accent/30" />
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] -ml-24 pointer-events-none" />
             
             {/* Holographic grid */}
             <div className="absolute inset-0 z-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.02] mix-blend-overlay pointer-events-none" />

             <div className="flex items-center gap-5 sm:gap-8 relative z-10">
                <div className="w-14 h-14 sm:w-24 sm:h-24 bg-gradient-to-br from-accent/20 to-accent/5 text-accent rounded-lg sm:rounded-xl flex items-center justify-center relative border border-accent/20 shadow-inner group-hover:scale-105 transition-transform duration-500">
                   <Award size={28} className="sm:hidden relative z-10 animate-pulse" />
                   <Award size={48} className="hidden sm:block relative z-10 animate-pulse" />
                   <div className="absolute inset-0 bg-accent rounded-lg sm:rounded-xl blur-xl opacity-[0.15] animate-pulse"></div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                   <div className="flex items-center gap-2 sm:gap-3">
                      <Text variant="label" weight={600} className="text-accent text-[10px] sm:text-[12px] uppercase tracking-[0.3em] font-mono">JACKPOT WINNER</Text>
                      <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-accent animate-ping shadow-[0_0_8px_rgba(0,217,145,1)]" />
                   </div>
                   <Heading variant="h3" color="white" className="font-black italic text-2xl sm:text-5xl leading-none tracking-tighter drop-shadow-md">
                      {ticketCode}
                   </Heading>
                </div>
             </div>
             
             <Button 
               variant="reward"
               size="md" 
               onClick={() => navigate(`/app/rewards/${id}`)}
               important
               className="w-full sm:w-auto px-6 sm:px-12 h-12 sm:h-16 uppercase tracking-[0.2em] relative z-10 font-black sm:text-lg rounded-lg sm:rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)]"
             >
               NHẬN THƯỞNG
             </Button>
       </div>
    </motion.div>
  );
};
