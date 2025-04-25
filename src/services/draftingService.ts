import { Source } from '../types';
import { simulateAgentSteps } from './tavilyService';

const draftingSteps = [
  "Analyzing research findings",
  "Identifying key information",
  "Organizing content structure",
  "Drafting comprehensive answer",
  "Validating answer against sources",
  "Finalizing response"
];

export const draftAnswer = async (
  query: string,
  sources: Source[],
  onStepChange: (step: string, progress: number) => void
): Promise<{ answer: string, thoughts: string }> => {
  await simulateAgentSteps(draftingSteps, onStepChange);
  
  // Sort sources by relevance
  const sortedSources = [...sources].sort((a, b) => b.relevanceScore - a.relevanceScore);
  
  // Create a simulated answer based on the sources
  const topSourcesContent = sortedSources
    .slice(0, 3)
    .map(source => source.snippet)
    .join(' ');
  
  // In a real implementation, we would use LangChain/LLM to generate this
  const answer = `
Based on comprehensive research, here's what I found about "${query}":

${topSourcesContent}

This information was compiled from ${sources.length} reliable sources, with particular emphasis on ${sortedSources[0]?.title || 'the most relevant findings'}.

Additional context and details are available in the full research results.
  `.trim();

  const thoughts = `
    I've analyzed the ${sources.length} sources provided by the research agent.
    The query "${query}" appears to be asking about ${query.split(' ').slice(0, 3).join(' ')}...
    I've prioritized information from the most relevant sources.
    The answer includes key definitions and explanations.
    I've maintained factual accuracy while making the response readable and coherent.
  `;

  return { answer, thoughts };
};