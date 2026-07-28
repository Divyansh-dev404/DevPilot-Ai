import React, { useState } from 'react';
import { ShieldAlert, Download, Filter, Search, Play, CheckCircle2, ShieldCheck, Bug, Key, Lock, AlertTriangle } from 'lucide-react';
import { SecurityIssueCard } from '../components/analysis/SecurityIssueCard';
import { SecurityIssue } from '../types';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { downloadJSON, downloadCSV } from '../lib/exporter';
import { useRepository } from '../contexts/RepositoryContext';

const mockSecurityIssues: SecurityIssue[] = [
  {
    id: 'sec_01',
    title: 'Hardcoded Secret / JWT Token Signature Insource',
    description: 'A plain-text secret key was detected inside core configuration module.',
    severity: 'high',
    category: 'Secrets & Cryptography',
    file: 'backend/app/core/config.py',
    line: 14,
    dangerExplanation: 'Hardcoded secrets allow adversaries to forge JWT signatures and gain full admin impersonation privileges.',
    riskLevel: 'CVSS 8.5 (High)',
    exampleAttack: 'curl -H "Authorization: Bearer <Forged_Admin_JWT>" https://api.example.com/admin/delete_all',
    howToFix: 'Move secret key into environment variable and retrieve via os.getenv("JWT_SECRET_KEY").',
    exampleFixedCode: 'SECRET_KEY = os.getenv("JWT_SECRET_KEY", "fallback_production_secret")',
    aiRecommendation: 'Store secrets in environment variables or AWS Secrets Manager / Vault.',
    confidenceScore: 0.98,
  },
  {
    id: 'sec_02',
    title: 'Potential SQL Injection in Dynamic Query Formulation',
    description: 'Raw string formatting used inside SQLAlchemy query builder.',
    severity: 'medium',
    category: 'OWASP A03: Injection',
    file: 'backend/app/services/user_service.py',
    line: 42,
    dangerExplanation: 'Unsanitized user inputs concatenated into raw SQL strings enable database extraction or table drops.',
    riskLevel: 'CVSS 6.8 (Medium)',
    exampleAttack: "email = \"user' OR '1'='1\"",
    howToFix: 'Use ORM parameterized query filters instead of string interpolation.',
    exampleFixedCode: 'db.query(User).filter(User.email == input_email).first()',
    aiRecommendation: 'Refactor raw queries to use SQLAlchemy parameterized filters.',
    confidenceScore: 0.92,
  },
  {
    id: 'sec_03',
    title: 'Permissive CORS Middleware Header (allow_origins=["*"])',
    description: 'CORS policy enables arbitrary cross-origin requests without credentials origin restriction.',
    severity: 'medium',
    category: 'OWASP A05: Security Misconfiguration',
    file: 'backend/app/main.py',
    line: 14,
    dangerExplanation: 'Allows malicious third-party websites to issue cross-domain API calls on behalf of authenticated clients.',
    riskLevel: 'CVSS 5.3 (Medium)',
    exampleAttack: 'fetch("https://api.devpilot.ai/api/v1/auth/me", { credentials: "include" })',
    howToFix: 'Specify strict whitelist domain origins in production.',
    exampleFixedCode: 'allow_origins=["https://app.devpilot.ai", "http://localhost:5173"]',
    aiRecommendation: 'Inject allowed origins via environment variable array.',
    confidenceScore: 0.99,
  },
  {
    id: 'sec_04',
    title: 'Outdated Dependency Vulnerability (PyJWT < 2.8.0)',
    description: 'CVE-2024-24576 detected in PyJWT library allowing key confusion vulnerability.',
    severity: 'low',
    category: 'Snyk / CVE Dependencies',
    file: 'backend/requirements.txt',
    line: 8,
    dangerExplanation: 'Vulnerable token decoder could accept algorithm confusion payloads.',
    riskLevel: 'CVSS 4.2 (Low)',
    exampleAttack: 'PyJWT header algorithm substitution: {"alg": "none"}',
    howToFix: 'Upgrade PyJWT to latest version 2.8.0+ in requirements.txt',
    exampleFixedCode: 'PyJWT>=2.8.0',
    aiRecommendation: 'Run automated pip audit or Dependabot alert resolution.',
    confidenceScore: 0.95,
  }
];

