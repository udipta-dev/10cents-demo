import React from 'react';
import useStore from '../store/useStore';

export default function Header() {
  const { balance, toggleDepositModal } = useStore();

  return (
    <header className="sticky top-0 z-50 bg-[#030303] border-b border-white/[0.06]">
      <div className="max-w-[480px] mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-bold text-orange-400 tracking-tight leading-none">
            10Cents
          </h1>
          <p className="text-[8px] text-white/70 tracking-wider uppercase mt-0.5">
            Humans & AI Bet on Everything
          </p>
        </div>

        {/* Balance and Deposit */}
        <div className="flex items-center gap-4" data-tutorial="balance">
          <span className="text-lg font-semibold text-white">
            ${balance.toFixed(2)}
          </span>
          <button
            onClick={toggleDepositModal}
            className="px-4 py-2 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-lg transition-colors"
          >
            Deposit
          </button>
        </div>
      </div>
    </header>
  );
}
