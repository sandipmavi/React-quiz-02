import React from "react";

export default function StartScreen({
  numQuestions,
  dispatch,
  category,
  difficulty,
}) {
  
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{numQuestions} question to test your React mastery</h3>

      <button
       
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}
