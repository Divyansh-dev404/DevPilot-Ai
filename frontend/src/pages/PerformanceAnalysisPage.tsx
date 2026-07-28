import React from 'react';
import { Zap, Clock, Database, Layers, ArrowUpRight } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';

export const PerformanceAnalysisPage: React.FC = () => {
  const perfIssues = [
    { id: '1', title: 'N+1 Database Query Pattern Detected', type: 'database', impact: 'high', file: 'backend/app/services/user_service.py:58', rec: 'Use joinedload(User.repositories) to batch query execution.', gain: '~65% speedup' },
    { id: '2', title: 'Missing Async Handling in FastAPI Route Handler', type: 'async', impact: 'medium', file: 'backend/app/api/v1/endpoints/repositories.py:24', rec: 'Change def endpoint to async def to prevent main looper thread blocking.', gain: '~40% throughput increase' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <Zap className="h-6 w-6 text-amber-400" /> Performance & Bottleneck Audit
        </h1>
        <p className="text-xs text-slate-400">Detects N+1 queries, async blocking calls, unindexed DB queries, and heavy loops.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {perfIssues.map((p) => (
          <GlassCard key={p.id} className="space-y-3 p-5">
            <div className="flex items-center justify-between">
              <Badge variant={p.impact === 'high' ? 'rose' : 'amber'} className="uppercase text-[10px]">
                {p.impact} Impact
              </Badge>
              <span className="text-xs font-mono text-emerald-400 font-bold">{p.gain}</span>
            </div>
            <h3 className="text-sm font-bold text-slate-100">{p.title}</h3>
            <p className="text-xs text-slate-400 font-mono">{p.file}</p>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
              <span className="font-bold text-cyan-300">AI Optimization Note: </span>
              {p.rec}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
