import { useState, FormEvent, useCallback } from 'react';
import { Loader2, Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { UserRole } from '../../types/navigation';

// ── Role options ───────────────────────────────────────────────────
const ROLES: { value: UserRole; label: string }[] = [
  { value: 'customer', label: 'Customer' },
  { value: 'vendor', label: 'Vendor' },
  { value: 'rider', label: 'Rider' },
  { value: 'fleet_owner', label: 'Fleet Owner' },
  { value: 'agent', label: 'Agent' },
  { value: 'admin', label: 'Admin' },
];

// ── Validation helpers ─────────────────────────────────────────────
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Component ──────────────────────────────────────────────────────
export default function LoginView() {
  // Toggle between login and signup
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [showPassword, setShowPassword] = useState(false);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // ── Validate form ──────────────────────────────────────────────
  const validate = useCallback((): boolean => {
    const errors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [email, password]);

  // ── Handle submit ──────────────────────────────────────────────
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setError(null);

      if (!validate()) return;

      setLoading(true);

      try {
        if (mode === 'signup') {
          const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { role }, // store role in user metadata
            },
          });

          if (signUpError) throw signUpError;

          // Supabase may return a session even on signup if email
          // confirmation is disabled. Show a success message.
          setError(
            'Account created! Check your email to confirm your address.',
          );
        } else {
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (signInError) throw signInError;
          // AuthContext listener will pick up the new session automatically
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Something went wrong';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [email, password, role, mode, validate],
  );

  // ── Toggle mode ────────────────────────────────────────────────
  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
    setError(null);
    setFieldErrors({});
  }, []);

  // ── UI ─────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col px-6 pt-10 pb-8 min-h-full">
      {/* ── HEADER ───────────────────────────────────────────── */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-500/10 mb-4">
          <Shield size={28} className="text-brand-500" strokeWidth={2} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          {mode === 'login' ? 'Welcome back' : 'Create account'}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {mode === 'login'
            ? 'Sign in to manage your dispatches'
            : 'Join the dispatch network'}
        </p>
      </div>

      {/* ── ERROR BANNER ─────────────────────────────────────── */}
      {error && (
        <div
          role="alert"
          className={`
            mb-5 px-4 py-3 rounded-xl text-sm font-medium
            ${error.startsWith('Account created')
              ? 'bg-brand-500/10 text-brand-700'
              : 'bg-red-50 text-red-700'
            }
          `}
        >
          {error}
        </div>
      )}

      {/* ── FORM ─────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            Email
          </label>
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined }));
              }}
              className={`
                w-full h-12 pl-11 pr-4 rounded-xl bg-gray-50 border text-sm text-gray-900
                placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500
                transition-colors
                ${fieldErrors.email ? 'border-red-400 ring-red-400/20' : 'border-gray-200'}
              `}
            />
          </div>
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password)
                  setFieldErrors((p) => ({ ...p, password: undefined }));
              }}
              className={`
                w-full h-12 pl-11 pr-12 rounded-xl bg-gray-50 border text-sm text-gray-900
                placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500
                transition-colors
                ${fieldErrors.password ? 'border-red-400 ring-red-400/20' : 'border-gray-200'}
              `}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 active:scale-95 transition-all"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="mt-1 text-xs text-red-500">{fieldErrors.password}</p>
          )}
        </div>

        {/* Role selector (signup only) */}
        {mode === 'signup' && (
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1.5">
              I am a…
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="
                w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900
                focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500
                appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat
              "
            >
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full h-12 flex items-center justify-center gap-2 rounded-xl
            bg-brand-500 text-white font-semibold text-sm
            hover:bg-brand-600 active:scale-[0.97] transition-all
            disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100
            shadow-sm shadow-brand-500/25
          "
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : mode === 'login' ? (
            'Sign In'
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      {/* ── TOGGLE MODE ───────────────────────────────────────── */}
      <p className="mt-6 text-center text-sm text-gray-500">
        {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          type="button"
          onClick={toggleMode}
          className="font-semibold text-brand-500 hover:text-brand-600 active:scale-95 transition-all inline-block min-h-[44px] leading-[44px]"
        >
          {mode === 'login' ? 'Sign up' : 'Sign in'}
        </button>
      </p>
    </div>
  );
}
