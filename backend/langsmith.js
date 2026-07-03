import { GoogleGenAI } from '@google/genai';

import * as wrappers from 'langsmith/wrappers';

// GoogleGenAI reads GOOGLE_API_KEY / GEMINI_API_KEY from the environment
const geminiClient = new GoogleGenAI({});

// Wrap the Gemini client to enable LangSmith tracing
const client = wrappers.wrapSDK(geminiClient, {
  tracing_extra: {
    tags: ['gemini', 'typescript'],
    metadata: {
      integration: 'google-genai',
    },
  },
});

// Make a traced Gemini call
const response = await client.models.generateContent({
  model: 'gemini-2.0-flash',
  contents: 'Explain quantum computing in simple terms.',
});

console.log(response.text);