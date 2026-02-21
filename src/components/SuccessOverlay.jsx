import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import useStore from '../store/useStore'

export default function SuccessOverlay() {
  const showSuccess = useStore((state) => state.showSuccess)

  useEffect(() => {
    if (showSuccess) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [showSuccess])

  return (
    <AnimatePresence>
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Checkmark Circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1
              }}
              className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center"
            >
              <span className="text-white text-6xl font-bold">✓</span>
            </motion.div>

            {/* Main Text */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-2xl font-bold text-white"
            >
              Bets Submitted!
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-white/60 text-base"
            >
              Good luck!
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
