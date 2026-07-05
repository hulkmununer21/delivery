export default function WalletView() {
  return (
    <div className="flex flex-col px-6 py-10">
      {/* Balance card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-500/20">
        <p className="text-xs font-medium text-white/70 uppercase tracking-wide">
          Available Balance
        </p>
        <p className="text-3xl font-bold mt-1">$0.00</p>
        <p className="text-xs text-white/60 mt-2">•••• 4242</p>
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 mt-5">
        <button className="flex-1 h-12 rounded-xl bg-brand-500 text-white font-semibold text-sm active:scale-95 transition-all">
          Add Funds
        </button>
        <button className="flex-1 h-12 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm active:scale-95 transition-all">
          Withdraw
        </button>
      </div>

      {/* Empty transactions */}
      <div className="mt-8 text-center py-10">
        <p className="text-sm text-gray-400">No transactions yet</p>
      </div>
    </div>
  );
}
