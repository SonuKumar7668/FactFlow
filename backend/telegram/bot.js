import { Bot } from "grammy";
import { factGenerator } from "../utils/factGenerator.js";
import { factVerify } from "../utils/factVerify.js";

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot(process.env.TELEGRAM_TOKEN); 

bot.command("start", (ctx) => {
    const WelcomeMessage=`
    👋 <b>Welcome to FactFlow!</b>

I'm your AI-powered fact-checking assistant.

📝 <b>What I can do:</b>
• Verify news articles, social media posts, and claims
• Break complex statements into individual claims
• Explain why each claim is supported, refuted, or lacks sufficient evidence
• Provide reliable sources whenever available

<b>How to use me:</b>
Simply send me any text, article, or claim you'd like to fact-check.

<b>Example:</b> <code>NASA landed humans on the Moon in 1969.</code>

I'll analyze it and return a detailed fact-check report.

Let's separate facts from misinformation. 🚀
`
    ctx.reply(WelcomeMessage,{
        parse_mode:"HTML"
    })
});

function formatFactCheckMessage(responseString) {
    try {
        const results = JSON.parse(responseString);

        if (!Array.isArray(results) || results.length === 0) {
            return "❌ No fact-check results found.";
        }

        const verdictEmoji = {
            SUPPORTED: "✅",
            REFUTED: "❌",
            NEI: "🤔",
            "NOT ENOUGH INFORMATION": "🤔",
            PARTIALLY_SUPPORTED: "⚠️",
        };

        let message = "🔍 <b>Fact Check Results</b>\n\n";

        for (const [index, item] of results.entries()) {
            const emoji = verdictEmoji[item.verdict] || "📌";

            message += `<b>${index + 1}. ${emoji} ${item.verdict}</b>\n`;
            message += `<b>Claim:</b> ${item.claim}\n`;
            message += `<b>Reason:</b> ${item.reason}\n\n`;
        }

        return message.trim();
    } catch (err) {
        return "❌ Unable to parse fact-check results.";
    }
}

// Handle other messages.
bot.on("message", async(ctx) => {
    const msg = ctx.message.text;
    console.log(msg);
    const facts = await factGenerator(msg);
    const output = await factVerify(facts);
    console.log("Output type",typeof(output));
    console.log("Output:",output);
    const telegramMessage =formatFactCheckMessage(output);
    ctx.reply(telegramMessage,{
        parse_mode:"HTML",
    });
});

export const startTelegram = async () => {
    console.log("Telegram bot started");
    await bot.start();
}