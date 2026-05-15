import React from 'react';
import { 
  ProductCard, 
  ProductPartnerCard, 
  CustomerProductListItem, 
  PartnerProductListItem, 
  ProductHorizontalItem, 
  ProductCompactItem, 
  ProductDetailRelatedItem, 
  ProductOrderItem, 
  ProductCheckoutItem, 
  ProductAdminRow, 
  ProductCampaignItem, 
  ProductPrice, 
  ProductBadges,
  ListingToolbar,
  CategoryMenu
} from '../../components/product/index';

import { 
  MobileTopBar, 
  MobileLargeHeader, 
  ProductHeader, 
  CheckoutHeader, 
  PartnerHeader 
} from '../../components/header/index';

import { 
  Button, 
  Badge, 
  ButtonGroup, 
  IconButton, 
  Input, 
  Textarea, 
  MetricCard, 
  FulfillmentStatusBadge,
  PaymentStatusBadge,
  ProductStockBadge
} from '../../components/ui';

import { 
  OrderCard, 
  OrderSummaryCard, 
  OrderTimeline, 
  OrderPriceBreakdown,
  OrderStatusTabs
} from '../../components/order';

import { PageContainer, Section, SectionHeader } from '../../components/layout';
import { HomeSlider } from '../../components/banner/HomeSlider';

import { Text, CaptionText } from '../../components/ui/Typography';
import { Product } from '../../types/product';
import { Order } from '../../types/order';
import { ShoppingBag, Box, User, Settings, Bell, Search, Star, Home, LayoutGrid, Ticket } from 'lucide-react';
import { cn } from '../../lib/utils';

const MOCK_PRODUCT: Product = {
  id: 'preview-1',
  supplierId: 's1',
  name: 'Nike Air Max 270 Premium Edition',
  slug: 'nike-air-max-270',
  brand: 'NIKE',
  price: 3200000,
  salePrice: 2800000,
  commissionRate: 18,
  category: 'Shoes',
  stock: 100,
  status: 'active',
  images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'],
  description: 'A classic shoe design with modern comfort features.',
  createdAt: new Date().toISOString()
};

const MOCK_ORDER: Order = {
  id: 'ORD-TEST',
  orderCode: 'BC12345678',
  customerName: 'Nguyễn Văn A',
  customerPhone: '0987654321',
  customerAddress: '123 Đường ABC, Quận 1, HCM',
  productId: 'preview-1',
  supplierId: 's1',
  quantity: 2,
  subtotal: 5600000,
  shippingFee: 30000,
  total: 5630000,
  paymentStatus: 'pending',
  fulfillmentStatus: 'processing',
  reconciliationStatus: 'pending',
  paymentMethod: 'cod',
  deliveryMethod: 'standard',
  createdAt: new Date().toISOString()
};

