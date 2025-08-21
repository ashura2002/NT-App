import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const ask_ai = async (req, res) => {
  const { questions } = req.body;
  console.log(questions);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // built in model sa googlegenerativeAI package
    const result = await model.generateContent(questions);
    const response = result.response.text();
    res.json({ answer: response }); // makita sa res.data.answer sa frontend
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
