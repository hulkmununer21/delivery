import { LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfileView() {
  const { user, signOut } = useAuth();

  return (
    <div className="flex flex-col px-6 py-10">
      {/* Avatar + info */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500 font-bold text-xl uppercase select-none">
          {user?.email?.charAt(0) ?? '?'}
        </div>
        <div className="min-w-0">
          <p className="text-base font-semibold text-gray-900 truncate">
            {user?.email ?? 'Unknown'}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {user?.user_metadata?.role ?? 'Member'}
          </p>
        </div>
      </div>

      {/* Menu items */}
      <div className="space-y-1">
        <button className="w-full flex items-center justify-between h-12 px-4 rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all">
          <span className="text-sm text-gray-700">Account Settings</span>
          <ChevronRight size={18} className="text-gray-400" />
        </button>
        <button className="w-full flex items-center justify-between h-12 px-4 rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all">
          <span className="text-sm text-gray-700">Notifications</span>
          <ChevronRight size={18} className="text-gray-400" />
        </button>
        <button className="w-full flex items-center justify-between h-12 px-4 rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all">
          <span className="text-sm text-gray-700">Help &amp; Support</span>
          <ChevronRight size={18} className="text-gray-400" />
        </button>
      </div>

      {/* Sign out */}
      <button
        type="button"
        onClick={signOut}
        className="mt-6 w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-red-50 text-red-600 font-semibold text-sm hover:bg-red-100 active:scale-[0.97] transition-all"
      >
        <LogOut size={18} />
        Sign Out
      </button>
    </div>
  );
}
