import React from 'react';
import { CreditCard, Check, Zap, Sparkles } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';

export const BillingPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-cyan-400" /> Subscription & Plan Tiers
        </h1>
        <p className="text-xs text-slate-400">Manage SaaS plan, usage quotas, and billing invoices.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-200">Developer Starter</h3>
          <p className="text-3xl font-extrabold text-slate-100">$0 <span className="text-xs text-slate-500">/ mo</span></p>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> 3 Repositories</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Basic RAG Chat</li>
          </ul>
          <Button variant="outline" className="w-full">Current Plan</Button>
        </GlassCard>

        <GlassCard glow="cyan" className="p-6 space-y-4 border-cyan-400 relative">
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-cyan-500 text-black font-bold text-[10px]">
            POPULAR
          </div>
          <h3 className="text-base font-bold text-slate-100">Pro Engineering</h3>
          <p className="text-3xl font-extrabold text-cyan-300">$29 <span className="text-xs text-slate-400">/ mo</span></p>
          <ul className="space-y-2 text-xs text-slate-200">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Unlimited Repositories</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Full Gemini RAG Stream</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Security & OWASP Audit</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Architecture Topology</li>
          </ul>
          <Button variant="cyan" className="w-full">Upgrade to Pro</Button>
        </GlassCard>

        <GlassCard glow="purple" className="p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-100">Enterprise AI</h3>
          <p className="text-3xl font-extrabold text-purple-400">$99 <span className="text-xs text-slate-400">/ mo</span></p>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> Custom Dedicated Vector DB</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> Private On-Prem LLM Option</li>
          </ul>
          <Button variant="purple" className="w-full">Contact Enterprise</Button>
        </GlassCard>
      </div>
    </div>
  );
};
