import {initChatModel} from "langchain"

// ollama
// llama3.2:3b

// google-genai
// gemini-2.5-flash-lite


export const model = await initChatModel("llama3.2:3b", {
    modelProvider: "ollama",
    temperature: 0.5,
    timeout: 600_000,
    maxTokens: 25000,
});