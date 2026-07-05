import dotenv from "dotenv";
dotenv.config();
import { tavily } from '@tavily/core';

export const webSearch = async (input) => {
    console.log("input:", input);
    const client = tavily({ apiKey: process.env.TAVILY_API });
    try {
        const result = await client.search(input, {
            searchDepth: "advanced",
            includeAnswer: true
        })
    } catch (err) {
        console.log("Search error:", err.message);
        return { error: err.message };
    }
    const update = result.results.slice(0, 2);
    return update;
    // return result.answer;
}