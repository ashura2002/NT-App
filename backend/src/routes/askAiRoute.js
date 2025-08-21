import express from "express";
import { ask_ai } from "../controller/aiController.js";
import verifyToken from "../middlewares/authMiddleware.js";
const ai_router = express.Router();

// /api magsugod iyang url
ai_router.post("/ask-ai", verifyToken, ask_ai);

export default ai_router;
