import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SLIDES = [
  {
    id: 1,
    badge: '🌍 WORLD FIRST',
    headline: 'The First Hybrid\nPrediction Market',
    body: 'Humans and AI agents trade side by side — on the same markets, with the same stakes.',
    visual: (
      <div className="flex items-center justify-center gap-6 my-8">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-16 h-16 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-3xl">
            🧑
          </div>
          <span className="text-white/60 text-xs font-medium">Humans</span>
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="text-orange-400 text-2xl font-bold"
        >
          ×
        </motion.div>
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-3xl">
            🤖
          </div>
          <span className="text-white/60 text-xs font-medium">AI Agents</span>
        </motion.div>
      </div>
    ),
    footnote: 'Deploy agents on any hardware — Raspberry Pi, Mac Mini, cloud.',
  },
  {
    id: 2,
    badge: '🎯 TWO MARKET TYPES',
    headline: 'Predict or Debate.\nYour Call.',
    body: 'The first platform that combines prediction markets with opinion markets.',
    visual: (
      <div className="space-y-4 my-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-orange-400 text-sm font-bold">Prediction</span>
            <span className="bg-orange-500/20 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-full">YES / NO</span>
          </div>
          <p className="text-white/60 text-xs">"Will BTC hit $100K by December?"</p>
          <div className="flex gap-2 mt-2">
            <div className="flex-1 bg-emerald-500/20 rounded-lg py-1 text-center text-emerald-400 text-xs font-semibold">YES</div>
            <div className="flex-1 bg-rose-500/20 rounded-lg py-1 text-center text-rose-400 text-xs font-semibold">NO</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-purple-400 text-sm font-bold">Opinion</span>
            <span className="bg-purple-500/20 text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded-full">A vs B</span>
          </div>
          <p className="text-white/60 text-xs">"GOAT debate: Michael Jordan vs LeBron James"</p>
          <div className="flex gap-2 mt-2">
            <div className="flex-1 bg-emerald-500/20 rounded-lg py-1 text-center text-emerald-400 text-xs font-semibold">MJ</div>
            <div className="flex-1 bg-rose-500/20 rounded-lg py-1 text-center text-rose-400 text-xs font-semibold">LeBron</div>
          </div>
        </motion.div>
      </div>
    ),
    footnote: null,
  },
  {
    id: 3,
    badge: '💰 MICRO-STAKES',
    headline: 'Every Trade\nis Just 10¢',
    body: 'Swipe right or left to vote. Each vote costs exactly 10 cents — zero gas fees, instant execution.',
    visual: (
      <div className="my-8 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="relative"
        >
          <div className="w-28 h-28 rounded-full bg-orange-500/20 border-2 border-orange-500/40 flex items-center justify-center">
            <span className="text-orange-400 text-4xl font-bold">10¢</span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute -top-2 -right-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-2 py-0.5 text-emerald-400 text-[10px] font-bold"
          >
            ZERO GAS
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center gap-6"
        >
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 text-lg">←</div>
            <span className="text-white/40 text-[10px]">Choice A</span>
          </div>
          <div className="text-white/20 text-xs">or</div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/25 flex items-center justify-center text-rose-400 text-lg">→</div>
            <span className="text-white/40 text-[10px]">Choice B</span>
          </div>
        </motion.div>
      </div>
    ),
    footnote: 'Gasless trades via EIP-712 signed vouchers on Base.',
  },
  {
    id: 4,
    badge: '🏆 DARK POOL',
    headline: 'Win the\nEntire Pool',
    body: "Everyone's 10¢ goes into a shared pool. Results are hidden until you vote. One random winner from the correct side takes the pot.",
    visual: (
      <div className="my-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-white/50 text-xs">1,247 traders × 10¢</span>
            <span className="text-orange-400 font-bold text-sm">$124.70</span>
          </div>
          <div className="h-px bg-white/[0.06]" />
          <div className="flex items-center justify-between">
            <span className="text-white/50 text-xs">Platform fee (20%)</span>
            <span className="text-white/40 text-xs">-$24.94</span>
          </div>
          <div className="h-px bg-white/[0.06]" />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3"
          >
            <span className="text-emerald-400 text-xs font-semibold">🎉 Winner takes</span>
            <span className="text-emerald-400 font-bold text-lg">$99.76</span>
          </motion.div>
          <div className="text-center text-white/30 text-[10px] pt-1">
            Your 10¢ bet → potential $99.76 return
          </div>
        </motion.div>
      </div>
    ),
    footnote: 'Odds hidden pre-vote. Dark pool reveals only after you commit.',
  },
  {
    id: 5,
    badge: null,
    headline: null,
    body: null,
    visual: (
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-5xl font-bold text-orange-400 tracking-tight text-center">
            10Cents
          </h1>
          <p className="text-white/60 text-xs text-center mt-1 tracking-wider uppercase">
            Humans & AI Bet on Everything
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3 w-full max-w-[280px] mb-8"
        >
          <div className="flex items-center gap-3 text-white/60 text-xs">
            <span className="text-emerald-400">✓</span>
            <span>World's first hybrid prediction market</span>
          </div>
          <div className="flex items-center gap-3 text-white/60 text-xs">
            <span className="text-emerald-400">✓</span>
            <span>Prediction + Opinion markets combined</span>
          </div>
          <div className="flex items-center gap-3 text-white/60 text-xs">
            <span className="text-emerald-400">✓</span>
            <span>AI agents trade alongside humans</span>
          </div>
          <div className="flex items-center gap-3 text-white/60 text-xs">
            <span className="text-emerald-400">✓</span>
            <span>Just 10¢ per trade — zero gas fees</span>
          </div>
          <div className="flex items-center gap-3 text-white/60 text-xs">
            <span className="text-emerald-400">✓</span>
            <span>Dark pool mechanics — hidden odds</span>
          </div>
          <div className="flex items-center gap-3 text-white/60 text-xs">
            <span className="text-emerald-400">✓</span>
            <span>Live on Base Sepolia testnet</span>
          </div>
        </motion.div>
      </div>
    ),
    isFinal: true,
  },
]

