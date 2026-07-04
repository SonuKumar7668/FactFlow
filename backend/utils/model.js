import {initChatModel} from "langchain"

// ollama
// llama3.2:3b

// google-genai
// gemini-2.5-flash-lite


export const model = await initChatModel("gemini-2.5-flash-lite", {
    modelProvider: "google-genai",
    temperature: 0.5,
    timeout: 600_000,
    maxTokens: 25000,
});