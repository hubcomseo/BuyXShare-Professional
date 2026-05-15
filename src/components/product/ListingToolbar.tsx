import React from 'react';
import { LayoutGrid, List, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button, IconButton } from '../ui';
import { Text } from '../ui/Typography';
import { useStore } from '../../store';
import { useTranslation } from '../../lib/i18n';

interface ViewModeToggleProps {
  mode: 'grid' | 'list';
  onChange: (mode: 'grid' | 'list') => void;
  appMode: 'customer' | 'partner' | 'supplier' | 'operator' | 'admin';
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ mode, onChange, appMode }) => {
  const isPartner = appMode === 'partner';
  
  return (
    <div className="flex bg-slate-100 p-1 rounded-xl h-[36px]">
      <button 
        onClick={() => onChange('grid')}
        className={cn(
          "w-8 h-full rounded-lg flex items-center justify-center transition-all", 
          mode === 'grid' 
            ? (isPartner ? "bg-partner-primary text-white shadow-sm" : "bg-customer-primary text-white shadow-sm") 
            : "text-slate-400 hover:text-slate-600"
        )}
      >
        <LayoutGrid size={16} />
      </button>
      <button 
        onClick={() => onChange('list')}
        className={cn(
          "w-8 h-full rounded-lg flex items-center justify-center transition-all", 
          mode === 'list' 
            ? (isPartner ? "bg-partner-primary text-white shadow-sm" : "bg-customer-primary text-white shadow-sm") 
            : "text-slate-400 hover:text-slate-600"
        )}
      >
        <List size={16} />
      </button>
    </div>
  );
};

interface ListingToolbarProps {
  resultCount?: number;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  onSortClick?: () => void;
  onFilterClick?: () => void;
  sortLabel?: string;
  className?: string;
  showViewModeToggle?: boolean;
  showFilter?: boolean;
}

export const ListingToolbar: React.FC<ListingToolbarProps> = ({
  resultCount,
  viewMode = 'grid',
  onViewModeChange,
  onSortClick,
  onFilterClick,
  sortLabel,
  className,
  showViewModeToggle = true,
  showFilter = true
}) => {
  const { t, language } = useTranslation();
  const { appMode } = useStore();

  return (
    <div className={cn(
      "flex items-center justify-between h-[40px] px-4 border-b border-border-subtle/30",
      className
    )}>
      <div className="flex items-center gap-3">
        {showViewModeToggle && onViewModeChange && (
          <ViewModeToggle mode={viewMode} onChange={onViewModeChange} appMode={appMode} />
        )}
        {resultCount !== undefined && (
          <Text weight={700} className="text-slate-400 text-[10.5px] uppercase tracking-[0.05em] font-black">
            {resultCount} {language === 'vi' ? 'sản phẩm' : 'products'}
          </Text>
        )}
      </div>

      <div className="flex items-center gap-2">
        {onSortClick && (
          <Button 
            variant="ghost"
            size="xs"
            onClick={onSortClick}
            className="rounded-xl text-text-primary h-8 px-2 hover:bg-slate-50 font-heading font-black uppercase tracking-wider text-[11px]"
            rightIcon={<ChevronDown size={14} className="opacity-40" />}
          >
            {sortLabel || (language === 'vi' ? 'Sắp xếp' : 'Sort')}
          </Button>
        )}
        
        {showFilter && onFilterClick && (
          <IconButton 
            onClick={onFilterClick}
            variant="secondary"
            size="xs"
            icon={<SlidersHorizontal size={14} />}
            label={language === 'vi' ? 'Lọc' : 'Filter'}
            className="rounded-xl border-border-subtle text-text-secondary w-8 h-8"
          />
        )}
      </div>
    </div>
  );
};
