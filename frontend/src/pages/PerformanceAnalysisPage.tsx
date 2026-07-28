import React, { useState } from 'react';
import { Zap, Clock, Database, Layers, ArrowUpRight, Play, CheckCircle2, Server, Cpu, Sparkles, Code2, ArrowRight } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useRepository } from '../contexts/RepositoryContext';

export const PerformanceAnalysisPage: React.FC = () => {
  const { activeRepository } = useRepository();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState('');
  const [appliedPatches, setAppliedPatches] = useState<string[]>([]);

  const perfIssues = [
    {
      id: 'perf_01',
      title: 'N+1 Database Query Loop Detected',
      type: 'database',
      impact: 'high',
      file: 'backend/app/services/user_service.py:58',
      latencyImpact: '450ms Latency Overhead',
      estimatedGain: '72% Throughput Boost',
      description: 'Iterating over user records and firing sequential SELECT queries for repositories instead of using ORM joinedload.',
      beforeCode: 'users = db.query(User).all()\nfor u in users:\n    repos = db.query(Repo).filter(Repo.user_id == u.id).all()',
      afterCode: 'users = db.query(User).options(joinedload(User.repositories)).all()',
      rec: 'Use SQLAlchemy options(joinedload(User.repositories)) to batch query execution into single SQL JOIN statement.',
    },
    {
      id: 'perf_02',
      title: 'Synchronous Blocking I/O in FastAPI Route Handler',
      type: 'async',
      impact: 'medium',
      file: 'backend/app/api/v1/endpoints/repositories.py:24',
      latencyImpact: '180ms Worker Lock',
      estimatedGain: '40% Concurrency Boost',
      description: 'Synchronous `def` function performing blocking network disk operations inside main event loop handler.',
      beforeCode: 'def get_repo_data(url: str):\n    data = requests.get(url).json()  # Blocks event loop thread\n    return data',
      afterCode: 'async def get_repo_data(url: str):\n    async with httpx.AsyncClient() as client:\n        res = await client.get(url)\n        return res.json()',
      rec: 'Refactor route handler to `async def` and utilize non-blocking `httpx.AsyncClient()`.',
    },
    {
      id: 'perf_03',
      title: 'Missing Redis Caching Layer for Frequent API Endpoints',
      type: 'cache',
      impact: 'medium',
      file: 'backend/app/api/v1/endpoints/chat.py:12',
      latencyImpact: '320ms DB Load',
      estimatedGain: '90% Cache Hit Response',
      description: 'Heavy RAG context retrieval recalculated on every repetitive query without cached TTL fallback.',
      beforeCode: 'result = RAGEngine(repo_id).generate_response(query)',
      afterCode: 'cache_key = f"rag:{repo_id}:{hash(query)}"\ncached = redis_client.get(cache_key)\nif cached:\n    return json.loads(cached)\nresult = RAGEngine(repo_id).generate_response(query)\nredis_client.setex(cache_key, 300, json.dumps(result))',
      rec: 'Inject 5-minute Redis key caching for idempotent vector retrieval queries.',
    },
    {
      id: 'perf_04',
      title: 'Missing Database Index on `user_id` Foreign Key',
      type: 'index',
      impact: 'medium',
      file: 'backend/app/models/repositories.py:18',
      latencyImpact: '210ms Full Table Scan',
      estimatedGain: '85% Query Index Speedup',
      description: 'Sequential table scans executed when fetching repositories belonging to a target user.',
      beforeCode: 'class Repository(Base):\n    user_id = Column(UUID, ForeignKey("users.id"))',
      afterCode: 'class Repository(Base):\n    user_id = Column(UUID, ForeignKey("users.id"), index=True)',
      rec: 'Add `index=True` B-Tree index on foreign key column `user_id`.',
    }
  ];

  const handleRunAudit = () => {
    setIsAnalyzing(true);
    setAnalysisStatus('Profiling AST execution graphs & memory allocations...');

    setTimeout(() => {
      setAnalysisStatus('Detecting N+1 database queries & missing async await markers...');
    }, 800);

    setTimeout(() => {
      setAnalysisStatus('Simulating Redis caching hit rates & latency gains...');
    }, 1600);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisStatus('');
    }, 2400);
  };

  const handleApplyPatch = (id: string) => {
    if (!appliedPatches.includes(id)) {
      setAppliedPatches([...appliedPatches, id]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            <Zap className="h-6 w-6 text-amber-400" /> Performance & Bottleneck Optimizer
          </h1>
          <p className="text-xs text-slate-400">
            Detects N+1 query patterns, async blocking calls, missing Redis caches, and database indexes for <span className="text-cyan-400 font-semibold">{activeRepository?.name || 'DevPilot AI'}</span>.
          </p>
        </div>

        <Button variant="cyan" size="sm" onClick={handleRunAudit} isLoading={isAnalyzing} className="gap-2">
          <Play className="h-3.5 w-3.5" /> Run AI Performance Audit
        </Button>
      </div>

      {/* Performance Metric Score Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard glow="cyan" className="p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Performance Index</span>
            <Cpu className="h-4 w-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-extrabold text-cyan-300">92/100</p>
          <p className="text-[10px] text-slate-500">Optimized Backend</p>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Latency Bottlenecks</span>
            <Clock className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-amber-400">4 Items</p>
          <p className="text-[10px] text-slate-500">1.16s total latency save</p>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>N+1 DB Queries</span>
            <Database className="h-4 w-4 text-rose-400" />
          </div>
          <p className="text-2xl font-extrabold text-rose-400">1 Query</p>
          <p className="text-[10px] text-slate-500">JOIN optimization ready</p>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Caching Potential</span>
            <Server className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-400">+90% Hit Rate</p>
          <p className="text-[10px] text-slate-500">Redis layer suggestion</p>
        </GlassCard>
      </div>

      {isAnalyzing && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300 flex items-center gap-3 animate-pulse">
          <CheckCircle2 className="h-4 w-4 animate-spin shrink-0 text-amber-400" />
          <span>{analysisStatus}</span>
        </div>
      )}

      {/* Issues List with Code Refactor Preview */}
      <div className="space-y-6">
        {perfIssues.map((p) => {
          const isPatched = appliedPatches.includes(p.id);
          return (
            <GlassCard key={p.id} className="space-y-4 p-6 border border-white/10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={p.impact === 'high' ? 'rose' : 'amber'} className="uppercase text-[10px]">
                      {p.impact} Impact
                    </Badge>
                    <span className="text-[11px] font-mono text-cyan-400">{p.latencyImpact}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-100">{p.title}</h3>
                  <p className="text-xs text-slate-400 font-mono">{p.file}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                    {p.estimatedGain}
                  </span>
                  <Button
                    variant={isPatched ? 'outline' : 'cyan'}
                    size="sm"
                    onClick={() => handleApplyPatch(p.id)}
                    disabled={isPatched}
                    className="gap-1.5 text-xs"
                  >
                    {isPatched ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Applied
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3.5 w-3.5" /> Quick AI Refactor
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{p.description}</p>

              {/* Before vs After Refactored Code Block */}
              <div className="grid md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-rose-400 font-bold flex items-center gap-1">
                    <Code2 className="h-3 w-3" /> Current Implementation (Bottleneck)
                  </span>
                  <pre className="p-3.5 rounded-xl bg-black/70 border border-rose-500/20 text-[11px] text-slate-300 font-mono overflow-x-auto">
                    {p.beforeCode}
                  </pre>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> AI Optimized Refactor
                  </span>
                  <pre className="p-3.5 rounded-xl bg-black/70 border border-emerald-500/30 text-[11px] text-emerald-200 font-mono overflow-x-auto">
                    {p.afterCode}
                  </pre>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200 flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Architectural Recommendation: </span>
                  <span className="text-slate-300">{p.rec}</span>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
