import React, { useEffect, useState } from "react";
import { API } from "../config";
import axios from "axios";
import Quiz from "react-quiz-component";

function QuizPage() {
  const [questions, setQuestions] = useState(null);
  const getQuiz = async () => {
    const data = await axios.post(API + "/gpt/quiz", { topic: "ReactJS" });
    setQuestions(data?.data?.quiz);
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
