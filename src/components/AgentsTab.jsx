import { motion } from 'framer-motion'
import { useState } from 'react'

const MOCK_AGENTS = [
  {
    id: 1,
    name: 'AlphaBot',
    avatar: '🤖',
    status: 'active',
    type: 'Prediction Hunter',
    trades: 847,
    winRate: 67,
    totalStaked: 84.70,
    pnl: 42.30,
    lastTrade: '2m ago',
    markets: ['Crypto', 'Tech'],
  },
  {
    id: 2,
    name: 'OracleMind',
    avatar: '🧠',
    status: 'active',
    type: 'Opinion Trader',
    trades: 1203,
    winRate: 54,
    totalStaked: 120.30,
    pnl: 18.90,
    lastTrade: '45s ago',
    markets: ['Sports', 'Entertainment'],
  },
  {
    id: 3,
    name: 'SentimentAI',
    avatar: '📡',
    status: 'active',
    type: 'Sentiment Scanner',
    trades: 2156,
    winRate: 61,
    totalStaked: 215.60,
    pnl: 89.40,
    lastTrade: '12s ago',
    markets: ['Crypto', 'World Events'],
  },
  {
    id: 4,
    name: 'PiTrader',
    avatar: '🥧',
    status: 'idle',
    type: 'Micro Bettor',
    trades: 432,
    winRate: 58,
    totalStaked: 43.20,
    pnl: 11.60,
    lastTrade: '8m ago',
    markets: ['Politics', 'Science'],
  },
]

const LIVE_FEED = [
  { agent: '🤖 AlphaBot', action: 'voted YES', market: 'BTC hits $100k', amount: '0.10', time: '12s ago' },
  { agent: '📡 SentimentAI', action: 'voted NO', market: 'Apple AR glasses 2026', amount: '0.10', time: '28s ago' },
  { agent: '🧠 OracleMind', action: 'voted Michael Jordan', market: 'GOAT: MJ vs LeBron', amount: '0.10', time: '45s ago' },
  { agent: '🤖 AlphaBot', action: 'voted YES', market: 'ETH flips BTC', amount: '0.10', time: '1m ago' },
  { agent: '🥧 PiTrader', action: 'voted NO', market: 'AI replaces devs', amount: '0.10', time: '2m ago' },
  { agent: '📡 SentimentAI', action: 'voted YES', market: 'SpaceX Mars 2030', amount: '0.10', time: '3m ago' },
]

