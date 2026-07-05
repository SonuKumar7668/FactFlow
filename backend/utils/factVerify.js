import { createAgent, tool } from "langchain";
import * as z from "zod";
import { webSearch } from "./webSearch.js";
import { factVerifyChain, agent } from "./model.js";
import { factVerifyPrompt } from "./prompt.js";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
// import { client } from "./langsmithTool.js";

export const factVerify = async (input) => {
    const response = await agent1.invoke({
        messages: [{ role: "user", content: input }],
    })

    return response.messages[response.messages.length - 1].content;
}

const searchWeb = tool(
    async ({ queries }) => {
        const results = await Promise.allSettled(
            queries.map(query => webSearch(query))
        );

        return results.map((result, i) => {
            if (result.status !== "fulfilled") {
                return {
                    query: queries[i],
                    error: result.reason?.message || "Search failed",
                };
            }

            return {
                query: queries[i],
                results: result.value,
            };
        });
    },
    {
        name: "searchWeb",
        description:
            "Search the web for multiple claims at once. Pass one query per claim you need evidence for. Returns an array of results in the same order as the input queries, with an 'error' field on any query that failed instead of a result.",
        schema: z.object({
            queries: z.array(z.string()).describe("One search query per claim to verify."),
        }),
    }
);

// const agent1 = createAgent({
//     model: agent,
//     tools: [searchWeb],
//     systemPrompt:factVerifyPrompt,
// })

const agent1 = createAgent({
    model: agent,
    tools: [searchWeb],
    systemPrompt: factVerifyPrompt, // note: this param is called `prompt` here, not `systemPrompt`
});