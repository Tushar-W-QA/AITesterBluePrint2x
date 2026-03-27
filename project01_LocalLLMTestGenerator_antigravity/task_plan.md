# Task Plan

## Phases
- Phase 1: Discovery & Requirements Gathering (Completed)
- Phase 2: Blueprint Approval (Completed)
- Phase 3: Implementation (In Progress)

## Goals
- Build a LocalLLMTestGenerator to generate API and web app test cases (functional & non-functional) in Jira format.
- Support multiple LLM APIs.
- Build a full-stack Node.js/TypeScript + React application.

## Draft Blueprint [APPROVED]
### 1. Core Purpose
Generate API and Web Application test cases (both functional and non-functional) strictly formatted for Jira.

### 2. Input Mechanism
Users will input text-based Jira requirements via a chat-like interface or copy-paste into the requirements input box.

### 3. Architecture & Tech Stack
- **Backend:** Node.js with TypeScript.
- **Frontend:** React application (TypeScript).
- **UI Layout:**
  - Main Window: Sidebar for History, Main Chat/Output area, and Bottom Input area for requirements.
  - Settings Window: Configuration inputs for different LLM providers (Ollama, Groq, OpenAI, LM Studio, Claude, Gemini) and a Save button.

### 4. LLM Infrastructure
Support for generating tests via:
- Ollama API
- LM Studio API
- Groq API
- OpenAI
- Claude API
- Gemini API

## Checklists
- [x] Answer discovery questions
- [x] Review Design Mockups
- [x] Draft the blueprint
- [x] Get User Approval on Blueprint
- [ ] Phase 3: Backend Setup
- [ ] Phase 3: Frontend Setup
