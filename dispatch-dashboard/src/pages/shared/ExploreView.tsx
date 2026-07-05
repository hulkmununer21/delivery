export default function ExploreView() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      </div>
      <h2 className="text-lg font-bold text-gray-900">Explore</h2>
      <p className="mt-2 text-sm text-gray-500 max-w-xs">
        Discover available deliveries, vendors, and fleet opportunities near you.
      </p>
    </div>
  );
}
