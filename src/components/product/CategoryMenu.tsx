import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  LayoutGrid
} from 'lucide-react';
import { productService } from '../../services/product.service';
import { Text, CaptionText } from '../ui/Typography';
import { cn } from '../../lib/utils';

const CATEGORY_IMAGES: Record<string, string> = {
  'Fashion': '/images/1.jpg',
  'Electronics': '/images/2.jpg',
  'Home': '/images/3.jpg',
  'Beauty': '/images/4.jpg',
  'Sports': '/images/5.jpg',
  'Food': '/images/6.jpg',
  'Gia dụng': '/images/7.jpg',
  'Thời trang': '/images/8.jpg',
  'Sức khỏe': '/images/9.jpg',
  'Làm đẹp': '/images/10.jpg',
  'Beverage': '/images/1.jpg',
  'Footwear': '/images/2.jpg',
  'Outdoor': '/images/3.jpg',
  'Apparel': '/images/4.jpg'
};

const DEFAULT_IMAGE = '/images/5.jpg';

interface CategoryMenuProps {
  className?: string;
}

export const CategoryMenu: React.FC<CategoryMenuProps> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts
  });

  const categories = React.useMemo(() => {
    const unique = Array.from(new Set(products.map(p => p.category)));
    return unique.slice(0, 8); // Limit to top 8 for the menu
  }, [products]);

  return (
    <div className={className}>
      <div className="flex gap-2 overflow-x-auto no-scrollbar mx-[-1rem] px-4 snap-x snap-mandatory">
        {categories.map((cat, i) => {
          const isActive = location.pathname.includes(encodeURIComponent(cat));
          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => navigate(`/app/categories/${encodeURIComponent(cat)}`)}
              className={cn(
                "flex items-center h-[44px] pl-[4px] pr-4 border rounded-full group cursor-pointer active:scale-95 transition-all shrink-0 snap-start shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
                isActive 
                  ? "bg-primary/10 border-primary/30" 
                  : "bg-white border-[#E2E8F0] hover:border-primary/30"
              )}
            >
              <div className="w-[36px] h-[36px] rounded-full overflow-hidden shrink-0 border border-border-subtle/30 shadow-sm">
                 <img 
                  src={CATEGORY_IMAGES[cat] || DEFAULT_IMAGE} 
                  alt={cat}
                  className="w-full h-full object-cover"
                 />
              </div>
              <span 
                className={cn(
                  "text-[13px] font-semibold whitespace-nowrap transition-colors ml-2.5 tracking-tight",
                  isActive ? "text-primary" : "text-text-primary group-hover:text-primary"
                )}
              >
                {cat}
              </span>
            </motion.div>
          );
        })}

        {/* View All Chip */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: categories.length * 0.03 }}
          onClick={() => navigate('/app/categories')}
          className={cn(
            "flex items-center h-[44px] pl-[4px] pr-4 border rounded-full group cursor-pointer active:scale-95 transition-all shrink-0 snap-start shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
            location.pathname === '/app/categories'
              ? "bg-primary/10 border-primary/30"
              : "bg-primary/5 border-primary/20"
          )}
        >
          <div className="w-[36px] h-[36px] rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <LayoutGrid size={16} className="text-primary" />
          </div>
          <span 
            className="text-primary text-[13px] font-bold whitespace-nowrap ml-2.5 tracking-tight"
          >
            Tất cả
          </span>
        </motion.div>
      </div>
    </div>
  );
};
