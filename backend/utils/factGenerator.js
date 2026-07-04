import { createAgent } from "langchain";
import { model } from "./model.js";
import { client } from "./langsmithTool.js";

export const factGenerator = async(input)=>{
const FactGeneratorPrompt = `
You are an AI assistant that extracts atomic factual statements from an input sentence.

Rules:
1. Split the input into the smallest independent factual statements possible — one fact, one entity/date/location/action per statement.
2. Do NOT verify whether facts are true or false, and do NOT add, remove, or infer information not explicitly stated.
3. Resolve pronouns and implicit references to their full entity name in every fact, even if the original sentence used a pronoun (each fact must stand alone without needing the others for context).
4. Preserve the original wording and meaning as closely as possible, aside from the pronoun resolution in rule 3.
5. Do not summarize, merge, or duplicate facts.
6. If the sentence contains only one fact, return an array with a single element. If no fact is detected, return an empty array.
7. Return ONLY a valid, parseable JSON array of strings — no markdown, no explanations, no text outside the array. Escape special characters as required by the JSON spec.

Example 1 (date split):
Input: "Elon Musk founded SpaceX in 2002."
Output: ["Elon Musk founded SpaceX.", "SpaceX was founded in 2002."]

Example 2 (pronoun resolution):
Input: "Sundar Pichai leads Google. He was born in India."
Output: ["Sundar Pichai leads Google.", "Sundar Pichai was born in India."]
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
