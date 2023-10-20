import express from "express";
import { quizController } from "./gpt.controller";

const router = express.Router();

router.post("/quiz", quizController);

export default router;
