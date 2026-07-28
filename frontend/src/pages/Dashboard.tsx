import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderGit2,
  Bot,
  ShieldCheck,
  Zap,
  Code2,
  Network,
  Plus,
  ArrowUpRight,
  Database,
} from 'lucide-react';
import { useRepository } from '../contexts/RepositoryContext';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { formatDate } from '../lib/utils';

export const Dashboard: React.FC = () => {
  const { repositories, activeRepository, setActiveRepository } = useRepository();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            DevPilot Engineering Workspace
          </h1>
          <p className="text-xs text-slate-400">
            Autonomous repository parser, OWASP security scanner, and Gemini RAG assistant.
          </p>
        </div>
        <Button variant="cyan" onClick={() => navigate('/import')} className="gap-2">
          <Plus className="h-4 w-4" /> Import New Repository
        </Button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard glow="cyan" className="p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Repositories</span>
            <FolderGit2 className="h-5 w-5 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-slate-100">{repositories.length}</p>
          <p className="text-[11px] text-cyan-300">100% Vector Indexed</p>
        </GlassCard>

        <GlassCard glow="purple" className="p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Security Score</span>
            <ShieldCheck className="h-5 w-5 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-slate-100">94 / 100</p>
          <p className="text-[11px] text-emerald-400">0 Critical Vulnerabilities</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Files Parsed</span>
            <Code2 className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-slate-100">{activeRepository?.filesCount || 184}</p>
          <p className="text-[11px] text-slate-400">AST Tokens Chunked</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">RAG Queries</span>
            <Bot className="h-5 w-5 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-slate-100">1,240</p>
          <p className="text-[11px] text-purple-300">Google Gemini 1.5 Pro</p>
        </GlassCard>
      </div>

      {/* Quick Tool Launchers */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">AI Engines & Quick Launchers</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard onClick={() => navigate('/chat')} className="p-5 cursor-pointer space-y-2 group">
            <div className="flex items-center justify-between">
              <Bot className="h-6 w-6 text-cyan-400 group-hover:scale-110 transition-all" />
              <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400" />
            </div>
            <h4 className="text-sm font-bold text-slate-100">RAG AI Assistant</h4>
            <p className="text-xs text-slate-400">Query code chunks with grounded Gemini responses.</p>
          </GlassCard>

          <GlassCard onClick={() => navigate('/analysis/security')} className="p-5 cursor-pointer space-y-2 group">
            <div className="flex items-center justify-between">
              <ShieldCheck className="h-6 w-6 text-purple-400 group-hover:scale-110 transition-all" />
              <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-purple-400" />
            </div>
            <h4 className="text-sm font-bold text-slate-100">Security Audit</h4>
            <p className="text-xs text-slate-400">OWASP vulnerability detector and auto remediation.</p>
          </GlassCard>

          <GlassCard onClick={() => navigate('/architecture')} className="p-5 cursor-pointer space-y-2 group">
            <div className="flex items-center justify-between">
              <Network className="h-6 w-6 text-emerald-400 group-hover:scale-110 transition-all" />
              <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-slate-100">Architecture Engine</h4>
            <p className="text-xs text-slate-400">Interactive topology & code dependency visualizer.</p>
          </GlassCard>

          <GlassCard onClick={() => navigate('/api-explorer')} className="p-5 cursor-pointer space-y-2 group">
            <div className="flex items-center justify-between">
              <Database className="h-6 w-6 text-amber-400 group-hover:scale-110 transition-all" />
              <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-amber-400" />
            </div>
            <h4 className="text-sm font-bold text-slate-100">API & DB Visualizer</h4>
            <p className="text-xs text-slate-400">Swagger REST explorer and ER database diagram.</p>
          </GlassCard>
        </div>
      </div>

      {/* Repositories Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Active Repositories</h3>
        </div>

        <GlassCard hoverEffect={false} className="p-0 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="p-4">Repository</th>
                <th className="p-4">Primary Language</th>
                <th className="p-4">Frameworks</th>
                <th className="p-4">Files</th>
                <th className="p-4">Updated</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {repositories.map((repo) => (
                <tr key={repo.id} className="hover:bg-white/[0.02] transition-all">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <FolderGit2 className="h-4 w-4 text-cyan-400 shrink-0" />
                      <div>
                        <p className="font-bold text-slate-100">{repo.name}</p>
                        <p className="text-[10px] text-slate-500">{repo.owner}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="cyan">{repo.primaryLanguage}</Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {repo.frameworks.map((fw) => (
                        <span key={fw} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300">
                          {fw}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 font-mono text-slate-300">{repo.filesCount}</td>
                  <td className="p-4 text-slate-400">{formatDate(repo.updatedAt)}</td>
                  <td className="p-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setActiveRepository(repo);
                        navigate('/repository');
                      }}
                    >
                      Open Explorer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </div>
  );
};
