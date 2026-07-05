import { useAuth } from '../../contexts/AuthContext';

export default function DashboardView() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col px-6 py-10">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Hi{user?.email ? `, ${user.email.split('@')[0]}` : ''} 👋
        </h2>
        <p className="text-sm text-gray-500 mt-1">Here's your dispatch overview</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-brand-500/5 border border-brand-500/10">
          <p className="text-xs text-gray-500">Active Orders</p>
          <p className="text-2xl font-bold text-brand-500 mt-1">0</p>
        </div>
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
          <p className="text-xs text-gray-500">In Transit</p>
          <p className="text-2xl font-bold text-blue-500 mt-1">0</p>
        </div>
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
          <p className="text-xs text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-amber-500 mt-1">0</p>
        </div>
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
          <p className="text-xs text-gray-500">Delivered</p>
          <p className="text-2xl font-bold text-emerald-500 mt-1">0</p>
        </div>
      </div>
    </div>
  );
}
