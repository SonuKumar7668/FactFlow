import express from "express";
import bodyParser from "body-parser";
import {factGenerator} from "./utils/factGenerator.js";
import { webSearch } from "./utils/webSearch.js";
import { factVerify } from "./utils/factVerify.js";
import { wrapAsync } from "./utils/wrapAsync.js";

const app = express();
app.use(bodyParser.json());

app.get("/",wrapAsync( async (req, res) => {
    res.send("Server is Running!");
}))

app.post("/v1/verifyfact", wrapAsync(async(req,res)=>{
    const query= req.body.query;
    const facts=await factGenerator(query);
    const output= await factVerify(facts);
    res.send(output);
}))

app.post("/test/webSearch",wrapAsync(async(req,res)=>{
    const query= req.body.query;
    const results = await webSearch(query);
    res.send(results);
}))

app.post("/test/factgenerate",wrapAsync(async(req,res)=>{
    const sentence = req.body.sentence;
    const facts=await factGenerator(sentence);
    res.send(facts);
}))

app.use((req,res)=>{
    res.status(404).json({"error":"Page not found"});
})

app.listen(4000, () => {
    console.log("App is listening at 4000");
})
// export default app;