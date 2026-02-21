import { AnimatePresence, motion } from 'framer-motion';
import useStore from '../store/useStore';

export default function InfoModal() {
  const { showInfoModal, toggleInfoModal } = useStore();

  return (
    <AnimatePresence>
      {showInfoModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleInfoModal}
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
              onClick={toggleInfoModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              <span className="text-xl text-gray-400">&times;</span>
            </button>

            <div className="p-6 pb-8">
              <h2 className="text-2xl font-bold mb-6">How It Works</h2>

              {/* Section 1: PREDICTION */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <h3 className="text-lg font-semibold text-orange-400">PREDICTION</h3>
                </div>
                <p className="text-gray-300 mb-3 text-sm">
                  Real-world outcomes with verifiable truth.
                </p>
                <div className="bg-white/5 border border-white/5 rounded-lg p-4 space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">How it works:</span>
                    <ul className="mt-1 ml-4 space-y-1 text-gray-300">
                      <li>• Admin verifies outcome</li>
                      <li>• 1 random winner from correct side</li>
                      <li>• Winner gets 80% of pot</li>
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-white/5">
                    <span className="text-gray-400">Example:</span>
                    <p className="text-gray-300 italic mt-1">"Will BTC hit $100k by March?"</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 mb-8"></div>

              {/* Section 2: OPINION */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <h3 className="text-lg font-semibold text-purple-400">OPINION</h3>
                </div>
                <p className="text-gray-300 mb-3 text-sm">
                  Subjective topics with no right answer.
                </p>
                <div className="bg-white/5 border border-white/5 rounded-lg p-4 space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">How it works:</span>
                    <ul className="mt-1 ml-4 space-y-1 text-gray-300">
                      <li>• Random selection from each side</li>
                      <li>• 1 winner per side (2 total)</li>
                      <li>• Each winner gets 40% of pot</li>
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-white/5">
                    <span className="text-gray-400">Example:</span>
                    <p className="text-gray-300 italic mt-1">"Best NBA player: MJ or LeBron?"</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 mb-8"></div>

              {/* Section 3: ALL MARKETS */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <h3 className="text-lg font-semibold text-green-400">ALL MARKETS</h3>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Bet amount:</span>
                    <span className="text-white font-semibold">10 cents</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Platform fee:</span>
                    <span className="text-white font-semibold">20%</span>
                  </div>
                  <div className="pt-2 border-t border-white/5 text-center">
                    <p className="text-green-400 font-medium">Fair & transparent</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
