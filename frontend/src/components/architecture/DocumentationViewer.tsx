import React, { useState } from 'react';
import { FileText, Download, Copy, Check, Sparkles, BookOpen } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { useRepository } from '../../contexts/RepositoryContext';
import { downloadMarkdown } from '../../lib/exporter';

export const DocumentationViewer: React.FC = () => {
  const { activeRepository } = useRepository();
  const [activeTab, setActiveTab] = useState<'readme' | 'architecture' | 'deployment' | 'api'>('readme');
  const [copied, setCopied] = useState(false);

  const docContent = {
    readme: `# ${activeRepository?.name || 'DevPilot AI'}\n\n> Autonomous AI Software Engineering Assistant & RAG Code Intelligence Platform.\n\n## Table of Contents\n- [Architecture](#architecture)\n- [Installation & Quickstart](#installation--quickstart)\n- [API Endpoints](#api-endpoints)\n- [Environment Variables](#environment-variables)\n- [License](#license)\n\n## Overview\nDevPilot AI transforms codebases into RAG-grounded vector indices, enabling developers to perform natural language security audits, architecture visualizer generation, and interactive code generation using Google Gemini.`,
    architecture: `# Software Architecture Specification\n\n## 1. System Topology\n- **Client**: React 18 SPA with Tailwind CSS dark glassmorphism design system.\n- **API Layer**: Python 3.11 FastAPI with Pydantic schemas and OAuth2 JWT authentication.\n- **Vector Store**: Qdrant vector database indexing AST code chunks.\n- **AI Inference**: Google Gemini 1.5 Pro API with streaming output handlers.`,
    deployment: `# Enterprise Deployment Guide\n\n## Docker Compose Deployment\n\`\`\`bash\n# Step 1: Clone repository & setup env\ncp .env.example .env\n\n# Step 2: Build & launch multi-container stack\ndocker-compose up -d --build\n\`\`\`\n\n## Vercel Frontend Deployment\n\`\`\`bash\nvercel --prod\n\`\`\``,
    api: `# API Reference Specification\n\n### Authentication\n- \`POST /api/v1/auth/login\`: Authenticate & obtain JWT\n- \`POST /api/v1/auth/register\`: Create user account\n\n### AI RAG Chat\n- \`POST /api/v1/chat\`: Stream Gemini LLM response with grounded context chunks.`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(docContent[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-cyan-400" /> Automated Documentation Suite
          </h2>
          <p className="text-xs text-slate-400">AI-synthesized README.md, Architecture Specs, API reference, and Deployment guides.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
            {copied ? 'Copied Markdown' : 'Copy Content'}
          </Button>
          <Button variant="cyan" size="sm" onClick={() => downloadMarkdown(docContent[activeTab], `${activeRepository?.name}_${activeTab}`)}>
            <Download className="h-3.5 w-3.5 mr-1" /> Export .md File
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-white/10 gap-2">
        {(['readme', 'architecture', 'deployment', 'api'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === tab
                ? 'border-cyan-400 text-cyan-300 bg-white/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab === 'readme' ? 'README.md' : tab}
          </button>
        ))}
      </div>

      {/* Document Content View */}
      <GlassCard className="p-6">
        <pre className="whitespace-pre-wrap font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto bg-black/50 p-4 rounded-xl border border-white/10">
          {docContent[activeTab]}
        </pre>
      </GlassCard>
    </div>
  );
};
