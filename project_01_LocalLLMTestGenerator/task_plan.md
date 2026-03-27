# LocalLLMTestGenBuddy - Task Plan & Blueprint

## Project Overview
**Name:** LocalLLMTestGenBuddy  
**Purpose:** Generate test cases in Jira format from user requirements using local or cloud LLMs  
**Tech Stack:** React (Frontend) | Node.js + TypeScript (Backend) | Ollama/Groq/OpenAI/Claude (LLM)

---

## Phase 1: Setup & Infrastructure
### Status: ✅ COMPLETE

### Goals - ALL ACHIEVED ✅
- [x] Initialize project structure (React + Node.js/TypeScript)
- [x] Set up backend API endpoints
- [x] Configure development environment
- [x] Create placeholder UI components
- [x] Create all necessary configuration files

### Deliverables - ALL COMPLETE ✅
- [x] Backend server structure (port 5000 ready)
- [x] React app structure (port 3000 ready)
- [x] Folder structure fully established
- [x] Express server with CORS and middleware
- [x] All React components (Sidebar, MainPanel, SettingsPanel, TestCaseTable)
- [x] Professional styling (App.css)
- [x] TypeScript configuration for both Frontend and Backend
- [x] Environment configuration templates (.env.example)
- [x] README.md with setup and API documentation

---

## Phase 2: LLM Integration
### Goals
- [ ] Integrate Ollama API connector
- [ ] Integrate Groq API connector
- [ ] Integrate OpenAI API connector
- [ ] Integrate Claude API option
- [ ] Settings page for API key management

### Deliverables
- LLM service layer with multi-provider support
- Settings UI (Ollama/Groq/OpenAI configuration)
- Save/load API configuration

---

## Phase 3: Test Case Generator Core
### Goals
- [ ] Build requirement input component
- [ ] Build Jira test case generation logic
- [ ] Format output as tabular data
- [ ] Connect frontend to backend generator

### Deliverables
- Requirement input form
- Test case generator engine
- Jira-formatted table output
- Backend `/api/generate-testcases` endpoint

---

## Phase 4: History & UX
### Goals
- [ ] Build history sidebar
- [ ] Store generated test cases
- [ ] Enable session recall
- [ ] Improve UI/UX polish

### Deliverables
- History data persistence (localStorage/DB)
- History sidebar component
- Session management

---

## Phase 5: Testing & Deployment
### Goals
- [ ] Unit & integration tests
- [ ] Performance optimization
- [ ] Documentation
- [ ] Deploy to cloud (optional)

### Deliverables
- Test suite with >80% coverage
- Deployment guide
- User documentation

---

## Design Reference
- **Main UI:** Sidebar History + Central Generator Panel
- **Generator Panel:** Title + Requirement input + LLM selector
- **Settings Panel:** Ollama/Groq/OpenAI config fields + Save button
- **Output:** Jira-formatted tabular test cases

---

## Success Criteria
✅ User inputs requirement text  
✅ System generates 5+ test cases in Jira format  
✅ Output displayed in clean table  
✅ Multiple LLM providers work seamlessly  
✅ History persists across sessions  

---

## Status: 🔴 AWAITING APPROVAL
**Ready for Phase 1 kickoff once approved.**
