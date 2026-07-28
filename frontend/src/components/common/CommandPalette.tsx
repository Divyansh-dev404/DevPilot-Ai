import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  LayoutDashboard,
  FolderGit2,
  Bot,
  ShieldAlert,
  Zap,
  Code2,
  Network,
  Database,
  FileText,
  User,
  Settings,
  CreditCard,
  X,
} from 'lucide-react';

export const CommandPalette: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent trigger handles toggling
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    { label: 'Overview Dashboard', icon: LayoutDashboard, path: '/dashboard', category: 'Navigation' },
    { label: 'Import Repository (GitHub / ZIP)', icon: FolderGit2, path: '/import', category: 'Navigation' },
    { label: 'Repository Explorer & File Tree', icon: Code2, path: '/repository', category: 'Navigation' },
    { label: 'AI Assistant RAG Chat', icon: Bot, path: '/chat', category: 'AI Tools' },
    { label: 'Security Vulnerability Scan', icon: ShieldAlert, path: '/analysis/security', category: 'Analysis' },
    { label: 'Performance & Bottleneck Audit', icon: Zap, path: '/analysis/performance', category: 'Analysis' },
    { label: 'Architecture & System Topology', icon: Network, path: '/architecture', category: 'Engineering' },
    { label: 'Database Visualizer & ER Diagram', icon: Database, path: '/database', category: 'Engineering' },
    { label: 'Auto Documentation Suite', icon: FileText, path: '/documentation', category: 'Engineering' },
    { label: 'User Profile', icon: User, path: '/profile', category: 'Account' },
    { label: 'Settings & API Keys', icon: Settings, path: '/settings', category: 'Account' },
    { label: 'Billing & Plan Upgrades', icon: CreditCard, path: '/billing', category: 'Account' },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-[#00000080] inset-0 z-50 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in">
      <div className="w-full max-w-xl glass-panel rounded-2xl border border-white/15 shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="h-5 w-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none text-slate-100 placeholder-slate-500 focus:outline-none text-sm font-medium"
            autoFocus
          />
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-slate-400">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.path}
                  onClick={() => handleSelect(cmd.path)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-cyan-500/20 hover:border hover:border-cyan-500/30 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-slate-400 group-hover:text-cyan-400" />
                    <span className="font-medium">{cmd.label}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400 group-hover:text-cyan-300">
                    {cmd.category}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs text-slate-500">No matching commands found.</div>
          )}
        </div>

        <div className="p-2.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-[10px] text-slate-400">
          <span>Navigate with arrows or click</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
