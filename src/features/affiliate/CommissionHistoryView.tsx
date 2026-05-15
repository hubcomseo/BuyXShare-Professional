import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MobileTopBar } from '../../components/header';
import { useStore } from '../../store';
import { affiliateService } from '../../services/affiliate.service';
import { Text, Heading, ScreenTitle, SectionTitle, BodyText, LabelText, CaptionText, PriceText } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { formatMoney } from '../../utils/money';
import { formatStatus } from '../../utils/status';
import { ProductOrderItem } from '../../components/product/ProductOrderItem';
import { CommissionSummaryCard } from '../../components/partner/CommissionSummaryCard';
import { getRoleColors } from '../../theme/roleColors';
import { EmptyState } from '../../components/feedback';
import { PageContainer } from '../../components/layout';
import { FileText } from 'lucide-react';

export const CommissionHistoryView = () => {
  const { user, appMode } = useStore();
  const roleColors = getRoleColors(appMode);

  const { data: commissions = [] } = useQuery({
    queryKey: ['commissions', user?.id],
    queryFn: () => affiliateService.getCommissions(user?.id || '')
  });

  const pendingCommissions = commissions.filter((c: any) => c.status === 'pending').reduce((sum: number, c: any) => sum + c.commissionAmount, 0);
  const paidCommissions = commissions.filter((c: any) => c.status === 'paid').reduce((sum: number, c: any) => sum + c.commissionAmount, 0);

  return (
    <PageContainer
      variant="mobile"
      headerVariant="compact"
      withHeaderOffset
      withBottomTabs
      className="space-y-6"
    >
      <MobileTopBar
        title="Lịch sử"
      />
        <CommissionSummaryCard pending={pendingCommissions} paid={paidCommissions} />

        <div className="space-y-5">
           <div className="flex items-center justify-between px-1 border-b border-border-subtle pb-4">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-xl bg-partner-soft text-partner-primary flex items-center justify-center shrink-0 shadow-inner">
                    <FileText size={16} strokeWidth={2.5} />
                 </div>
                 <SectionTitle variant="h3" className="font-black italic uppercase tracking-tighter text-base m-0">Giao dịch gần đây</SectionTitle>
              </div>
              <div className="w-12 h-1 bg-partner-primary/20 rounded-full"></div>
           </div>
           
           <div className="space-y-4">
              {commissions.length > 0 ? (
                commissions.map((c: any) => (
                  <ProductOrderItem
                    key={c.id}
                    role="partner"
                    image={c.productImage || '/images/1.jpg'}
                    name={c.productName || 'Affiliate Referral'}
                    amount={c.orderAmount}
                    orderCode={c.orderId.split('-')[1]}
                    commissionAmount={c.commissionAmount}
                    commissionStatus={c.status}
                    customerPhoneMasked={c.customerPhoneMasked}
                  />
                ))
              ) : (
                <EmptyState 
                  icon={FileText}
                  title="Chưa có dữ liệu hoa hồng"
                  description="Bạn chưa có hoa hồng nào từ các chiến dịch. Bắt đầu chia sẻ liên kết để nhận hoa hồng ngay."
                  className="bg-bg-soft rounded-[2rem] border-dashed"
                />
              )}
           </div>
        </div>

        <div className="p-8 bg-partner-soft/30 rounded-[2.5rem] space-y-4 border border-partner-primary/10 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-partner-primary/5 rounded-full blur-2xl group-hover:bg-partner-primary/10 transition-colors"></div>
           <SectionTitle variant="h3" className="font-black italic uppercase tracking-tighter text-base m-0">Lưu ý về đối soát</SectionTitle>
           <BodyText weight={500} className="leading-relaxed text-text-secondary text-sm">
             Hoa hồng sẽ được chuyển sang trạng thái <Text as="span" weight={800} className="text-partner-primary italic">Đã xác nhận</Text> sau khi đơn hàng hoàn tất và qua thời gian đổi trả (thông thường là 30 ngày).
           </BodyText>
        </div>
      </PageContainer>
  );
};
