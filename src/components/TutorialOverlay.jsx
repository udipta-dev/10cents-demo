import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STEPS = [
  {
    target: '[data-tutorial="card"]',
    title: 'Market Card',
    text: 'Each card is a live market. Swipe left or right to vote — every vote costs just 10¢.',
    position: 'bottom',
    padding: 8,
  },
  {
    target: '[data-tutorial="choices"]',
    title: 'Swipe or Tap',
    text: 'Swipe left for the green choice, right for red. Or just tap the button directly.',
    position: 'top',
    padding: 8,
  },
  {
    target: '[data-tutorial="darkpool"]',
    title: 'Dark Pool',
    text: 'Odds are hidden until you vote. No bias — commit first, then see where everyone stands.',
    position: 'top',
    padding: 8,
  },
  {
    target: '[data-tutorial="balance"]',
    title: 'Your Balance',
    text: '10¢ is auto-deducted per vote. Deposit more anytime. Zero gas fees on Base.',
    position: 'bottom',
    padding: 8,
  },
  {
    target: '[data-tutorial="agents-tab"]',
    title: 'AI Agents',
    text: 'AI agents trade alongside humans on the same markets. Deploy your own agent on any hardware.',
    position: 'top',
    padding: 8,
  },
  {
    target: '[data-tutorial="bottomnav"]',
    title: 'Explore',
    text: 'Markets, Agents, and Profile — all at your fingertips. Start swiping!',
    position: 'top',
    padding: 6,
  },
]

export default function TutorialOverlay({ onComplete }) {
  const [step, setStep] = useState(0)
  const [rect, setRect] = useState(null)
  const [tooltipStyle, setTooltipStyle] = useState({})
  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  const measureTarget = useCallback(() => {
    const el = document.querySelector(current.target)
    if (!el) {
      // Fallback: if element not found, show tooltip centered
      setRect(null)
      setTooltipStyle({ top: '40%', left: '50%', transform: 'translateX(-50%)' })
      return
    }
    const r = el.getBoundingClientRect()
    const pad = current.padding || 8
    const spotlight = {
      x: r.left - pad,
      y: r.top - pad,
      w: r.width + pad * 2,
      h: r.height + pad * 2,
      rx: 16,
    }
    setRect(spotlight)

    // Position tooltip above or below the spotlight
    const gap = 16
    if (current.position === 'top') {
      // Tooltip above the element
      const topPos = spotlight.y - gap
      setTooltipStyle({
        bottom: `${window.innerHeight - topPos}px`,
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: 'calc(100vw - 48px)',
      })
    } else {
      // Tooltip below the element
      const bottomOfSpotlight = spotlight.y + spotlight.h + gap
      setTooltipStyle({
        top: `${bottomOfSpotlight}px`,
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: 'calc(100vw - 48px)',
      })
    }
  }, [current])

  useEffect(() => {
    // Measure on step change and on resize
    const timer = setTimeout(measureTarget, 50)
    window.addEventListener('resize', measureTarget)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', measureTarget)
    }
  }, [measureTarget])

  const next = () => {
    if (isLast) {
      onComplete()
    } else {
      setStep(s => s + 1)
    }
  }

  const prev = () => {
    if (step > 0) setStep(s => s - 1)
  }

  // Build the SVG mask with a cutout for the spotlight
  const maskId = 'tutorial-mask'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[90]"
      style={{ pointerEvents: 'auto' }}
      onClick={next}
    >
      {/* Dark overlay with spotlight cutout */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <defs>
          <mask id={maskId}>
            {/* White = visible (dark overlay shows), Black = hidden (cutout) */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {rect && (
              <rect
                x={rect.x}
                y={rect.y}
                width={rect.w}
                height={rect.h}
                rx={rect.rx}
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.75)"
          mask={`url(#${maskId})`}
        />
      </svg>

      {/* Spotlight border glow */}
      {rect && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute rounded-2xl border-2 border-orange-400/50"
          style={{
            left: rect.x,
            top: rect.y,
            width: rect.w,
            height: rect.h,
            boxShadow: '0 0 20px rgba(249, 115, 22, 0.2), inset 0 0 20px rgba(249, 115, 22, 0.05)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: current.position === 'top' ? 10 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: current.position === 'top' ? 10 : -10 }}
          transition={{ duration: 0.25 }}
          className="absolute z-10 w-[320px]"
          style={{ ...tooltipStyle, pointerEvents: 'auto' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-[#1a1a1a] border border-white/[0.1] rounded-2xl p-4 shadow-2xl">
            {/* Step counter */}
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-orange-500/20 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {step + 1} / {STEPS.length}
              </span>
              <span className="text-white font-semibold text-sm">{current.title}</span>
            </div>

            {/* Description */}
            <p className="text-white/70 text-xs leading-relaxed mb-4">
              {current.text}
            </p>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              {/* Dots */}
              <div className="flex gap-1.5 flex-1">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === step ? 'w-4 bg-orange-400' : 'w-1.5 bg-white/20'
                    }`}
                  />
                ))}
              </div>

              {/* Buttons */}
              {step > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="px-3 py-1.5 text-white/50 text-xs font-medium hover:text-white/80 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                {isLast ? 'Got it!' : 'Next'}
              </button>
            </div>
          </div>

          {/* Arrow pointer */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              [current.position === 'top' ? 'bottom' : 'top']: '-6px',
            }}
          >
            <div
              className="w-3 h-3 bg-[#1a1a1a] border border-white/[0.1] rotate-45"
              style={{
                borderTop: current.position === 'top' ? 'none' : undefined,
                borderLeft: current.position === 'top' ? 'none' : undefined,
                borderBottom: current.position === 'bottom' ? 'none' : undefined,
                borderRight: current.position === 'bottom' ? 'none' : undefined,
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
