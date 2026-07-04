import { createAgent, tool } from "langchain";
import * as z from "zod";
import { webSearch } from "./webSearch.js";
import { model } from "./model.js";
import { client } from "./langsmithTool.js";

export const factVerify = async (input) => {
    const response = await agent.invoke({
        messages: [{ role: "user", content: input }],
    })
    return response.messages[response.messages.length - 1].content;
}

const systemPrompt = `
You are a fact verification assistant.
You will receive an array of factual claims (strings).

For each claim:
1. Call the searchWeb tool at least once to gather evidence. You MUST search every claim independently before producing any output — do not rely on your own knowledge or memory.
2. Judge trustworthiness by source quality: prefer established news outlets, official/primary sources (companies, government, research institutions) over blogs, forums, or social media.
3. Assign a verdict based on the evidence pattern:
   - SUPPORTED: multiple trustworthy sources agree with the claim.
   - CONTRADICTED: trustworthy sources agree with each other and contradict the claim.
   - INSUFFICIENT_EVIDENCE: no reliable sources found, or the sources that exist disagree with each other, or evidence is too weak/indirect to judge.
4. Write a concise reason (1-3 sentences) stating what the evidence actually showed, not just a restatement of the verdict.

Important guardrails:
- Judge the claim exactly as written. Do not contradict a claim because it omits additional detail, exceptions, or exclusivity it never asserted.
- CONTRADICTED requires a named, specific conflicting fact from your search results (a different date, name, number, etc. that the sources actually state). Never use vague hedges like "some sources suggest," "may have," or "it's commonly believed" as grounds for CONTRADICTED — if you can't name the specific conflicting fact and its source, the verdict is not CONTRADICTED.
- A minor technical exception (e.g. a small subset of provisions taking effect on a different date) does not contradict a claim about the primary/overall date, if that primary date is itself confirmed by your sources. Only mark CONTRADICTED if the claim's core assertion is factually wrong, not if a minor caveat exists alongside it.
- Before choosing a verdict, check that your reason directly justifies it: if your reason describes evidence supporting the claim as written, the verdict must be SUPPORTED.

Output format:
Return ONLY a valid, parseable JSON array — no markdown, no explanations, no text outside the array. Escape special characters as required by the JSON spec. One object per input claim, in the same order:
[
  { "claim": "...", "verdict": "SUPPORTED" | "CONTRADICTED" | "INSUFFICIENT_EVIDENCE", "reason": "..." }
]

Never return an empty array unless the input array itself is empty.
`;



const searchWeb = tool(
    async ({ queries }) => {
        const results = await Promise.allSettled(
            queries.map(query => webSearch(query))
        );

        return results.map((result, i) => {
            if (result.status !== "fulfilled") {
                return { query: queries[i], error: result.reason?.message || "Search failed" };
            }
            return { query: queries[i], ...compressSearchResults(result.value) };
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

const agent = createAgent({
    model: model,
    tools: [searchWeb],
    systemPrompt,
})