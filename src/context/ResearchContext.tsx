import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Research, ResearchContextType, AgentState,} from '../types';
import { conductResearch } from '../services/researchService';
import { draftAnswer } from '../services/draftingService';

const initialResearchAgent: AgentState = {
  currentStep: '',
  progress: 0,
  thoughts: ''
};

const initialDraftingAgent: AgentState = {
  currentStep: '',
  progress: 0,
  thoughts: ''
};

const ResearchContext = createContext<ResearchContextType | undefined>(undefined);

export const ResearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [research, setResearch] = useState<Research[]>([]);
  const [currentResearch, setCurrentResearch] = useState<Research | null>(null);
  const [researchAgent, setResearchAgent] = useState<AgentState>(initialResearchAgent);
  const [draftingAgent, setDraftingAgent] = useState<AgentState>(initialDraftingAgent);

  const startResearch = async (query: string) => {
    const id = uuidv4();
    const newResearch: Research = {
      id,
      query,
      timestamp: Date.now(),
      status: 'researching',
      sources: [],
      answer: ''
    };
  
    setCurrentResearch(newResearch);
    setResearchAgent(initialResearchAgent);
    setDraftingAgent(initialDraftingAgent);
  
    try {
      // ==== Research Agent Phase ====
      let researchStep = '';
      let researchProgress = 0;
  
      const { sources, thoughts: researchThoughts } = await conductResearch(
        query,
        (step, progress) => {
          researchStep = step;
          researchProgress = progress;
          setResearchAgent({ currentStep: step, progress });
          setCurrentResearch(prev => prev ? { ...prev, status: 'researching' } : null);
        }
      );
  
      // Update final thoughts for research agent
      setResearchAgent({
        currentStep: researchStep,
        progress: researchProgress,
        thoughts: researchThoughts
      });
  
      setCurrentResearch(prev =>
        prev ? { ...prev, sources, status: 'drafting' } : null
      );
  
      // ==== Drafting Agent Phase ====
      let draftStep = '';
      let draftProgress = 0;
  
      const { answer, thoughts: draftThoughts } = await draftAnswer(
        query,
        sources,
        (step, progress) => {
          draftStep = step;
          draftProgress = progress;
          setDraftingAgent({ currentStep: step, progress });
        }
      );
  
      // Update final thoughts for drafting agent
      setDraftingAgent({
        currentStep: draftStep,
        progress: draftProgress,
        thoughts: draftThoughts
      });
  
      setCurrentResearch(prev =>
        prev ? { ...prev, answer, status: 'complete' } : null
      );
  
      // Save the completed research
      setResearch(prev => [
        {
          id,
          query,
          timestamp: Date.now(),
          status: 'complete',
          sources,
          answer
        },
        ...prev
      ]);
    } catch (error) {
      console.error("Research process error:", error);
      setCurrentResearch(prev =>
        prev
          ? {
              ...prev,
              status: 'error',
              error: error instanceof Error ? error.message : 'Unknown error'
            }
          : null
      );
    }
  };
  
  
  const clearCurrentResearch = () => {
    setCurrentResearch(null);
    setResearchAgent(initialResearchAgent);
    setDraftingAgent(initialDraftingAgent);
  };

  const saveResearch = () => {
    // This is a no-op since research is already saved when completed
    // But we keep it in the interface for potential future functionality
  };

  const deleteResearch = (id: string) => {
    setResearch(prev => prev.filter(r => r.id !== id));
    if (currentResearch?.id === id) {
      clearCurrentResearch();
    }
  };

  const value = {
    research,
    currentResearch,
    researchAgent,
    draftingAgent,
    startResearch,
    clearCurrentResearch,
    saveResearch,
    deleteResearch
  };

  return (
    <ResearchContext.Provider value={value}>
      {children}
    </ResearchContext.Provider>
  );
};

export const useResearchContext = (): ResearchContextType => {
  const context = useContext(ResearchContext);
  if (context === undefined) {
    throw new Error('useResearchContext must be used within a ResearchProvider');
  }
  return context;
};