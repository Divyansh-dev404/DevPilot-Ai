import React, { useState } from 'react';
import { ShieldAlert, Download, Filter, Search } from 'lucide-react';
import { SecurityIssueCard } from '../components/analysis/SecurityIssueCard';
import { SecurityIssue } from '../types';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { downloadJSON, downloadCSV } from '../lib/exporter';

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
];

export const SecurityAnalysisPage: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  const filteredIssues = mockSecurityIssues.filter(
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
          <p className="text-xs text-slate-400">Static rule engine (Bandit, Semgrep, OWASP) combined with Gemini AI reasoning.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => downloadJSON(mockSecurityIssues, 'security_report')}>
            <Download className="h-3.5 w-3.5 mr-1" /> Export JSON
          </Button>
          <Button variant="outline" size="sm" onClick={() => downloadCSV(mockSecurityIssues, 'security_issues')}>
            <Download className="h-3.5 w-3.5 mr-1" /> Export CSV
          </Button>
        </div>
      </div>

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
        {filteredIssues.map((issue) => (
          <SecurityIssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
};
