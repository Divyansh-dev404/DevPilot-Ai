export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
  githubConnected?: boolean;
  googleConnected?: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Repository {
  id: string;
  name: string;
  owner: string;
  description?: string;
  url?: string;
  defaultBranch: string;
  isPrivate: boolean;
  stars: number;
  forks: number;
  primaryLanguage: string;
  languages: Record<string, number>;
  frameworks: string[];
  databases: string[];
  dependenciesCount: number;
  filesCount: number;
  foldersCount: number;
  status: 'importing' | 'parsing' | 'ready' | 'error';
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface FileNode {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'folder';
  size?: number;
  children?: FileNode[];
  language?: string;
}

export interface Dependency {
  name: string;
  version: string;
  type: 'runtime' | 'dev' | 'peer';
  sourceFile: string;
  outdated?: boolean;
  vulnerabilityCount?: number;
}

export interface SecurityIssue {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  file: string;
  line: number;
  dangerExplanation: string;
  riskLevel: string;
  exampleAttack: string;
  howToFix: string;
  exampleFixedCode: string;
  aiRecommendation: string;
  confidenceScore: number;
}

export interface PerformanceIssue {
  id: string;
  title: string;
  description: string;
  type: 'database' | 'async' | 'frontend' | 'memory' | 'loop';
  impact: 'high' | 'medium' | 'low';
  file: string;
  line: number;
  recommendation: string;
  estimatedGain: string;
}

export interface QualityMetric {
  overallScore: number;
  maintainabilityScore: number;
  readabilityScore: number;
  complexityScore: number;
  securityScore: number;
  performanceScore: number;
  documentationScore: number;
  loc: number;
  cyclomaticComplexity: number;
  cognitiveComplexity: number;
  commentRatio: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  contextChunks?: { file: string; lineRange: string; snippet: string }[];
  isStreaming?: boolean;
}

export interface ChatConversation {
  id: string;
  title: string;
  repositoryId?: string;
  isPinned: boolean;
  createdAt: string;
  messages: ChatMessage[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'frontend' | 'backend' | 'database' | 'cache' | 'service' | 'queue' | 'external';
  description: string;
  tech: string;
  connections: string[];
}

export interface EREntity {
  name: string;
  columns: { name: string; type: string; isPk?: boolean; isFk?: boolean }[];
  relationships: { targetTable: string; type: '1:1' | '1:N' | 'N:M' }[];
}

export interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  summary: string;
  description?: string;
  controller?: string;
  authRequired: boolean;
  requestSchema?: string;
  responseSchema?: string;
}
