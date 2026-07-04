import { createAgent, tool } from "langchain";
import * as z from "zod";
import { webSearch } from "./webSearch.js";
import { model } from "./model.js";
import { client } from "./langsmithTool.js";

export const factVerify = async (input) => {
    const response = await agent.invoke({
        messages: [{ role: "user", content: input }],
    })
    return response.messages[response.messages.length-1].content;
}

const systemPrompt = `
You are a fact verification assistant.

You will receive an array of factual claims (strings).

For each claim:

1. Use the searchWeb tool to search for evidence.
2. Verify the claim ONLY using information returned by the searchWeb tool.
3. Do not rely on your own knowledge or memory.
4. Search each claim independently.
5. If multiple trustworthy sources agree, mark the claim as "SUPPORTED".
6. If trustworthy sources contradict the claim, mark it as "CONTRADICTED".
7. If there is insufficient or conflicting evidence, mark it as "INSUFFICIENT_EVIDENCE".
8. Keep the reason concise (1-3 sentences).
9. Return response for each sentences in array.
10. Return 3 elements 1.claim 2.verdict 3.reason, for each claim
11. Return only structured JSON. Do not include markdown or explanations.

Verdict must be one of:
- SUPPORTED
- CONTRADICTED
- INSUFFICIENT_EVIDENCE

You MUST use the searchWeb tool for every claim.

Do not produce a final answer until you have called the searchWeb tool for every claim.

If the tool returns evidence, you MUST produce one verification result for that claim.

Never return an empty array unless the input array itself is empty.
`;



const searchWeb = tool(
    async ({input}) => { return await webSearch(input); },
    {
        name: "webSearch",
        description: "searches the web and return relevent information",
        schema: z.object({
            input: z.string().describe("The query to be searched")
        })
    }
)

const agent = createAgent({
    model: model,
    tools: [searchWeb],
    systemPrompt,
})