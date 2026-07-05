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
        const update = result.results.slice(0, 2);
        console.log(result.answer);
        // return ({"websearch":update,"brief answer":result.answer });
        return result.answer;
    } catch (err) {
        console.log("Search error:", err.message);
        return { error: err.message };
    }
    // return result.answer;
}