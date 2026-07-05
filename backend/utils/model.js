// import {initChatModel} from "langchain"
import { ChatOpenAI } from "@langchain/openai";
import { FactGeneratorPrompt,factVerifyPrompt } from "./prompt.js";
import { initChatModel } from "langchain/chat_models/universal";
import { ChatPromptTemplate } from "@langchain/core/prompts";
// ollama
// llama3.2:3b

// google-genai
// gemini-2.5-flash-lite

export const model = await initChatModel("meta/llama-3.2-3b-instruct", {
  modelProvider: "openai",
  apiKey: process.env.NVIDIA_API_KEY,
  temperature: 0.2,
  topP: 0.7,
  maxTokens: 1024,
  configuration: {
    baseURL: "https://integrate.api.nvidia.com/v1",
  },
});

// export const model = await initChatModel("gemini-2.5-flash-lite", {
//     modelProvider: "google-genai",
//     temperature: 0.5,
//     timeout: 600_000,
//     maxTokens: 25000,
// });
export const agent = new ChatOpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  model: "meta/llama-3.1-70b-instruct",
  temperature: 0,
  topP: 0.7,
  maxTokens: 512,
  configuration: {
    baseURL: "https://integrate.api.nvidia.com/v1",
    fetch: async (url, init) => {
      if (init?.body) {
        const payload = JSON.parse(init.body);

        payload.messages = payload.messages.map((msg) => {
          if (Array.isArray(msg.content)) {
            const flattened = msg.content
              .filter((part) => part.type === "text")
              .map((part) => part.text)
              .join("\n");
            return { ...msg, content: flattened };
          }
          return msg;
        });

        init.body = JSON.stringify(payload);
      }

      return fetch(url, init);
    },
  },
});

// export const agent = new ChatOpenAI({
//   apiKey: process.env.NVIDIA_API_KEY, // set this in your shell/.env, not in code
//   model: "meta/llama-3.2-3b-instruct",
//   temperature: 0.2,
//   topP: 0.7,
//   maxTokens: 1024,
//   configuration: {
//     baseURL: "https://integrate.api.nvidia.com/v1",
//   },
// });

const factGeneratorPromptTemplate = ChatPromptTemplate.fromMessages([
  ["system", FactGeneratorPrompt],
  ["user", "{input}"],
]);

const factVerifyPromptTemplate = ChatPromptTemplate.fromMessages([
  ["system",factVerifyPrompt],
  ["user","{input}"]
])

export const factGeneratorChain = factGeneratorPromptTemplate.pipe(agent);
export const factVerifyChain = factVerifyPromptTemplate.pipe(agent);