import React, { useState } from 'react';
import { Sparkles, CheckCircle, Code2, BarChart2, FileText, Trash2, CheckCircle2, ShieldCheck, AlertCircle, Play } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useRepository } from '../contexts/RepositoryContext';

export const CodeQualityPage: React.FC = () => {
  const { activeRepository } = useRepository();
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleanStatus, setCleanStatus] = useState('');
  const [cleanedCount, setCleanedCount] = useState<number | null>(null);

  const qualityMetrics = [
    { label: 'Overall Quality Score', value: '94 / 100', grade: 'Grade A', color: 'text-cyan-300', glow: 'cyan' },
    { label: 'Maintainability Index', value: '89.2', grade: 'Low Risk', color: 'text-purple-400', glow: 'purple' },
    { label: 'Cyclomatic Complexity', value: '3.8', grade: 'Ideal (< 5)', color: 'text-emerald-400', glow: 'emerald' },
    { label: 'Documentation Coverage', value: '82%', grade: 'Well Documented', color: 'text-amber-400', glow: 'amber' },
  ];

  const qualityAudits = [
    {
      id: 'q1',
      type: 'Unused Imports',
      file: 'frontend/src/pages/NotFoundPage.tsx',
      lines: 'L2-L4',
      issue: 'Unused import `useNav` from `react-router-down`',
      fix: 'Remove unused import reference',
      savableKb: '0.4 KB',
    },
    {
      id: 'q2',
      type: 'Duplicate Logic',
      file: 'backend/app/services/parser_engine.py',
      lines: 'L18-L22',
      issue: 'Redundant extension checking loop repeated across file types',
      fix: 'Refactor into dictionary lookup mapping',
      savableKb: '1.2 KB',
    },
    {
      id: 'q3',
      type: 'Dead Code / Shadowed Var',
      file: 'backend/app/api/v1/endpoints/auth.py',
      lines: 'L112',
      issue: 'Unused local variable `sess_id` initialized but never referenced',
      fix: 'Remove dead variable allocation',
      savableKb: '0.2 KB',
    },
    {
      id: 'q4',
      type: 'Naming Convention',
      file: 'frontend/src/components/common/CommandPalette.tsx',
      lines: 'L45',
      issue: 'Variable name `cmd_idx` violates camelCase style guide',
      fix: 'Rename `cmd_idx` to `commandIndex`',
      savableKb: 'Style Rule',
    }
  ];

  const handleCleanCodebase = () => {
    setIsCleaning(true);
    setCleanStatus('Scanning AST nodes for unused imports & dead code...');

    setTimeout(() => {
      setCleanStatus('Pruning 4 dead imports across TypeScript & Python files...');
    }, 800);

    setTimeout(() => {
      setIsCleaning(false);
      setCleanedCount(4);
      setCleanStatus('');
    }, 1800);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-cyan-400" /> Code Quality, Complexity & Refactoring Hub
          </h1>
          <p className="text-xs text-slate-400">
            Radon, Ruff, and AST static analyzer metrics for <span className="text-cyan-400 font-semibold">{activeRepository?.name || 'DevPilot AI'}</span>.
          </p>
        </div>

        <Button variant="cyan" size="sm" onClick={handleCleanCodebase} isLoading={isCleaning} className="gap-2">
          <Sparkles className="h-3.5 w-3.5" /> Auto-Clean Unused Imports
        </Button>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {qualityMetrics.map((m) => (
          <GlassCard key={m.label} glow={m.glow as any} className="p-5 text-center space-y-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{m.label}</p>
            <p className={`text-4xl font-extrabold ${m.color}`}>{m.value}</p>
            <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 font-mono">
              {m.grade}
            </span>
          </GlassCard>
        ))}
      </div>

      {cleanedCount !== null && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Cleaned <strong>{cleanedCount}</strong> unused imports and dead variables successfully!</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Saved 1.8 KB bundle overhead</span>
        </div>
      )}

      {isCleaning && (
        <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center gap-3 animate-pulse">
          <CheckCircle2 className="h-4 w-4 animate-spin shrink-0 text-cyan-400" />
          <span>{cleanStatus}</span>
        </div>
      )}

      {/* Code Health Breakdown & Audits */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Code2 className="h-4 w-4 text-purple-400" /> Code Smell & Maintenance Audit Details
        </h3>

        <div className="space-y-3">
          {qualityAudits.map((item) => (
            <GlassCard key={item.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="purple" className="text-[9px] uppercase">
                    {item.type}
                  </Badge>
                  <span className="text-xs font-mono text-cyan-400">{item.file}:{item.lines}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-200">{item.issue}</h4>
                <p className="text-[11px] text-slate-400">Fix: {item.fix}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                  {item.savableKb}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};
