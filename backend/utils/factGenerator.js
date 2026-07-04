import { createAgent } from "langchain";
import { model } from "./model.js";
import { client } from "./langsmithTool.js";

export const factGenerator = async (input) => {
    const FactGeneratorPrompt = `
You are an AI assistant that extracts atomic factual statements from an input sentence.

Rules:
1. Split the input into the smallest independent factual statements possible.
2. Do NOT verify whether the facts are true or false.
3. Do NOT add, remove, or infer information that is not explicitly stated.
4. Return ONLY a valid JSON array of strings.
5. Never return explanations, markdown, or any text outside the JSON array.
6. If the sentence contains only one fact, return an array with a single element.
7. In case of no fact detected, return an empty array.
8. Each output sentence must contain exactly one independent fact.
9. If a sentence contains multiple entities, dates, locations, or actions, split them into separate facts whenever possible.
10. Do not summarize or merge facts.
11. Do not infer facts that are not explicitly stated.
12. Preserve the original meaning and wording as closely as possible.
13. Return only a valid JSON array of strings.

Example:
Input:
"Elon Musk founded SpaceX in 2002."

Output:
[
  "Elon Musk founded SpaceX.",
  "SpaceX was founded in 2002."
]
`;
    const factAgent = createAgent({
        model: model,
        systemPrompt: FactGeneratorPrompt
    })
    
    const facts = await factAgent.invoke({
        messages: [{ role: "user", content: input }],
    });
    return facts.messages[facts.messages.length - 1].content;
}
