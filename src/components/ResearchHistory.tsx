import React from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { Research } from '../types';
import { useResearchContext } from '../context/ResearchContext';

const ResearchHistory: React.FC = () => {
  const { research, deleteResearch, startResearch } = useResearchContext();
  
  if (research.length === 0) {
    return null;
  }
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
        <Clock className="h-5 w-5 mr-2 text-gray-500" />
        Research History
      </h2>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {research.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-3 hover:border-blue-200 transition-colors">
            <div className="flex justify-between">
              <div className="flex-1">
                <h3 
                  className="font-medium text-blue-700 hover:text-blue-800 cursor-pointer"
                  onClick={() => startResearch(item.query)}
                >
                  {item.query}
                </h3>
                <div className="text-xs text-gray-500 mt-1">
                  {formatDate(item.timestamp)} • {item.sources.length} sources
                </div>
              </div>
              <button 
                onClick={() => deleteResearch(item.id)}
                className="text-gray-400 hover:text-red-500 p-1"
                title="Delete research"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchHistory;