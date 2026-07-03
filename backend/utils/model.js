import {initChatModel} from "langchain"
export const model = await initChatModel("llama3.2:3b", {
    modelProvider: "ollama",
    temperature: 0.5,
    timeout: 600_000,
    maxTokens: 25000,
});