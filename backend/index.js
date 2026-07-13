import express from "express";
import bodyParser from "body-parser";
import { factGenerator } from "./utils/factGenerator.js";
import { webSearch } from "./utils/webSearch.js";
import { factVerify } from "./utils/factVerify.js";
import { wrapAsync } from "./utils/wrapAsync.js";
import cors from "cors";
import morgan from "morgan";
import {startTelegram} from "./telegram/bot.js"

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.get("/", wrapAsync(async (req, res) => {
    res.send("Server is Running!");
}))

app.post("/v1/verifyfact", wrapAsync(async (req, res) => {
    const sentence = req.body.sentence;
    const facts = await factGenerator(sentence);
    const output = await factVerify(facts);
    res.send(output);
}))
app.post("/v2/verifyfact", wrapAsync(async (req, res) => {
    const sentence = req.body.sentence;
    console.log("Input: ",sentence);
    const dummyResponse = [
        {
            "claim": "OpenAI released ChatGPT in November 2022.",
            "verdict": "INSUFFICIENT_EVIDENCE",
            "reason": "No reliable sources found for this claim."
        },
        {
            "claim": "ChatGPT reached one million users within five days.",
            "verdict": "CONTRADICTED",
            "reason": "No reliable sources found for this claim."
        },
        {
            "claim": "OpenAI introduced GPT-4 in 2023.",
            "verdict": "SUPPORTED",
            "reason": "Multiple trustworthy sources confirm OpenAI's introduction of GPT-4 in late 2022, not 2023."
        }
    ]
    res.status(200).json(dummyResponse);
}))

app.post("/test/webSearch", wrapAsync(async (req, res) => {
    const query = req.body.query;
    const results = await webSearch(query);
    res.send(results);
}))

app.post("/test/factgenerate", wrapAsync(async (req, res) => {
    const sentence = req.body.sentence;
    const facts = await factGenerator(sentence);
    res.send(facts);
}))

app.use((req, res) => {
    res.status(404).json({ "error": "Page not found" });
})

app.listen(4000, async() => {
    console.log("App is listening at 4000");
    await startTelegram();
})
// export default app;