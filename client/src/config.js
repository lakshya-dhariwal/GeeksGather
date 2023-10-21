export const API = "http://localhost:8080/api";

export const TEST_QUESTION = [
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
  {
    question:
      "What is the purpose of the 'render' method in a React component?",
    questionType: "text",
    answerSelectionType: "single",
    answers: [
      "To update the component's state.",
      "To fetch data from an API.",
      "To define the UI of the component.",
      "To perform asynchronous operations.",
    ],
    correctAnswer: "2",
    messageForCorrectAnswer:
      "Correct! The 'render' method defines the UI of a React component.",
    messageForIncorrectAnswer: "Incorrect answer. Please try again.",
    explanation:
      "The 'render' method returns the JSX that represents the component's UI.",
    point: "10",
  },
  {
    question: "What is the purpose of 'props' in a React component?",
    questionType: "text",
    answerSelectionType: "single",
    answers: [
      "To store component state.",
      "To pass data from parent to child components.",
      "To handle user interactions.",
      "To define CSS styles.",
    ],
    correctAnswer: "1",
    messageForCorrectAnswer:
      "Correct! 'Props' are used to pass data from parent to child components.",
    messageForIncorrectAnswer: "Incorrect answer. Please try again.",
    explanation:
      "Props allow data to be passed into a component from its parent component.",
    point: "10",
  },
];
