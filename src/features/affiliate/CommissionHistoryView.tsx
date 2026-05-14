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
    <div className="space-y-6 pb-32">
      <MobileTopBar
        title="Lịch sử"
      />

      <div className="px-4">
        <CommissionSummaryCard pending={pendingCommissions} paid={paidCommissions} />
      </div>

      <div className="px-4 space-y-4">
        <SectionTitle variant="h3">Giao dịch gần đây</SectionTitle>
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
          />
        )}
      </div>

      <div className={`p-6 ${roleColors.softBg} rounded-3xl space-y-3 border border-${roleColors.primaryBg}/20 mx-4`}>
         <SectionTitle variant="h3">Lưu ý về đối soát</SectionTitle>
         <BodyText color="medium" className="leading-relaxed">
           Hoa hồng sẽ được chuyển sang trạng thái <Text as="span" weight={600} className={roleColors.primary}>Đã xác nhận</Text> sau khi đơn hàng hoàn tất và qua thời gian đổi trả (thông thường là 30 ngày).
         </BodyText>
      </div>
    </div>
  );
};
