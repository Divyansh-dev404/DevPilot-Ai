import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught Error Boundary Exception:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0d14] flex items-center justify-center p-6 text-center">
          <GlassCard glow="purple" className="max-w-md w-full p-8 space-y-6">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <ShieldAlert className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-100">System Anomaly Detected</h2>
              <p className="text-xs text-slate-400 font-mono bg-black/40 p-3 rounded-lg border border-white/10 text-left overflow-x-auto">
                {this.state.error?.message || 'Unexpected application runtime state.'}
              </p>
            </div>
            <Button
              variant="cyan"
              className="w-full gap-2"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
            >
              <RefreshCw className="h-4 w-4" /> Reset Application State
            </Button>
          </GlassCard>
        </div>
      );
    }

    return this.props.children;
  }
}
