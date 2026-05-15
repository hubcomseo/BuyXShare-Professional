import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import { useStore } from '../../store';
import { HomeView } from '../../features/products/HomeView';
import { ProductDetailView } from '../../features/products/ProductDetailView';
import { CheckoutView } from '../../features/checkout/CheckoutView';
import { SuccessView } from '../../features/checkout/SuccessView';
import { CustomerRewardsView } from '../../features/rewards/CustomerRewardsView';
import { MarketplaceView } from '../../features/affiliate/MarketplaceView';
import { PartnerDashboardView } from '../../features/affiliate/PartnerDashboardView';
import { CommissionHistoryView } from '../../features/affiliate/CommissionHistoryView';
import { PayoutStatusView } from '../../features/affiliate/PayoutStatusView';
import { PartnerCampaignsView } from '../../features/partners/PartnerCampaignsView';
import { PerformanceAnalyticsView } from '../../features/analytics/PerformanceAnalyticsView';
import { RewardTrackingView } from '../../features/rewards/RewardTrackingView';
import { TicketDetailView } from '../../features/rewards/TicketDetailView';
import { RewardsScanView } from '../../features/rewards/RewardsScanView';
import { PersonalInfoView } from '../../features/profile/PersonalInfoView';
import { AddressBookView } from '../../features/profile/AddressBookView';
import { NotificationSettingsView } from '../../features/profile/NotificationSettingsView';
import { PrivacyView } from '../../features/profile/PrivacyView';
import { HelpCenterView } from '../../features/support/HelpCenterView';
import { ContactView } from '../../features/support/ContactView';
import { ShareAppView } from '../../features/support/ShareAppView';
import { SupplierDashboardView } from '../../features/supplier/SupplierDashboardView';
import { OperatorDashboardView } from '../../features/operator/OperatorDashboardView';

import { SystemDesignView } from '../../features/debug/SystemDesignView';

import { MobileShell, ProductPageShell, DashboardShell, CheckoutShell } from '../../components/layout';
import { MyOrdersView } from '../../features/orders/MyOrdersView';
import { OrderDetailView } from '../../features/orders/OrderDetailView';
import { ProfileView } from '../../features/products/ProfileView';
import { SearchView } from '../../features/products/SearchView';
import { CategoryListView } from '../../features/products/CategoryListView';
import { CategoryDetailView } from '../../features/products/CategoryDetailView';

const RoleBasedHome = () => {
  const { user, setAppMode } = useStore();
  
  React.useEffect(() => {
    if (user?.role === 'partner') setAppMode('partner');
    else if (user?.role === 'supplier') setAppMode('supplier');
    else if (user?.role === 'operator') setAppMode('operator');
    else if (user?.role === 'customer') setAppMode('customer');
  }, [user, setAppMode]);

  if (user?.role === 'customer') return <Navigate to="/app/home" replace />;
  if (user?.role === 'partner') return <Navigate to="/app/partner/dashboard" replace />;
  if (user?.role === 'supplier') return <Navigate to="/storims/supplier" replace />;
  if (user?.role === 'operator') return <Navigate to="/storims/operator" replace />;
  
  return <Navigate to="/app/home" replace />;
};

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<RoleBasedHome />} />
      
      {/* Zone 1: Mobile App Experience */}
      <Route path="/app" element={<MobileShell />}>
        <Route path="home" element={<HomeView />} />
        <Route path="products/:slug" element={<ProductDetailView />} />
        <Route path="products/:slug/order" element={<CheckoutView />} />
        <Route path="search" element={<SearchView />} />
        <Route path="categories" element={<CategoryListView />} />
        <Route path="categories/:category" element={<CategoryDetailView />} />
        <Route path="rewards" element={<CustomerRewardsView />} />
        <Route path="rewards/track" element={<Navigate to="/p/track" replace />} />
        <Route path="rewards/:ticketId" element={<TicketDetailView />} />
        <Route path="orders" element={<MyOrdersView />} />
        <Route path="orders/:orderId" element={<OrderDetailView />} />
        <Route path="profile" element={<ProfileView />} />
        <Route path="profile/info" element={<PersonalInfoView />} />
        <Route path="profile/addresses" element={<AddressBookView />} />
        <Route path="profile/notifications" element={<NotificationSettingsView />} />
        <Route path="profile/privacy" element={<PrivacyView />} />
        
        <Route path="support/help" element={<HelpCenterView />} />
        <Route path="support/contact" element={<ContactView />} />
        <Route path="support/share" element={<ShareAppView />} />
        
        <Route path="debug/design" element={<SystemDesignView />} />
        
        <Route path="partner/dashboard" element={<PartnerDashboardView />} />
        <Route path="partner/marketplace" element={<MarketplaceView />} />
        <Route path="partner/marketplace/:category" element={<CategoryDetailView />} />
        <Route path="partner/marketplace/products/:slug" element={<ProductDetailView />} />
        <Route path="partner/commissions" element={<CommissionHistoryView />} />
        <Route path="partner/payouts" element={<PayoutStatusView />} />
        <Route path="partner/campaigns" element={<PartnerCampaignsView />} />
        <Route path="partner/stats" element={<PerformanceAnalyticsView />} />
        
        <Route path="*" element={<Placeholder name="Mobile App Screen" />} />
      </Route>

      {/* Zone 4: Storims Supplier/Admin Experience */}
      <Route path="/storims" element={<DashboardShell />}>
        <Route path="supplier" element={<SupplierDashboardView />} />
        <Route path="operator" element={<OperatorDashboardView />} />
        <Route path="*" element={<Placeholder name="Storims Admin" />} />
      </Route>

      {/* Zone 2: Web Productpages */}
      <Route path="/p" element={<ProductPageShell />}>
        {/* Specific functional routes come BEFORE :slug to avoid conflict */}
        <Route path="track" element={
          <div className="w-full h-full">
            <RewardTrackingView />
          </div>
        } />
        <Route path="track-order" element={<Navigate to="/p/track" replace />} />
        
        <Route path=":slug" element={<ProductDetailView isLandingPage />} />
        <Route path=":slug/order" element={<CheckoutView />} />
        <Route path="success/:orderId" element={<SuccessView />} />
        <Route path="*" element={<Placeholder name="Product Page" />} />
      </Route>

      {/* Zone 3: Checkout Experience */}
      <Route path="/checkout" element={<CheckoutShell />}>
        <Route path=":slug" element={<CheckoutView />} />
        <Route path="success/:orderId" element={<SuccessView />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const Placeholder = ({ name }: { name: string }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-20 text-center bg-bg-base">
    <div className="w-20 h-20 bg-primary/5 rounded-[2.5rem] flex items-center justify-center text-primary mb-6 animate-pulse">
      <Package size={40} />
    </div>
    <h2 className="text-2xl font-bold text-text-primary tracking-tight uppercase mb-2 font-heading">{name}</h2>
    <p className="text-muted font-bold text-sm uppercase tracking-widest italic opacity-50 font-sans">Under Construction</p>
  </div>
);
