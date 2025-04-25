const TAVILY_API_KEY = "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";

interface TavilySearchResponse {
  results: {
    title: string;
    url: string;
    content: string;
    score: number;
  }[];
  query: string;
  search_id: string;
}

export const searchTavily = async (query: string): Promise<TavilySearchResponse> => {
  try {
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TAVILY_API_KEY}`
      },
      body: JSON.stringify({
        query,
        search_depth: "advanced",
        include_domains: [],
        exclude_domains: [],
        max_results: 10
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Tavily API error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Tavily search error:", error);
    throw error;
  }
};

export const simulateAgentSteps = async (
  steps: string[],
  onStepChange: (step: string, progress: number) => void
): Promise<void> => {
  for (let i = 0; i < steps.length; i++) {
    onStepChange(steps[i], (i / (steps.length - 1)) * 100);
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
};