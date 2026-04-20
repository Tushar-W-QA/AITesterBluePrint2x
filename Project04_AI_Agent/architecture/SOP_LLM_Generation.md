# SOP: LLM Connection & Test Plan Generation

## Purpose
Connect to an LLM provider (Ollama, GROQ, Grok, OpenAI) and use it to generate a structured test plan from Jira ticket data.

## Supported Providers

| Provider | Base URL | Auth |
|----------|----------|------|
| Ollama   | `http://localhost:11434` | None (local) |
| GROQ     | `https://api.groq.com/openai/v1` | API Key |
| Grok     | `https://api.x.ai/v1` | API Key |
| OpenAI   | `https://api.openai.com/v1` | API Key |

## Connection Flow
1. User selects a **Provider** from the dropdown.
2. User enters **API Token** (except Ollama local).
3. User selects **Model/Version**.
4. User clicks **Test Connection**.
5. System calls the provider's `/models` or `/chat/completions` endpoint with a minimal test payload.
6. If success → Connection valid.
7. If error → Display error message.

## Test Plan Generation Flow
1. Receive parsed Jira ticket data (summary, description, acceptance criteria).
2. Load the **Test Plan Template** structure.
3. Construct an LLM prompt that includes:
   - The ticket data as context
   - The template sections as the required output structure
   - Additional user-provided context (optional)
4. Call the LLM's `/chat/completions` endpoint.
5. Parse the LLM response into the template sections.
6. Return the structured test plan.

## Prompt Template
```
You are a Senior QA Engineer. Based on the following user story/feature, generate a comprehensive test plan.

**User Story:**
{ticketSummary}

**Description:**
{ticketDescription}

**Acceptance Criteria:**
{acceptanceCriteria}

**Additional Context:**
{additionalContext}

Generate a test plan with the following sections:
1. Introduction
2. Scope (In Scope / Out of Scope)
3. Test Strategy
4. Test Cases (with steps, expected results, priority)
5. Entry/Exit Criteria
6. Risks and Mitigations
7. Schedule/Timeline

Output in Markdown format.
```

## Error Handling
- **Timeout**: LLM didn't respond in time — retry with smaller context.
- **Token Limit**: Input too large — summarize the description first.
- **Invalid Response**: LLM output doesn't match template — retry with stricter instructions.
