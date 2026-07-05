import { useState, ReactNode, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Compass,
  Wallet,
  User,
  LogIn,
  Bell,
  ChevronLeft,
  Package,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { NavTab } from '../types/navigation';

// ── Props ──────────────────────────────────────────────────────────
interface MobileAppShellProps {
  /** Page title shown in the top bar */
  title: string;
  /** Whether to show a back button (defaults false) */
  showBack?: boolean;
  /** Called when the back button is tapped */
  onBack?: () => void;
  /** Action icons in the top bar (besides notifications) */
  headerActions?: ReactNode;
  /** Main scrollable content */
  children: ReactNode;
}

// ── Tab definitions ────────────────────────────────────────────────
const GUEST_TABS: NavTab[] = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'explore', label: 'Explore', icon: Compass, path: '/explore' },
  { id: 'login', label: 'Sign In', icon: LogIn, path: '/auth' },
];

const AUTH_TABS: NavTab[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Package, path: '/dashboard' },
  { id: 'explore', label: 'Explore', icon: Compass, path: '/explore' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, path: '/wallet' },
  { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
];

// ── Component ──────────────────────────────────────────────────────
export default function MobileAppShell({
  title,
  showBack = false,
  onBack,
  headerActions,
  children,
}: MobileAppShellProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = useMemo(() => (user ? AUTH_TABS : GUEST_TABS), [user]);

  // Derive active tab from current path
  const activeTab = useMemo(() => {
    const match = tabs.find((t) => t.path === location.pathname);
    return match?.id ?? tabs[0].id;
  }, [location.pathname, tabs]);

  // ── Keyboard-safe back handler ───────────────────────────────────
  const handleBack = useCallback(() => {
    onBack?.();
  }, [onBack]);

  // ── Tab navigation via React Router ─────────────────────────────
  const handleTabPress = useCallback(
    (tab: NavTab) => {
      navigate(tab.path);
    },
    [navigate],
  );

  return (
    // ── Desktop wrapper: center a mobile-sized card ────────────────
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-0 sm:p-4">
      <div className="relative w-full sm:max-w-[440px] h-screen sm:h-[calc(100vh-2rem)] sm:rounded-3xl sm:shadow-2xl overflow-hidden bg-white flex flex-col">

        {/* ── TOP NAVIGATION HEADER ─────────────────────────────── */}
        <header className="shrink-0 flex items-center justify-between h-14 px-4 border-b border-gray-100 bg-white z-30">
          {/* Left: back button or nothing */}
          <div className="flex items-center gap-2 min-w-[44px]">
            {showBack && (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center justify-center w-11 h-11 -ml-2 rounded-xl text-gray-600 hover:bg-gray-100 active:scale-95 transition-all select-none"
                aria-label="Go back"
              >
                <ChevronLeft size={22} strokeWidth={2} />
              </button>
            )}
          </div>

          {/* Center: title */}
          <h1 className="text-base font-semibold text-gray-900 truncate select-none">
            {title}
          </h1>

          {/* Right: actions */}
          <div className="flex items-center gap-1 min-w-[44px] justify-end">
            {headerActions ?? (
              <button
                type="button"
                className="flex items-center justify-center w-11 h-11 rounded-xl text-gray-500 hover:bg-gray-100 active:scale-95 transition-all select-none"
                aria-label="Notifications"
              >
                <Bell size={20} strokeWidth={2} />
              </button>
            )}
          </div>
        </header>

        {/* ── SCROLLABLE MAIN CONTENT ───────────────────────────── */}
        <main className="flex-1 overflow-y-auto scrollbar-none bg-gray-50">
          {children}
        </main>

        {/* ── BOTTOM TAB NAVIGATION ─────────────────────────────── */}
        <nav className="shrink-0 flex items-center justify-around h-16 border-t border-gray-100 bg-white pb-safe z-30">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabPress(tab)}
                className={`
                  relative flex flex-col items-center justify-center gap-0.5
                  min-w-[44px] min-h-[44px] px-2 rounded-xl
                  active:scale-95 transition-all select-none
                  ${isActive
                    ? 'text-brand-500'
                    : 'text-gray-400 hover:text-gray-600'
                  }
                `}
                aria-label={tab.label}
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  fill={isActive ? 'currentColor' : 'none'}
                  className="transition-all"
                />
                <span className="text-[10px] font-medium leading-none">
                  {tab.label}
                </span>
                {isActive && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-full bg-brand-500" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