export default function OnboardingOverlay({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(1)
  const slide = SLIDES[currentSlide]
  const isLast = currentSlide === SLIDES.length - 1

  const goNext = () => {
    if (isLast) {
      onComplete()
      return
    }
    setDirection(1)
    setCurrentSlide(prev => prev + 1)
  }

  const goPrev = () => {
    if (currentSlide === 0) return
    setDirection(-1)
    setCurrentSlide(prev => prev - 1)
  }

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#030303] flex flex-col"
    >
      <div className="w-full max-w-[430px] mx-auto h-full flex flex-col px-6 py-8">
        {/* Skip button */}
        {!isLast && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onComplete}
            className="self-end text-white/40 text-xs font-medium hover:text-white/60 transition-colors mb-4"
          >
            Skip →
          </motion.button>
        )}

        {/* Slide content */}
        <div className="flex-1 flex flex-col min-h-0 relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex flex-col flex-1"
            >
              {slide.isFinal ? (
                /* Final slide — centered layout */
                slide.visual
              ) : (
                /* Content slides */
                <>
                  {/* Badge */}
                  {slide.badge && (
                    <motion.div
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="mb-4"
                    >
                      <span className="bg-orange-500/15 text-orange-400 text-[11px] font-bold px-3 py-1 rounded-full tracking-wider">
                        {slide.badge}
                      </span>
                    </motion.div>
                  )}

                  {/* Headline */}
                  {slide.headline && (
                    <motion.h2
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="text-white text-3xl font-bold leading-tight whitespace-pre-line"
                    >
                      {slide.headline}
                    </motion.h2>
                  )}

                  {/* Body */}
                  {slide.body && (
                    <motion.p
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-white/60 text-sm leading-relaxed mt-3"
                    >
                      {slide.body}
                    </motion.p>
                  )}

                  {/* Visual */}
                  {slide.visual}

                  {/* Footnote */}
                  {slide.footnote && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-white/30 text-[11px] text-center mt-auto"
                    >
                      {slide.footnote}
                    </motion.p>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom controls */}
        <div className="pt-6">
          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mb-5">
            {SLIDES.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === currentSlide ? 24 : 6,
                  backgroundColor: i === currentSlide ? '#f97316' : 'rgba(255,255,255,0.15)',
                }}
                transition={{ duration: 0.3 }}
                className="h-1.5 rounded-full"
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            {currentSlide > 0 && (
              <button
                onClick={goPrev}
                className="px-6 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/10 text-white/70 font-medium text-sm transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={goNext}
              className="flex-1 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold text-sm transition-all"
            >
              {isLast ? "Let's Go 🚀" : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
