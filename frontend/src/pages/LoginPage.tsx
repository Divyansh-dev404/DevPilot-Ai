import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bot, Mail, Lock, ArrowRight, Github, User as UserIcon, CheckCircle2, AlertCircle, KeyRound, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const LoginPage: React.FC = () => {
  const { login, register, oauthLogin } = useAuth();
  const navigate = useNavigate();
  
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('architect@devpilot.ai');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg(null);

    try {
      if (mode === 'login') {
        await login(email, password);
        setStatusMsg({ type: 'success', text: 'Authentication successful! Redirecting...' });
        setTimeout(() => navigate('/dashboard'), 600);
      } else if (mode === 'register') {
        if (!name.trim()) throw new Error('Please enter your full name.');
        await register(name, email, password);
        setStatusMsg({ type: 'success', text: 'Account created successfully! Welcome to DevPilot AI.' });
        setTimeout(() => navigate('/dashboard'), 600);
      } else if (mode === 'forgot') {
        setStatusMsg({ type: 'success', text: 'Password reset link sent! Please check your inbox.' });
        setIsLoading(false);
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err?.message || 'Authentication failed. Please try again.' });
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    await oauthLogin(provider);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#06080e] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Aurora Blur */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <GlassCard glow="cyan" className="max-w-md w-full p-8 space-y-6 border border-white/10 relative z-10">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-black shadow-lg shadow-cyan-500/20">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              DevPilot AI
            </span>
          </Link>
          <h2 className="text-xl font-bold text-slate-100">
            {mode === 'login' && 'Welcome back to DevPilot AI'}
            {mode === 'register' && 'Create your DevPilot AI Account'}
            {mode === 'forgot' && 'Reset your Password'}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === 'login' && 'Sign in to access your codebase intelligence engine.'}
            {mode === 'register' && 'Join thousands of engineers accelerating software delivery.'}
            {mode === 'forgot' && 'Enter your work email to receive a secure password reset token.'}
          </p>
        </div>

        {statusMsg && (
          <div className={`p-3 rounded-lg flex items-center gap-2 text-xs border ${
            statusMsg.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}>
            {statusMsg.type === 'success' ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <Input
              label="Full Name"
              type="text"
              placeholder="Alex Chen"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<UserIcon className="h-4 w-4 text-slate-400" />}
              required
            />
          )}

          <Input
            label="Work Email"
            type="email"
            placeholder="architect@devpilot.ai"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="h-4 w-4 text-slate-400" />}
            required
          />

          {mode !== 'forgot' && (
            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="h-4 w-4 text-slate-400" />}
              required
            />
          )}

          {mode === 'login' && (
            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/20 bg-black/40 text-cyan-500 focus:ring-cyan-500"
                />
                <span>Remember me for 30 days</span>
              </label>
              <button
                type="button"
                onClick={() => { setMode('forgot'); setStatusMsg(null); }}
                className="text-cyan-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          <Button variant="cyan" type="submit" className="w-full gap-2" isLoading={isLoading}>
            {mode === 'login' && <>Sign In <ArrowRight className="h-4 w-4" /></>}
            {mode === 'register' && <>Create Account <ShieldCheck className="h-4 w-4" /></>}
            {mode === 'forgot' && <>Send Reset Link <KeyRound className="h-4 w-4" /></>}
          </Button>
        </form>

        {mode !== 'forgot' && (
          <>
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-[#0e131f] px-3 text-[10px] text-slate-500 uppercase font-bold absolute">
                Or Continue With
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOAuth('github')}
                className="gap-2"
              >
                <Github className="h-4 w-4" /> GitHub
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOAuth('google')}
                className="gap-2"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Google
              </Button>
            </div>
          </>
        )}

        <div className="text-center pt-2 text-xs text-slate-400">
          {mode === 'login' && (
            <span>
              Don't have an account?{' '}
              <button onClick={() => { setMode('register'); setStatusMsg(null); }} className="text-cyan-400 hover:underline font-medium">
                Register now
              </button>
            </span>
          )}
          {mode === 'register' && (
            <span>
              Already have an account?{' '}
              <button onClick={() => { setMode('login'); setStatusMsg(null); }} className="text-cyan-400 hover:underline font-medium">
                Sign in
              </button>
            </span>
          )}
          {mode === 'forgot' && (
            <button onClick={() => { setMode('login'); setStatusMsg(null); }} className="text-cyan-400 hover:underline font-medium">
              Return to Sign In
            </button>
          )}
        </div>
      </GlassCard>
    </div>
  );
};
