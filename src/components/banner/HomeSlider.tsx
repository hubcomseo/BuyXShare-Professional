import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, ArrowUpRight, Ticket } from 'lucide-react';
import { useTranslation } from '../../lib/i18n';
import { useAppMode } from '../../hooks/useAppMode';
import { Heading, CardTitle, CaptionText, SectionTitle } from '../ui/Typography';
import { Badge } from '../ui/Badge';
import { Button } from '../ui';
import { cn } from '../../lib/utils';

export const HomeSlider: React.FC = () => {
  const { t } = useTranslation();
  const { setMode } = useAppMode();
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = React.useState(0);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const containerWidth = e.currentTarget.clientWidth;
    // Calculate new slide based on scroll position
    const newSlide = Math.round(scrollLeft / (containerWidth * 0.85 + 16));
    if (newSlide !== activeSlide) {
      setActiveSlide(newSlide);
    }
  };

  const scrollToSlide = (index: number) => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth;
      sliderRef.current.scrollTo({
        left: (containerWidth * 0.85 + 16) * index,
        behavior: 'smooth'
      });
      setActiveSlide(index);
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => {
        const next = (prev + 1) % 4;
        scrollToSlide(next);
        return next;
      });
    }, 6000); // 6 seconds for better visibility

    return () => clearInterval(interval);
  }, []);

  const [timeLeft, setTimeLeft] = React.useState({ h: 2, m: 45, s: 0 });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (val: number) => val.toString().padStart(2, '0');

  return (
    <div className="relative">
      <div 
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar mx-[-1rem] px-4 pb-8"
      >
        {/* Banner 1: Become a Partner - 16:9 */}
        <div className="min-w-[85%] snap-center" onClick={() => setMode('partner')}>
          <div className="aspect-[16/9] bg-partner-primary rounded-[28px] p-5 text-white relative overflow-hidden flex flex-col justify-between border-none shadow-xl shadow-partner-primary/30 group cursor-pointer active:scale-[0.98] transition-transform">
            <div className="flex justify-between items-start relative z-10">
              <div className="bg-white/20 rounded-full px-3 py-1 border border-white/10 backdrop-blur-md flex items-center justify-center">
                <CaptionText color="white" weight={800} className="uppercase tracking-widest text-[10px]">{t('home_partner_cta')}</CaptionText>
              </div>
              <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <Briefcase size={20} className="text-white" />
              </div>
            </div>
            
            <div className="relative z-10">
              <Heading level={3} color="white" className="leading-none tracking-tight mb-2 font-black uppercase text-2xl italic">
                {t('home_become_partner')}
              </Heading>
              <div className="flex items-center gap-1.5 text-white font-bold text-sm bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
                {t('home_join_partner')} <ArrowUpRight size={16} strokeWidth={3} />
              </div>
            </div>
            
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-[40px] mix-blend-overlay" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-partner-strong/50 rounded-full blur-[60px]" />
          </div>
        </div>

        {/* Banner 2: Limited Banner - 16:9 */}
        <div className="min-w-[85%] snap-center">
          <div className="aspect-[16/9] bg-black rounded-[28px] relative overflow-hidden shadow-xl shadow-sale-primary/30 group border border-white/20">
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
              alt="Limited Deal"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute top-4 left-5 flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <div className="bg-sale-primary text-white font-black px-2 py-1 rounded-lg text-[12px] min-w-[28px] text-center shadow-lg">
                  {formatTime(timeLeft.h)}
                </div>
                <span className="text-white font-bold">:</span>
                <div className="bg-sale-primary text-white font-black px-2 py-1 rounded-lg text-[12px] min-w-[28px] text-center shadow-lg">
                  {formatTime(timeLeft.m)}
                </div>
                <span className="text-white font-bold">:</span>
                <div className="bg-sale-primary text-white font-black px-2 py-1 rounded-lg text-[12px] min-w-[28px] text-center shadow-lg">
                  {formatTime(timeLeft.s)}
                </div>
              </div>
              <SectionTitle color="white" className="leading-none font-black tracking-tighter text-3xl italic uppercase drop-shadow-2xl">
                FLASH SALE -50%
              </SectionTitle>
            </div>

            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-2xl border border-white/10">
                 <Ticket size={16} className="text-white" strokeWidth={3} />
                 <CaptionText weight={800} color="white" className="text-[10px] uppercase tracking-wider">Chỉ 10 suất</CaptionText>
              </div>
              <Button 
                variant="secondary"
                size="xs"
                className="px-5 shadow-xl uppercase tracking-tighter font-black"
                onClick={() => navigate('/app/search')}
              >
                SĂN NGAY
              </Button>
            </div>
          </div>
        </div>

        {/* Banner 3: Image Only - 16:9 */}
        <div className="min-w-[85%] snap-center">
          <div className="aspect-[16/9] bg-bg-soft rounded-[28px] relative overflow-hidden border border-white shadow-xl shadow-black/10 group">
            <img 
              src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1000" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              alt="Promotion"
            />
          </div>
        </div>

        {/* Banner 4: Image Only - 16:9 */}
        <div className="min-w-[85%] snap-center">
          <div className="aspect-[16/9] bg-bg-soft rounded-[28px] relative overflow-hidden border border-white shadow-xl shadow-black/10 group">
            <img 
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              alt="Promotion"
            />
          </div>
        </div>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex justify-center gap-1.5 px-3 py-1.5 rounded-full bg-black/10 backdrop-blur-md border border-white/5">
        {[0, 1, 2, 3].map((idx) => (
          <div 
            key={idx} 
            onClick={() => scrollToSlide(idx)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
              activeSlide === idx ? "w-6 bg-primary" : "w-1.5 bg-text-muted/30 hover:bg-text-muted/50"
            )}
          />
        ))}
      </div>
    </div>
  );
};
