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
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between px-1">
        <Text variant="body-lg" weight={600} color="dark">Danh mục sản phẩm</Text>
        <button 
          onClick={() => navigate('/app/categories')}
          className="text-primary text-[13px] font-bold flex items-center gap-0.5 hover:opacity-70 transition-opacity"
        >
          Xem tất cả <ChevronRight size={14} />
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 pt-1 mx-[-1.25rem] px-5 snap-x snap-mandatory">
        {categories.map((cat, i) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => navigate(`/app/categories/${encodeURIComponent(cat)}`)}
            className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-all shrink-0 min-w-[72px] snap-start"
          >
            <div className="w-14 h-14 rounded-full bg-surface border border-border-subtle flex items-center justify-center shadow-sm group-hover:border-primary/50 group-hover:scale-105 transition-all relative overflow-hidden">
               <img 
                src={CATEGORY_IMAGES[cat] || DEFAULT_IMAGE} 
                alt={cat}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
            </div>
            <CaptionText 
              weight={600} 
              className="text-text-primary text-[11px] text-center line-clamp-1 w-full group-hover:text-primary transition-colors"
            >
              {cat}
            </CaptionText>
          </motion.div>
        ))}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: categories.length * 0.05 }}
          onClick={() => navigate('/app/categories')}
          className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-all shrink-0 min-w-[72px] snap-start"
        >
          <div className="w-14 h-14 rounded-full bg-surface-soft border border-border-subtle flex items-center justify-center shadow-sm group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
             <LayoutGrid size={24} className="text-primary transition-colors" />
          </div>
          <CaptionText 
            weight={600} 
            className="text-text-primary text-[11px] text-center line-clamp-1 w-full group-hover:text-primary transition-colors"
          >
            Tất cả
          </CaptionText>
        </motion.div>
      </div>
    </div>
  );
};
