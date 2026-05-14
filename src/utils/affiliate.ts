import { Product } from '../types/product';
import { Order } from '../types/order';

export const getAffiliateLink = (slug: string, partnerId: string) => {
  return `${window.location.origin}/p/${slug}?partner=${partnerId}`;
};
