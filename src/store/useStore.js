import { create } from 'zustand';
import { markets, sampleBets, INITIAL_BALANCE } from '../data/mockMarkets';

const loadFromStorage = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const useStore = create((set, get) => ({
  markets: markets,
  currentIndex: loadFromStorage('10cents_currentIndex', 0),
  votedMarkets: loadFromStorage('10cents_votedMarkets', {}),

  balance: loadFromStorage('10cents_balance', INITIAL_BALANCE),
  bets: loadFromStorage('10cents_bets', sampleBets),

  showOnboarding: true,

  activeTab: 'feed',
  showInfoModal: false,
  showDepositModal: false,
  showWithdrawModal: false,
  showCreateMarketModal: false,
  showMarketDetails: null,
  showSuccess: false,

  setActiveTab: (tab) => set({ activeTab: tab }),

  voteOnMarket: (marketId, choice) => {
    const state = get();
    const market = state.markets.find(m => m.id === marketId);
    if (!market) return;

    // Record vote
    const newVoted = { ...state.votedMarkets, [marketId]: choice };
    localStorage.setItem('10cents_votedMarkets', JSON.stringify(newVoted));

    // Auto-submit: deduct 10¢ and add to bets
    const cost = 0.10;
    const newBalance = Math.round((state.balance - cost) * 100) / 100;
    const newBet = {
      id: Date.now(),
      marketId,
      question: market.question,
      choice,
      status: 'pending',
      amount: cost,
      payout: 0,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    const newBets = [newBet, ...state.bets];

    localStorage.setItem('10cents_balance', JSON.stringify(newBalance));
    localStorage.setItem('10cents_bets', JSON.stringify(newBets));

    set({ votedMarkets: newVoted, balance: newBalance, bets: newBets });
  },

  undoVote: (marketId) => {
    const state = get();
    const newVoted = { ...state.votedMarkets };
    delete newVoted[marketId];

    // Refund 10¢
    const newBalance = Math.round((state.balance + 0.10) * 100) / 100;
    const newBets = state.bets.filter(b => b.marketId !== marketId || b.status !== 'pending');

    localStorage.setItem('10cents_votedMarkets', JSON.stringify(newVoted));
    localStorage.setItem('10cents_balance', JSON.stringify(newBalance));
    localStorage.setItem('10cents_bets', JSON.stringify(newBets));

    set({ votedMarkets: newVoted, balance: newBalance, bets: newBets });
  },

  advanceMarket: () => {
    const state = get();
    const newIndex = state.currentIndex + 1;
    localStorage.setItem('10cents_currentIndex', JSON.stringify(newIndex));
    set({ currentIndex: newIndex });
  },

  deposit: (amount) => {
    const state = get();
    const newBalance = Math.round((state.balance + amount) * 100) / 100;
    localStorage.setItem('10cents_balance', JSON.stringify(newBalance));
    set({ balance: newBalance });
  },

  withdraw: (amount) => {
    const state = get();
    const newBalance = Math.round((state.balance - amount) * 100) / 100;
    localStorage.setItem('10cents_balance', JSON.stringify(newBalance));
    set({ balance: newBalance });
  },

  resetDemo: () => {
    localStorage.removeItem('10cents_currentIndex');
    localStorage.removeItem('10cents_votedMarkets');
    localStorage.removeItem('10cents_balance');
    localStorage.removeItem('10cents_bets');
    set({
      currentIndex: 0,
      votedMarkets: {},
      balance: INITIAL_BALANCE,
      bets: sampleBets,
      showOnboarding: true,
    });
  },

  completeOnboarding: () => {
    set({ showOnboarding: false });
  },

  toggleInfoModal: () => set(s => ({ showInfoModal: !s.showInfoModal })),
  toggleDepositModal: () => set(s => ({ showDepositModal: !s.showDepositModal })),
  toggleWithdrawModal: () => set(s => ({ showWithdrawModal: !s.showWithdrawModal })),
  toggleCreateMarketModal: () => set(s => ({ showCreateMarketModal: !s.showCreateMarketModal })),
  setShowMarketDetails: (market) => set({ showMarketDetails: market }),
}));

export default useStore;
