import { generateEmbeddings } from "../../lib/embeddings";
import { strict_output } from "../../lib/gpt";
import { Request, Response } from "express";

export const quizController = async (req: Request, res: Response) => {
  try {
    const { topic } = req?.body;
    let questions;
    const amount = 5;

    const a = await strict_output(
      `You are a helpful AI that is assigned to Create a set of multiple-choice questions (MCQs) about ${topic}. These questions will be used to evaluate the technical knowledge of individuals applying to join the ReactJS community. For each question, provide four answer options, with one correct answer. Ensure that each answer and question is concise, with answers not exceeding 15 words . These question test ability and knowledge about the topic and help us knw if we should select them for our exclusive community of enthusiasts . the community is for ${topic} . Only ask technical questions . Give an ARRAY of 5 json MCQs`,
      new Array(amount).fill(
        `You are to generate a random technical open-ended questions about ${topic}`
      ),
      {
        question: "question",
        explanation: "Explanation of answer",
        option1: "option1 with max length of 15 words",
        option2: "option2 with max length of 15 words",
        option3: "option3 with max length of 15 words",
        option4: "option4 with max length of 15 words",
        answer:
          "correct option number. Option number of the option that is the answer",
      }
    );
    questions = [a];
    const quiz = questions.map((q: any) => {
      return {
        question: q?.question,
        questionType: "text",
        answerSelectionType: "single",
        answers: [q?.option1, q?.option2, q?.option3, q?.option4],
        correctAnswer: q?.answer,
        messageForCorrectAnswer: "Correct answer. Good job.",
        messageForIncorrectAnswer: "Incorrect answer. Please try again.",
        explanation: q?.explanation,
        point: "10",
      };
    });
    res.status(200).json({
      quiz: quiz,
    });
  } catch (error) {
    console.error("elle gpt error", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

export const createEmbedding = async (req: Request, res: Response) => {
  generateEmbeddings();
  res.status(200);
};
