import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bot,
  Sparkles,
  ShieldCheck,
  Zap,
  Code2,
  FolderGit2,
  ArrowRight,
  Terminal,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 selection:bg-cyan-500/30">
      {/* Navbar */}
      <header className="px-6 lg:px-12 h-20 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0a0d14]/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Bot className="h-6 w-6 text-black" />
          </div>
          <div>
            <span className="font-bold text-xl text-gradient-cyan tracking-wider">DevPilot</span>
            <span className="text-sm font-semibold text-purple-400 ml-1">AI</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
          <a href="#features" className="hover:text-cyan-400 transition-all">Features</a>
          <a href="#architecture" className="hover:text-cyan-400 transition-all">Architecture</a>
          <a href="#pricing" className="hover:text-cyan-400 transition-all">Pricing</a>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
            Sign In
          </Button>
          <Button variant="cyan" size="sm" onClick={() => navigate('/dashboard')}>
            Launch App <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6 lg:px-12 max-w-6xl mx-auto text-center space-y-8 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5" /> Autonomous AI Software Engineering Assistant
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-slate-100 max-w-4xl mx-auto">
          Understand, Audit, & Refactor Repositories with <span className="text-gradient-cyan">Gemini RAG Intelligence</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Import any public or private GitHub URL or ZIP package. DevPilot AI vectorizes your codebase, performs static security audits, generates interactive architecture diagrams, and provides grounded streaming RAG chat.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button variant="cyan" size="lg" onClick={() => navigate('/dashboard')} className="gap-2">
            Start Free Trial <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/import')} className="gap-2">
            <FolderGit2 className="h-4 w-4 text-cyan-400" /> Import Repository
          </Button>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="py-16 px-6 lg:px-12 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-100">Enterprise AI Engineering Suite</h2>
          <p className="text-xs text-slate-400">Everything you need to analyze, document, and secure production codebases.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <GlassCard glow="cyan" className="space-y-4">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Bot className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Grounded Gemini RAG Chat</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Ask questions directly against your repository AST vector index with zero hallucinations and line-range context references.</p>
          </GlassCard>

          <GlassCard glow="purple" className="space-y-4">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Security & OWASP Auditor</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Scans hardcoded secrets, SQL injection, XSS, CSRF, and dependency CVEs with static analysis rules and AI remediation code.</p>
          </GlassCard>

          <GlassCard className="space-y-4">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Architecture & ER Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Auto-generates interactive component topology, code dependency graphs, ER database schemas, and Swagger API explorer.</p>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10 text-center text-xs text-slate-500">
        <p>© 2026 DevPilot AI Inc. Production-Ready Software Engineering Platform.</p>
      </footer>
    </div>
  );
};
