import React from 'react';
import { Sparkles, CheckCircle, Code2, BarChart2 } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';

export const CodeQualityPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-cyan-400" /> Static Analysis & Code Quality Scorecard
        </h1>
        <p className="text-xs text-slate-400">Cyclomatic complexity, Maintainability Index, Cognitive load, and Halstead metrics.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard glow="cyan" className="p-5 text-center space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase">Overall Quality Score</p>
          <p className="text-4xl font-extrabold text-cyan-300">92 <span className="text-xs text-slate-500">/ 100</span></p>
        </GlassCard>
        <GlassCard glow="purple" className="p-5 text-center space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase">Maintainability Index</p>
          <p className="text-4xl font-extrabold text-purple-400">88.5</p>
        </GlassCard>
        <GlassCard className="p-5 text-center space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase">Cyclomatic Complexity</p>
          <p className="text-4xl font-extrabold text-emerald-400">4.2 <span className="text-xs text-slate-500">avg/func</span></p>
        </GlassCard>
        <GlassCard className="p-5 text-center space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase">Comment Ratio</p>
          <p className="text-4xl font-extrabold text-amber-400">18.4%</p>
        </GlassCard>
      </div>
    </div>
  );
};
