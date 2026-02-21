import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useState, useCallback, useRef, useEffect } from 'react'
import useStore from '../store/useStore'
import MarketCard from './MarketCard'

const SWIPE_THRESHOLD = 80
const VERTICAL_SWIPE_THRESHOLD = 60
const DISMISS_THRESHOLD = 50
const DIRECTION_LOCK_THRESHOLD = 10

export default function SwipeFeed() {
  const { markets, currentIndex, votedMarkets, voteOnMarket, advanceMarket, setShowMarketDetails, resetDemo } = useStore()
  const [isRevealing, setIsRevealing] = useState(false)
  const autoAdvanceRef = useRef(null)
  const touchStartRef = useRef({ x: 0, y: 0 })
  const justVotedRef = useRef(false)
  const exitDirRef = useRef(null)
  const containerRef = useRef(null)
  const isRevealingRef = useRef(false)
  const isAlreadyVotedRef = useRef(false)

  // Direction lock: once we detect horizontal or vertical, we lock to that axis
  const directionRef = useRef(null) // 'horizontal' | 'vertical' | null
  const isTouchActiveRef = useRef(false)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
  const leftOverlayOpacity = useTransform(x, [-200, -80, 0], [0.8, 0.3, 0])
  const rightOverlayOpacity = useTransform(x, [0, 80, 200], [0, 0.3, 0.8])

  const currentMarket = markets[currentIndex % markets.length]
  const nextMarket = markets[(currentIndex + 1) % markets.length]
  const isAlreadyVoted = currentMarket && votedMarkets[currentMarket.id] !== undefined

  // Keep refs in sync for use in native event handlers
  isRevealingRef.current = isRevealing
  isAlreadyVotedRef.current = isAlreadyVoted

  // If we land on an already-voted card from localStorage (NOT from just voting), skip it
  useEffect(() => {
    if (isAlreadyVoted && !isRevealing && !justVotedRef.current && currentIndex < markets.length) {
      advanceMarket()
    }
    justVotedRef.current = false
  }, [currentIndex])

  // Detect vote from modal: isAlreadyVoted becomes true while not revealing
  const prevVotedRef = useRef(isAlreadyVoted)
  useEffect(() => {
    if (isAlreadyVoted && !prevVotedRef.current && !isRevealing) {
      setIsRevealing(true)
      autoAdvanceRef.current = setTimeout(() => {
        doAdvance(null)
      }, 8000)
    }
    prevVotedRef.current = isAlreadyVoted
  }, [isAlreadyVoted])

  const doAdvance = useCallback((dir) => {
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current)
      autoAdvanceRef.current = null
    }
    exitDirRef.current = dir || null
    setIsRevealing(false)
    x.set(0)
    advanceMarket()
    setTimeout(() => {
      exitDirRef.current = null
    }, 400)
  }, [advanceMarket, x])

  // ALL touch handling — no framer-motion drag at all
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onTouchStart = (e) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      }
      directionRef.current = null
      isTouchActiveRef.current = true
    }

    const onTouchMove = (e) => {
      if (!isTouchActiveRef.current) return

      const touch = e.touches[0]
      const deltaX = touch.clientX - touchStartRef.current.x
      const deltaY = touch.clientY - touchStartRef.current.y
      const absDX = Math.abs(deltaX)
      const absDY = Math.abs(deltaY)

      // Direction lock: once movement exceeds threshold, lock to an axis
      if (!directionRef.current) {
        if (absDX > DIRECTION_LOCK_THRESHOLD || absDY > DIRECTION_LOCK_THRESHOLD) {
          directionRef.current = absDX > absDY ? 'horizontal' : 'vertical'
        }
      }

      // During reveal + vertical direction: let the card content scroll natively
      if (isRevealingRef.current && directionRef.current === 'vertical') {
        // Don't preventDefault — allow native scroll inside the results card
        return
      }

      // All other cases: prevent browser scroll/pull-to-refresh
      e.preventDefault()

      // If locked horizontal, update the x motion value for card drag effect
      if (directionRef.current === 'horizontal') {
        // During reveal: allow horizontal drag to dismiss
        if (isRevealingRef.current) {
          x.set(deltaX * 0.7) // elastic feel
        }
        // Pre-vote: allow horizontal drag to vote
        else if (!isAlreadyVotedRef.current) {
          x.set(deltaX * 0.7) // elastic feel
        }
      }
      // If locked vertical (pre-vote): no card movement, handled in touchEnd
    }

    const onTouchEnd = (e) => {
      if (!isTouchActiveRef.current) return
      isTouchActiveRef.current = false

      const touch = e.changedTouches[0]
      const deltaX = touch.clientX - touchStartRef.current.x
      const deltaY = touch.clientY - touchStartRef.current.y
      const absDX = Math.abs(deltaX)
      const absDY = Math.abs(deltaY)
      const direction = directionRef.current

      // --- VERTICAL SWIPE ---
      if (direction === 'vertical' && absDY > VERTICAL_SWIPE_THRESHOLD) {
        // During reveal: vertical swipe scrolls the card content (handled natively), NOT dismiss
        // Pre-vote: vertical swipe = skip
        if (!isRevealingRef.current && !isAlreadyVotedRef.current) {
          doAdvance(deltaY < 0 ? 'up' : 'up')
          return
        }
      }

      // --- HORIZONTAL SWIPE ---
      if (direction === 'horizontal') {
        // During reveal: horizontal swipe dismisses
        if (isRevealingRef.current) {
          if (absDX > DISMISS_THRESHOLD) {
            doAdvance(deltaX < 0 ? 'left' : 'right')
          } else {
            // Snap back
            x.set(0)
          }
          return
        }

        // Pre-vote: horizontal swipe = vote
        if (!isAlreadyVotedRef.current) {
          if (deltaX < -SWIPE_THRESHOLD) {
            // Left swipe = choiceA — snap card back to center, then reveal
            x.set(0)
            justVotedRef.current = true
            voteOnMarket(currentMarket.id, currentMarket.choiceA)
            setIsRevealing(true)
            autoAdvanceRef.current = setTimeout(() => {
              doAdvance(null)
            }, 8000)
          } else if (deltaX > SWIPE_THRESHOLD) {
            // Right swipe = choiceB — snap card back to center, then reveal
            x.set(0)
            justVotedRef.current = true
            voteOnMarket(currentMarket.id, currentMarket.choiceB)
            setIsRevealing(true)
            autoAdvanceRef.current = setTimeout(() => {
              doAdvance(null)
            }, 8000)
          } else {
            // Snap back
            x.set(0)
          }
          return
        }
      }

      // --- TAP (no direction lock triggered, small movement) ---
      // During reveal: tap does nothing — use Next button or horizontal swipe to dismiss
      // Pre-vote: tap does nothing — use ? button for details

      // Default: snap back with spring animation
      springBack()
      directionRef.current = null
    }

    // Smooth spring-back using requestAnimationFrame
    const springBack = () => {
      const current = x.get()
      if (Math.abs(current) < 1) {
        x.set(0)
        return
      }
      const next = current * 0.7
      x.set(next)
      requestAnimationFrame(springBack)
    }

    // --- Mouse handlers for desktop testing ---
    const mouseStartRef = { x: 0, y: 0 }
    let isMouseDown = false

    const onMouseDown = (e) => {
      mouseStartRef.x = e.clientX
      mouseStartRef.y = e.clientY
      isMouseDown = true
      directionRef.current = null
      isTouchActiveRef.current = true
      touchStartRef.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseMove = (e) => {
      if (!isMouseDown) return
      const deltaX = e.clientX - touchStartRef.current.x
      const deltaY = e.clientY - touchStartRef.current.y
      const absDX = Math.abs(deltaX)
      const absDY = Math.abs(deltaY)

      if (!directionRef.current) {
        if (absDX > DIRECTION_LOCK_THRESHOLD || absDY > DIRECTION_LOCK_THRESHOLD) {
          directionRef.current = absDX > absDY ? 'horizontal' : 'vertical'
        }
      }

      if (directionRef.current === 'horizontal') {
        if (isRevealingRef.current) {
          x.set(deltaX * 0.7)
        } else if (!isAlreadyVotedRef.current) {
          x.set(deltaX * 0.7)
        }
      }
    }

    const onMouseUp = (e) => {
      if (!isMouseDown) return
      isMouseDown = false
      // Reuse touchEnd logic
      const fakeEvent = {
        changedTouches: [{ clientX: e.clientX, clientY: e.clientY }]
      }
      onTouchEnd(fakeEvent)
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseup', onMouseUp)
    el.addEventListener('mouseleave', onMouseUp)

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('mousedown', onMouseDown)
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseup', onMouseUp)
      el.removeEventListener('mouseleave', onMouseUp)
    }
  }, [doAdvance, voteOnMarket, currentMarket])

  // Vote via button tap (same flow as swiping)
  const handleVote = useCallback((choice) => {
    if (!currentMarket || isAlreadyVoted || isRevealing) return
    justVotedRef.current = true
    voteOnMarket(currentMarket.id, choice)
    setIsRevealing(true)

    autoAdvanceRef.current = setTimeout(() => {
      doAdvance(null)
    }, 8000)
  }, [currentMarket, isAlreadyVoted, isRevealing, voteOnMarket, doAdvance])

  // Cleanup auto-advance on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceRef.current) {
        clearTimeout(autoAdvanceRef.current)
      }
    }
  }, [])

  // Custom exit — read from ref synchronously
  const getExitAnimation = () => {
    const dir = exitDirRef.current
    if (dir === 'left') return { x: -300, rotate: -15, opacity: 0, transition: { duration: 0.3 } }
    if (dir === 'right') return { x: 300, rotate: 15, opacity: 0, transition: { duration: 0.3 } }
    if (dir === 'up') return { y: -400, opacity: 0, transition: { duration: 0.3 } }
    return { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  }

  if (currentIndex >= markets.length) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-2 text-white">You've seen all markets!</h2>
        <p className="text-white/60 mb-6">Check back later for new predictions</p>
        <button
          onClick={resetDemo}
          className="px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-sm font-medium text-white transition-colors"
        >
          Start Over
        </button>
      </div>
    )
  }

  if (!currentMarket) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-white/60">Loading markets...</div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="h-full relative overflow-hidden px-4 pt-5 pb-4"
      style={{ touchAction: 'none' }}
    >
      {/* Next card in stack (background) */}
      {nextMarket && currentIndex + 1 < markets.length && (
        <div
          className="absolute left-4 right-4 top-5 bottom-4 scale-[0.96] translate-y-2 opacity-40 pointer-events-none"
        >
          <MarketCard market={nextMarket} />
        </div>
      )}

      {/* Current card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMarket.id}
          className="absolute left-4 right-4 top-5 bottom-4"
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={getExitAnimation()}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* No framer-motion drag — all touch handled natively */}
          <motion.div
            style={{
              x: isAlreadyVoted && !isRevealing ? 0 : x,
              rotate: isAlreadyVoted && !isRevealing ? 0 : rotate,
              touchAction: 'none',
            }}
            className="h-full w-full relative"
          >
            {/* Left swipe overlay (choiceA) — only pre-vote */}
            {!isAlreadyVoted && !isRevealing && (
              <motion.div
                style={{ opacity: leftOverlayOpacity }}
                className="absolute inset-0 bg-emerald-500/90 rounded-2xl z-10 flex items-center justify-center pointer-events-none"
              >
                <div className="text-white text-4xl font-bold rotate-12">
                  {currentMarket.choiceA}
                </div>
              </motion.div>
            )}

            {/* Right swipe overlay (choiceB) — only pre-vote */}
            {!isAlreadyVoted && !isRevealing && (
              <motion.div
                style={{ opacity: rightOverlayOpacity }}
                className="absolute inset-0 bg-rose-500/90 rounded-2xl z-10 flex items-center justify-center pointer-events-none"
              >
                <div className="text-white text-4xl font-bold -rotate-12">
                  {currentMarket.choiceB}
                </div>
              </motion.div>
            )}

            <MarketCard market={currentMarket} onDismiss={isRevealing ? () => doAdvance(null) : null} onVote={handleVote} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
