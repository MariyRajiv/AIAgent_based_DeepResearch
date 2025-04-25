# AIAgent_based_DeepResearch


▶️ [Watch the Loom video](https://www.loom.com/share/b8630ea6984847d1834b332d9d7a5af8?sid=0a7456a7-3d71-4252-bc26-184fc74df9a5)


📚 Project Documentation: AI Agent Based Deep Research
🔍 Overview:
This is a React-based AI Research Assistant that allows users to input research queries and receive synthesized answers. It simulates an intelligent research process using asynchronous agent steps, integrates with the Tavily Search API, and generates structured answers using simulated drafting logic.

✨ Features:
✅ Real-time simulation of research and drafting steps
✅ Uses Tavily API to fetch and evaluate search results
✅ Tracks progress and agent "thoughts" during each phase
✅ Organizes sources and generates an informative response
✅ Maintains a history of completed research sessions

<details> <summary>Click to expand</summary>
🧠 Core Components

| **Component**                 | **Description**                                                                 |
|------------------------------|---------------------------------------------------------------------------------|
| `ResearchContext.tsx`        | Global context that manages all research state, including agents and history.  |
| `ResearchForm.tsx`           | User interface to input and submit a research query.                           |
| `researchService.tsx`        | Simulates the research process and fetches sources from the Tavily API.        |
| `draftingService.tsx`        | Simulates the drafting of an answer based on research findings.                |
| `tavilyService.tsx`          | Handles communication with the Tavily API and simulates agent step logic.      |
| `types.ts`                   | Shared TypeScript types for agents, research items, and sources.               |
</details>

🔌 External Dependency:
Tavily API: Used for searching relevant web content
API Key: TAVILY_API_KEY 

✅ Conclusion
This project demonstrates a structured, modular approach to building an AI-powered research assistant using React and TypeScript. By simulating agent behavior for both research and drafting, and integrating real-time data via the Tavily Search API, it delivers an interactive experience that mimics how an intelligent assistant might gather and synthesize information.
The separation of concerns through context, services, and reusable components makes the app scalable and easy to maintain. While the current implementation uses mock step simulations, it lays a solid foundation for integrating real AI models like OpenAI, LangChain, or RAG pipelines in the future.
With clean architecture and room for future enhancements, this assistant can evolve into a powerful research companion for students, professionals, and content creators alike.

