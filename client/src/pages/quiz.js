import React, { useEffect, useState } from "react";
import { API } from "../config";
import axios from "axios";
import Quiz from "react-quiz-component";

function QuizPage() {
  const [questions, setQuestions] = useState(null);
  const getQuiz = async () => {
    // const data = await axios.post(API + "/gpt/quiz", { topic: "ReactJS" });
    // setQuestions(data?.data?.quiz);
    //dont use api for testing to save credits
    setQuestions([
      {
        question: "What is JSX in ReactJS?",
        questionType: "text",
        answerSelectionType: "single",
        answers: [
          "A component in ReactJS",
          "A JavaScript Library",
          "A syntax extension for JavaScript",
          "A package manager for ReactJS",
        ],
        correctAnswer: "3",
        messageForCorrectAnswer: "Correct answer. Good job.",
        messageForIncorrectAnswer: "Incorrect answer. Please try again.",
        explanation:
          "JSX is a syntax extension for JavaScript, used to write HTML-like code in React.",
        point: "10",
      },
    ]);
  };
  useEffect(() => {
    getQuiz();
  }, []);

  return (
    <div className="max-w-[700px] mt-[10rem] mx-auto">
      {questions ? (
        <div>
          {" "}
          <Quiz
            quiz={{
              quizTitle: "Prove your Technical expertise to join the community",
              nrOfQuestions: questions.length,
              questions,
            }}
            showDefaultResult={false}
          />{" "}
        </div>
      ) : null}
    </div>
  );
}

export default QuizPage;
