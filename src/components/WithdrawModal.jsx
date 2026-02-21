import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useStore from '../store/useStore';

export default function WithdrawModal() {
  const { showWithdrawModal, toggleWithdrawModal, balance, withdraw } = useStore();
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleMax = () => {
    setAmount(balance.toString());
  };

  const handleConfirm = async () => {
    const withdrawAmount = parseFloat(amount);
    if (!withdrawAmount || withdrawAmount > balance || withdrawAmount <= 0) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    withdraw(withdrawAmount);
    setShowSuccess(true);
    setIsLoading(false);

    setTimeout(() => {
      setShowSuccess(false);
      setAmount('');
      toggleWithdrawModal();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {showWithdrawModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleWithdrawModal}
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
              onClick={toggleWithdrawModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              <span className="text-xl text-gray-400">&times;</span>
            </button>

            <div className="p-6 pb-8">
              <h2 className="text-2xl font-bold mb-6">Withdraw USDC</h2>

              <div className="bg-white/5 border border-white/5 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-400 mb-1">Available Balance</p>
                <p className="text-3xl font-bold text-green-400">${balance.toFixed(2)}</p>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-20 py-3 text-lg focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <button
                    onClick={handleMax}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-orange-500 hover:bg-orange-600 rounded text-sm font-medium transition-colors"
                  >
                    Max
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Withdraw to:</label>
                <div className="bg-white/5 border border-white/5 rounded-lg p-3">
                  <p className="text-sm font-mono text-gray-300">0x1a2B...9fE3</p>
                </div>
              </div>

              {showSuccess ? (
                <div className="w-full py-4 rounded-lg font-semibold bg-green-500 flex items-center justify-center gap-2">
                  <span>✓</span>
                  <span>Withdrawal successful!</span>
                </div>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirm}
                  disabled={isLoading || !amount || parseFloat(amount) > balance || parseFloat(amount) <= 0}
                  className="w-full py-4 rounded-lg font-semibold bg-orange-500 hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Processing...
                    </span>
                  ) : (
                    'Confirm Withdrawal'
                  )}
                </motion.button>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">Processed instantly</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