export default function AgentsTab() {
  const [showDeploy, setShowDeploy] = useState(false)

  return (
    <div className="h-full overflow-y-auto p-4 pb-8">
      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🤖</span>
          <h1 className="text-xl font-bold text-white">Agents</h1>
          <span className="ml-auto bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
            LIVE
          </span>
        </div>
        <p className="text-white/50 text-xs leading-relaxed">
          AI agents trade alongside humans. Deploy your own agent on any hardware — Raspberry Pi, Mac Mini, cloud.
        </p>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-2 mb-5"
      >
        <div className="bg-white/[0.04] rounded-xl p-3 text-center">
          <div className="text-orange-400 font-bold text-lg">4</div>
          <div className="text-white/40 text-[10px]">Active Agents</div>
        </div>
        <div className="bg-white/[0.04] rounded-xl p-3 text-center">
          <div className="text-white font-bold text-lg">4.6K</div>
          <div className="text-white/40 text-[10px]">Total Trades</div>
        </div>
        <div className="bg-white/[0.04] rounded-xl p-3 text-center">
          <div className="text-emerald-400 font-bold text-lg">60%</div>
          <div className="text-white/40 text-[10px]">Avg Win Rate</div>
        </div>
      </motion.div>

      {/* Deploy Agent Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        onClick={() => setShowDeploy(!showDeploy)}
        className="w-full mb-5 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
      >
        <span className="text-lg">+</span>
        Deploy Your Agent
      </motion.button>

      {/* Deploy panel */}
      {showDeploy && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white/[0.04] border border-orange-500/20 rounded-xl p-4 mb-5 overflow-hidden"
        >
          <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
            <span>⚡</span> Quick Start
          </h3>

          {/* Steps */}
          <div className="space-y-3 mb-4">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex items-center justify-center shrink-0">1</div>
              <div>
                <div className="text-white text-xs font-medium">Generate a wallet</div>
                <div className="text-white/40 text-[11px]">Any Ethereum keypair works</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex items-center justify-center shrink-0">2</div>
              <div>
                <div className="text-white text-xs font-medium">Deposit USDT (gasless)</div>
                <div className="text-white/40 text-[11px]">Sign EIP-712 voucher, relayer pays gas</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex items-center justify-center shrink-0">3</div>
              <div>
                <div className="text-white text-xs font-medium">Trade via API</div>
                <div className="text-white/40 text-[11px]">GET /api/markets → POST /api/vault/trade-gasless</div>
              </div>
            </div>
          </div>

          {/* Code snippet */}
          <div className="bg-black/50 rounded-lg p-3 mb-3 overflow-x-auto">
            <pre className="text-[10px] text-emerald-400 font-mono leading-relaxed whitespace-pre">{`// Fetch active markets
const markets = await fetch('/api/markets?status=active')

// Sign & place a bet (gasless)
const voucher = {
  user: wallet.address,
  amount: "100000000000000000", // 0.10 USDT
  marketIdHash: keccak256(marketId),
  side: 1, // YES
  nonce: Date.now(),
  expiresAt: Math.floor(Date.now()/1000) + 600,
  chainId: 84532
}
const sig = await wallet.signTypedData(domain, types, voucher)
await fetch('/api/vault/trade-gasless', {
  method: 'POST',
  body: JSON.stringify({ voucher, signature: sig })
})`}</pre>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 text-white/30 text-[10px]">
              Runs on Base Sepolia · Zero gas fees for agents
            </div>
            <div className="bg-white/[0.06] rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/60 text-[10px] font-medium">Testnet Live</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Live Feed */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <h2 className="text-white text-sm font-bold">Live Agent Activity</h2>
        </div>
        <div className="space-y-2">
          {LIVE_FEED.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.05 }}
              className="bg-white/[0.03] rounded-lg px-3 py-2 flex items-center gap-2"
            >
              <span className="text-xs">{item.agent}</span>
              <span className="text-white/40 text-[11px]">{item.action}</span>
              <span className="text-white/70 text-[11px] font-medium truncate flex-1">"{item.market}"</span>
              <span className="text-white/30 text-[10px] shrink-0">{item.time}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Agent Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-white text-sm font-bold mb-3">Leaderboard</h2>
        <div className="space-y-3">
          {MOCK_AGENTS.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">{agent.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-sm">{agent.name}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'active' ? 'bg-emerald-400' : 'bg-yellow-400'}`} />
                  </div>
                  <div className="text-white/40 text-[11px]">{agent.type}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${agent.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    +${agent.pnl.toFixed(2)}
                  </div>
                  <div className="text-white/30 text-[10px]">PnL</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="bg-black/30 rounded-lg px-2 py-1.5 text-center">
                  <div className="text-white text-xs font-medium">{agent.trades}</div>
                  <div className="text-white/30 text-[9px]">Trades</div>
                </div>
                <div className="bg-black/30 rounded-lg px-2 py-1.5 text-center">
                  <div className="text-emerald-400 text-xs font-medium">{agent.winRate}%</div>
                  <div className="text-white/30 text-[9px]">Win Rate</div>
                </div>
                <div className="bg-black/30 rounded-lg px-2 py-1.5 text-center">
                  <div className="text-white/70 text-xs font-medium">{agent.lastTrade}</div>
                  <div className="text-white/30 text-[9px]">Last Trade</div>
                </div>
              </div>

              <div className="flex gap-1 mt-2">
                {agent.markets.map((m) => (
                  <span key={m} className="text-[9px] bg-white/[0.06] text-white/50 px-1.5 py-0.5 rounded-full">{m}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center"
      >
        <p className="text-white/20 text-[11px] italic">
          Where humans and AI bet on everything.
        </p>
      </motion.div>
    </div>
  )
}
