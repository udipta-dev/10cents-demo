import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';

export default function CreateMarketModal() {
  const { showCreateMarketModal, toggleCreateMarketModal } = useStore();

  const [marketType, setMarketType] = useState('Prediction');
  const [question, setQuestion] = useState('');
  const [choiceA, setChoiceA] = useState('YES');
  const [choiceB, setChoiceB] = useState('NO');
  const [category, setCategory] = useState('Sports');
  const [deadline, setDeadline] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    'Sports',
    'Crypto',
    'Tech',
    'Entertainment',
    'Politics',
    'World Events',
    'Food'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      toggleCreateMarketModal();

      setQuestion('');
      setChoiceA('YES');
      setChoiceB('NO');
      setCategory('Sports');
      setDeadline('');
    }, 2000);
  };

  return (
    <AnimatePresence>
      {showCreateMarketModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCreateMarketModal}
            className="fixed inset-0 bg-black/70 z-40"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 bg-[#111] rounded-t-2xl z-50 max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 max-w-[480px] mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Create Market</h2>
                <button
                  onClick={toggleCreateMarketModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {showSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Market submitted!</h3>
                  <p className="text-gray-400">We'll review within 24h</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Market Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Market Type
                    </label>
                    <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setMarketType('Prediction')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          marketType === 'Prediction'
                            ? 'bg-orange-500 text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Prediction
                      </button>
                      <button
                        type="button"
                        onClick={() => setMarketType('Opinion')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          marketType === 'Opinion'
                            ? 'bg-orange-500 text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Opinion
                      </button>
                    </div>
                  </div>

                  {/* Question */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Question
                    </label>
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Will Bitcoin reach $100k by end of 2026?"
                      className="w-full bg-white/5 text-white rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none border border-white/5"
                      rows="3"
                      required
                    />
                  </div>

                  {/* Choices */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Choice A
                      </label>
                      <input
                        type="text"
                        value={choiceA}
                        onChange={(e) => setChoiceA(e.target.value)}
                        className="w-full bg-white/5 text-white rounded-lg px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-orange-500 border border-white/5"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Choice B
                      </label>
                      <input
                        type="text"
                        value={choiceB}
                        onChange={(e) => setChoiceB(e.target.value)}
                        className="w-full bg-white/5 text-white rounded-lg px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-orange-500 border border-white/5"
                        required
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white/5 text-white rounded-lg px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-orange-500 border border-white/5"
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Deadline
                    </label>
                    <input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full bg-white/5 text-white rounded-lg px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-orange-500 border border-white/5"
                      required
                    />
                  </div>

                  {/* Revenue Share */}
                  <div className="bg-orange-500/5 border border-orange-500/15 rounded-xl p-4">
                    <h3 className="text-white font-semibold mb-3">Revenue Share</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">You earn:</span>
                        <span className="text-green-400 font-semibold">5% of the pool</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Platform:</span>
                        <span className="text-gray-400">20%</span>
                      </div>
                      <div className="border-t border-orange-500/15 pt-2 mt-2">
                        <p className="text-orange-300">
                          If pool reaches $100 → You earn $5
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-base shadow-lg transition-all"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Submit for Review'
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-500">
                    Review: ~24 hours
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
