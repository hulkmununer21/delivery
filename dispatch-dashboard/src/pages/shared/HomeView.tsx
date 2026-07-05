export default function HomeView() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-5">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-500">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </div>
      <h2 className="text-lg font-bold text-gray-900">Welcome to Dispatch</h2>
      <p className="mt-2 text-sm text-gray-500 max-w-xs">
        Your all-in-one platform for managing deliveries, tracking riders, and
        growing your business.
      </p>
    </div>
  );
}
