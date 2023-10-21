import express from "express";
import { createEmbedding, quizController } from "./gpt.controller";

const router = express.Router();

router.post("/quiz", quizController);

router.post("/embedding", createEmbedding);

export default router;
