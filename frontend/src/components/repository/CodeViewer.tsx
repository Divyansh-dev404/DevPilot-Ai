import React, { useState } from 'react';
import { Copy, Check, FileCode, AlertTriangle } from 'lucide-react';
import { FileNode } from '../../types';

export const CodeViewer: React.FC<{ file: FileNode | null; content: string }> = ({
  file,
  content,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!file) {
    return (
      <div className="glass-panel rounded-xl p-12 text-center h-full flex flex-col items-center justify-center space-y-3">
        <FileCode className="h-10 w-10 text-slate-600" />
        <p className="text-sm font-medium text-slate-400">Select a file from the explorer to preview code.</p>
      </div>
    );
  }

  const isLargeFile = file.size && file.size > 100000;
  const lines = content.split('\n');

  return (
    <div className="glass-panel rounded-xl flex flex-col h-full overflow-hidden">
      {/* Header & Breadcrumb */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <FileCode className="h-4 w-4 text-cyan-400" />
          <span>{file.path}</span>
          {file.size && <span className="text-[10px] text-slate-500">({(file.size / 1024).toFixed(1)} KB)</span>}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white hover:border-cyan-400/40 transition-all"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Large file warning banner */}
      {isLargeFile && (
        <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>Large File Warning: Content exceeds 100KB. Displaying optimized preview.</span>
        </div>
      )}

      {/* Code Editor Preview */}
      <div className="flex-1 overflow-auto p-4 bg-[#0a0d14]/80 text-xs font-mono">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/[0.03]">
                <td className="w-10 text-right pr-4 text-slate-600 select-none border-r border-white/5 font-mono text-[11px]">
                  {idx + 1}
                </td>
                <td className="pl-4 whitespace-pre text-slate-200">{line}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
