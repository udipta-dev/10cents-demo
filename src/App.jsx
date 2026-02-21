import { AnimatePresence, motion } from 'framer-motion'
import useStore from './store/useStore'
import Header from './components/Header'
import SwipeFeed from './components/SwipeFeed'
import ProfileTab from './components/ProfileTab'
import AgentsTab from './components/AgentsTab'
import InfoModal from './components/InfoModal'
import MarketDetailsModal from './components/MarketDetailsModal'
import DepositModal from './components/DepositModal'
import WithdrawModal from './components/WithdrawModal'
import CreateMarketModal from './components/CreateMarketModal'
import SuccessOverlay from './components/SuccessOverlay'
import OnboardingOverlay from './components/OnboardingOverlay'
import TutorialOverlay from './components/TutorialOverlay'

function App() {
  const activeTab = useStore(s => s.activeTab)
  const showInfoModal = useStore(s => s.showInfoModal)
  const showDepositModal = useStore(s => s.showDepositModal)
  const showWithdrawModal = useStore(s => s.showWithdrawModal)
  const showCreateMarketModal = useStore(s => s.showCreateMarketModal)
  const showMarketDetails = useStore(s => s.showMarketDetails)
  const showSuccess = useStore(s => s.showSuccess)
  const showOnboarding = useStore(s => s.showOnboarding)
  const showTutorial = useStore(s => s.showTutorial)
  const completeOnboarding = useStore(s => s.completeOnboarding)
  const completeTutorial = useStore(s => s.completeTutorial)
  const setActiveTab = useStore(s => s.setActiveTab)

  return (
    <div className="w-full max-w-[430px] h-full flex flex-col bg-[#030303] relative overflow-hidden">
      <Header />

      <div className="flex-1 min-h-0 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'feed' && (
            <motion.div
              key="feed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <SwipeFeed />
            </motion.div>
          )}
          {activeTab === 'agents' && (
            <motion.div
              key="agents"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 overflow-y-auto"
            >
              <AgentsTab />
            </motion.div>
          )}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 overflow-y-auto"
            >
              <ProfileTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center border-t border-white/[0.06] bg-[#030303] relative z-20" data-tutorial="bottomnav">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex-1 py-3 flex flex-col items-center gap-0.5 transition-colors ${
            activeTab === 'feed' ? 'text-orange-400' : 'text-white/50'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="text-[10px] font-medium">Markets</span>
        </button>
        <button
          onClick={() => setActiveTab('agents')}
          data-tutorial="agents-tab"
          className={`flex-1 py-3 flex flex-col items-center gap-0.5 transition-colors ${
            activeTab === 'agents' ? 'text-orange-400' : 'text-white/50'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-1.5 4.5H6.5L5 14.5m14 0H5" />
          </svg>
          <span className="text-[10px] font-medium">Agents</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-3 flex flex-col items-center gap-0.5 transition-colors ${
            activeTab === 'profile' ? 'text-orange-400' : 'text-white/50'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showInfoModal && <InfoModal />}
        {showDepositModal && <DepositModal />}
        {showWithdrawModal && <WithdrawModal />}
        {showCreateMarketModal && <CreateMarketModal />}
        {showMarketDetails && <MarketDetailsModal />}
        {showSuccess && <SuccessOverlay />}
        {showOnboarding && <OnboardingOverlay onComplete={completeOnboarding} />}
        {showTutorial && <TutorialOverlay onComplete={completeTutorial} />}
      </AnimatePresence>
    </div>
  )
}

export default App
