import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useStore from '../store/useStore';

export default function DepositModal() {
  const { showDepositModal, toggleDepositModal, balance, deposit } = useStore();
  const [amount, setAmount] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setWalletConnected(true);
  };

  const handleConfirm = async () => {
    const depositAmount = parseFloat(amount);
    if (!depositAmount || depositAmount < 5 || depositAmount > 10000) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    deposit(depositAmount);
    setShowSuccess(true);
    setIsLoading(false);

    setTimeout(() => {
      setShowSuccess(false);
      setWalletConnected(false);
      setAmount('');
      toggleDepositModal();
    }, 1500);
  };

  const addQuickAmount = (value) => {
    const current = parseFloat(amount) || 0;
    setAmount((current + value).toString());
  };

  return (
    <AnimatePresence>
      {showDepositModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleDepositModal}
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
              onClick={toggleDepositModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              <span className="text-xl text-gray-400">&times;</span>
            </button>

            <div className="p-6 pb-8">
              <h2 className="text-2xl font-bold mb-6">Deposit USDC</h2>

              <div className="bg-white/5 border border-white/5 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-400 mb-1">Current Balance</p>
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
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-4 py-3 text-lg focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Min $5, Max $10,000</p>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-6">
                <button
                  onClick={() => addQuickAmount(10)}
                  className="py-2 px-4 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
                >
                  +$10
                </button>
                <button
                  onClick={() => addQuickAmount(50)}
                  className="py-2 px-4 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
                >
                  +$50
                </button>
                <button
                  onClick={() => addQuickAmount(100)}
                  className="py-2 px-4 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
                >
                  +$100
                </button>
              </div>

              {!walletConnected ? (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConnect}
                  disabled={isLoading}
                  className="w-full py-4 rounded-lg font-semibold bg-orange-500 hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Connecting...
                    </span>
                  ) : (
                    'Connect Wallet'
                  )}
                </motion.button>
              ) : showSuccess ? (
                <div className="w-full py-4 rounded-lg font-semibold bg-green-500 flex items-center justify-center gap-2">
                  <span>✓</span>
                  <span>Wallet connected!</span>
                </div>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirm}
                  disabled={isLoading || !amount || parseFloat(amount) < 5}
                  className="w-full py-4 rounded-lg font-semibold bg-green-500 hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Processing...
                    </span>
                  ) : (
                    'Confirm Deposit'
                  )}
                </motion.button>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">Gasless betting after deposit!</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
