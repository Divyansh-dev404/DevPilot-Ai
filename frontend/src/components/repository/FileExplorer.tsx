import React, { useState } from 'react';
import {
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  FileJson,
  ChevronRight,
  ChevronDown,
  Search,
} from 'lucide-react';
import { FileNode } from '../../types';
import { cn } from '../../lib/utils';

export const FileExplorerNode: React.FC<{
  node: FileNode;
  selectedPath: string;
  onSelect: (node: FileNode) => void;
}> = ({ node, selectedPath, onSelect }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = node.type === 'folder';
  const isSelected = node.path === selectedPath;

  const getFileIcon = (name: string) => {
    if (name.endsWith('.json') || name.endsWith('.yaml') || name.endsWith('.yml')) return FileJson;
    if (name.endsWith('.md')) return FileText;
    return FileCode;
  };

  const Icon = isFolder ? (isOpen ? FolderOpen : Folder) : getFileIcon(node.name);

  return (
    <div>
      <div
        onClick={() => {
          if (isFolder) setIsOpen(!isOpen);
          else onSelect(node);
        }}
        className={cn(
          'flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-mono cursor-pointer transition-all',
          isSelected
            ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
            : 'text-slate-300 hover:bg-white/5 hover:text-white'
        )}
      >
        {isFolder ? (
          isOpen ? <ChevronDown className="h-3.5 w-3.5 text-slate-400" /> : <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        ) : (
          <span className="w-3.5" />
        )}
        <Icon className={cn('h-4 w-4 shrink-0', isFolder ? 'text-cyan-400' : 'text-purple-400')} />
        <span className="truncate">{node.name}</span>
      </div>

      {isFolder && isOpen && node.children && (
        <div className="pl-4 space-y-0.5 mt-0.5 border-l border-white/10 ml-3">
          {node.children.map((child) => (
            <FileExplorerNode
              key={child.id}
              node={child}
              selectedPath={selectedPath}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileExplorer: React.FC<{
  fileTree: FileNode[];
  selectedNode: FileNode | null;
  onSelectNode: (node: FileNode) => void;
}> = ({ fileTree, selectedNode, onSelectNode }) => {
  const [filter, setFilter] = useState('');

  return (
    <div className="glass-panel rounded-xl p-4 space-y-3 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Explorer</h3>
        <span className="text-[10px] text-slate-500">VS Code Tree</span>
      </div>

      {/* File Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-500" />
        <input
          type="text"
          placeholder="Filter files..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full bg-[#121723] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-0.5 pr-1">
        {fileTree.map((node) => (
          <FileExplorerNode
            key={node.id}
            node={node}
            selectedPath={selectedNode?.path || ''}
            onSelect={onSelectNode}
          />
        ))}
      </div>
    </div>
  );
};
