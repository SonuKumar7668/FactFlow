import * as wrappers from 'langsmith/wrappers';
import { GoogleGenAI } from '@google/genai';

const geminiClient = new GoogleGenAI({});

export const client = wrappers.wrapSDK(geminiClient, {
  tracing_extra: {
    tags: ['gemini', 'typescript'],
    metadata: {
      integration: 'google-genai',
    },
  },
});