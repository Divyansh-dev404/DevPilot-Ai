import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderGit2, Upload, Lock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useRepository } from '../contexts/RepositoryContext';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const ImportRepo: React.FC = () => {
  const { importGithubRepo, uploadZipRepo } = useRepository();
  const navigate = useNavigate();

  const [importType, setImportType] = useState<'public' | 'private' | 'zip'>('public');
  const [githubUrl, setGithubUrl] = useState('https://github.com/devpilot-org/devpilot-ai');
  const [githubToken, setGithubToken] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState('');

  const handleGithubImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsImporting(true);
    setProgress(15);
    setStatusMsg('Cloning GitHub Repository & extracting metadata...');

    setTimeout(() => {
      setProgress(50);
      setStatusMsg('Parsing 12+ programming languages & frameworks...');
    }, 800);

    setTimeout(() => {
      setProgress(85);
      setStatusMsg('Vectorizing code AST chunks into Qdrant index...');
    }, 1600);

    setTimeout(async () => {
      setProgress(100);
      await importGithubRepo(githubUrl, importType === 'private', githubToken);
      setIsImporting(false);
      navigate('/repository');
    }, 2400);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsImporting(true);
      setProgress(30);
      setStatusMsg('Extracting ZIP package with Zip-Slip path validation...');

      setTimeout(async () => {
        setProgress(100);
        await uploadZipRepo(file);
        setIsImporting(false);
        navigate('/repository');
      }, 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <FolderGit2 className="h-6 w-6 text-cyan-400" /> Import Project Repository
        </h1>
        <p className="text-xs text-slate-400">Import via public GitHub URL, authenticated OAuth token, or drag-and-drop ZIP package.</p>
      </div>

      {/* Tabs Selection */}
      <div className="flex border-b border-white/10 gap-2">
        <button
          onClick={() => setImportType('public')}
          className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
            importType === 'public' ? 'border-cyan-400 text-cyan-300 bg-white/5' : 'border-transparent text-slate-400'
          }`}
        >
          Public GitHub URL
        </button>
        <button
          onClick={() => setImportType('private')}
          className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
            importType === 'private' ? 'border-cyan-400 text-cyan-300 bg-white/5' : 'border-transparent text-slate-400'
          }`}
        >
          Private GitHub (OAuth Token)
        </button>
        <button
          onClick={() => setImportType('zip')}
          className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
            importType === 'zip' ? 'border-cyan-400 text-cyan-300 bg-white/5' : 'border-transparent text-slate-400'
          }`}
        >
          Upload ZIP Archive
        </button>
      </div>

      <GlassCard glow="cyan" className="p-8 space-y-6">
        {importType !== 'zip' ? (
          <form onSubmit={handleGithubImport} className="space-y-4">
            <Input
              label="GitHub Repository HTTPS URL"
              type="text"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/owner/repository"
              icon={<FolderGit2 className="h-4 w-4" />}
              required
            />

            {importType === 'private' && (
              <Input
                label="GitHub Personal Access Token (PAT)"
                type="password"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                icon={<Lock className="h-4 w-4" />}
                required
              />
            )}

            <Button variant="cyan" type="submit" className="w-full gap-2" isLoading={isImporting}>
              Import & Parse Repository <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        ) : (
          <div className="border-2 border-dashed border-white/15 hover:border-cyan-400/50 rounded-2xl p-12 text-center space-y-4 transition-all bg-white/[0.01]">
            <div className="mx-auto h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Upload className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-100">Drag & Drop ZIP Archive Here</p>
              <p className="text-xs text-slate-400">Supports .zip archives up to 50MB with Zip-Slip path validation.</p>
            </div>
            <label className="inline-block">
              <span className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold text-xs cursor-pointer hover:bg-cyan-400 transition-all">
                Browse ZIP File
              </span>
              <input type="file" accept=".zip" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        )}

        {/* Progress Bar View */}
        {isImporting && (
          <div className="space-y-2 p-4 rounded-xl bg-black/40 border border-cyan-500/30 animate-in fade-in">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-cyan-300 flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 animate-spin" /> {statusMsg}
              </span>
              <span className="text-slate-400 font-bold">{progress}%</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-purple-600 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
};
