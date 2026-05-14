import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Package, 
  TrendingUp, 
  DollarSign, 
  PackageSearch,
  ShoppingCart,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck
} from 'lucide-react';
import { supplierService } from '../../services/supplier.service';
import { useStore } from '../../store';
import { MetricCard, Badge, Button, FulfillmentStatusBadge } from '../../components/ui';
import { ScreenTitle, SectionTitle, CardTitle, PriceText, CodeText, BodyText, Text, CaptionText } from '../../components/ui/Typography';
import { cn } from '../../lib/utils';
import { formatMoney } from '../../utils/money';

export const SupplierDashboardView = () => {
  const { user } = useStore();
  
  const { data: stats, isLoading } = useQuery({
    queryKey: ['supplierStats', user?.id],
    queryFn: () => supplierService.getStats(user?.id || ''),
    enabled: !!user?.id
  });

  const recentOrders = [
    { id: 'ORD-7721', product: 'Nike Air Max 270', quantity: 1, status: 'pending', amount: 3200000, time: '2 giờ trước' },
    { id: 'ORD-7719', product: 'Adidas Ultraboost', quantity: 2, status: 'shipped', amount: 8400000, time: '5 giờ trước' },
    { id: 'ORD-7715', product: 'Puma RS-X', quantity: 1, status: 'delivered', amount: 2100000, time: '1 ngày trước' },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <Badge variant="outline" size="sm" uppercase className="tracking-widest">Supplier Portal</Badge>
          <ScreenTitle className="tracking-tight">Trình quản lý kho</ScreenTitle>
          <BodyText color="muted">Theo dõi hàng tồn kho và đơn hàng của nhà cung cấp.</BodyText>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-5 py-2.5 bg-surface border border-border-subtle rounded-2xl flex items-center gap-3 shadow-sm">
             <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
             <CaptionText className="font-bold uppercase tracking-wider">Hệ thống: Online</CaptionText>
          </div>
        </div>
      </div>
      
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard 
          label="TỔNG SẢN PHẨM"
          value={stats?.totalProducts || 0}
          icon={Package}
          trend="+2 mới"
          className="bg-surface-elevated/50"
        />
        <MetricCard 
          label="ĐƠN ĐANG XỬ LÝ"
          value={stats?.activeOrders || 0}
          icon={Clock}
          trend="Cần giao"
          className="bg-surface-elevated/50"
        />
        <MetricCard 
          label="DOANH THU THÁNG"
          value={formatMoney(stats?.revenue || 54200000)}
          icon={TrendingUp}
          trend="+12%"
          className="bg-surface-elevated/50 border-primary/20"
        />
        <MetricCard 
          label="CẦN THANH TOÁN"
          value={formatMoney(stats?.payableAmount || 12500000)}
          icon={DollarSign}
          trend="Đợt 15/05"
          className="bg-surface-elevated/50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <SectionTitle size="sm" className="uppercase tracking-tight italic flex items-center gap-2">
              <ShoppingCart size={20} className="text-primary" />
              Đơn hàng mới nhất
            </SectionTitle>
            <Text color="primary" weight={600} variant="body-sm" className="cursor-pointer hover:underline">Xem tất cả</Text>
          </div>
          
          <div className="bg-surface border border-border-subtle rounded-[2rem] overflow-hidden shadow-sm">
             <div className="divide-y divide-border-subtle">
                {recentOrders.map((order) => (
                  <div key={order.id} className="p-5 hover:bg-surface-elevated/30 transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                        order.status === 'pending' ? "bg-warning/10 text-warning" : 
                        order.status === 'shipped' ? "bg-info/10 text-info" : "bg-success/10 text-success"
                      )}>
                        {order.status === 'pending' ? <Clock size={20} /> : 
                         order.status === 'shipped' ? <Truck size={20} /> : <CheckCircle2 size={20} />}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <CodeText weight={600}>{order.id}</CodeText>
                          <CaptionText weight={500} uppercase>{order.time}</CaptionText>
                        </div>
                        <BodyText size="md" color="muted" className="line-clamp-1">{order.product} (x{order.quantity})</BodyText>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <PriceText size="sm">{formatMoney(order.amount)}</PriceText>
                      <FulfillmentStatusBadge 
                        status={order.status}
                        size="xs"
                        className="uppercase tracking-widest"
                      />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* System Alerts & Tools - Right Column */}
         <div className="space-y-6">
            <SectionTitle size="sm" className="uppercase tracking-tight italic flex items-center gap-2">
              <AlertCircle size={20} className="text-error" />
              Thông báo
            </SectionTitle>
            
            <div className="space-y-4">
               <div className="p-6 bg-error/5 border border-error/20 rounded-3xl space-y-3">
                  <div className="flex items-center gap-2 text-error">
                     <AlertCircle size={18} />
                     <CardTitle size="sm" uppercase className="tracking-tight">Kho sắp hết hàng</CardTitle>
                  </div>
                  <BodyText color="muted">3 sản phẩm của bạn đang dưới mức tồn tối thiểu. Vui lòng nhập thêm hàng.</BodyText>
                  <Button variant="outline" size="sm" className="w-full border-error/20 text-error hover:bg-error/10">Kiểm tra kho</Button>
               </div>

               <div className="bg-surface border border-border-subtle p-8 rounded-3xl flex flex-col items-center justify-center text-center space-y-4 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-50" />
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
                     <PackageSearch size={32} />
                  </div>
                  <SectionTitle size="sm" className="italic uppercase tracking-tight">QUẢN LÝ KHO</SectionTitle>
                  <BodyText color="muted" align="center">Hệ thống đang đồng bộ dữ liệu tồn hàng với thị trường.</BodyText>
                  <Button fullWidth className="rounded-2xl font-bold">Thêm sản phẩm</Button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
