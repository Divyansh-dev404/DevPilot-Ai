import React from 'react';
import { useRepository } from '../contexts/RepositoryContext';
import { FileExplorer } from '../components/repository/FileExplorer';
import { CodeViewer } from '../components/repository/CodeViewer';
import { TechStackBadges } from '../components/repository/TechStackBadges';
import { GlassCard } from '../components/ui/GlassCard';
import { Star, GitFork, FolderGit2 } from 'lucide-react';

export const RepositoryView: React.FC = () => {
  const { activeRepository, fileTree, selectedFile, selectedFileContent, setSelectedFile } = useRepository();

  if (!activeRepository) {
    return <div className="p-12 text-center text-slate-400">No active repository selected.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <GlassCard glow="cyan" className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FolderGit2 className="h-5 w-5 text-cyan-400" />
              <h1 className="text-xl font-bold text-slate-100">{activeRepository.name}</h1>
              <span className="text-xs text-slate-400">by {activeRepository.owner}</span>
            </div>
            <p className="text-xs text-slate-300">{activeRepository.description}</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span>{activeRepository.stars} Stars</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <GitFork className="h-4 w-4 text-purple-400" />
              <span>{activeRepository.forks} Forks</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Tech Stack Breakdown */}
      <GlassCard className="p-6">
        <TechStackBadges
          languages={activeRepository.languages}
          frameworks={activeRepository.frameworks}
          databases={activeRepository.databases}
        />
      </GlassCard>

      {/* VS Code File Explorer & Code Preview */}
      <div className="grid lg:grid-cols-12 gap-6 h-[600px]">
        <div className="lg:col-span-4 h-full">
          <FileExplorer
            fileTree={fileTree}
            selectedNode={selectedFile}
            onSelectNode={setSelectedFile}
          />
        </div>
        <div className="lg:col-span-8 h-full">
          <CodeViewer file={selectedFile} content={selectedFileContent} />
        </div>
      </div>
    </div>
  );
};
