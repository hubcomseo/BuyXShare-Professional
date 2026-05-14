import { RewardTicket, TrackRewardResult } from '../types/reward';

export const rewardService = {
  getRewards: async (userId: string): Promise<RewardTicket[]> => {
    const res = await fetch('/api/rewards', {
      headers: { 'x-user-id': userId }
    });
    return res.json();
  },
  trackTicket: async (query: string): Promise<TrackRewardResult> => {
    const res = await fetch(`/api/rewards/track?q=${query}`);
    return res.json();
  },
  getTicketById: async (id: string): Promise<RewardTicket> => {
    const res = await fetch(`/api/rewards/${id}`);
    return res.json();
  }
};
