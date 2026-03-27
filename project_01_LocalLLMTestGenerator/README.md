# LocalLLMTestGenBuddy

A local test case generator that uses Ollama, Groq, OpenAI, or Claude to automatically generate Jira-formatted test cases from user requirements.

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- TypeScript
- (Optional) Ollama running locally for local LLM support

### Installation

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your API keys
npm run build
npm run dev
```

Backend will run on `http://localhost:5000`

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

## Features

- ✅ Multi-LLM Support: Ollama, Groq, OpenAI, Claude
- ✅ Jira-Formatted Test Cases
- ✅ Editable Test Case Table
- ✅ History Persistence (localStorage)
- ✅ Settings Management
- ✅ Clean, Intuitive UI

## Project Structure

```
project_01_LocalLLMTestGenerator/
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   ├── App.tsx          # Main app
│   │   └── App.css          # Styles
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── backend/
│   ├── src/
│   │   ├── services/        # LLM services
│   │   ├── routes/          # API routes
│   │   └── index.ts         # Server entry
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── task_plan.md             # Project phases & plan
├── findings.md              # Research & discoveries
├── progress.md              # Current progress
└── context.md               # Session context
```

## Supported LLM Providers

### Ollama (Local)
- Free, runs locally
- Requires: Ollama installed and running
- Model: mistral (customizable)

### Groq
- Fast cloud inference
- Sign up: [groq.com](https://groq.com)
- Add API key in Settings

### OpenAI
- Highest quality results
- Sign up: [openai.com](https://openai.com)
- Add API key in Settings

### Claude (Anthropic)
- Strong reasoning capabilities
- Sign up: [anthropic.com](https://anthropic.com)
- Add API key in Settings

## Configuration

Settings are stored in browser localStorage. Access Settings panel to:
- Configure Ollama URL (for local LLM)
- Add API keys for cloud providers
- Save preferences

## API Endpoints

### POST `/api/generate-testcases`
Generate test cases from requirement

**Request:**
```json
{
  "requirement": "User should be able to login with email and password",
  "provider": "ollama|groq|openai|claude"
}
```

**Response:**
```json
{
  "success": true,
  "testCases": [
    {
      "id": "TC-001",
      "summary": "...",
      "preConditions": "...",
      "steps": "...",
      "expectedResult": "...",
      "status": "New"
    }
  ],
  "count": 5,
  "provider": "ollama",
  "timestamp": "2024-03-15T..."
}
```

## Default Test Case Format

Each generated test case includes:
- **ID**: Unique identifier (TC-001, TC-002, etc.)
- **Summary**: Brief description of what the test validates
- **Pre-Conditions**: Setup/prerequisites for the test
- **Steps**: Numbered steps to execute the test
- **Expected Result**: What should happen on success
- **Status**: New / In Progress / Done

## Development

### Run Backend
```bash
cd backend
npm run dev          # Development with auto-reload
npm run build        # Compile TypeScript
npm start            # Run compiled version
```

### Run Frontend
```bash
cd frontend
npm run dev          # Vite dev server with HMR
npm run build        # Production build
npm run preview      # Preview production build
```

### Environment Variables

**Backend (.env)**
```
PORT=5000
OLLAMA_BASE_URL=http://localhost:11434
GROQ_API_KEY=your_key
OPENAI_API_KEY=your_key
ANTHROPIC_API_KEY=your_key
CORS_ORIGIN=http://localhost:3000
```

## Roadmap (Phase 2+)

- [ ] Database integration for persistent history
- [ ] Multi-user support with authentication
- [ ] Jira ticket integration/export
- [ ] Advanced prompt customization
- [ ] Test case templates
- [ ] Performance monitoring
- [ ] Batch generation

## Troubleshooting

### Backend won't start
- Check port 5000 is available
- Ensure Node.js version 16+
- Run `npm install` from backend folder

### Frontend can't reach backend
- Ensure backend is running on port 5000
- Check CORS_ORIGIN env variable
- Open browser console for detailed errors

### Test case generation fails
- Verify LLM provider configuration
- Check API keys in Settings
- For Ollama, ensure it's running (`ollama serve`)
- Check backend console for error logs

## License

ISC

## Contributing

Questions or improvements? Feel free to open an issue or PR!

---

**Status**: Phase 1 Complete ✅ | Next: Phase 2 (Advanced Features)
