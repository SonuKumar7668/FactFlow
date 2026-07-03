import express from "express";
import bodyParser from "body-parser";
import {factGenerator} from "./utils/factGenerator.js";
import { webSearch } from "./utils/webSearch.js";
import { factVerify } from "./utils/factVerify.js";
const app = express();
app.use(bodyParser.json());

app.get("/", async (req, res) => {
    res.send("Hello");
})

app.post("/verify/fact",async(req,res)=>{
    const query= req.body.query;
    const facts=await factGenerator(query);
    const output= await factVerify(facts);
    res.send(output);
})

app.post("/webSearch",async(req,res)=>{
    const query= req.body.query;
    const results = await webSearch(query);
    res.send(results);
})

app.post("/fackgenerate",async(req,res)=>{
    const sentence = req.body.sentence;
    const facts=await factGenerator(sentence);
    res.send(facts);
})

// app.listen(4000, () => {
//     console.log("App is listening at 4000");
// })
export default app;