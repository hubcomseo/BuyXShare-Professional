export const operatorService = {
  getStats: async () => {
    const res = await fetch('/api/operator/stats');
    return res.json();
  },
  getUsers: async () => {
    const res = await fetch('/api/operator/users');
    return res.json();
  },
  getReconciliationQueue: async () => {
    const res = await fetch('/api/operator/reconciliation-queue');
    return res.json();
  },
  processReconciliation: async (orderId: string) => {
    const res = await fetch(`/api/operator/reconcile/${orderId}`, {
      method: 'POST'
    });
    return res.json();
  },
  getPendingCommissions: async () => {
    const res = await fetch('/api/operator/commissions/pending');
    return res.json();
  },
  approveCommission: async (id: string, action: 'confirm' | 'pay') => {
    const res = await fetch(`/api/operator/commissions/${id}/${action}`, {
      method: 'POST'
    });
    return res.json();
  },
  getPendingTickets: async () => {
    const res = await fetch('/api/operator/tickets/pending');
    return res.json();
  },
  approveTicket: async (id: string, action: 'confirm' | 'winner') => {
    const res = await fetch(`/api/operator/tickets/${id}/${action}`, {
      method: 'POST'
    });
    return res.json();
  }
};
