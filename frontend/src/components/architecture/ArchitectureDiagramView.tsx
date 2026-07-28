import React, { useState } from 'react';
import { Network, Server, Database, Layers, Cloud, Shield, Cpu, RefreshCw, Download } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { downloadJSON, downloadMarkdown } from '../../lib/exporter';

export const ArchitectureDiagramView: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>('FastAPI Gateway');

  const nodes = [
    { id: 'c1', label: 'React 18 SPA Frontend', type: 'frontend', tech: 'React, Vite, TailwindCSS', icon: Layers, desc: 'Client user interface layer rendering dark glassmorphism dashboard and code explorer.' },
    { id: 'c2', label: 'FastAPI Gateway', type: 'backend', tech: 'Python 3.11, FastAPI, Pydantic', icon: Server, desc: 'Async REST API Gateway executing authentication, rate limiting, and request validation.' },
    { id: 'c3', label: 'RAG Vector Store', type: 'service', tech: 'Qdrant / SentenceTransformers', icon: Cpu, desc: 'High-density vector database indexing code chunks with semantic cosine similarity search.' },
    { id: 'c4', label: 'PostgreSQL DB', type: 'database', tech: 'PostgreSQL, SQLAlchemy, Alembic', icon: Database, desc: 'Relational data store persisting users, repositories, security scan history, and metrics.' },
    { id: 'c5', label: 'Redis Cache & Queue', type: 'cache', tech: 'Redis, Celery Workers', icon: RefreshCw, desc: 'In-memory caching layer for JWT tokens and async job queue orchestration.' },
    { id: 'c6', label: 'Google Gemini LLM', type: 'external', tech: 'Gemini 1.5 Pro API', icon: Cloud, desc: 'Generative AI inference engine powering streaming RAG chat and code remediation.' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Network className="h-6 w-6 text-cyan-400" /> Interactive System Topology & Architecture
          </h2>
          <p className="text-xs text-slate-400">Auto-detected layer components, communication channels, and external providers.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => downloadJSON(nodes, 'architecture_topology')}>
            <Download className="h-3.5 w-3.5 mr-1" /> Export Topology JSON
          </Button>
        </div>
      </div>

      {/* Interactive Topology Grid Canvas */}
      <div className="grid grid-[#0a0d14] lg:grid-cols-3 gap-4 p-6 glass-panel rounded-2xl border border-white/10 relative overflow-hidden">
        {nodes.map((node) => {
          const Icon = node.icon;
          const isSelected = selectedComponent === node.label;
          return (
            <div
              key={node.id}
              onClick={() => setSelectedComponent(node.label)}
              className={`p-5 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-400 shadow-xl shadow-cyan-500/20 scale-[1.02]'
                  : 'bg-white/5 border-white/10 hover:border-cyan-400/40 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="h-9 w-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Icon className="h-5 w-5" />
                </div>
                <Badge variant={node.type === 'external' ? 'purple' : node.type === 'database' ? 'emerald' : 'cyan'} className="text-[10px]">
                  {node.type}
                </Badge>
              </div>
              <h4 className="text-sm font-bold text-slate-100">{node.label}</h4>
              <p className="text-[11px] font-mono text-cyan-300 mt-1">{node.tech}</p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{node.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
