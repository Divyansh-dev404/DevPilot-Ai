import React, { useState } from 'react';
import { Send, Bot, StopCircle, RefreshCw, Copy, Check, Sparkles } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../types';
import { GlassCard } from '../ui/GlassCard';

export const ChatMessage: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in`}>
      {!isUser && (
        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-black shrink-0 shadow-lg shadow-cyan-500/20">
          <Bot className="h-5 w-5" />
        </div>
      )}

      <div className={`max-w-3xl space-y-2 ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
            isUser
              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-slate-100 rounded-tr-none'
              : 'glass-panel text-slate-200 border-white/10 rounded-tl-none'
          }`}
        >
          <div className="whitespace-pre-wrap font-sans">{message.content}</div>

          {/* Render Context Sources RAG snippets if present */}
          {message.contextChunks && message.contextChunks.length > 0 && (
            <div className="mt-3 pt-3 border-t border-white/10 space-y-1.5">
              <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Retrieved Context Chunks (RAG)
              </p>
              <div className="flex flex-wrap gap-1.5">
                {message.contextChunks.map((chunk, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 font-mono">
                    {chunk.file}:{chunk.lineRange}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {!isUser && (
          <div className="flex items-center gap-2 pl-1">
            <button
              onClick={handleCopy}
              className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
