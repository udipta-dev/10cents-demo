import { AnimatePresence, motion } from 'framer-motion';
import { CATEGORIES } from '../data/mockMarkets';
import useStore from '../store/useStore';

export default function MarketDetailsModal() {
  const { showMarketDetails, setShowMarketDetails, voteOnMarket, votedMarkets } = useStore();

  if (!showMarketDetails) return null;

  const market = showMarketDetails;
  const userVote = votedMarkets[market.id];
  const hasVoted = userVote !== undefined;
  const categoryInfo = CATEGORIES[market.category];
  const isPrediction = market.type === 'prediction';

  // Calculate potential winnings
  const platformFee = 0.20; // 20%
  const netPool = market.poolSize * (1 - platformFee);
  const winnerPayout = isPrediction
    ? netPool * 0.80 // 1 winner gets 80% of net pool
    : netPool * 0.40; // each side winner gets 40%

  const handleVote = (choice) => {
    voteOnMarket(market.id, choice);
    setShowMarketDetails(null);
  };

  return (
    <AnimatePresence>
      {showMarketDetails && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMarketDetails(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-[#0d0d0d] text-white rounded-t-2xl max-h-[85vh] overflow-y-auto z-50"
          >
            <button
              onClick={() => setShowMarketDetails(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              <span className="text-xl text-white/70">&times;</span>
            </button>

            <div className="p-6 pb-8">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                {categoryInfo && (
                  <span
                    className="h-6 px-2.5 rounded-full text-[11px] font-semibold flex items-center gap-1 leading-none"
                    style={{
                      backgroundColor: `${categoryInfo.color}22`,
                      color: categoryInfo.color,
                    }}
                  >
                    {categoryInfo.emoji} {categoryInfo.label}
                  </span>
                )}
                <span className={`h-6 px-2.5 rounded-full text-[11px] font-semibold uppercase flex items-center leading-none ${
                  isPrediction
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'bg-purple-500/20 text-purple-400'
                }`}>
                  {market.type}
                </span>
              </div>

              <h2 className="text-xl font-bold mb-3">{market.question}</h2>

              <div className="flex items-center gap-3 text-sm text-white/70 mb-6">
                <span>{market.deadline}</span>
                <span className="text-white/20">·</span>
                <span>{market.timeLeft}</span>
                <span className="text-white/20">·</span>
                <span>{market.traders.toLocaleString()} traders</span>
              </div>

              {market.description && (
                <div className="mb-6">
                  <p className="text-white/75 text-sm leading-relaxed">
                    {market.description}
                  </p>
                </div>
              )}

              {/* Rules — prominent section */}
              {market.rules && (
                <div className="mb-6 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Market Rules
                  </h3>
                  <ul className="space-y-2 text-sm text-white/70">
                    {market.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-orange-400 mt-0.5 shrink-0">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Payout breakdown */}
              <div className="mb-6 bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-4">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                  Potential Winnings
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Pool size</span>
                    <span className="text-white font-semibold">${market.poolSize.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Platform fee</span>
                    <span className="text-white/70">20%</span>
                  </div>
                  <div className="border-t border-emerald-500/15 pt-2 mt-2">
                    {isPrediction ? (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Winner gets</span>
                          <span className="text-emerald-400 font-bold text-base">${winnerPayout.toFixed(2)}</span>
                        </div>
                        <p className="text-white/30 text-xs mt-1">1 random winner from correct side gets 80% of net pool</p>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Each side winner gets</span>
                          <span className="text-emerald-400 font-bold text-base">${winnerPayout.toFixed(2)}</span>
                        </div>
                        <p className="text-white/30 text-xs mt-1">1 random winner per side (2 winners total), each gets 40% of net pool</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Vote buttons */}
              {!hasVoted ? (
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVote(market.choiceA)}
                    className="py-4 rounded-xl font-semibold bg-emerald-500 hover:bg-emerald-600 transition-all text-white"
                  >
                    {market.choiceA}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVote(market.choiceB)}
                    className="py-4 rounded-xl font-semibold bg-rose-500 hover:bg-rose-600 transition-all text-white"
                  >
                    {market.choiceB}
                  </motion.button>
                </div>
              ) : (
                <div className="text-center py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <p className="text-sm text-emerald-400 font-medium">
                    You picked: {userVote}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
