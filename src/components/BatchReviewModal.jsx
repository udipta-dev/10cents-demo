import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useStore from '../store/useStore';

export default function BatchReviewModal() {
  const { showBatchReview, toggleBatchReview, batch, balance, submitBatch, undoVote } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const totalCost = batch.length * 0.10;
  const balanceAfter = balance - totalCost;

  const handleConfirm = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    submitBatch();
    setIsLoading(false);
  };

  const truncateQuestion = (question, maxLength = 60) => {
    if (question.length <= maxLength) return question;
    return question.substring(0, maxLength) + '...';
  };

  return (
    <AnimatePresence>
      {showBatchReview && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleBatchReview}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-[#111] text-white rounded-t-2xl max-h-[85vh] overflow-y-auto z-50"
          >
            <button
              onClick={toggleBatchReview}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors z-10"
            >
              <span className="text-xl text-gray-400">&times;</span>
            </button>

            <div className="p-6 pb-8">
              <h2 className="text-2xl font-bold mb-6">Review Your Bets</h2>

              <div className="space-y-3 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {batch.map((item, index) => (
                  <motion.div
                    key={item.marketId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/5 border border-white/5 rounded-lg p-4 relative"
                  >
                    <button
                      onClick={() => undoVote(item.marketId)}
                      className="absolute top-3 right-3 text-xs px-2 py-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded transition-colors"
                    >
                      Remove
                    </button>

                    <p className="text-sm font-medium mb-2 pr-16">
                      {truncateQuestion(item.question)}
                    </p>

                    <div className="space-y-1 text-xs text-gray-400">
                      <p>
                        <span className="text-gray-500">Your pick:</span>{' '}
                        <span className="text-white font-medium">{item.choice}</span>
                      </p>
                      <p>
                        <span className="text-gray-500">Amount:</span>{' '}
                        <span className="text-green-400 font-medium">$0.10</span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white/5 border border-white/5 rounded-lg p-4 mb-6 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Total markets:</span>
                  <span className="font-semibold">{batch.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Cost:</span>
                  <span className="font-semibold text-red-400">${totalCost.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/5 pt-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Current balance:</span>
                    <span className="font-semibold">${balance.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-gray-400">After bets:</span>
                    <span className={`font-semibold ${balanceAfter < 0 ? 'text-red-400' : 'text-green-400'}`}>
                      ${balanceAfter.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleBatchReview}
                  className="py-3 rounded-lg font-semibold bg-transparent border border-white/10 hover:border-white/20 transition-colors"
                >
                  Go Back
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirm}
                  disabled={isLoading || balanceAfter < 0 || batch.length === 0}
                  className="py-3 rounded-lg font-semibold bg-orange-500 hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Submitting...
                    </span>
                  ) : (
                    'Confirm All Bets'
                  )}
                </motion.button>
              </div>

              {balanceAfter < 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                >
                  <p className="text-sm text-red-400 text-center">
                    Insufficient balance. Please deposit more funds or remove some bets.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