export const SystemDesignView: React.FC = () => {
  return (
    <PageContainer title="System Design Master" className="pb-32 bg-bg-soft">
      <div className="space-y-16 py-8 px-4 max-w-4xl mx-auto">
        
        {/* Intro */}
        <div className="text-center space-y-2">
          <Text variant="h1" className="text-3xl font-black italic tracking-tighter uppercase">SYSTEM DESIGN</Text>
          <Text color="muted">Full Component Manifest & Interaction Guide</Text>
        </div>

        {/* Section: Banners */}
        <Section title="Banners" description="Marketing and promotional sliders">
          <div className="space-y-4">
             <Text variant="label" className="pl-1">HomeSlider (16:9 Aspect Ratio)</Text>
             <HomeSlider />
          </div>
        </Section>

        {/* Section: Typography */}
        <Section title="Typography" description="Standard global font styles and hierarchy">
          <div className="bg-white p-6 rounded-2xl border border-border-subtle space-y-4">
            <div className="space-y-1">
              <Text variant="label" color="muted">Variant: H1</Text>
              <Text variant="h1">The quick brown fox jumps over the lazy dog</Text>
            </div>
            <div className="space-y-1">
              <Text variant="label" color="muted">Variant: H2</Text>
              <Text variant="h2">The quick brown fox jumps over the lazy dog</Text>
            </div>
            <div className="space-y-1">
              <Text variant="label" color="muted">Variant: H3</Text>
              <Text variant="h3">The quick brown fox jumps over the lazy dog</Text>
            </div>
            <div className="space-y-1">
              <Text variant="label" color="muted">Variant: Body (Default)</Text>
              <Text variant="body-md">The quick brown fox jumps over the lazy dog. Standard interface text with clear legibility and balanced spacing.</Text>
            </div>
            <div className="space-y-1">
              <Text variant="label" color="muted">Variant: Body-SM</Text>
              <Text variant="body-sm">The quick brown fox jumps over the lazy dog. Smaller secondary text for descriptions.</Text>
            </div>
            <div className="space-y-1">
              <Text variant="label" color="muted">Variant: Label</Text>
              <Text variant="label">THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG</Text>
            </div>
          </div>
        </Section>

        {/* Section: Buttons */}
        <Section title="Buttons" description="Interaction elements for actions and navigation">
          <div className="bg-white p-6 rounded-2xl border border-border-subtle space-y-8">
            {/* Primary & Secondary */}
            <div className="space-y-4">
              <Text variant="label" color="muted">Base Variants</Text>
              <div className="flex flex-wrap gap-4">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-4">
              <Text variant="label" color="muted">Sizes</Text>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button fullWidth>Full Width</Button>
              </div>
            </div>

            {/* Icons & Loading */}
            <div className="space-y-4">
              <Text variant="label" color="muted">Special States</Text>
              <div className="flex flex-wrap gap-4">
                <Button leftIcon={<ShoppingBag size={18} />}>With Icon</Button>
                <Button loading>Loading State</Button>
                <Button disabled>Disabled Button</Button>
                <IconButton label="Notifications" icon={<Bell size={20} />} />
                <IconButton label="Settings" icon={<Settings size={20} />} variant="secondary" />
              </div>
            </div>

            {/* Button Group */}
            <div className="space-y-4">
              <Text variant="label" color="muted">Button Group</Text>
              <ButtonGroup>
                <Button variant="outline">Option A</Button>
                <Button variant="outline">Option B</Button>
                <Button variant="outline">Option C</Button>
              </ButtonGroup>
            </div>
          </div>
        </Section>

        {/* Section: Badges & Metrics */}
        <Section title="Badges & Metrics" description="Visual indicators for status and data">
          <div className="bg-white p-6 rounded-2xl border border-border-subtle space-y-8">
            <div className="space-y-4">
              <Text variant="label" color="muted">Standard Badges</Text>
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="customer">Customer</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Danger</Badge>
                <Badge variant="sale" icon={<Star size={10} />}>Hot</Badge>
                <Badge variant="reward">+1 VÉ</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <Text variant="label" color="muted">Status Badges</Text>
              <div className="flex flex-wrap gap-4">
                <PaymentStatusBadge status="pending" />
                <FulfillmentStatusBadge status="processing" />
                <FulfillmentStatusBadge status="completed" />
                <FulfillmentStatusBadge status="cancelled" />
                <ProductStockBadge status="in_stock" />
                <ProductStockBadge status="out_of_stock" />
              </div>
            </div>

            <div className="space-y-4">
              <Text variant="label" color="muted">Metric Cards</Text>
              <div className="grid grid-cols-2 gap-4">
                <MetricCard 
                  label="Doanh thu" 
                  value="12.500.000 ₫" 
                  icon={ShoppingBag} 
                  trend="+12% từ tháng trước"
                  trendType="positive"
                />
                <MetricCard 
                  label="Đơn hàng" 
                  value="48" 
                  icon={Box} 
                  trend="-5% từ tháng trước"
                  trendType="negative"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Section: Product Display */}
        <Section title="Product Components" description="Core product visualization blocks">
          <div className="space-y-8">
            {/* Grid Cards */}
            <div className="space-y-4">
              <Text variant="label" className="pl-1">Grid Pattern (2-Column)</Text>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Text variant="caption">ProductCard</Text>
                  <ProductCard product={MOCK_PRODUCT} />
                </div>
                <div className="space-y-2">
                  <Text variant="caption">ProductPartnerCard</Text>
                  <ProductPartnerCard product={MOCK_PRODUCT} />
                </div>
              </div>
            </div>

            {/* List Pattern */}
            <div className="space-y-4">
              <Text variant="label" className="pl-1">List Pattern</Text>
              <div className="bg-white rounded-2xl border border-border-subtle divide-y overflow-hidden">
                <CustomerProductListItem product={MOCK_PRODUCT} />
                <PartnerProductListItem product={MOCK_PRODUCT} />
              </div>
            </div>

            {/* Price Variants */}
            <div className="space-y-4">
              <Text variant="label" className="pl-1 border-t pt-4">Price Typography Logic</Text>
              <div className="bg-white p-4 rounded-xl border border-border-subtle flex flex-wrap gap-8 items-end">
                <div className="space-y-1 text-center">
                  <Text variant="caption">MD (Detail)</Text>
                  <ProductPrice price={3200000} salePrice={2800000} />
                </div>
                <div className="space-y-1 text-center">
                  <Text variant="caption">SM (Card)</Text>
                  <ProductPrice price={3200000} salePrice={2800000} size="mini" />
                </div>
                <div className="space-y-1 text-center">
                  <Text variant="caption">List</Text>
                  <ProductPrice price={3200000} salePrice={2800000} variant="list" />
                </div>
                <div className="space-y-1 text-center">
                  <Text variant="caption">Old Only</Text>
                  <ProductPrice price={3200000} />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Section: Orders */}
        <Section title="Order Components" description="Process tracking and transactional UI">
          <div className="space-y-6">
            <div className="space-y-2">
              <Text variant="label">OrderCard</Text>
              <OrderCard order={MOCK_ORDER} product={MOCK_PRODUCT} appMode="customer" />
            </div>

            <div className="space-y-2 pt-4">
              <Text variant="label">Order Summary & Breakdown</Text>
              <div className="bg-white p-2 rounded-2xl border border-border-subtle">
                <OrderPriceBreakdown 
                  subtotal={5600000} 
                  shipping={30000} 
                  discount={100000} 
                  total={5530000} 
                  appMode="customer"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Section: Form Elements */}
        <Section title="Forms" description="Input and data collection components">
          <div className="bg-white p-6 rounded-2xl border border-border-subtle space-y-6">
            <div className="space-y-2">
              <Text variant="label">Standard Input</Text>
              <Input placeholder="Enter your name..." />
            </div>
            <div className="space-y-2">
              <Text variant="label">Input with Icon</Text>
              <Input placeholder="Search items..." leftIcon={<Search size={18} />} />
            </div>
            <div className="space-y-2">
              <Text variant="label">Error State</Text>
              <Input placeholder="Email address" error="Vui lòng nhập email hợp lệ" defaultValue="invalid-email" />
            </div>
            <div className="space-y-2">
              <Text variant="label">Textarea</Text>
              <Textarea placeholder="Write your feedback..." rows={3} />
            </div>
          </div>
        </Section>

        {/* Section: Extra items */}
        <Section title="Additional Blocks" description="Miscellaneous UI elements">
          <div className="space-y-6">
             <div className="bg-white p-4 rounded-xl border border-border-subtle">
                <ProductAdminRow product={MOCK_PRODUCT} />
             </div>
             <div className="bg-white p-4 rounded-xl border border-border-subtle">
                <ProductOrderItem 
                   name={MOCK_PRODUCT.name}
                   image={MOCK_PRODUCT.images?.[0] || ''}
                   amount={MOCK_PRODUCT.price}
                   role="customer"
                />
             </div>
          </div>
        </Section>

        {/* Section: Headers */}
        <Section title="Header System" description="Navigation headers for different contexts">
          <div className="space-y-8 bg-slate-200/50 p-4 rounded-3xl border border-border-subtle">
            <div className="space-y-2">
              <Text variant="label" color="muted">MobileTopBar (Standard)</Text>
              <div className="bg-white border rounded-2xl overflow-hidden shadow-sm relative isolate z-0 h-14">
                <div className="absolute inset-0 [&>*]:!relative [&>*]:!top-0 [&>*]:!left-0 [&>*]:!right-0 [&>*]:!z-0">
                  <MobileTopBar title="Trang chủ" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Text variant="label" color="muted">MobileLargeHeader (Marketing / Feature)</Text>
              <div className="bg-white border rounded-2xl overflow-hidden shadow-sm min-h-[140px] pt-4 relative isolate z-0">
                <div className="[&>*]:!relative [&>*]:!top-0 [&>*]:!left-0 [&>*]:!right-0 [&>*]:!z-0">
                  <MobileLargeHeader 
                    title="Tìm sản phẩm" 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Text variant="label" color="muted">ProductHeader (Transparent to White)</Text>
              <div className="bg-stone-800 border rounded-2xl overflow-hidden h-20 relative isolate z-0">
                <div className="absolute inset-0 [&>*]:!relative [&>*]:!top-0 [&>*]:!left-0 [&>*]:!right-0 [&>*]:!z-0">
                  <ProductHeader />
                </div>
                <div className="flex items-center justify-center h-full pt-10">
                  <Text className="text-white/30 italic text-xs">Transparent Header Preview</Text>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Text variant="label" color="muted">PartnerHeader</Text>
              <div className="bg-white border rounded-2xl overflow-hidden shadow-sm relative isolate z-0 h-16">
                <div className="absolute inset-0 [&>*]:!relative [&>*]:!top-0 [&>*]:!left-0 [&>*]:!right-0 [&>*]:!z-0">
                  <PartnerHeader />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Text variant="label" color="muted">CheckoutHeader</Text>
              <div className="bg-white border rounded-2xl overflow-hidden shadow-sm relative isolate z-0 h-16">
                <div className="absolute inset-0 [&>*]:!relative [&>*]:!top-0 [&>*]:!left-0 [&>*]:!right-0 [&>*]:!z-0">
                  <CheckoutHeader />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Section: Search & Toolbar */}
        <Section title="Search & Marketplace Tools" description="Components for discovery and catalog management">
          <div className="bg-white p-6 rounded-2xl border border-border-subtle space-y-8">
            <div className="space-y-4">
              <Text variant="label" color="muted">Marketplace Search Bar</Text>
              <Input 
                placeholder="Tìm sản phẩm, nhãn hiệu..." 
                leftIcon={<Search size={18} className="text-customer-primary" />}
                rightIcon={<IconButton label="Clear" icon={<Box size={16} />} variant="ghost" size="xs" />}
              />
            </div>

            <div className="space-y-4">
              <Text variant="label" color="muted">ListingToolbar (Grid/List & Sort/Filter)</Text>
              <div className="border border-border-subtle rounded-xl overflow-hidden">
                <ListingToolbar 
                  resultCount={154} 
                  viewMode="grid" 
                  onViewModeChange={() => {}} 
                  onSortClick={() => {}}
                  onFilterClick={() => {}}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Text variant="label" color="muted">CategoryMenu (Horizontal Scroll)</Text>
              <div className="bg-slate-50 -mx-6 px-6 py-4 border-y border-border-subtle">
                <CategoryMenu />
              </div>
            </div>
          </div>
        </Section>

        {/* Section: Bottom Bar */}
        <Section title="Navigation System" description="Mobile bottom tab bar system">
          <div className="bg-slate-900 p-8 rounded-3xl relative overflow-hidden h-[240px] flex flex-col justify-end">
            <Text className="text-white/20 absolute top-8 left-8 max-w-[200px]">Bottom Tab Bar is typically fixed to the viewport. Shown here in preview mode.</Text>
            
            {/* Simulated Bottom Bar */}
            <div className="w-full px-2 pb-2">
              <div className="bg-white/92 backdrop-blur-md border border-white/20 shadow-xl rounded-[24px] overflow-hidden">
                <nav className="flex items-center justify-around h-[64px] px-1">
                  {[
                    { label: 'Trang chủ', icon: Home, active: true, color: '#4F46E5', bg: '#EEF2FF' },
                    { label: 'Danh mục', icon: LayoutGrid, active: false, color: '#64748B', bg: 'transparent' },
                    { label: 'Tìm kiếm', icon: Search, active: false, color: '#64748B', bg: 'transparent' },
                    { label: 'Phần thưởng', icon: Ticket, active: false, color: '#64748B', bg: 'transparent' }
                  ].map((tab) => (
                    <button
                      key={tab.label}
                      className={cn(
                        "relative flex-1 h-[48px] flex flex-col items-center justify-center rounded-[16px] transition-all group p-0 mx-1",
                        tab.active && "bg-[#EEF2FF]"
                      )}
                    >
                      <tab.icon 
                        size={20} 
                        strokeWidth={tab.active ? 2.5 : 2}
                        className={cn("transition-colors", tab.active ? "text-[#4F46E5]" : "text-text-muted")}
                      />
                      <CaptionText 
                        weight={tab.active ? 700 : 500} 
                        className={cn("text-[10px] leading-none mt-1", tab.active ? "text-[#4F46E5]" : "text-text-muted")}
                      >
                        {tab.label}
                      </CaptionText>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </Section>

      </div>
    </PageContainer>
  );
};
