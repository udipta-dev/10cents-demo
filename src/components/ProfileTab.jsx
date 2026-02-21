import { motion } from 'framer-motion';
import useStore from '../store/useStore';

export default function ProfileTab() {
  const { balance, bets, toggleDepositModal, toggleWithdrawModal, toggleCreateMarketModal } = useStore();

  const getStatusIcon = (status) => {
    if (status === 'won') {
      return (
        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    if (status === 'lost') {
      return (
        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  const getBetResultText = (bet) => {
    if (bet.status === 'won') {
      return `Won $${bet.payout.toFixed(2)}`;
    }
    if (bet.status === 'lost') {
      return `Lost $${bet.amount.toFixed(2)}`;
    }
    return 'Pending';
  };

  const truncateText = (text, maxLength = 40) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="overflow-y-auto p-4 max-w-[480px] mx-auto h-full">
      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-6 mb-6"
      >
        <div className="mb-4">
          <p className="text-white/50 text-sm mb-1">Balance</p>
          <h2 className="text-4xl font-bold text-white">${balance.toFixed(2)}</h2>
        </div>

        <div className="mb-4">
          <p className="text-green-400 text-sm">Claimable: $0.75</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={toggleDepositModal}
            className="bg-white/5 hover:bg-white/10 text-white py-2.5 px-3 rounded-lg text-sm font-medium transition-colors"
          >
            Deposit
          </button>
          <button
            onClick={toggleWithdrawModal}
            className="bg-white/5 hover:bg-white/10 text-white py-2.5 px-3 rounded-lg text-sm font-medium transition-colors"
          >
            Withdraw
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2.5 px-3 rounded-lg text-sm font-medium transition-colors"
          >
            Claim
          </button>
        </div>
      </motion.div>

      {/* Recent Bets Section */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-4">Recent Bets</h3>

        {bets.length === 0 ? (
          <div className="text-center py-8 text-white/40">
            <p>No bets yet</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {bets.map((bet, index) => (
              <motion.div
                key={bet.id}
                variants={itemVariants}
                className="bg-[#0d0d0d] border border-white/[0.06] rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {getStatusIcon(bet.status)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium mb-1">
                      {truncateText(bet.question)}
                    </p>
                    <p className="text-sm text-white/50 mb-1">
                      Bet: {bet.choice} | {getBetResultText(bet)}
                    </p>
                    <p className="text-xs text-white/40">
                      {new Date(bet.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {index < bets.length - 1 && (
                  <div className="border-b border-white/[0.06] mt-3" />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {bets.length > 0 && (
          <button className="w-full mt-4 text-orange-400 hover:text-orange-300 py-2 text-sm font-medium transition-colors">
            Show More
          </button>
        )}
      </div>

      {/* Create Market CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={toggleCreateMarketModal}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold text-base shadow-lg shadow-orange-500/25 transition-all"
      >
        Create Your Market
      </motion.button>
    </div>
  );
}
