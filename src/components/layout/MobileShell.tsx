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



      {/* Bottom bar fade overlay */}
      {!shouldHideNav && (
        <div 
          className="fixed bottom-0 left-0 right-0 h-[150px] pointer-events-none z-[8]"
          style={{
            background: 'linear-gradient(to top, rgba(246,247,251,0.98) 0%, rgba(246,247,251,0.88) 35%, rgba(246,247,251,0.55) 65%, rgba(246,247,251,0) 100%)'
          }}
        />
      )}

      {/* Bottom Tab Bar - Ecommerce Style */}
      {!shouldHideNav && (
        <div className="fixed bottom-0 left-0 w-full z-[10] px-4 pb-[calc(10px+env(safe-area-inset-bottom))]">
          <div className="bg-white/92 backdrop-blur-[16px] border border-white/40 shadow-[0_-8px_20px_rgba(0,0,0,0.06),0_10px_20px_rgba(0,0,0,0.04)] rounded-[24px] overflow-hidden">
            <nav className="flex items-center justify-around h-[64px] px-1 translate-y-0 relative z-[11]">
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
                  <Button
                    key={tab.path}
                    onClick={handleTabClick}
                    variant="ghost"
                    className={cn(
                      "relative flex-1 h-[48px] flex flex-col items-center justify-center rounded-[16px] active:scale-95 transition-all group bg-transparent p-0 mx-1",
                      isActive && (appMode === 'customer' ? 'bg-[#EEF2FF]' : 'bg-[#D1FAE5]')
                    )}
                  >
                    <div className={cn(
                      "relative z-[12] transition-all duration-300 flex flex-col items-center gap-1",
                      isActive && "scale-105"
                    )}>
                      <Icon 
                        size={isActive ? 20 : 20} 
                        strokeWidth={isActive ? 2.5 : 2}
                        className={cn(
                          "transition-colors",
                          isActive 
                            ? (appMode === 'customer' ? 'text-[#4F46E5]' : 'text-[#00B879]')
                            : 'text-text-muted'
                        )}
                      />
                      <CaptionText 
                        weight={isActive ? 700 : 500} 
                        className={cn(
                          "text-[10px] leading-none transition-colors tracking-tight", 
                          isActive 
                            ? (appMode === 'customer' ? 'text-[#4F46E5]' : 'text-[#00B879]')
                            : 'text-text-muted'
                        )}
                      >
                        {tab.label}
                      </CaptionText>
                    </div>
                  </Button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </AppShell>
  );
};
