# LocalLLMTestGenBuddy - Research & Findings

## Project Requirements Analysis

### Functional Requirements
- ✅ Accept user requirements as text input
- ✅ Generate test cases based on Jira format/standards
- ✅ Display output in tabular format
- ✅ Support multiple LLM providers (Ollama, Groq, OpenAI, Claude)
- ✅ Store generation history
- ✅ Allow users to ask clarifying questions about requirements

### Technical Requirements
- **Frontend:** React (modern, component-based)
- **Backend:** Node.js + TypeScript (type-safe)
- **LLM Integration:** Multi-provider pattern
- **Data Format:** Jira test case structure (ID, Summary, Steps, Expected Result, etc.)

### Design Specifications (From Design/1.png)
- **Layout:** Sidebar history + central content area
- **Main Panel:** Title, requirement input, LLM generator
- **Settings Panel:** Ollama Setting, Groq Setting, OpenAI Setting, Save button
- **Output:** Test cases in table format

---

## LLM Provider Investigation

### Ollama (Local)
- **Pros:** Open-source, runs locally, no API key needed for testing
- **Cons:** Requires local setup, may need GPU
- **API Route:** `http://localhost:11434/api/generate`

### Groq (Cloud)
- **Pros:** Fast inference, free tier available
- **Integration:** REST API with API key
- **Endpoint:** `https://api.groq.com/openai/v1/chat/completions`

### OpenAI
- **Pros:** Highest quality, GPT-4 available
- **Integration:** Official Python/Node SDK
- **Cost:** Pay-per-token

### Claude (Anthropic)
- **Pros:** Strong reasoning, large context window
- **Integration:** REST API with API key
- **Endpoint:** `https://api.anthropic.com/v1/messages`

---

## Jira Test Case Format
Typical Jira test case structure:
```
| Test Case ID | Summary | Pre-conditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|
| TC-001 | ... | ... | ... | ... | New |
```

---

## Technology Stack Decisions
- **React:** Suitable for interactive UI, large ecosystem
- **TypeScript:** Type safety reduces bugs, improves maintainability
- **Node.js:** Event-driven architecture good for I/O-heavy LLM calls
- **Axios/Fetch:** HTTP client for LLM APIs
- **Express.js:** Lightweight backend framework

---

## Constraints & Considerations
⚠️ **API Rate Limiting:** Multiple LLM providers have rate limits  
⚠️ **Cost:** OpenAI/Groq/Claude require API keys and may have usage costs  
⚠️ **LLM Quality:** Output quality varies by provider  
⚠️ **Local Setup:** Ollama requires local installation/GPU  
⚠️ **Prompt Engineering:** Quality of prompts affects test case generation  

---

## Open Questions
- Should we use a database (MongoDB/PostgreSQL) for history or localStorage?
- What's the expected number of concurrent users?
- Should test cases be editable after generation?
- Any specific Jira project/version compatibility needed?

