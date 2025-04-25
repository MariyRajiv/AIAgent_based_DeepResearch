import React from 'react';
import Header from './components/Header';
import ResearchForm from './components/ResearchForm';
import ResearchResults from './components/ResearchResults';
import AgentVisualizer from './components/AgentVisualizer';
import ResearchHistory from './components/ResearchHistory';
import { ResearchProvider, useResearchContext } from './context/ResearchContext';
import { ThemeProvider } from './context/ThemeContext';

const MainContent: React.FC = () => {
  const { currentResearch, researchAgent, draftingAgent } = useResearchContext();
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <ResearchForm />
            <AgentVisualizer 
              researchAgent={researchAgent} 
              draftingAgent={draftingAgent} 
            />
            <ResearchHistory />
          </div>
          
          <div className="lg:col-span-2">
            <ResearchResults research={currentResearch} />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-bold text-lg">DeepResearch AI</h3>
              <p className="text-gray-400 text-sm">Powered by Tavily API and LangChain</p>
            </div>
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} DeepResearch AI System
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ResearchProvider>
        <MainContent />
      </ResearchProvider>
    </ThemeProvider>
  );
}

export default App;