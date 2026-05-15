import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Search, ShoppingBag, Ticket, User,
  LayoutDashboard, Package, Megaphone, BarChart3, LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../store';
import { cn } from '../../lib/utils';
import { Button } from '../ui';
import { AppShell } from './AppShell';
import { NavIcon } from '../icon';
import { CaptionText } from '../ui/Typography';
import { useTranslation } from '../../lib/i18n';

export const MobileShell = () => {
  const { appMode } = useStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const customerTabs = [
    { label: t('nav_home'), icon: Home, path: '/app/home' },
    { label: t('nav_categories'), icon: LayoutGrid, path: '/app/categories' },
    { label: t('nav_search'), icon: Search, path: '/app/search' },
    { label: t('nav_perks'), icon: Ticket, path: '/app/rewards' },
  ];

  const partnerTabs = [
    { label: t('partner_dashboard'), icon: LayoutDashboard, path: '/app/partner/dashboard' },
    { label: t('partner_marketplace'), icon: Package, path: '/app/partner/marketplace' },
    { label: t('partner_campaigns'), icon: Megaphone, path: '/app/partner/campaigns' },
    { label: t('partner_reports'), icon: BarChart3, path: '/app/partner/stats' },
  ];

  const tabs = appMode === 'customer' ? customerTabs : partnerTabs;

  const hideNavPaths = [
    '/app/products/', 
    '/app/partner/marketplace/',
    '/app/checkout', 
    '/app/orders/success',
    '/app/rewards/',
    '/app/profile/info',
    '/app/profile/addresses',
    '/app/profile/notifications',
    '/app/profile/privacy',
    '/app/support/help',
    '/app/support/contact',
    '/app/support/share'
  ];
  const shouldHideNav = hideNavPaths.some(p => location.pathname.includes(p)) || location.pathname.endsWith('/order');

  return (
    <AppShell>
      <main className="flex-1 min-h-screen overflow-x-hidden">
        <div className="w-full h-full">
           <Outlet />
        </div>
      </main>



      {/* Bottom bar fade overlay - Reduced height */}
      {!shouldHideNav && (
        <div 
          className="fixed bottom-0 left-0 right-0 h-[80px] pointer-events-none z-[8]"
          style={{
            background: 'linear-gradient(to top, rgba(246,247,251,0.95) 0%, rgba(246,247,251,0.8) 40%, rgba(246,247,251,0) 100%)'
          }}
        />
      )}

      {/* Bottom Tab Bar - Modern Minimalist Style */}
      {!shouldHideNav && (
        <div className="fixed bottom-0 left-0 w-full z-[10] px-6 pb-[calc(12px+env(safe-area-inset-bottom))]">
          <div className="bg-white/95 backdrop-blur-[24px] border border-white/50 shadow-[0_-12px_40px_-5px_rgba(0,0,0,0.08)] rounded-[28px] overflow-hidden relative">
            <nav className="flex items-center justify-around h-[64px] px-2 relative z-[11]">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = location.pathname.startsWith(tab.path);
                
                const handleTabClick = () => {
                  if (isActive) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    navigate(tab.path);
                  }
                };

                return (
                  <button
                    key={tab.path}
                    onClick={handleTabClick}
                    className="relative flex-1 h-[48px] flex flex-col items-center justify-center rounded-[20px] transition-all group p-0 outline-none"
                  >
                    {/* Sliding active background indicator */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavPill"
                        className={cn(
                          "absolute inset-y-0 inset-x-1 rounded-2xl z-0",
                          appMode === 'customer' ? 'bg-[#EEF2FF]' : 'bg-[#D1FAE5]'
                        )}
                        transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                    
                    <div className={cn(
                      "relative z-[12] transition-all duration-300 flex items-center justify-center",
                      isActive ? "scale-110" : "scale-100"
                    )}>
                      <Icon 
                        size={isActive ? 22 : 22} 
                        strokeWidth={isActive ? 2.5 : 2}
                        className={cn(
                          "transition-colors",
                          isActive 
                            ? (appMode === 'customer' ? 'text-[#4F46E5]' : 'text-[#00B879]')
                            : 'text-text-muted opacity-70 group-hover:opacity-100'
                        )}
                      />
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </AppShell>
  );
};
