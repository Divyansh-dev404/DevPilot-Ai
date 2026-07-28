import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Command,
  ChevronDown,
  FolderGit2,
  Sparkles,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { useRepository } from '../../contexts/RepositoryContext';
import { useAuth } from '../../contexts/AuthContext';
import { Badge } from '../ui/Badge';

export const Navbar: React.FC<{ onOpenCommandPalette: () => void }> = ({ onOpenCommandPalette }) => {
  const { repositories, activeRepository, setActiveRepository } = useRepository();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showRepoDropdown, setShowRepoDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const mockNotifications = [
    { id: '1', title: 'Repository Import Complete', time: '2 mins ago', icon: CheckCircle, type: 'success' },
    { id: '2', title: 'Security Scan Finished - 0 Criticals', time: '10 mins ago', icon: ShieldCheck, type: 'cyan' },
    { id: '3', title: 'RAG Embeddings Built for devpilot-ai', time: '1 hour ago', icon: Sparkles, type: 'purple' },
  ];

  return (
    <header className="h-16 px-6 bg-[#0a0d14]/70 backdrop-blur-xl border-b border-white/10 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Active Repo Dropdown */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setShowRepoDropdown(!showRepoDropdown)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-slate-200 hover:border-cyan-400/40 hover:bg-white/10 transition-all"
          >
            <FolderGit2 className="h-4 w-4 text-cyan-400" />
            <span className="max-w-[150px] truncate">{activeRepository ? activeRepository.name : 'Select Repo'}</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {showRepoDropdown && (
            <div className="absolute left-0 mt-2 w-64 glass-panel rounded-xl shadow-2xl z-50 p-1.5 border border-white/15 animate-in fade-in slide-in-from-top-2">
              <p className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Switch Repository</p>
              <div className="space-y-0.5 max-h-48 overflow-y-auto">
                {repositories.map((repo) => (
                  <button
                    key={repo.id}
                    onClick={() => {
                      setActiveRepository(repo);
                      setShowRepoDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-all ${
                      activeRepository?.id === repo.id
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                        : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="truncate">
                      <p className="truncate font-medium">{repo.name}</p>
                      <p className="text-[10px] text-slate-500">{repo.owner}</p>
                    </div>
                    <Badge variant="cyan" className="text-[9px] py-0 px-1">{repo.primaryLanguage}</Badge>
                  </button>
                ))}
              </div>
              <div className="mt-1 pt-1 border-t border-white/10">
                <button
                  onClick={() => {
                    setShowRepoDropdown(false);
                    navigate('/import');
                  }}
                  className="w-full text-center px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-400 hover:bg-cyan-500/10 transition-all"
                >
                  + Import New Repository
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Global Search Bar Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 hover:border-cyan-400/50 hover:bg-white/10 transition-all w-72"
        >
          <Search className="h-3.5 w-3.5 text-cyan-400" />
          <span className="flex-1 text-left">Search files, APIs, security...</span>
          <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] text-slate-300 font-mono">
            <Command className="h-2.5 w-2.5" /> K
          </span>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/40 transition-all"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 glass-panel rounded-xl shadow-2xl z-50 p-3 border border-white/15 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-bold text-slate-200">Notifications</span>
                <span className="text-[10px] text-cyan-400 cursor-pointer">Mark all read</span>
              </div>
              <div className="space-y-2 mt-2">
                {mockNotifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div key={n.id} className="p-2 rounded-lg bg-white/5 border border-white/5 flex gap-3 text-xs">
                      <Icon className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-200">{n.title}</p>
                        <p className="text-[10px] text-slate-500">{n.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* User Quick Trigger */}
        <div
          className="flex items-center gap-2.5 pl-2 border-l border-white/10 cursor-pointer hover:opacity-80 transition-all"
          onClick={() => navigate('/profile')}
        >
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt="Avatar"
            className="h-8 w-8 rounded-full border border-cyan-400/50 object-cover shadow-sm shadow-cyan-500/20"
          />
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-slate-200">{user?.name || 'Engineer'}</p>
            <p className="text-[10px] text-purple-400 font-medium">DevPilot Pro</p>
          </div>
        </div>
      </div>
    </header>
  );
};
