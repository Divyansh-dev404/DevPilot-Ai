import React from 'react';
import { User as UserIcon, Mail, Key, Shield, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { GlassCard } from '../components/ui/GlassCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <UserIcon className="h-6 w-6 text-cyan-400" /> User Profile & Security Settings
        </h1>
        <p className="text-xs text-slate-400">Manage account credentials, OAuth connections, and security audit logs.</p>
      </div>

      <GlassCard glow="cyan" className="p-6 space-y-6">
        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt="Avatar"
            className="h-16 w-16 rounded-full border-2 border-cyan-400/50 object-cover shadow-lg shadow-cyan-500/20"
          />
          <div>
            <h2 className="text-lg font-bold text-slate-100">{user?.name || 'DevPilot Engineer'}</h2>
            <p className="text-xs text-cyan-400 font-mono">{user?.email || 'architect@devpilot.ai'}</p>
            <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold">
              DevPilot Pro Plan Active
            </span>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <Input label="Full Name" defaultValue={user?.name || 'DevPilot Engineer'} icon={<UserIcon className="h-4 w-4" />} />
          <Input label="Email Address" defaultValue={user?.email || 'architect@devpilot.ai'} icon={<Mail className="h-4 w-4" />} readOnly />
          <Button variant="cyan" type="submit">Update Profile Details</Button>
        </form>
      </GlassCard>
    </div>
  );
};
