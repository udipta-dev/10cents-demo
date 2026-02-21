import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import useStore from '../store/useStore';

export default function BatchButton() {
  const { batch, toggleBatchReview } = useStore();
  const [prevCount, setPrevCount] = useState(batch.length);

  useEffect(() => {
    if (batch.length > prevCount) {
      setPrevCount(batch.length);
    }
  }, [batch.length, prevCount]);

  const shouldPulse = batch.length > prevCount;

  return (
    <AnimatePresence>
      {batch.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: shouldPulse ? [1, 1.08, 1] : 1
          }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25
          }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30"
        >
          <motion.button
            layoutId="batch-button"
            onClick={toggleBatchReview}
            className="relative py-3 px-6 rounded-full font-semibold text-base bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              Submit {batch.length} {batch.length === 1 ? 'Market' : 'Markets'}
            </span>

            {/* Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={batch.length}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 15
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
              >
                {batch.length}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