export const SecurityAnalysisPage: React.FC = () => {
  const { activeRepository } = useRepository();
  const [filter, setFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState('');
  const [issuesList, setIssuesList] = useState<SecurityIssue[]>(mockSecurityIssues);

  const handleRunSecurityScan = () => {
    setIsScanning(true);
    setScanMessage('Running Bandit & Semgrep static analysis rules...');

    setTimeout(() => {
      setScanMessage('Evaluating secret patterns (AWS, JWT, Stripe keys)...');
    }, 800);

    setTimeout(() => {
      setScanMessage('Cross-referencing OWASP Top 10 vulnerabilities via Gemini AI...');
    }, 1600);

    setTimeout(() => {
      setIsScanning(false);
      setScanMessage('');
    }, 2400);
  };

  const filteredIssues = issuesList.filter(
    (issue) =>
      (severityFilter === 'all' || issue.severity === severityFilter) &&
      (issue.title.toLowerCase().includes(filter.toLowerCase()) || issue.file.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-rose-400" /> Security Vulnerability & OWASP Audit
          </h1>
          <p className="text-xs text-slate-400">
            Static security rule engine (Bandit, Semgrep, OWASP) for <span className="text-cyan-400 font-semibold">{activeRepository?.name || 'DevPilot AI'}</span>.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="cyan" size="sm" onClick={handleRunSecurityScan} isLoading={isScanning} className="gap-2">
            <Play className="h-3.5 w-3.5" /> Run AI Security Scan
          </Button>
          <Button variant="outline" size="sm" onClick={() => downloadJSON(issuesList, 'security_report')}>
            <Download className="h-3.5 w-3.5 mr-1" /> Export JSON
          </Button>
          <Button variant="outline" size="sm" onClick={() => downloadCSV(issuesList, 'security_issues')}>
            <Download className="h-3.5 w-3.5 mr-1" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Security Metrics Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard glow="cyan" className="p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Security Health</span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-400">88/100</p>
          <p className="text-[10px] text-slate-500">Grade B+ Security Index</p>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Critical & High</span>
            <AlertTriangle className="h-4 w-4 text-rose-400" />
          </div>
          <p className="text-2xl font-extrabold text-rose-400">1</p>
          <p className="text-[10px] text-slate-500">Immediate fix required</p>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Secrets & Keys</span>
            <Key className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-amber-400">1</p>
          <p className="text-[10px] text-slate-500">Plain-text credential scan</p>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>OWASP Risks</span>
            <Bug className="h-4 w-4 text-purple-400" />
          </div>
          <p className="text-2xl font-extrabold text-purple-400">2</p>
          <p className="text-[10px] text-slate-500">SQLi & Misconfigurations</p>
        </GlassCard>
      </div>

      {isScanning && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-300 flex items-center gap-3 animate-pulse">
          <CheckCircle2 className="h-4 w-4 animate-spin shrink-0 text-rose-400" />
          <span>{scanMessage}</span>
        </div>
      )}

      {/* Filter Bar */}
      <GlassCard className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search vulnerabilities or files..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-[#121723] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          {['all', 'critical', 'high', 'medium', 'low'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all ${
                severityFilter === sev ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Issue Cards */}
      <div className="space-y-4">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <SecurityIssueCard key={issue.id} issue={issue} />
          ))
        ) : (
          <GlassCard className="p-12 text-center text-xs text-slate-400">
            No vulnerabilities found matching search parameters. Your codebase is secure!
          </GlassCard>
        )}
      </div>
    </div>
  );
};
