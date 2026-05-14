export const affiliateService = {
  getStats: async (userId: string) => {
    const res = await fetch('/api/partner/stats', {
      headers: { 'x-user-id': userId }
    });
    return res.json();
  },
  getCommissions: async (userId: string) => {
    const res = await fetch('/api/partner/commissions', {
      headers: { 'x-user-id': userId }
    });
    return res.json();
  },
  getPayouts: async (userId: string) => {
    const res = await fetch('/api/partner/payouts', {
      headers: { 'x-user-id': userId }
    });
    return res.json();
  }
};
