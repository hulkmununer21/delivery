import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MobileAppShell from './layouts/MobileAppShell';
import HomeView from './pages/shared/HomeView';
import ExploreView from './pages/shared/ExploreView';
import LoginView from './pages/shared/LoginView';
import DashboardView from './pages/shared/DashboardView';
import WalletView from './pages/shared/WalletView';
import ProfileView from './pages/shared/ProfileView';

// ── Route wrapper: puts a page inside the MobileAppShell ──────────
function ShellRoute({
  title,
  showBack = false,
  onBackPath,
  children,
}: {
  title: string;
  showBack?: boolean;
  onBackPath?: string;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  return (
    <MobileAppShell
      title={title}
      showBack={showBack}
      onBack={onBackPath ? () => navigate(onBackPath) : undefined}
    >
      {children}
    </MobileAppShell>
  );
}

// ── Redirect authenticated users away from guest pages ────────────
function GuestRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

// ── Protect authenticated pages ────────────────────────────────────
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}

// ── Route definitions ──────────────────────────────────────────────
function AppRoutes() {
  return (
    <Routes>
      {/* ── Guest: Landing ──────────────────────────────────── */}
      <Route
        path="/"
        element={
          <GuestRoute>
            <ShellRoute title="Dispatch">
              <HomeView />
            </ShellRoute>
          </GuestRoute>
        }
      />

      {/* ── Guest / Auth: Login / Signup ────────────────────── */}
      <Route
        path="/auth"
        element={
          <GuestRoute>
            <ShellRoute title="Account" showBack onBackPath="/">
              <LoginView />
            </ShellRoute>
          </GuestRoute>
        }
      />

      {/* ── Shared: Explore ─────────────────────────────────── */}
      <Route
        path="/explore"
        element={
          <ShellRoute title="Explore">
            <ExploreView />
          </ShellRoute>
        }
      />

      {/* ── Auth: Dashboard ─────────────────────────────────── */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <ShellRoute title="Dashboard">
              <DashboardView />
            </ShellRoute>
          </ProtectedRoute>
        }
      />

      {/* ── Auth: Wallet ────────────────────────────────────── */}
      <Route
        path="/wallet"
        element={
          <ProtectedRoute>
            <ShellRoute title="Wallet" showBack onBackPath="/dashboard">
              <WalletView />
            </ShellRoute>
          </ProtectedRoute>
        }
      />

      {/* ── Auth: Profile ───────────────────────────────────── */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ShellRoute title="Profile" showBack onBackPath="/dashboard">
              <ProfileView />
            </ShellRoute>
          </ProtectedRoute>
        }
      />

      {/* ── Catch-all redirect ──────────────────────────────── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// ── Root App ───────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
