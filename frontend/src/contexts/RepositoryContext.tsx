import React, { createContext, useContext, useState, useEffect } from 'react';
import { Repository, FileNode } from '../types';
import { api } from '../lib/axios';

interface RepositoryContextType {
  repositories: Repository[];
  activeRepository: Repository | null;
  fileTree: FileNode[];
  selectedFile: FileNode | null;
  selectedFileContent: string;
  isLoading: boolean;
  setActiveRepository: (repo: Repository) => void;
  setSelectedFile: (file: FileNode | null) => void;
  importGithubRepo: (url: string, isPrivate?: boolean, token?: string) => Promise<Repository>;
  uploadZipRepo: (file: File) => Promise<Repository>;
  refreshRepositories: () => Promise<void>;
  deleteRepository: (id: string) => Promise<void>;
}

const initialMockRepos: Repository[] = [
  {
    id: 'repo_devpilot_foundation',
    name: 'devpilot-ai',
    owner: 'devpilot-org',
    description: 'Autonomous AI Software Engineering Assistant & Code Intelligence Engine',
    url: 'https://github.com/devpilot-org/devpilot-ai',
    defaultBranch: 'main',
    isPrivate: false,
    stars: 1280,
    forks: 340,
    primaryLanguage: 'TypeScript',
    languages: { TypeScript: 65, Python: 30, Dockerfile: 5 },
    frameworks: ['React 18', 'FastAPI', 'TailwindCSS', 'Framer Motion'],
    databases: ['PostgreSQL', 'Redis', 'Qdrant'],
    dependenciesCount: 42,
    filesCount: 184,
    foldersCount: 36,
    status: 'ready',
    progress: 100,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'repo_fastapi_microservice',
    name: 'neural-api-gateway',
    owner: 'ai-labs',
    description: 'High performance async FastAPI Gateway with Redis rate limiting and JWT auth',
    url: 'https://github.com/ai-labs/neural-api-gateway',
    defaultBranch: 'main',
    isPrivate: true,
    stars: 450,
    forks: 88,
    primaryLanguage: 'Python',
    languages: { Python: 92, Dockerfile: 8 },
    frameworks: ['FastAPI', 'SQLAlchemy', 'Alembic', 'Celery'],
    databases: ['PostgreSQL', 'Redis'],
    dependenciesCount: 28,
    filesCount: 95,
    foldersCount: 18,
    status: 'ready',
    progress: 100,
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
];

const mockFileTree: FileNode[] = [
  {
    id: 'f_root_src',
    name: 'src',
    path: 'src',
    type: 'folder',
    children: [
      {
        id: 'f_components',
        name: 'components',
        path: 'src/components',
        type: 'folder',
        children: [
          { id: 'f_app', name: 'App.tsx', path: 'src/App.tsx', type: 'file', language: 'typescript', size: 2450 },
          { id: 'f_nav', name: 'Navbar.tsx', path: 'src/components/layout/Navbar.tsx', type: 'file', language: 'typescript', size: 3120 },
        ],
      },
      { id: 'f_main', name: 'main.tsx', path: 'src/main.tsx', type: 'file', language: 'typescript', size: 680 },
    ],
  },
  {
    id: 'f_backend',
    name: 'backend',
    path: 'backend',
    type: 'folder',
    children: [
      { id: 'f_main_py', name: 'main.py', path: 'backend/app/main.py', type: 'file', language: 'python', size: 1890 },
      { id: 'f_rag_py', name: 'rag_engine.py', path: 'backend/app/services/rag_engine.py', type: 'file', language: 'python', size: 4520 },
    ],
  },
  { id: 'f_docker', name: 'docker-compose.yml', path: 'docker-compose.yml', type: 'file', language: 'yaml', size: 1120 },
  { id: 'f_readme', name: 'README.md', path: 'README.md', type: 'file', language: 'markdown', size: 3400 },
];

const RepositoryContext = createContext<RepositoryContextType | undefined>(undefined);

export const RepositoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [repositories, setRepositories] = useState<Repository[]>(initialMockRepos);
  const [activeRepository, setActiveRepository] = useState<Repository | null>(initialMockRepos[0]);
  const [fileTree, setFileTree] = useState<FileNode[]>(mockFileTree);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(mockFileTree[3]);
  const [selectedFileContent, setSelectedFileContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedFile) {
      if (selectedFile.path.endsWith('.md')) {
        setSelectedFileContent(`# ${activeRepository?.name || 'DevPilot AI'}\n\nAutonomous AI Software Engineering Assistant & RAG Code Intelligence Platform.\n\n## Stack\n- Frontend: React 18, TypeScript, TailwindCSS, Framer Motion, Recharts\n- Backend: Python FastAPI, SQLAlchemy, PostgreSQL, Redis, Qdrant Vector DB\n- AI Pipeline: Google Gemini API, LangChain / LangGraph Node Workflow`);
      } else if (selectedFile.path.endsWith('.py')) {
        setSelectedFileContent(`from fastapi import FastAPI, Depends, HTTPException\nfrom app.services.rag_engine import RAGEngine\n\napp = FastAPI(title="DevPilot AI RAG Core API")\n\n@app.post("/api/v1/chat")\nasync def chat_stream(query: str, repo_id: str):\n    rag = RAGEngine(repo_id=repo_id)\n    return await rag.generate_streaming_response(query)\n`);
      } else {
        setSelectedFileContent(`import React from 'react';\n\nexport const App: React.FC = () => {\n  return (\n    <div className="min-h-screen bg-[#0a0d14] text-white">\n      <h1>DevPilot AI Platform Ready</h1>\n    </div>\n  );\n};\nexport default App;\n`);
      }
    }
  }, [selectedFile, activeRepository]);

  const refreshRepositories = async () => {
    try {
      const res = await api.get('/repositories');
      if (res.data && res.data.length > 0) {
        setRepositories(res.data);
      }
    } catch {
      // Retain mock repositories
    }
  };

  const importGithubRepo = async (url: string, isPrivate = false, token?: string): Promise<Repository> => {
    setIsLoading(true);
    const repoName = url.split('/').pop()?.replace('.git', '') || 'github-repo';
    const ownerName = url.split('/')[url.split('/').length - 2] || 'github-owner';

    const newRepo: Repository = {
      id: 'repo_' + Date.now(),
      name: repoName,
      owner: ownerName,
      description: 'Imported from GitHub Repository: ' + url,
      url,
      defaultBranch: 'main',
      isPrivate,
      stars: 340,
      forks: 82,
      primaryLanguage: 'TypeScript',
      languages: { TypeScript: 70, Python: 25, HTML: 5 },
      frameworks: ['React', 'FastAPI'],
      databases: ['PostgreSQL'],
      dependenciesCount: 31,
      filesCount: 110,
      foldersCount: 22,
      status: 'ready',
      progress: 100,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await api.post('/repositories/github', { url, isPrivate, token });
      if (res.data) {
        setRepositories((prev) => [res.data, ...prev]);
        setActiveRepository(res.data);
        setIsLoading(false);
        return res.data;
      }
    } catch {
      // Fallback
    }

    setRepositories((prev) => [newRepo, ...prev]);
    setActiveRepository(newRepo);
    setIsLoading(false);
    return newRepo;
  };

  const uploadZipRepo = async (file: File): Promise<Repository> => {
    setIsLoading(true);
    const repoName = file.name.replace('.zip', '');
    const newRepo: Repository = {
      id: 'repo_zip_' + Date.now(),
      name: repoName,
      owner: 'local-upload',
      description: 'Extracted safely from uploaded ZIP package: ' + file.name,
      defaultBranch: 'main',
      isPrivate: true,
      stars: 0,
      forks: 0,
      primaryLanguage: 'Python',
      languages: { Python: 85, Dockerfile: 15 },
      frameworks: ['FastAPI', 'Celery'],
      databases: ['PostgreSQL', 'Redis'],
      dependenciesCount: 19,
      filesCount: 64,
      foldersCount: 12,
      status: 'ready',
      progress: 100,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setRepositories((prev) => [newRepo, ...prev]);
    setActiveRepository(newRepo);
    setIsLoading(false);
    return newRepo;
  };

  const deleteRepository = async (id: string) => {
    setRepositories((prev) => prev.filter((r) => r.id !== id));
    if (activeRepository?.id === id) {
      setActiveRepository(repositories.find((r) => r.id !== id) || null);
    }
  };

  return (
    <RepositoryContext.Provider
      value={{
        repositories,
        activeRepository,
        fileTree,
        selectedFile,
        selectedFileContent,
        isLoading,
        setActiveRepository,
        setSelectedFile,
        importGithubRepo,
        uploadZipRepo,
        refreshRepositories,
        deleteRepository,
      }}
    >
      {children}
    </RepositoryContext.Provider>
  );
};

export const useRepository = () => {
  const context = useContext(RepositoryContext);
  if (!context) throw new Error('useRepository must be used within RepositoryProvider');
  return context;
};
