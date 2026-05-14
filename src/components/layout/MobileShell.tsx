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
    { label: t('partner_marketplace'), icon: Package, path: '/app/partner/products' },
    { label: t('partner_campaigns'), icon: Megaphone, path: '/app/partner/campaigns' },
    { label: t('partner_reports'), icon: BarChart3, path: '/app/partner/stats' },
  ];

  const tabs = appMode === 'customer' ? customerTabs : partnerTabs;

  const hideNavPaths = [
    '/app/products/', 
    '/app/partner/products/',
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
      <main className={`flex-1 min-h-screen overflow-x-hidden ${!shouldHideNav ? 'pb-28' : ''}`}>
        <div className="w-full h-full">
           <Outlet />
        </div>
      </main>

      {/* Bottom Gradient Overlay */}
      {!shouldHideNav && (
        <div className="fixed bottom-0 left-0 w-full h-28 bg-gradient-to-t from-bg-base via-bg-base/80 to-transparent pointer-events-none z-40" />
      )}

      {/* Bottom Tab Bar */}
      {!shouldHideNav && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[calc(100%-2.5rem)] md:max-w-xl lg:max-w-2xl z-50">
          <nav className="bg-surface-elevated/90 backdrop-blur-xl shadow-2xl border border-white/10 rounded-full p-2 flex items-center justify-between gap-1 h-16 relative">
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
                  className="relative flex-1 h-full flex flex-col items-center justify-center rounded-full active:scale-95 transition-transform group bg-transparent p-0"
                >
                  {isActive && (
                    <motion.div 
                      layoutId="mobile-nav-indicator"
                      className={cn(
                        "absolute inset-0 rounded-full z-0",
                        appMode === 'customer' 
                          ? 'bg-customer-primary/10' 
                          : 'bg-partner-primary/10'
                      )}
                      transition={{ 
                        type: "spring", 
                        stiffness: 450, 
                        damping: 25,
                        mass: 0.8
                      }}
                    />
                  )}
                  <div className={cn(
                    "relative z-10 transition-all duration-300 flex flex-col items-center gap-1"
                  )}>
                    <NavIcon icon={Icon} isActive={isActive} isPartner={appMode === 'partner'} />
                    {isActive && (
                      <CaptionText 
                        weight={600} 
                        className={cn(
                          "hidden md:block leading-none", 
                          appMode === 'customer' ? 'text-customer-primary' : 'text-partner-primary'
                        )}
                      >
                        {tab.label}
                      </CaptionText>
                    )}
                  </div>
                </Button>
              );
            })}
          </nav>
        </div>
      )}
    </AppShell>
  );
};
