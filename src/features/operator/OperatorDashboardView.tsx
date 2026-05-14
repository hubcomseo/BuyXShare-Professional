import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Users, 
  Ticket, 
  DollarSign, 
  Activity,
  ShieldCheck,
  Zap,
  ChevronRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { operatorService } from '../../services/operator.service';
import { MetricCard, Badge, Button } from '../../components/ui';
import { ScreenTitle, SectionTitle, CardTitle, MetricText, CodeText, PriceText, BodyText, Text, CaptionText } from '../../components/ui/Typography';
import { formatMoney } from '../../utils/money';
import { cn } from '../../lib/utils';

export const OperatorDashboardView = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['operatorStats'],
    queryFn: operatorService.getStats
  });

  const pendingApprovals = [
    { id: 'COM-8822', partner: 'Hoàng Nguyễn', amount: 450000, type: 'Hoa hồng', date: '5 phút trước' },
    { id: 'PAY-1102', partner: 'Minh Trần', amount: 2500000, type: 'Rút tiền', date: '20 phút trước' },
    { id: 'PART-004', partner: 'Lan Anh', amount: 0, type: 'Đối tác mới', date: '1 giờ trước' },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <Badge variant="reward" size="sm" uppercase className="tracking-widest">Admin Hub</Badge>
          <ScreenTitle className="tracking-tight">Trung tâm vận hành</ScreenTitle>
          <BodyText color="muted">Quản trị toàn bộ hệ thống BuyXShare.</BodyText>
        </div>
        
        <div className="flex items-center gap-3">
           <Button variant="outline" size="sm" className="rounded-xl border-border-subtle">
             Cài đặt hệ thống
           </Button>
           <Button size="sm" className="rounded-xl">
             Duyệt tất cả
           </Button>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard 
          label="DOANH THU"
          value={formatMoney(stats?.revenue || 125000000)}
          icon={DollarSign}
          trend="+8.5%"
          className="bg-surface-elevated/50"
        />
        <MetricCard 
          label="ĐỐI TÁC MỚI"
          value={stats?.newPartners || 124}
          icon={Users}
          trend="+12"
          className="bg-surface-elevated/50"
        />
        <MetricCard 
          label="VÉ CHỜ XỬ LÝ"
          value={stats?.pendingTickets || 8}
          icon={Ticket}
          trend="Cần hỗ trợ"
          className="bg-surface-elevated/50 border-warning/20 shadow-warning/5"
        />
        <MetricCard 
          label="CHỜ THANH TOÁN"
          value={formatMoney(stats?.pendingCommissions || 12400000)}
          icon={Activity}
          trend="24 lệnh"
          className="bg-surface-elevated/50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending Approvals List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <SectionTitle size="sm" className="uppercase tracking-tight italic flex items-center gap-2">
              <ShieldCheck size={20} className="text-accent" />
              Chờ phê duyệt
            </SectionTitle>
            <Button variant="ghost" size="sm" className="text-accent hover:bg-accent/10">Xem danh sách</Button>
          </div>
          
          <div className="bg-surface border border-border-subtle rounded-[2rem] overflow-hidden shadow-sm">
             <div className="divide-y divide-border-subtle">
                {pendingApprovals.map((req) => (
                  <div key={req.id} className="p-5 hover:bg-surface-elevated/30 transition-colors flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                        req.type === 'Hoa hồng' ? "bg-primary/10 text-primary" : 
                        req.type === 'Rút tiền' ? "bg-accent/10 text-accent" : "bg-info/10 text-info"
                      )}>
                        {req.type === 'Hoa hồng' ? <TrendingUp size={20} /> : 
                         req.type === 'Rút tiền' ? <DollarSign size={20} /> : <Users size={20} />}
                      </div>
                      <div className="space-y-0.5">
                        <CodeText weight={600} color="dark">{req.partner}</CodeText>
                        <div className="flex items-center gap-2">
                           <CaptionText uppercase className="tracking-widest">{req.type}</CaptionText>
                           <span className="w-1 h-1 rounded-full bg-border-strong" />
                           <CaptionText>{req.date}</CaptionText>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      {req.amount > 0 && <PriceText size="sm">{formatMoney(req.amount)}</PriceText>}
                      <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-border-subtle flex items-center justify-center text-text-muted group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all">
                         <ChevronRight size={18} />
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* System Status - Right Column */}
         <div className="space-y-6">
            <SectionTitle size="sm" className="uppercase tracking-tight italic flex items-center gap-2">
              <Zap size={20} className="text-warning" />
              Sức khỏe hệ thống
            </SectionTitle>
            
            <div className="space-y-4">
               <div className="bg-surface border border-border-subtle p-6 rounded-3xl space-y-6 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between">
                     <Text weight={600} variant="body-sm">Server Latency</Text>
                     <Text weight={600} variant="code" color="success" className="uppercase tracking-widest">24ms (Good)</Text>
                  </div>
                  <div className="h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                     <div className="h-full bg-success w-[15%]" />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                     <Text weight={600} variant="body-sm">API Error Rate</Text>
                     <Text weight={600} variant="code" color="success" className="uppercase tracking-widest">0.02%</Text>
                  </div>
                  <div className="h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                     <div className="h-full bg-success w-[2%]" />
                  </div>
               </div>

               <div className="p-6 bg-warning/5 border border-warning/20 rounded-3xl space-y-4 flex flex-col items-center text-center">
                  <AlertTriangle size={36} className="text-warning animate-bounce" />
                  <div className="space-y-1">
                     <CardTitle size="sm" uppercase className="tracking-tight">Yêu cầu bảo trì</CardTitle>
                     <BodyText color="muted">Hệ thống gợi ý cập nhật database vào 02:00 sáng mai để tối ưu hóa hiệu suất.</BodyText>
                  </div>
                  <Button variant="outline" size="sm" fullWidth className="border-warning/30 text-warning hover:bg-warning/10">Lên lịch ngay</Button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
