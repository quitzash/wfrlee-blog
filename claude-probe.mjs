import Anthropic from "@anthropic-ai/sdk";
const anthropic = new Anthropic({
  apiKey: process.env.KEY ?? process.env.ANTHROPIC_API_KEY,
  defaultHeaders: process.env.ANTHROPIC_WORKSPACE_ID
    ? { "anthropic-workspace-id": process.env.ANTHROPIC_WORKSPACE_ID }
    : undefined,
});
const model = process.argv[2] ?? "claude-sonnet-5-5";
const message = await anthropic.messages.create({
  model,
  max_tokens: 20,
  messages: [{ role: "user", content: "Reply with the single word OK" }],
});
const text = message.content.filter((b) => b.type === "text").map((b) => b.text).join("");
console.log("MODEL:", model, "->", text.trim().slice(0, 40));
