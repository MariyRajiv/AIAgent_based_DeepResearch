import { v4 as uuidv4 } from 'uuid';
import {Source } from '../types';
import { searchTavily, simulateAgentSteps } from './tavilyService';

const researchSteps = [
  "Analyzing query intent",
  "Planning research strategy",
  "Searching for relevant information",
  "Evaluating source credibility",
  "Extracting key findings",
  "Organizing research results",
  "Preparing data for drafting agent"
];

export const conductResearch = async (
  query: string,
  onStepChange: (step: string, progress: number) => void
): Promise<{ sources: Source[], thoughts: string }> => {
  await simulateAgentSteps(researchSteps, onStepChange);
  
  try {
    const tavilyResponse = await searchTavily(query);
    
    const sources: Source[] = tavilyResponse.results.map(result => ({
      id: uuidv4(),
      title: result.title,
      url: result.url,
      snippet: result.content.substring(0, 200) + (result.content.length > 200 ? '...' : ''),
      relevanceScore: result.score
    }));

    // Simulate research agent thoughts
    const thoughts = `
      I've analyzed the query "${query}" and identified the key information needs.
      Found ${sources.length} relevant sources with information about this topic.
      The sources have been ranked by relevance and credibility.
      Sources cover various aspects of the query including definitions, examples, and practical applications.
      Ready to pass this information to the drafting agent for synthesis.
    `;

    return { sources, thoughts };
  } catch (error) {
    console.error("Research error:", error);
    throw error;
  }
};