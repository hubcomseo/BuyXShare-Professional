import React, { useState } from 'react';
import { Share2, Copy, CheckCircle2 } from 'lucide-react';
import { SectionTitle, BodyText } from '../ui/Typography';
import { IconButton } from '../ui/IconButton';
import { useToast } from '../toast';

interface AffiliateLinkCardProps {
  affiliateLink: string;
}

export const AffiliateLinkCard = ({ affiliateLink }: AffiliateLinkCardProps) => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    showToast({
      title: 'Đã sao chép link liên kết',
      type: 'copy',
      contentType: 'link'
    });
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <div className="space-y-3 px-1">
      <div className="flex items-center justify-between">
         <SectionTitle variant="h3" className="flex items-center gap-2">
            <Share2 size={16} className="text-accent" /> 
            Link chia sẻ
         </SectionTitle>
      </div>
      <div className="flex gap-2 p-1.5 bg-surface-soft rounded-2xl border border-border-subtle shadow-inner">
        <div className="flex-1 px-4 py-3 truncate flex items-center select-all whitespace-nowrap overflow-hidden">
           <BodyText color="medium" className="truncate">{affiliateLink}</BodyText>
        </div>
        <IconButton 
          onClick={copyToClipboard}
          icon={copied ? <CheckCircle2 size={24} /> : <Copy size={24} />}
          variant={copied ? "accent" : "secondary"}
          size="icon-md"
          label="Copy referral link"
        />
      </div>
    </div>
  );
};
