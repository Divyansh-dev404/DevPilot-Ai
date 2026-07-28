import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, ArrowLeft } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0d14] flex items-center justify-center p-6 text-center">
      <GlassCard glow="cyan" className="max-w-md w-full p-8 space-y-6">
        <div className="mx-auto h-16 w-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Bot className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-cyan-300">404</h1>
          <h2 className="text-lg font-bold text-slate-100">Vector Chunk Not Found</h2>
          <p className="text-xs text-slate-400">The requested route or file coordinate does not exist in the platform registry.</p>
        </div>
        <Button variant="cyan" onClick={() => navigate('/dashboard')} className="w-full gap-2">
          <ArrowLeft className="h-4 w-4" /> Beam Me Back to Dashboard
        </Button>
      </GlassCard>
    </div>
  );
};
