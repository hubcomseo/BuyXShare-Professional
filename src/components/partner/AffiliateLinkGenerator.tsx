import React, { useState } from 'react';
import { Share2, Copy, CheckCircle2, Link as LinkIcon } from 'lucide-react';
import { Text, CaptionText } from '../ui/Typography';
import { IconButton, Button, Input } from '../ui';
import { useStore } from '../../store';

export const AffiliateLinkGenerator = () => {
  const { user } = useStore();
  const [productSlug, setProductSlug] = useState('');
  const [copied, setCopied] = useState(false);

  const affiliateLink = productSlug 
    ? `${window.location.origin}/app/partner/marketplace/${productSlug}?partner=${user?.id}`
    : `${window.location.origin}/p/dexspace-exclusive?partner=${user?.id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-surface p-5 rounded-xl border border-border-subtle shadow-sm space-y-4">
       <div className="flex items-center gap-2">
         <div className="p-2 bg-accent/10 rounded-lg text-accent">
           <LinkIcon size={18} />
         </div>
         <Text weight={600}>Link Generator</Text>
       </div>
       
       <Input 
         placeholder="Enter product slug (optional)"
         value={productSlug}
         onChange={(e) => setProductSlug(e.target.value)}
       />
       
       <div className="flex gap-2 p-1.5 bg-surface-soft rounded-lg border border-border-subtle shadow-inner">
         <div className="flex-1 px-4 py-3 truncate flex items-center select-all whitespace-nowrap overflow-hidden">
            <CaptionText color="medium" className="truncate">{affiliateLink}</CaptionText>
         </div>
         <IconButton 
           onClick={copyToClipboard}
           icon={copied ? <CheckCircle2 size={20} className="text-emerald-500" /> : <Copy size={20} />}
           variant={copied ? "soft-partner" : "primary"}
           size="md"
           label="Copy generated link"
           className="rounded-md shadow-md"
         />
       </div>
    </div>
  );
};
