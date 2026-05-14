import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Settings, Bell, Shield, LogOut, 
  ChevronRight, Wallet, HelpCircle, Share2, ShoppingBag,
  Ticket, MessageSquare, Package, History, Camera, BarChart3, Megaphone,
  CreditCard, MapPin, Heart, Gift, QrCode, Zap, Layers, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Text, SectionTitle, CaptionText, PriceText } from '../../components/ui/Typography';
import { MobileLargeHeader } from '../../components/header';
import { PartnerModeBadge } from '../../components/partner/PartnerModeBadge';
import { useStore } from '../../store';
import { useAppMode } from '../../hooks/useAppMode';
import { getRoleColors } from '../../theme/roleColors';
import { Button } from '../../components/ui';
import { cn } from '../../lib/utils';
import { formatMoney } from '../../utils/money';
import { useTranslation, Language } from '../../lib/i18n';

export const ProfileView = () => {
  const { user, setUser, language, setLanguage } = useStore();
  const { t } = useTranslation();
  const { mode: appMode, setMode } = useAppMode();
  const navigate = useNavigate();
  const roleColors = getRoleColors(appMode);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUser({ ...user, avatar: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const primaryActions = appMode === 'customer' ? [
    { label: t('orders_title'), icon: History, path: '/app/orders', color: 'text-primary bg-primary/10' },
    { label: t('profile_addresses'), icon: MapPin, path: '/app/profile/addresses', color: 'text-info bg-info/10' },
    { label: t('profile_vouchers'), icon: Ticket, path: '/app/profile/vouchers', color: 'text-accent bg-accent/10' },
  ] : [
    { label: t('profile_stats'), icon: BarChart3, path: '/app/partner/stats', color: 'text-partner-primary bg-partner-primary/10' },
    { label: t('profile_commission'), icon: History, path: '/app/partner/commissions', color: 'text-primary-light bg-primary-light/10' },
    { label: t('profile_wallet'), icon: Wallet, path: '/app/partner/payouts', color: 'text-accent bg-accent/10' },
  ];

  const menuSections = [
    {
      title: t('profile_orders_utils'),
      items: [
        { label: t('order_history'), icon: History, path: '/app/orders' },
        { label: t('profile_favorites'), icon: Heart, path: '/app/profile/favorites' },
        { label: t('profile_vouchers'), icon: Gift, path: '/app/profile/vouchers' },
        { label: t('profile_collections'), icon: Layers, path: '/app/categories' },
      ]
    },
    {
      title: t('profile_account_security'),
      items: [
        { label: t('profile_personal_info'), icon: User, path: '/app/profile/info' },
        { label: t('profile_addresses'), icon: MapPin, path: '/app/profile/addresses' },
        { label: t('profile_payment_methods'), icon: CreditCard, path: '/app/profile/payment' },
        { label: t('profile_notifications'), icon: Bell, path: '/app/profile/notifications' },
        { label: t('profile_privacy'), icon: Shield, path: '/app/profile/privacy' },
      ]
    },
    ...(appMode === 'partner' ? [{
      title: t('profile_dx_ecosystem'),
      items: [
        { label: t('partner_dashboard'), icon: BarChart3, path: '/app/partner/stats' },
        { label: t('partner_products'), icon: Package, path: '/app/partner/products' },
        { label: t('partner_campaigns'), icon: Megaphone, path: '/app/partner/campaigns' },
        { label: t('profile_payouts'), icon: Wallet, path: '/app/partner/payouts' },
      ]
    }] : []),
    {
      title: t('profile_support_more'),
      items: [
        { label: t('settings_title'), icon: Settings, path: '#' },
        { label: t('profile_language'), icon: Globe, isLanguage: true },
        { label: t('profile_help_center'), icon: HelpCircle, path: '/app/support/help' },
        { label: t('profile_invite'), icon: Share2, path: '/app/support/share' },
        { label: t('profile_contact'), icon: MessageSquare, path: '/app/support/contact' },
      ]
    }
  ];

  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen pb-32">
      <MobileLargeHeader 
        title={t('profile_title')}
        showModeBadge={false}
      />

      <div className="px-4 space-y-6">
        {/* Mode Switcher Banner */}
        <div className="bg-surface p-1.5 rounded-3xl border border-border-subtle shadow-sm flex items-center">
          <button
            onClick={() => setMode('customer')}
            className={cn(
              "flex-1 relative flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold transition-all z-10",
              appMode === 'customer' ? "text-white" : "text-text-muted hover:text-text-primary"
            )}
          >
            <ShoppingBag size={18} />
            <span>{t('profile_customer_mode')}</span>
            {appMode === 'customer' && (
              <motion.div 
                layoutId="profile-mode-active"
                className="absolute inset-0 bg-primary/90 rounded-2xl -z-10 shadow-lg shadow-primary/20"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
          
          <button
            onClick={() => setMode('partner')}
            className={cn(
              "flex-1 relative flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold transition-all z-10",
              appMode === 'partner' ? "text-bg-base" : "text-text-muted hover:text-text-primary"
            )}
          >
            <Zap size={18} />
            <span>{t('profile_business_mode')}</span>
            {appMode === 'partner' && (
              <motion.div 
                layoutId="profile-mode-active"
                className="absolute inset-0 bg-partner-primary rounded-2xl -z-10 shadow-lg shadow-partner-primary/20"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        </div>

        {/* Membership Card */}
        <div className={cn(
          "rounded-3xl p-6 relative overflow-hidden shadow-lg border",
          appMode === 'customer' 
            ? 'bg-gradient-to-br from-customer-soft via-customer-primary to-customer-strong border-customer-subtle' 
            : 'bg-gradient-to-br from-partner-soft via-partner-strong to-partner-strong border-partner-subtle'
        )}>
          {/* Card Patterns */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

          <div className="relative z-10 flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div 
                  className="w-16 h-16 rounded-full bg-white/20 p-1 backdrop-blur-md relative cursor-pointer overflow-hidden group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {user?.avatar ? (
                    <img src={user.avatar} className="w-full h-full object-cover rounded-full" alt="Avatar" />
                  ) : (
                    <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center">
                      <User size={24} className="text-white" />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
                    <Camera size={16} className="text-white" />
                  </div>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*"
                  onChange={handleAvatarSelect}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <Text variant="h3" className="text-white mb-0.5 truncate leading-tight">
                   {user?.name || t('profile_dex_member')}
                </Text>
                <CaptionText className="text-white/70 truncate block">
                   {user?.email || 'user@dexspace.vn'}
                </CaptionText>
              </div>
            </div>

            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white bg-white/10 rounded-full w-10 h-10 hover:bg-white/20 p-0 flex items-center justify-center">
              <QrCode size={18} />
            </Button>
          </div>

          <div className="relative z-10 flex items-end justify-between mt-8 pt-4 border-t border-white/20">
            <div>
              <CaptionText className="text-white/60 uppercase tracking-widest text-[10px] mb-1">
                {appMode === 'customer' 
                  ? t('profile_membership_rank')
                  : t('profile_partner_level')}
              </CaptionText>
              <Text variant="h2" className="text-white font-bold uppercase tracking-wide">
                {appMode === 'customer' ? 'PLATINUM' : 'ELITE'}
              </Text>
            </div>
            
            <div className="text-right">
              <CaptionText className="text-white/60 uppercase tracking-widest text-[10px] mb-1 pl-4">DX ID</CaptionText>
              <div className="flex items-center justify-end">
                <Text variant="body-sm" className="text-white uppercase font-mono tracking-widest text-xs">DX-843519</Text>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Icon Menu */}
        <div className="flex justify-between items-start pt-2 px-2">
           {primaryActions.map((action, i) => (
             <div 
               key={i}
               onClick={() => action.path !== '#' && navigate(action.path)}
               className="flex flex-col items-center gap-2.5 group flex-1 cursor-pointer active:scale-95 transition-transform"
             >
                <div className={cn("w-14 h-14 rounded-[1.25rem] flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.05)] bg-surface border border-border-subtle transition-all group-hover:border-primary/20", action.color.split(' ')[0])}>
                   <action.icon size={24} />
                </div>
                <CaptionText weight={500} className="text-[11px] text-text-primary text-center">{action.label}</CaptionText>
             </div>
           ))}
        </div>

        {/* Quick Stats Vertical */}
        <div className="bg-surface rounded-3xl border border-border-subtle shadow-sm p-2 flex flex-col gap-1">
          <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-surface-soft transition-colors cursor-pointer active:scale-95">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-border-subtle text-text-primary flex items-center justify-center shrink-0 shadow-sm">
                  <Wallet size={18} />
               </div>
               <Text variant="body-sm" weight={600} className="text-text-muted">{t('profile_balance_label')}</Text>
             </div>
             <PriceText size="md" weight={600} className="text-text-primary">{formatMoney(12450000)}</PriceText>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-surface-soft transition-colors cursor-pointer active:scale-95">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-border-subtle text-text-primary flex items-center justify-center shrink-0 shadow-sm">
                  {appMode === 'customer' ? <Ticket size={18} /> : <BarChart3 size={18} />}
               </div>
               <Text variant="body-sm" weight={600} className="text-text-muted">
                 {appMode === 'customer' 
                   ? t('profile_vouchers')
                   : t('profile_clicks_label')}
               </Text>
             </div>
             <Text variant="h3" weight={600} className="text-text-primary">{appMode === 'customer' ? '2,458' : '1,240'}</Text>
          </div>
        </div>

        {/* Menu Sections */}
        <div className="space-y-6 pt-2">
          {menuSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <CaptionText weight={600} className="px-3 pb-2 text-text-muted uppercase tracking-wider text-[11px]">{section.title}</CaptionText>
              <div className="flex flex-col gap-1">
                {section.items.map((item, i) => (
                  <div 
                    key={i}
                    onClick={() => !item.isLanguage && item.path !== '#' && navigate(item.path)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-2xl transition-colors",
                      !item.isLanguage ? "hover:bg-surface-soft active:bg-surface-elevated cursor-pointer" : ""
                    )}
                  >
                    <div className="flex items-center gap-4 flex-1">
                       <div className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted bg-surface border border-border-subtle shrink-0 shadow-sm">
                          <item.icon size={18} />
                       </div>
                       <Text variant="body-md" weight={500} className="text-text-primary">{item.label}</Text>
                    </div>
                    {item.isLanguage ? (
                      <div className="flex bg-surface-soft p-1 rounded-xl border border-border-subtle items-center">
                        {(['vi', 'en'] as Language[]).map((l) => (
                          <button
                            key={l}
                            onClick={() => setLanguage(l)}
                            className={cn(
                              "px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all relative z-10",
                              language === l ? "text-white" : "text-text-muted"
                            )}
                          >
                            {l}
                            {language === l && (
                              <motion.div 
                                layoutId="mini-lang-active"
                                className="absolute inset-0 bg-text-primary rounded-lg -z-10 shadow-sm"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <ChevronRight size={18} className="text-text-disabled" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Logout Section */}
        <div className="pt-4 space-y-4">
          <Button 
            onClick={handleLogout}
            variant="ghost"
            size="md"
            fullWidth
            className="h-14 rounded-2xl bg-surface border border-error/20 text-error hover:bg-error/10 hover:border-error/30 transition-colors"
            leftIcon={<LogOut size={18} />}
          >
            {t('profile_logout')}
          </Button>
          <div className="text-center pb-8">
             <CaptionText className="text-text-disabled tracking-widest text-[10px]">v1.0.8 • DEXSPACE SYSTEMS</CaptionText>
          </div>
        </div>
      </div>
    </div>
  );
};

