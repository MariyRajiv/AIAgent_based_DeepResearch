export interface Research {
  id: string;
  query: string;
  timestamp: number;
  status: 'idle' | 'researching' | 'drafting' | 'complete' | 'error';
  sources: Source[];
  answer: string;
  error?: string;
}

export interface Source {
  id: string;
  title: string;
  url: string;
  snippet: string;
  relevanceScore: number;
}

export interface AgentState {
  currentStep: string;
  progress: number;
  thoughts?: string;
}

export interface ResearchContextType {
  research: Research[];
  currentResearch: Research | null;
  researchAgent: AgentState;
  draftingAgent: AgentState;
  startResearch: (query: string) => Promise<void>;
  clearCurrentResearch: () => void;
  saveResearch: (id: string) => void;
  deleteResearch: (id: string) => void;
}