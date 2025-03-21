import { useEffect, useReducer } from "react";
import axios from "axios";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./startScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Timer from "./Timer";
import Footer from "./Footer";
import Start from "./Start";
import he from "he";

// const SECS = 30;
const initialState = {
  questions: [],

  //loading, error , ready, active, finished
  status: "choose",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  difficulty: "",
  category: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "setCategory":
      return {
        ...state,
        category: action.payload,
      };
    case "setDifficulty":
      return {
        ...state,
        difficulty: action.payload,
      };
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start-quiz":
      return {
        ...state,
        status: "ready",
      };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * 30,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      // console.log(question);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correct_answer
            ? state.points + 10
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points >= state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        status: "go",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      difficulty,
      category,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;

  const maxPossiblePoints = questions.length * 10;
  useEffect(() => {
    const fetchData = async () => {
      if (category && difficulty) {
        try {
          const response = await axios.get(
            `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
          );

          const data = response.data.results.map((elem) => ({
            ...elem,
            question: he.decode(elem.question),
          }));

          dispatch({ type: "dataReceived", payload: data });
        } catch (err) {
          dispatch({ type: "dataFailed" });
        }
      }
    };

    fetchData();
  }, [difficulty, category]);
  console.log(questions);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "choose" && (
          <Start
            dispatch={dispatch}
            category={category}
            difficulty={difficulty}
          />
        )}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}

        {questions.length !== 0 && status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
            difficulty={difficulty}
            category={category}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
