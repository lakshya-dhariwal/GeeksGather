import React, { useEffect, useState } from "react";
import { API, TEST_QUESTION } from "../config";
import axios from "axios";
import Quiz from "react-quiz-component";

function QuizPage() {
  const [questions, setQuestions] = useState(null);
  const getQuiz = async () => {
    // const data = await axios.post(API + "/gpt/quiz", { topic: "ReactJS" });
    // setQuestions(data?.data?.quiz);
    //dont use api for testing to save credits
    setQuestions(TEST_QUESTION);
  };
  useEffect(() => {
    getQuiz();
  }, []);

  const handleResult = (obj) => {
    const percentage = obj.correctPoints / obj.totalPoints;
    if (percentage > 50) {
      console.log("You passed");

    } else {
      console.log("You failed");
    }
  };

  return (
    <div className="max-w-[700px] mt-[10rem] mx-auto bg-[#0E1729]  relative group rounded-xl p-3 pt-3 w-fit border border-slate-800 ">
      {questions ? (
        <div>
          {" "}
          <Quiz
            quiz={{
              quizTitle: "Prove your Technical expertise to join the community",
              nrOfQuestions: questions.length,
              questions,
            }}
            showDefaultResult={true}
            onComplete={handleResult}
          />{" "}
        </div>
      ) : null}
    </div>
  );
}

export default QuizPage;
