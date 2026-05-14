import React, { useState } from 'react';
import { 
  TrendingUp, 
  MousePointer2, 
  ShoppingCart,
  Filter,
  Download,
  ArrowUpRight,
  Zap,
  ShoppingBag,
  Activity
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { Text, Heading, SectionTitle, BodyText, CaptionText } from '../../components/ui/Typography';
import { MobileLargeHeader } from '../../components/header';
import { Card } from '../../components/ui/Card';
import { Button, IconButton } from '../../components/ui';
import { formatMoney } from '../../utils/money';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../lib/i18n';

const data = [
  { name: '01/05', clicks: 400, sales: 24, earned: 1200000 },
  { name: '02/05', clicks: 300, sales: 13, earned: 800000 },
  { name: '03/05', clicks: 200, sales: 98, earned: 4500000 },
  { name: '04/05', clicks: 278, sales: 39, earned: 2100000 },
  { name: '05/05', clicks: 189, sales: 48, earned: 2500000 },
  { name: '06/05', clicks: 239, sales: 38, earned: 1900000 },
  { name: '07/05', clicks: 349, sales: 43, earned: 2300000 },
];

const categoryData = [
  { name: 'Công nghệ', value: 45, items: '1.2k đơn' },
  { name: 'Làm đẹp', value: 30, items: '850 đơn' },
  { name: 'Nhà cửa', value: 15, items: '420 đơn' },
  { name: 'Khác', value: 10, items: '210 đơn' },
];

const COLORS = ['#2DD4BF', '#FBBF24', '#F43F5E', '#8B5CF6'];

export const PerformanceAnalyticsView = () => {
  const navigate = useNavigate();
  const { t, language } = useTranslation();

  const categoryData = [
    { name: language === 'vi' ? 'Công nghệ' : 'Tech', value: 45, items: language === 'vi' ? '1.2k đơn' : '1.2k orders' },
    { name: language === 'vi' ? 'Làm đẹp' : 'Beauty', value: 30, items: language === 'vi' ? '850 đơn' : '850 orders' },
    { name: language === 'vi' ? 'Nhà cửa' : 'Home', value: 15, items: language === 'vi' ? '420 đơn' : '420 orders' },
    { name: language === 'vi' ? 'Khác' : 'Other', value: 10, items: language === 'vi' ? '210 đơn' : '210 orders' },
  ];

  const ranges = language === 'vi' 
    ? ['Ngày nay', '7 ngày qua', '30 ngày qua', 'Tất cả']
    : ['Today', 'Last 7 days', 'Last 30 days', 'All time'];

  const [activeRange, setActiveRange] = useState(ranges[1]);

  return (
    <div className="min-h-screen pb-32">
      <MobileLargeHeader 
        title={t('partner_report_title')} 
        rightSlot={
          <div className="flex gap-2">
             <div className="w-10 h-10 rounded-full bg-surface border border-border-subtle flex items-center justify-center text-text-secondary shadow-sm">
                <Download size={20} />
             </div>
          </div>
        }
      />

      <div className="px-4 space-y-8 mt-2">
        {/* Date Range Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 snap-x">
           {ranges.map((range) => (
             <div 
               key={range} 
               onClick={() => setActiveRange(range)}
               className={cn(
                 "px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap snap-center transition-all cursor-pointer shadow-sm border",
                 activeRange === range 
                   ? "bg-partner-primary text-white border-partner-primary shadow-partner-primary/20" 
                   : "bg-surface text-text-secondary border-border-subtle hover:border-partner-primary/50"
               )}
             >
               {range}
             </div>
           ))}
        </div>

        {/* Primary Revenue Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-[2rem] border border-border-subtle shadow-md p-6 space-y-6 relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-32 h-32 bg-partner-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
           
           <div className="flex justify-between items-start relative z-10">
              <div className="space-y-1">
                 <CaptionText weight={600} className="text-text-muted uppercase tracking-widest text-[11px]">{t('partner_total_earnings')}</CaptionText>
                 <Text variant="h1" weight={600} className="text-text-primary tracking-tight leading-none text-3xl">15.240.000đ</Text>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 shadow-sm">
                 <TrendingUp size={14} className="text-emerald-500" />
                 <span className="text-xs font-bold text-emerald-500">+24%</span>
              </div>
           </div>

           <div className="h-[220px] w-full mt-2 -ml-2 relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorEarned" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#888', fontSize: 11, fontWeight: 600 }}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1A2536', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                      itemStyle={{ color: '#2DD4BF', fontSize: '14px', fontWeight: 700 }}
                      labelStyle={{ color: '#888', marginBottom: '4px', fontSize: '12px' }}
                      formatter={(value: number) => [`${formatMoney(value)}`, t('partner_earnings')]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="earned" 
                      stroke="#2DD4BF" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorEarned)" 
                    />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
           
           <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-subtle/50 relative z-10">
              <div className="space-y-1">
                <CaptionText className="text-text-muted">{t('partner_avg_daily')}</CaptionText>
                <div className="font-bold text-text-primary text-lg">{formatMoney(2177000)}</div>
              </div>
              <div className="space-y-1 pl-4 border-l border-border-subtle/50">
                <CaptionText className="text-text-muted">{t('partner_roi')}</CaptionText>
                <div className="font-bold text-partner-primary text-lg">342%</div>
              </div>
           </div>
        </motion.div>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
           {[
             { label: t('partner_clicks_count'), value: '4.2k', icon: MousePointer2, color: 'text-info', bg: 'bg-info/10' },
             { label: t('partner_conversions_rate'), value: '12.4%', icon: Activity, color: 'text-warning', bg: 'bg-warning/10' },
             { label: t('partner_orders_count'), value: '542', icon: ShoppingBag, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
             { label: t('partner_top_category'), value: 'TECH', icon: Zap, color: 'text-partner-primary', bg: 'bg-partner-primary/10' },
           ].map((stat, i) => (
             <Card 
               key={i}
               className="p-5 bg-surface border border-border-subtle rounded-3xl space-y-4 group hover:border-partner-primary/30 transition-all shadow-sm"
             >
                <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                   <stat.icon size={22} />
                </div>
                <div className="space-y-1">
                   <CaptionText weight={600} className="text-text-muted tracking-widest text-[10px] uppercase">{stat.label}</CaptionText>
                   <Text variant="h2" weight={600} className="text-text-primary tracking-tight">{stat.value}</Text>
                </div>
             </Card>
           ))}
        </div>

        {/* Categories Analysis */}
        <div className="bg-surface rounded-3xl border border-border-subtle p-6 space-y-6 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
           
           <SectionTitle variant="h3" className="flex items-center gap-2 m-0 z-10 relative">
              <Filter size={18} className="text-primary-light" />
              {t('partner_revenue_share')}
           </SectionTitle>

           <div className="h-[220px] w-full z-10 relative">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false}
                      width={80}
                      tick={{ fill: '#888', fontSize: 13, fontWeight: 600 }}
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255,255,255,0.03)' }} 
                      contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#1A2536' }}
                      itemStyle={{ fontWeight: 700, color: '#fff' }}
                      formatter={(value: number) => [`${value}%`, language === 'vi' ? 'Tỷ trọng' : 'Share']}
                    />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                       {categoryData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                       ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>
           
           <div className="grid grid-cols-2 gap-y-4 gap-x-2 pt-2 z-10 relative">
              {categoryData.map((cat, i) => (
                <div key={cat.name} className="flex items-start gap-3 p-2 rounded-xl hover:bg-surface-elevated transition-colors cursor-pointer">
                   <div className="w-3 h-3 rounded-full mt-1 shrink-0" style={{ backgroundColor: COLORS[i] }} />
                   <div>
                     <div className="font-bold text-text-primary text-sm leading-none mb-1.5">{cat.name}</div>
                     <CaptionText className="text-text-muted text-[11px]">{cat.items} • {cat.value}%</CaptionText>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-br from-partner-primary/20 via-surface to-partner-strong/20 p-8 rounded-[2rem] border border-partner-primary/30 shadow-lg flex flex-col items-center text-center space-y-5 relative overflow-hidden group">
           <div className="absolute inset-0 bg-partner-primary/5 group-hover:bg-partner-primary/10 transition-colors"></div>
           
           <div className="w-16 h-16 bg-gradient-to-br from-partner-primary to-partner-strong rounded-2xl flex items-center justify-center text-white shadow-lg relative z-10 transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
             <TrendingUp size={32} />
           </div>
           
           <div className="space-y-2 relative z-10">
             <Heading variant="h2" className="font-bold tracking-tight text-white leading-tight">
               {language === 'vi' ? <>Mở khóa tiềm năng<br/>thu nhập của bạn</> : <>Unlock Your Income<br/>Potential</>}
             </Heading>
             <BodyText color="muted" align="center" className="text-sm px-2">{t('partner_unlock_desc')}</BodyText>
           </div>
           
           <Button 
             className="relative z-10 rounded-2xl px-8 h-14 bg-partner-primary text-white hover:bg-partner-strong hover:scale-105 active:scale-95 transition-all shadow-lg w-full max-w-[280px]"
             onClick={() => navigate('/app/partner/campaigns')}
           >
             <span className="font-bold text-base tracking-wide">{t('partner_explore_campaigns')}</span>
           </Button>
        </div>
      </div>
    </div>
  );
};

