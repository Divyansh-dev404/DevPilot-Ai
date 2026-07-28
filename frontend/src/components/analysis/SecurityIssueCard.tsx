import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Info,
  CheckCircle,
  FileCode,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SecurityIssue } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';

export const SecurityIssueCard: React.FC<{ issue: SecurityIssue }> = ({ issue }) => {
  const [expanded, setExpanded] = useState(false);

  const severityColors = {
    critical: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', badge: 'rose' as const },
    high: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', badge: 'amber' as const },
    medium: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', badge: 'purple' as const },
    low: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', badge: 'cyan' as const },
  };

  const style = severityColors[issue.severity];

  return (
    <GlassCard hoverEffect={false} className={`border ${style.border} ${style.bg} p-5 space-y-4`}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant={style.badge} className="uppercase text-[10px]">
              {issue.severity}
            </Badge>
            <span className="text-[11px] font-mono text-slate-400">{issue.category}</span>
          </div>
          <h4 className="text-sm font-bold text-slate-100">{issue.title}</h4>
          <p className="text-xs text-slate-300 leading-relaxed">{issue.description}</p>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all shrink-0"
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-white/10">
        <div className="flex items-center gap-1.5">
          <FileCode className="h-3.5 w-3.5 text-cyan-400" />
          <span>{issue.file}:{issue.line}</span>
        </div>
        <div>
          <span>AI Confidence: </span>
          <span className="text-emerald-400 font-bold">{(issue.confidenceScore * 100).toFixed(0)}%</span>
        </div>
      </div>

      {expanded && (
        <div className="pt-3 border-t border-white/10 space-y-4 animate-in fade-in">
          {/* Why Dangerous */}
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs">
            <p className="font-bold text-rose-300 mb-1">Risk Impact & Threat Vector</p>
            <p className="text-slate-300">{issue.dangerExplanation}</p>
          </div>

          {/* Example Attack */}
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Example Attack Vector</p>
            <pre className="p-3 rounded-lg bg-black/60 border border-white/10 text-[11px] text-amber-300 font-mono overflow-x-auto">
              {issue.exampleAttack}
            </pre>
          </div>

          {/* Step by Step Fix */}
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" /> Recommended Remediation Code
            </p>
            <pre className="p-3 rounded-lg bg-black/60 border border-emerald-500/30 text-[11px] text-emerald-200 font-mono overflow-x-auto">
              {issue.exampleFixedCode}
            </pre>
          </div>

          {/* AI Recommendation */}
          <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200 flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-0.5">AI Security Advisor Note</p>
              <p className="text-slate-300">{issue.aiRecommendation}</p>
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
};
