import dotenv from "dotenv";
dotenv.config();
import { tavily } from '@tavily/core';

export const webSearch= async(input)=>{
const client = tavily({ apiKey: process.env.TAVILY_API });
const result=await client.search(input, {
    searchDepth: "advanced",
    includeAnswer: true
}).catch(()=>{console.log("Search error")})
return result.answer;
}