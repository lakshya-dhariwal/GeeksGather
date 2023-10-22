import React, { useEffect, useState } from "react";
import Quiz from "react-quiz-component";
import { useAccount } from "wagmi";
import { useRoute } from "wouter";
import { TEST_QUESTION } from "../config";
import supabase from "../services/supabase";

function QuizPage() {
  const [questions, setQuestions] = useState(null);
  const { address } = useAccount();
  const [match, params] = useRoute("/community/:id/quiz");
  const getQuiz = async () => {
    // const data = await axios.post(API + "/gpt/quiz", { topic: "ReactJS" });
    // setQuestions(data?.data?.quiz);
    //dont use api for testing to save credits
    setQuestions(TEST_QUESTION);
  };
  useEffect(() => {
    getQuiz();
  }, []);
  const [event, setEvent] = React.useState([]);
  const fetchEvent = async () => {
    const { data, error } = await supabase
      .from("Events")
      .select("*")
      .eq("id", params.id);
    console.log({ error, data });
    setEvent(data?.[0]);
  };
  useEffect(() => {
    fetchEvent();
  }, []);
  const setQuizCompleted = async (percentage) => {
    if (percentage > 50) {
      console.log("You passed");
      //todo push notif
      console.log({ id: params.id, address });
      const { data, error } = await supabase
        .from("Events")
        .update([{ quiz_completed: [address, ...event.quiz_completed] }])
        .eq("id", params.id);
      console.log({ data, error });
    } else {
      console.log("You failed");
    }
  };

  const handleResult = (obj) => {
    const percentage = (obj.correctPoints / obj.totalPoints) * 100;
    setQuizCompleted(percentage);
  };
  const renderCustomResultPage = (obj) => {
    const percentage = (obj.correctPoints / obj.totalPoints) * 100;
    return (
      <div>
        <h1 className="text-white text-[3rem]">
          {percentage > 50
            ? "🎉 Congratulations you cleared the knowledge check"
            : "😅 Sorry! You failed the skill check."}
        </h1>

        <h2 className="mt-2 text-[2rem]">
          Score: {obj.correctPoints}/{obj.totalPoints}
        </h2>
      </div>
    );
  };

  return (
    <div className="max-w-[700px] mt-[10rem] mx-auto bg-[#0E1729]  relative group rounded-xl p-3 pt-3 w-fit border border-slate-800 ">
      {questions ? (
        <div>
          <Quiz
            quiz={{
              quizTitle: "Prove your Technical expertise to join the community",
              nrOfQuestions: questions.length,
              questions,
            }}
            onComplete={handleResult}
            showDefaultResult={false}
            customResultPage={renderCustomResultPage}
          />
        </div>
      ) : null}
    </div>
  );
}

export default QuizPage;
