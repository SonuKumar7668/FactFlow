import { createAgent } from "langchain";
import { model,factGeneratorChain,agent } from "./model.js";
import { client } from "./langsmithTool.js";
import { FactGeneratorPrompt } from "./prompt.js";

export const factGenerator = async(input)=>{

const factAgent = createAgent({
    model: agent,
    systemPrompt: FactGeneratorPrompt,
})

const facts = await factAgent.invoke({
  messages: [{ role: "user", content: input }],
});

// const result = await factGeneratorChain.invoke({ input });
return facts.messages[facts.messages.length-1].content;
//return facts.messages[facts.messages.length - 1].content;
}
