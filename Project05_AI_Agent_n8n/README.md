# 🤖 Project 05: n8n AI Agents for Quality Assurance

This project contains a collection of **n8n workflows** specifically designed to leverage AI for Quality Assurance (QA) tasks. These workflows transform standard AI models into specialized QA consultants and automation assistants capable of interacting with tools like Jira.

## 📁 Project Structure

The project includes the following workflow files:

| File Name | Description | Key Components |
| :--- | :--- | :--- |
| `AI_1AI_Agent_Hello_World.json` | Baseline QA Specialist Agent | LangChain, Groq, Memory |
| `AI_2AI_Agent_ollama.json` | Local AI QA Agent | Ollama (Gemma 3), LangChain |
| `AI_3AI_Jira_Agent.json` | Jira Bug Creator Agent | Jira Integration, Tool Use |
| `AI_4AI_Jira_Agent_Test_Plan.json` | Automated Test Plan Generator | Jira Issue Retrieval, Analysis |

---

## 🛠 Workflows Detail

### 1. 🌟 AI Agent: Hello World (`Alex`)
**File:** `AI_1AI_Agent_Hello_World.json`

This is the foundational workflow that introduces **Alex**, an elite QA Engineer persona with 20+ years of experience.

*   **Persona:** Alex specializes in the complete QA spectrum (Manual, Automation, API, Security, Performance).
*   **Guardrails:** Strictly limited to QA topics. It will politely refuse non-QA queries to ensure focus and accuracy.
*   **Tech Stack:** 
    *   **Brain:** Groq (OpenAI GPT-OSS-120B)
    *   **Memory:** Window Buffer Memory for context-aware conversations.
    *   **Trigger:** Chat Trigger for interactive UI engagement.

### 2. 🦙 AI Agent: Ollama Edition
**File:** `AI_2AI_Agent_ollama.json`

A variation of the QA Agent designed for **local-first execution** using Ollama.

*   **Persona:** Maintains the "Alex" elite QA Engineer persona.
*   **Tech Model:** Configured to use `gemma3:1b` via Ollama, enabling private and local AI processing.
*   **Use Case:** Ideal for organizations testing sensitive data where local model execution is preferred.

### 3. 🎫 AI Jira Agent: Bug Creator
**File:** `AI_3AI_Jira_Agent.json`

An "Action-Oriented" agent that goes beyond conversation and interacts with your project management tools.

*   **Functionality:** Uses the LangChain Agent's "Tool Use" capability to create bugs directly in Jira.
*   **Workflow:** The agent takes user input, identifies the need for a bug report, and uses the Jira Tool node to submit the issue with a summary and description.
*   **Integration:** Requires a configured Jira Software Cloud API credential.

### 4. 📝 AI Jira Agent: Test Plan Generator
**File:** `AI_4AI_Jira_Agent_Test_Plan.json`

The most advanced workflow in this project, designed to automate documentation based on live ticket data.

*   **Objective:** Reads a specific Jira Issue ID provided by the user and automatically generates a comprehensive Test Plan.
*   **Capabilities:**
    *   Retrieves issue details (User Story, Bug description) from Jira.
    *   Analyzes the context using the AI brain.
    *   Outputs a structured test strategy/plan tailored to that specific ticket.
*   **Tech Stack:** LangChain Agent + Jira Tool (Get Operation) + Groq.

---

## 🚀 How to Use

1.  **Import Workflows:**
    *   Open your n8n instance.
    *   Click on **Workflows** > **New**.
    *   Choose **Import from File...** and select one of the `.json` files from this directory.

2.  **Configure Credentials:**
    *   **Groq API:** Required for workflows 1, 3, and 4.
    *   **Ollama API:** Required for workflow 2 (ensure Ollama is running locally).
    *   **Jira Software Cloud API:** Required for workflows 3 and 4.

3.  **Activate:**
    *   Ensure all nodes are connected and credentials are saved.
    *   Use the **Chat Window** in n8n to start interacting with the agents.

## ⚖️ License
This project is part of the **AITesterBluePrint2x** training series. All rights reserved.
