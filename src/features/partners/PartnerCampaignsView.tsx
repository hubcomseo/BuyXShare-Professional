import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Megaphone, 
  Zap, 
  TrendingUp, 
  Search, 
  Filter,
  ArrowUpRight,
  Target,
  Users,
  Award,
  Clock,
  Sparkles,
  Lock
} from 'lucide-react';
import { motion } from 'motion/react';
import { Text, Heading, SectionTitle, BodyText, CaptionText, LabelText } from '../../components/ui/Typography';
import { MobileLargeHeader } from '../../components/header';
import { ProductImage } from '../../components/product/ProductImage';
import { Badge } from '../../components/ui';
import { Button, IconButton } from '../../components/ui';
import { useStore } from '../../store';
import { cn } from '../../lib/utils';
import { PageContainer } from '../../components/layout';

import { useTranslation } from '../../lib/i18n';

export const PartnerCampaignsView = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const { t, language } = useTranslation();

  const [activeTag, setActiveTag] = React.useState('all');

  const campaignTags = [
    { id: 'all', label_vi: 'Tất cả', label_en: 'All' },
    { id: 'high', label_vi: 'Hoa hồng cao', label_en: 'High Comm' },
    { id: 'trending', label_vi: 'Thịnh hành', label_en: 'Trending' },
    { id: 'new', label_vi: 'Mới nhất', label_en: 'New Arrivals' },
  ];

  const campaigns = [
    {
      id: 'c1',
      title_en: 'Summer Tech Splash',
      title_vi: 'Công Nghệ Hè Rực Rỡ',
      brand: 'Samsung Vina',
      commission_en: 'Up to 18%',
      commission_vi: 'Lên đến 18%',
      status: 'active',
      participants: '1.2k+',
      reward_en: 'Win Galaxy S24 Ultra',
      reward_vi: 'Trúng Galaxy S24 Ultra',
      endsIn_en: '14 days left',
      endsIn_vi: 'Còn 14 ngày',
      image: '/images/3.jpg',
      color: 'bg-primary'
    },
    {
      id: 'c2',
      title_en: 'Beauty Rewards 2024',
      title_vi: 'Đặc Quyền Làm Đẹp 2024',
      brand: 'Estée Lauder',
      commission_en: 'Bonus 25%',
      commission_vi: 'Thưởng 25%',
      status: 'active',
      participants: '856',
      reward_en: 'Voucher 2,000,000đ',
      reward_vi: 'Voucher 2,000,000đ',
      endsIn_en: '5 days left',
      endsIn_vi: 'Còn 5 ngày',
      image: '/images/4.jpg',
      color: 'bg-rose-500'
    },
    {
      id: 'c3',
      title_en: 'Luxury Home Elite',
      title_vi: 'Nội Thất Sang Trọng',
      brand: 'Decox Design',
      commission_en: 'Comm 15%',
      commission_vi: 'Hoa hồng 15%',
      status: 'locked',
      participants: '45',
      reward_en: 'Interior 50,000,000đ',
      reward_vi: 'Nội thất 50,000,000đ',
      endsIn_en: '30 days left',
      endsIn_vi: 'Còn 30 ngày',
      image: '/images/5.jpg',
      color: 'bg-amber-600'
    }
  ];

  return (
    <PageContainer
      variant="mobile"
      headerVariant="large"
      withHeaderOffset
      withBottomTabs
      className="space-y-8 mt-4"
    >
      <MobileLargeHeader 
        title={t('partner_campaigns')} 
        rightSlot={
          <div className="flex gap-2">
            <IconButton icon={<Filter size={20} />} variant="ghost" label="Filter" />
            <IconButton icon={<Search size={20} />} variant="ghost" label="Search" />
          </div>
        }
      />

      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 snap-x">
          {campaignTags.map((tag) => (
            <div 
              key={tag.id}
              onClick={() => setActiveTag(tag.id)}
              className={cn(
                "px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider whitespace-nowrap snap-center transition-all cursor-pointer border",
                activeTag === tag.id 
                  ? "bg-partner-primary text-white border-partner-primary shadow-lg shadow-partner-primary/20 scale-105" 
                  : "bg-surface text-text-muted border-border-subtle hover:border-partner-primary/30"
              )}
            >
              {language === 'vi' ? tag.label_vi : tag.label_en}
            </div>
          ))}
        </div>

        {/* Featured Campaign Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group cursor-pointer"
        >
           <div className="relative rounded-[2.5rem] border border-border-subtle overflow-hidden h-[240px] shadow-xl flex flex-col justify-end">
              <ProductImage 
                src="/images/6.jpg" 
                alt="Featured Campaign" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              
              <div className="absolute top-6 left-6 z-10 flex gap-2">
                 <Badge variant="warning" size="sm" className="bg-black/40 backdrop-blur-md border-white/20 uppercase tracking-widest font-black italic">
                    <Zap size={14} className="text-amber-400 fill-amber-400 mr-1.5" />
                    {t('partner_campaigns_exclusive')}
                 </Badge>
              </div>

              <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                 <div className="flex items-end justify-between gap-4">
                    <div className="space-y-3">
                       <Badge variant="partner" size="md" className="shadow-lg mb-2 uppercase tracking-widest font-bold italic py-1.5 px-4 ring-1 ring-white/10">
                         <Sparkles size={14} className="mr-2" />
                         {language === 'vi' ? 'Siêu hoa hồng 25%' : 'Flash Comms 25%'}
                       </Badge>
                       <Heading variant="h2" className="text-white leading-tight tracking-tighter drop-shadow-lg text-2xl font-black uppercase italic">
                         {language === 'vi' ? 'Đại Hội Mua Sắm DexSpace' : 'DexSpace Mega Rewards'}
                       </Heading>
                    </div>
                    
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:bg-partner-primary group-hover:text-white group-hover:scale-110 transition-all shadow-2xl">
                      <ArrowUpRight size={28} />
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>

        {/* Section: Live Campaigns */}
        <div className="space-y-6">
           <div className="flex items-center justify-between px-2">
              <SectionTitle size="sm" className="flex items-center gap-2 uppercase font-black italic tracking-tighter">
                <Target size={22} className="text-partner-primary" />
                {t('partner_campaigns_live')}
              </SectionTitle>
           </div>

           <div className="grid grid-cols-1 gap-4">
              {campaigns.map((camp, idx) => (
                <motion.div 
                  key={camp.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-surface rounded-[2.5rem] border border-border-subtle p-6 relative overflow-hidden group hover:border-partner-primary/30 transition-all shadow-sm cursor-pointer hover:shadow-lg active:scale-[0.98]"
                >
                   {camp.status === 'locked' && (
                     <div className="absolute inset-0 bg-bg-base/80 backdrop-blur-md z-20 flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-[2rem] bg-surface-elevated border border-border-subtle flex items-center justify-center shadow-xl text-text-muted">
                           <Lock size={32} />
                        </div>
                        <Text weight={600} className="text-text-primary text-xs uppercase tracking-widest">{t('partner_campaigns_requires_rank')} 2</Text>
                     </div>
                   )}

                   <div className="flex gap-6">
                      <div className="w-32 h-32 rounded-[2rem] overflow-hidden shrink-0 relative bg-surface-soft border border-border-subtle shadow-inner">
                         <ProductImage 
                           src={camp.image} 
                           alt={language === 'vi' ? camp.title_vi : camp.title_en}
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                         />
                         <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 backdrop-blur-lg rounded-lg border border-white/10 ring-1 ring-white/5">
                            <CaptionText className="text-white text-[9px] uppercase font-black tracking-widest leading-none">{camp.brand}</CaptionText>
                         </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                         <div className="space-y-2">
                            <Heading variant="h2" className="line-clamp-2 leading-[1.1] text-text-primary font-black text-lg h-11 tracking-tight">
                              {language === 'vi' ? camp.title_vi : camp.title_en}
                            </Heading>
                            <span className="text-partner-primary font-black text-2xl tracking-tighter leading-none block italic underline underline-offset-4 decoration-2 decoration-partner-primary/20">
                              {language === 'vi' ? camp.commission_vi : camp.commission_en}
                            </span>
                         </div>
                         <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-subtle/50">
                            <div className="flex items-center gap-4 text-text-muted">
                               <div className="flex items-center gap-1.5 px-2 py-1 bg-surface-soft rounded-lg">
                                  <Users size={12} />
                                  <CaptionText className="text-[10px] font-black">{camp.participants}</CaptionText>
                               </div>
                               <div className="flex items-center gap-1.5 px-2 py-1 bg-surface-soft rounded-lg">
                                  <Clock size={12} />
                                  <CaptionText className="text-[10px] font-black">{language === 'vi' ? camp.endsIn_vi : camp.endsIn_en}</CaptionText>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                   
                   <div className="mt-4 pt-4 border-t border-border-subtle flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center text-warning shadow-inner">
                        <Award size={18} />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <LabelText uppercase weight={600} className="opacity-50 mb-0.5 tracking-widest leading-none block">
                           {t('partner_campaigns_bonus')}
                        </LabelText>
                        <CaptionText color="dark" className="line-clamp-1 text-[11px] font-black uppercase italic tracking-wider">
                          {language === 'vi' ? camp.reward_vi : camp.reward_en}
                        </CaptionText>
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-surface-elevated border border-border-subtle flex items-center justify-center text-text-muted group-hover:bg-partner-primary group-hover:text-white group-hover:border-partner-primary transition-all shadow-md group-hover:scale-110">
                        <ArrowUpRight size={20} />
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

      </PageContainer>
  );
};

