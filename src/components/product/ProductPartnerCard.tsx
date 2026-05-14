import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { Text, LabelText, CardTitle, PriceText } from '../ui/Typography';
import { cn } from '../../lib/utils';
import { ProductImage } from './ProductImage';
import { ProductBadges } from './ProductBadges';
import { Button } from '../ui/Button';
import { Copy, CheckCircle2 } from 'lucide-react';
import { formatMoney } from '../../utils/money';
import { useStore } from '../../store';

interface ProductPartnerCardProps {
  product: Product;
  className?: string;
}

export const ProductPartnerCard: React.FC<ProductPartnerCardProps> = ({ 
  product, 
  className 
}) => {
  const { user } = useStore();
  const [copied, setCopied] = React.useState(false);
  const commissionPrice = (product.salePrice || product.price) * (product.commissionRate / 100);

  const copyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user?.id) {
       const link = `${window.location.origin}/p/${product.slug}?partner=${user.id}`;
       navigator.clipboard.writeText(link);
       setCopied(true);
       setTimeout(() => setCopied(false), 2000);
    }
  };

  const productUrl = `/app/partner/products/${product.slug}`;

  return (
    <div 
      className={cn(
        "group flex flex-col bg-surface rounded-[2rem] overflow-hidden shadow-sm border border-border-subtle hover:border-partner-primary/30 transition-all relative h-full active:scale-[0.98]",
        className
      )}
    >
      {/* Product Image */}
      <Link to={productUrl} className="block relative aspect-square bg-surface-soft overflow-hidden">
        <ProductImage 
          src={product.images?.[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          overlay={
            <>
              <div className="absolute top-3 left-3">
                <ProductBadges commissionRate={product.commissionRate} />
              </div>
              <div className="absolute bottom-3 right-3">
                <button 
                  onClick={copyLink}
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-lg active:scale-90",
                    copied 
                      ? "bg-partner-primary text-white" 
                      : "bg-black/40 backdrop-blur-md text-white border border-white/20 hover:bg-partner-primary hover:border-partner-primary"
                  )}
                >
                  {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </>
          }
        />
      </Link>
      
      {/* Product Info */}
      <div className="flex-1 p-5 flex flex-col">
        <Link to={productUrl} className="block mb-2">
          <div className="space-y-1">
            {product.brand && (
              <LabelText uppercase className="tracking-widest opacity-60">{product.brand}</LabelText>
            )}
            <CardTitle 
              size="sm"
              className="line-clamp-1 leading-tight group-hover:text-partner-primary transition-colors h-5"
            >
              {product.name}
            </CardTitle>
          </div>
        </Link>
        
        <div className="mt-auto pt-2">
          {/* Amount */}
          <div className="flex flex-col">
            <PriceText>
              +{formatMoney(commissionPrice)}
            </PriceText>
          </div>
        </div>
      </div>
    </div>
  );
};

