# FactFlow — Backend

The API server for FactFlow. It takes raw text, extracts atomic factual claims from it, verifies each claim against live web search results using an LLM agent, and returns a structured verdict for each one.

## Tech stack

- **Node.js + Express 5** — HTTP server (ESM modules, `"type": "module"`)
- **LangChain / LangGraph** — agent orchestration (`createAgent`, `createReactAgent`, tool calling)
- **LLM provider** — OpenAI-compatible endpoint, currently wired to NVIDIA NIM (`meta/llama-3.1-70b-instruct` for verification, `meta/llama-3.2-3b-instruct` available for extraction) via `@langchain/openai`'s `ChatOpenAI` client with a custom `baseURL`. A commented-out Google Gemini configuration (`@langchain/google-genai`) is also present as a drop-in alternative.
- **Tavily** (`@tavily/core`) — web search tool used as evidence for verification
- **LangSmith** — optional tracing/observability wrapper around the Gemini client
- **zod** — schema validation for the search tool's input
- **morgan / cors / body-parser** — standard Express middleware

## Project structure

```
backend/
├── index.js              # Express app: routes, middleware, server startup
├── utils/
│   ├── factGenerator.js  # Stage 1: extracts atomic claims from input text via an LLM agent
│   ├── factVerify.js     # Stage 2: verifies each claim via a tool-calling agent + web search
│   ├── webSearch.js      # Tavily search wrapper, returns a brief answer summary
│   ├── model.js          # LLM client setup (ChatOpenAI/NVIDIA), prompt templates, LCEL chains
│   ├── prompt.js         # System prompts for extraction and verification (with strict guardrails)
│   ├── wrapAsync.js      # Wraps async route handlers so thrown errors become 500 responses
│   └── langsmithTool.js  # LangSmith-wrapped Gemini client for tracing
└── vercel.json            # Deployment config for Vercel
```

## API routes

| Method | Path                | Description |
|--------|---------------------|-------------|
| GET    | `/`                 | Health check — returns "Server is Running!" |
| POST   | `/v1/verifyfact`    | Main endpoint. Body: `{ "sentence": "..." }`. Runs extraction → verification and returns a JSON array of `{ claim, verdict, reason }`. |
| POST   | `/v2/verifyfact`    | Same request shape, but returns a **hardcoded dummy response** — useful for frontend work without spending LLM/search quota. |
| POST   | `/test/webSearch`   | Debug route. Body: `{ "query": "..." }`. Runs a raw Tavily search and returns the result. |
| POST   | `/test/factgenerate`| Debug route. Body: `{ "sentence": "..." }`. Runs only the claim-extraction stage. |
| *      | (anything else)     | 404 JSON error |

Errors thrown inside any route (via `wrapAsync`) are caught and returned as `500 { "error": "Enternal Server Error" }`.

## Pipeline in detail

1. **`factGenerator(sentence)`** — creates a LangChain agent with `FactGeneratorPrompt`, which instructs the model to split input into the smallest independent factual statements, resolve pronouns, and return a strict JSON array of strings (no markdown, no commentary).
2. **`factVerify(facts)`** — creates a tool-calling agent (`factVerifyPrompt`) with one tool, `searchWeb`, which accepts a batch of queries (one per claim) and runs them concurrently against Tavily. The prompt requires the model to search **exactly once per claim** and to only mark a claim `CONTRADICTED` when it can cite a specific, named conflicting fact — vague hedging is explicitly disallowed as grounds for contradiction.
3. The final agent message content (expected to be a JSON array of `{ claim, verdict, reason }`) is sent back to the client.

## Environment variables

Create a `.env` file in this folder (already gitignored) with:

```
NVIDIA_API_KEY=your_nvidia_nim_api_key
TAVILY_API=your_tavily_api_key
```

If you switch `model.js` over to the commented-out Gemini configuration instead, you'll need a Google Generative AI key/credentials configured per `@langchain/google-genai`'s requirements instead of `NVIDIA_API_KEY`. LangSmith tracing (`langsmithTool.js`) will also expect the standard `LANGSMITH_*`/`LANGCHAIN_*` env vars if enabled.

## Getting started

```bash
npm install
npm run dev     # nodemon index.js — auto-restarts on file changes, listens on port 4000
```

There's no separate `start` script defined; `npm run dev` (nodemon) is the primary way to run it locally. For production, `vercel.json` is configured to deploy `index.js` as a Vercel serverless function.

## Known rough edges / TODOs in the code

- `index.js` has a leftover commented-out `export default app;` line, suggesting a prior/alternate serverless entry point.
- `factVerify.js` still imports `factVerifyChain` and `createReactAgent` without using them — dead imports from an earlier iteration of the verification approach.
- The dummy `/v2/verifyfact` route is handy for frontend iteration but should not be mistaken for the real verification path.