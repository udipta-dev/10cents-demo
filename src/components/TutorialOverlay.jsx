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
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 })
  const [tooltipPlacement, setTooltipPlacement] = useState('bottom')
  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  const measureTarget = useCallback(() => {
    const el = document.querySelector(current.target)
    if (!el) {
      setRect(null)
      setTooltipPos({ top: window.innerHeight * 0.35, left: window.innerWidth / 2 - 150 })
      setTooltipPlacement('bottom')
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

    // Calculate tooltip position — center it on the spotlight horizontally
    const tooltipWidth = Math.min(300, r.width + pad * 2)
    const centerX = spotlight.x + spotlight.w / 2 - tooltipWidth / 2
    // Clamp to viewport with 16px margin
    const clampedX = Math.max(16, Math.min(centerX, window.innerWidth - tooltipWidth - 16))

    const gap = 12
    const tooltipApproxHeight = 140

    // Try preferred position first, fall back to overlay if no room
    if (current.position === 'top') {
      const topPos = spotlight.y - gap - tooltipApproxHeight
      if (topPos > 10) {
        // Enough room above
        setTooltipPos({ top: topPos, left: clampedX })
        setTooltipPlacement('top')
      } else {
        // Not enough room above — overlay on top of the element
        setTooltipPos({ top: spotlight.y + 12, left: clampedX })
        setTooltipPlacement('overlay')
      }
    } else {
      const bottomPos = spotlight.y + spotlight.h + gap
      if (bottomPos + tooltipApproxHeight < window.innerHeight - 10) {
        // Enough room below
        setTooltipPos({ top: bottomPos, left: clampedX })
        setTooltipPlacement('bottom')
      } else {
        // Not enough room below — overlay on element
        setTooltipPos({ top: spotlight.y + spotlight.h - tooltipApproxHeight - 12, left: clampedX })
        setTooltipPlacement('overlay')
      }
    }
  }, [current])

  useEffect(() => {
    const timer = setTimeout(measureTarget, 80)
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
          key={`glow-${step}`}
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
          initial={{ opacity: 0, y: tooltipPlacement === 'top' ? 10 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute z-10"
          style={{
            top: tooltipPos.top,
            left: tooltipPos.left,
            width: Math.min(300, window.innerWidth - 32),
            pointerEvents: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-[#1a1a1a] border border-white/[0.1] rounded-2xl p-4 shadow-2xl">
            {/* Step counter */}
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-orange-500/20 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {step + 1} / {STEPS.length}
              </span>
              <span className="text-white font-semibold text-sm">{current.title}</span>
              {/* Skip */}
              <button
                onClick={(e) => { e.stopPropagation(); onComplete(); }}
                className="ml-auto text-white/30 text-[10px] hover:text-white/60 transition-colors"
              >
                Skip
              </button>
            </div>

            {/* Description */}
            <p className="text-white/70 text-xs leading-relaxed mb-3">
              {current.text}
            </p>

            {/* Navigation */}
            <div className="flex items-center gap-2">
              {/* Dots */}
              <div className="flex gap-1 flex-1">
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
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
