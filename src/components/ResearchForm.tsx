import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useResearchContext } from '../context/ResearchContext';

const ResearchForm: React.FC = () => {
  const [query, setQuery] = useState('');
  const { startResearch, currentResearch } = useResearchContext();
  const isResearching = currentResearch?.status === 'researching' || currentResearch?.status === 'drafting';
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isResearching) {
      startResearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
  };
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Research Query</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a research question..."
            className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            disabled={isResearching}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <button
            type="submit"
            disabled={!query.trim() || isResearching}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={!query.trim() || isResearching}
            className={`px-6 py-3 rounded-lg text-white font-medium flex items-center ${
              !query.trim() || isResearching 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 transition-colors'
            }`}
          >
            {isResearching ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Researching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Start Research
              </>
            )}
          </button>
          
          <div className="text-sm text-gray-500 flex items-center">
            Powered by Tavily API
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResearchForm;