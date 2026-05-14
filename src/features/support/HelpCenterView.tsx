import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ChevronRight, 
  MessageCircle, 
  HelpCircle, 
  FileText, 
  Zap,
  ShoppingBag,
  CreditCard,
  Truck
} from 'lucide-react';
import { motion } from 'motion/react';
import { Text, Heading, ScreenTitle, SectionTitle, BodyText, LabelText, CaptionText } from '../../components/ui/Typography';
import { MobileTopBar } from '../../components/header';
import { Button } from '../../components/ui';
import { cn } from '../../lib/utils';
import { useTranslation } from '../../lib/i18n';

export const HelpCenterView = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const categories = [
    { title: t('help_categories_shopping'), icon: ShoppingBag, color: 'bg-primary' },
    { title: t('help_categories_payment'), icon: CreditCard, color: 'bg-emerald-500' },
    { title: t('help_categories_shipping'), icon: Truck, color: 'bg-amber-500' },
    { title: t('help_categories_rewards'), icon: Zap, color: 'bg-accent' },
  ];

  const faqs = [
    t('help_faq_1'),
    t('help_faq_2'),
    t('help_faq_3'),
    t('help_faq_4'),
    t('help_faq_5')
  ];

  return (
    <div>
      <MobileTopBar 
        title={t('help_title')} 
        onBack={() => navigate(-1)}
      />

      <div>
        {/* Search Header */}
        <div>
           <div>
              <Heading variant="h1">{t('help_online_support')}</Heading>
              <BodyText color="muted" align="center">{t('help_subtitle')}</BodyText>
           </div>
           
           <div>
              <div></div>
              <div>
                 <Search size={20} />
                 <input 
                   placeholder={t('help_search_placeholder')}
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                 />
              </div>
           </div>
        </div>

        {/* Categories */}
        <div>
           {categories.map((cat, i) => (
             <div 
               key={i}
             >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-dark shadow-lg group-hover:scale-110 transition-transform", cat.color)}>
                   <cat.icon size={26} />
                </div>
                <Text weight={600} color="white">{cat.title}</Text>
             </div>
           ))}
        </div>

        {/* Popular Questions */}
        <div>
           <SectionTitle variant="h3">
              <HelpCircle size={18} />
              {t('help_popular_questions')}
           </SectionTitle>
           <div>
              {faqs.map((faq, i) => (
                <div 
                  key={i}
                >
                   <Text weight={600} color="white">{faq}</Text>
                   <ChevronRight size={16} />
                </div>
              ))}
           </div>
        </div>

        {/* Support Banner */}
        <div>
           <div></div>
           <div>
              <MessageCircle size={32} />
           </div>
           <div>
              <Heading variant="h3" color="white">{t('help_chat_now')}</Heading>
              <BodyText color="muted" align="center">{t('help_chat_desc')}</BodyText>
           </div>
           <Button fullWidth variant="primary" size="md">{t('help_connect_support')}</Button>
        </div>
      </div>
    </div>
  );
};
