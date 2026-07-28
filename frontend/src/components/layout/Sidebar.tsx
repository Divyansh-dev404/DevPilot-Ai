import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  Bot,
  ShieldAlert,
  Zap,
  Code2,
  Network,
  Database,
  FileCode,
  FileText,
  TestTube,
  User,
  Settings,
  CreditCard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useRepository } from '../../contexts/RepositoryContext';
import { cn } from '../../lib/utils';

export const Sidebar: React.FC<{ isCollapsed: boolean; toggleCollapse: () => void }> = ({
  isCollapsed,
  toggleCollapse,
}) => {
  const { logout, user } = useAuth();
  const { activeRepository } = useRepository();
  const navigate = useNavigate();
  const location = useLocation();

  const mainNavItems = [
    { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Import Repository', icon: FolderGit2, path: '/import' },
    { label: 'Repository Explorer', icon: Code2, path: '/repository' },
    { label: 'AI Assistant RAG', icon: Bot, path: '/chat', badge: 'Gemini' },
  ];

  const analysisItems = [
    { label: 'Security Scan', icon: ShieldAlert, path: '/analysis/security' },
    { label: 'Performance Audit', icon: Zap, path: '/analysis/performance' },
    { label: 'Code Quality', icon: Sparkles, path: '/analysis/quality' },
  ];

  const architectureItems = [
    { label: 'Architecture Engine', icon: Network, path: '/architecture' },
    { label: 'API Explorer', icon: Terminal, path: '/api-explorer' },
    { label: 'Database Visualizer', icon: Database, path: '/database' },
    { label: 'Auto Documentation', icon: FileText, path: '/documentation' },
    { label: 'Test Suite Generator', icon: TestTube, path: '/tests' },
  ];

  const accountItems = [
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Settings', icon: Settings, path: '/settings' },
    { label: 'Billing & Plan', icon: CreditCard, path: '/billing' },
  ];

  return (
    <aside
      className={cn(
        'h-screen sticky top-0 bg-[#0a0d14]/90 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between transition-all duration-300 z-30 select-none',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div>
        {/* Logo Section */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-white/10">
          {!isCollapsed && (
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Bot className="h-5 w-5 text-black" />
              </div>
              <div>
                <span className="font-bold text-lg text-gradient-cyan tracking-wider">DevPilot</span>
                <span className="text-xs font-semibold text-purple-400 ml-1">AI</span>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="mx-auto h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center">
              <Bot className="h-5 w-5 text-black" />
            </div>
          )}
          <button
            onClick={toggleCollapse}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400/40 transition-all"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Active Repo Badge */}
        {!isCollapsed && activeRepository && (
          <div className="mx-3 my-3 p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer hover:border-cyan-500/40 transition-all" onClick={() => navigate('/repository')}>
            <div className="flex items-center gap-2 overflow-hidden">
              <FolderGit2 className="h-4 w-4 text-cyan-400 shrink-0" />
              <span className="text-xs font-medium truncate text-slate-200">{activeRepository.name}</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              {activeRepository.primaryLanguage}
            </span>
          </div>
        )}

        {/* Navigation Sections */}
        <div className="px-3 py-2 space-y-5 overflow-y-auto max-h-[calc(100vh-140px)]">
          {/* Main Group */}
          <div>
            {!isCollapsed && <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Core Platform</p>}
            <nav className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group relative',
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/10 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-500/10'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                    )}
                  >
                    <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-300')} />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                    {!isCollapsed && item.badge && (
                      <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* AI Intelligence & Review */}
          <div>
            {!isCollapsed && <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">AI Review & Security</p>}
            <nav className="space-y-1">
              {analysisItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group',
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/10 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                    )}
                  >
                    <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-purple-400' : 'text-slate-400 group-hover:text-purple-300')} />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Architecture & Engineering */}
          <div>
            {!isCollapsed && <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Architecture Engine</p>}
            <nav className="space-y-1">
              {architectureItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group',
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/10 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                    )}
                  >
                    <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-emerald-300')} />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* User Profile & Logout Footer */}
      <div className="p-3 border-t border-white/10 bg-white/[0.02]">
        {!isCollapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden cursor-pointer" onClick={() => navigate('/profile')}>
              <img src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'} alt="Avatar" className="h-8 w-8 rounded-full border border-cyan-400/40 object-cover" />
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-slate-200 truncate">{user?.name || 'Engineer'}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.email || 'dev@devpilot.ai'}</p>
              </div>
            </div>
            <button onClick={logout} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all" title="Logout">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button onClick={logout} className="w-full flex justify-center p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10" title="Logout">
            <LogOut className="h-5 w-5" />
          </button>
        )}
      </div>
    </aside>
  );
};
