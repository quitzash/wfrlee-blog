import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.KEY);
const model = genAI.getGenerativeModel({ model: process.argv[2] ?? "gemini-3.5-flash" });
const { response } = await model.generateContent("Reply with the single word OK");
console.log("MODEL:", process.argv[2] ?? "gemini-3.5-flash", "->", response.text().trim().slice(0, 40));