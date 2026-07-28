import React, { useState } from 'react';
import { TestTube, Copy, Check, Download, Sparkles } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';

export const TestsPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const testCode = `import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_login_success():
    payload = {"email": "user@devpilot.ai", "password": "SecretPassword123!"}
    response = client.post("/api/v1/auth/login", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_chat_unauthorized():
    response = client.post("/api/v1/chat", json={"message": "hello"})
    assert response.status_code == 401
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(testCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            <TestTube className="h-6 w-6 text-purple-400" /> Automated Pytest Suite Generator
          </h1>
          <p className="text-xs text-slate-400">Synthesizes API integration tests, unit edge cases, and database mock fixtures.</p>
        </div>
        <Button variant="cyan" size="sm" onClick={handleCopy}>
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
          {copied ? 'Copied' : 'Copy Test Suite'}
        </Button>
      </div>

      <GlassCard className="p-6">
        <pre className="whitespace-pre-wrap font-mono text-xs text-purple-200 overflow-x-auto bg-black/60 p-4 rounded-xl border border-white/10">
          {testCode}
        </pre>
      </GlassCard>
    </div>
  );
};
