import { motion } from 'framer-motion';
import { CATEGORIES } from '../data/mockMarkets';
import useStore from '../store/useStore';

const MarketCard = ({ market, onDismiss, onVote }) => {
  const { votedMarkets, setShowMarketDetails } = useStore();
  const userVote = votedMarkets[market.id];
  const hasVoted = userVote !== undefined;

  const categoryInfo = CATEGORIES[market.category];

  const isPrediction = market.type === 'prediction';
  const choiceA = isPrediction ? 'YES' : market.choiceA;
  const choiceB = isPrediction ? 'NO' : market.choiceB;
  const percentA = market.yesPercent;
  const percentB = market.noPercent;

  return (
    <motion.div
      className="bg-[#0d0d0d] rounded-2xl p-6 h-full shadow-xl flex flex-col relative overflow-hidden border border-white/[0.06]"
      layout
    >
      {/* Pre-vote state */}
      {!hasVoted && (
        <>
          {/* Top badges */}
          <div className="flex items-center gap-2 mb-5">
            <div
              className="h-6 px-2.5 rounded-full text-[11px] font-semibold flex items-center gap-1 leading-none"
              style={{
                backgroundColor: `${categoryInfo.color}22`,
                color: categoryInfo.color,
              }}
            >
              <span className="text-xs">{categoryInfo.emoji}</span>
              <span>{categoryInfo.label}</span>
            </div>
            <div
              className={`h-6 px-2.5 rounded-full text-[11px] font-semibold uppercase flex items-center leading-none ${
                isPrediction
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'bg-purple-500/20 text-purple-400'
              }`}
            >
              {isPrediction ? 'Prediction' : 'Opinion'}
            </div>
          </div>

          {/* Centered text block */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Question */}
            <h2 className="text-white text-[22px] font-bold leading-snug mb-3">
              {market.question}
            </h2>

            {/* Description */}
            {market.description && (
              <p className="text-white/70 text-[13px] leading-relaxed mb-4 line-clamp-3">
                {market.description}
              </p>
            )}

            {/* Meta row */}
            <div className="flex items-center gap-4 text-xs text-white/70">
              <span>{market.traders.toLocaleString()} traders</span>
              <span className="text-white/30">·</span>
              <span>{market.timeLeft}</span>
            </div>
          </div>

          {/* Bottom section — pinned to bottom */}
          <div className="mt-5">
            {/* Dark Pool row with ? button */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 py-2 flex items-center justify-center gap-2">
                <svg className="w-3.5 h-3.5 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="text-white/70 font-medium text-xs tracking-wide">DARK POOL</span>
                <span className="text-white/40 text-[10px]">— swipe to reveal</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMarketDetails(market);
                }}
                className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all shrink-0"
              >
                <span className="text-xs font-bold">?</span>
              </button>
            </div>

            {/* Choice boxes — tappable */}
            <div className="grid grid-cols-2 gap-3 mb-2">
              <button
                onClick={(e) => { e.stopPropagation(); onVote?.(market.choiceA); }}
                className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl py-3 px-3 text-center active:bg-emerald-500/25 transition-colors"
              >
                <span className="text-[10px] text-white/50 block mb-0.5">← Swipe left</span>
                <span className="text-emerald-400 font-semibold text-sm">{choiceA}</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onVote?.(market.choiceB); }}
                className="bg-rose-500/10 border border-rose-500/25 rounded-xl py-3 px-3 text-center active:bg-rose-500/25 transition-colors"
              >
                <span className="text-[10px] text-white/50 block mb-0.5">Swipe right →</span>
                <span className="text-rose-400 font-semibold text-sm">{choiceB}</span>
              </button>
            </div>

            <div className="text-center text-white/40 text-[10px] mt-1">
              10¢ per vote · swipe up to skip
            </div>
          </div>
        </>
      )}

      {/* Post-vote state (results reveal) */}
      {hasVoted && (() => {
        const platformFee = 0.20;
        const netPool = market.poolSize * (1 - platformFee);
        const winnerPayout = isPrediction
          ? netPool * 0.80
          : netPool * 0.40;

        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full overflow-y-auto"
            style={{ touchAction: 'pan-y' }}
          >
            {/* Close button */}
            {onDismiss && (
              <button
                onClick={(e) => { e.stopPropagation(); onDismiss(); }}
                className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.08] hover:bg-white/15 transition-colors"
              >
                <span className="text-white/70 text-lg leading-none">&times;</span>
              </button>
            )}

            {/* Confirmation banner */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-emerald-500/10 border border-emerald-500/25 rounded-lg p-2.5 mb-4 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-emerald-400 font-semibold text-sm">
                You picked {userVote} · -10¢
              </span>
            </motion.div>

            {/* Question */}
            <h2 className="text-white text-base font-bold mb-4 line-clamp-2">
              {market.question}
            </h2>

            {/* Animated bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <span className="text-emerald-400">{choiceA}</span>
                <span className="text-rose-400">{choiceB}</span>
              </div>
              <div className="relative h-11 bg-white/5 rounded-xl overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-emerald-500"
                  initial={{ width: '50%' }}
                  animate={{ width: `${percentA}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                <motion.div
                  className="absolute right-0 top-0 h-full bg-rose-500"
                  initial={{ width: '50%' }}
                  animate={{ width: `${percentB}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-4 text-white font-bold text-base">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    {percentA}%
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    {percentB}%
                  </motion.span>
                </div>
              </div>
              <div className="text-center text-white/50 text-xs mt-1.5">
                {market.traders.toLocaleString()} traders · {market.timeLeft}
              </div>
            </div>

            {/* Pool & Payout info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-3 mb-3"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-bold text-white">Potential Winnings</span>
              </div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-white/60">Pool size</span>
                <span className="text-white font-semibold">${market.poolSize.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60">{isPrediction ? 'Winner gets' : 'Each winner gets'}</span>
                <span className="text-emerald-400 font-bold text-sm">${winnerPayout.toFixed(2)}</span>
              </div>
              <p className="text-white/30 text-[10px] mt-1.5">
                {isPrediction
                  ? '1 random winner from correct side · 20% platform fee'
                  : '1 winner per side (2 total) · 20% platform fee'}
              </p>
            </motion.div>

            {/* Rules */}
            {market.rules && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 mb-4"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <svg className="w-3.5 h-3.5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-bold text-white">Rules</span>
                </div>
                <ul className="space-y-1">
                  {market.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-1.5 text-[11px] text-white/60">
                      <span className="text-orange-400 mt-0.5 shrink-0">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Bottom — Next button or swipe hint */}
            <div className="mt-auto flex gap-3">
              {onDismiss ? (
                <button
                  onClick={(e) => { e.stopPropagation(); onDismiss(); }}
                  className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all"
                >
                  Next →
                </button>
              ) : (
                <div className="flex-1 text-center py-3 text-white/40 text-sm">
                  Swipe to continue
                </div>
              )}
            </div>
          </motion.div>
        );
      })()}
    </motion.div>
  );
};

export default MarketCard;
