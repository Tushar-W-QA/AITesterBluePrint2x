# 🌐 Project Constitution: AIBuddy (B.L.A.S.T. Framework)

## 🎯 Overview
Build a deterministic, self-healing automation system — **AIBuddy** — to fetch user stories from Jira/ADO/X-Ray and generate professional test plans based on a provided template using an LLM.

## 🏗️ Architectural Invariants
- **Protocol:** B.L.A.S.T. (Blueprint, Link, Architect, Stylize, Trigger)
- **Architecture:** A.N.T. 3-Layer (Architecture, Navigation, Tools)
- **Layer 1 (Architecture):** SOPs in `architecture/`
- **Layer 2 (Navigation):** LLM-based decision making
- **Layer 3 (Tools):** Node.js scripts in `tools/`
- **Data-First:** JSON schemas defined below before coding

## 📊 Data Schemas

### Jira Connection Config (Input)
```json
{
  "jiraUrl": "https://your-domain.atlassian.net",
  "emailId": "user@example.com",
  "jiraApiToken": "xxxx-xxxx-xxxx",
  "isConnected": false
}
```

### LLM Connection Config (Input)
```json
{
  "provider": "ollama | groq | grok | openai",
  "apiToken": "xxxx-xxxx-xxxx",
  "model": "llama3 | mixtral | grok-2 | gpt-4o",
  "baseUrl": "http://localhost:11434",
  "isConnected": false
}
```

### Jira Ticket Fetch (Input → Output)
```json
// Input
{
  "ticketId": "PROJ-123",
  "boardName": "MyBoard"
}

// Output (Fetched from Jira API)
{
  "key": "PROJ-123",
  "summary": "As a user, I want...",
  "description": "Full description...",
  "acceptanceCriteria": "...",
  "issueType": "Story",
  "priority": "High",
  "status": "To Do",
  "labels": [],
  "components": []
}
```

### Test Plan Generation (Output — Payload)
```json
{
  "testPlanTitle": "Test Plan for PROJ-123",
  "generatedAt": "2026-04-20T22:00:00Z",
  "ticketSummary": "...",
  "sections": {
    "introduction": "...",
    "scope": "...",
    "testStrategy": "...",
    "testCases": [],
    "entryExitCriteria": "...",
    "risks": "...",
    "schedule": "..."
  },
  "format": "markdown"
}
```

## 📜 Behavioral Rules
- Prioritize reliability over speed
- Never guess at business logic
- All intermediate data in `.tmp/`
- Secrets in `.env`
- Test connections before fetching data
- Always validate LLM output against the template structure

## 🛠️ Maintenance Log
- 2026-04-20: Project initialized with B.L.A.S.T. protocol
- 2026-04-20: Data schemas defined for Jira, LLM, and Test Plan
- 2026-04-20: Tech stack confirmed: Node.js backend + Vite frontend
