import React from 'react';
import { Database, FileText, Brain } from 'lucide-react';
import { AgentState } from '../types';

interface AgentVisualizerProps {
  researchAgent: AgentState;
  draftingAgent: AgentState;
}

const AgentVisualizer: React.FC<AgentVisualizerProps> = ({ researchAgent, draftingAgent }) => {
  const researchActive = researchAgent.currentStep !== '';
  const draftingActive = draftingAgent.currentStep !== '';
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Agent Activity</h2>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Research Agent */}
        <div className={`border rounded-lg p-4 ${researchActive ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}`}>
          <div className="flex items-center mb-3">
            <div className={`p-2 rounded-full mr-3 ${researchActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Research Agent</h3>
              <p className="text-sm text-gray-500">Gathers and analyzes information</p>
            </div>
          </div>
          
          {researchActive && (
            <>
              <div className="mb-3">
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-blue-700 font-medium">{researchAgent.currentStep}</span>
                  <span className="text-gray-500">{Math.round(researchAgent.progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${researchAgent.progress}%` }}
                  ></div>
                </div>
              </div>
              
              {researchAgent.thoughts && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded text-sm text-gray-700">
                  <div className="font-medium text-blue-700 mb-1">Agent Thoughts:</div>
                  <p className="whitespace-pre-line">{researchAgent.thoughts}</p>
                </div>
              )}
            </>
          )}
          
          {!researchActive && (
            <p className="text-sm text-gray-500 italic">Agent idle</p>
          )}
        </div>
        
        {/* Drafting Agent */}
        <div className={`border rounded-lg p-4 ${draftingActive ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200'}`}>
          <div className="flex items-center mb-3">
            <div className={`p-2 rounded-full mr-3 ${draftingActive ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Drafting Agent</h3>
              <p className="text-sm text-gray-500">Synthesizes findings into answers</p>
            </div>
          </div>
          
          {draftingActive && (
            <>
              <div className="mb-3">
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-emerald-700 font-medium">{draftingAgent.currentStep}</span>
                  <span className="text-gray-500">{Math.round(draftingAgent.progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${draftingAgent.progress}%` }}
                  ></div>
                </div>
              </div>
              
              {draftingAgent.thoughts && (
                <div className="mt-3 p-3 bg-emerald-50 border border-emerald-100 rounded text-sm text-gray-700">
                  <div className="font-medium text-emerald-700 mb-1">Agent Thoughts:</div>
                  <p className="whitespace-pre-line">{draftingAgent.thoughts}</p>
                </div>
              )}
            </>
          )}
          
          {!draftingActive && (
            <p className="text-sm text-gray-500 italic">Agent idle</p>
          )}
        </div>
        
        {/* LangGraph Visualization (simplified) */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-gray-100 rounded-full mr-3">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">LangGraph Flow</h3>
              <p className="text-sm text-gray-500">Agent interaction visualization</p>
            </div>
          </div>
          
          <div className="relative h-20 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${researchActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                  <Database className="h-6 w-6" />
                </div>
                
                <div className={`w-16 h-1 ${(researchActive && draftingActive) ? 'bg-purple-400' : 'bg-gray-300'}`}></div>
                
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${draftingActive ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                  <FileText className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentVisualizer;