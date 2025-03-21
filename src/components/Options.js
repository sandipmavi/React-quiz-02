// import React from "react";

// export default function Options({ question, dispatch, answer }) {
//   const element = question.correct_answer;
//   const options = [...question.incorrect_answers, element];
//   console.log(options);

//   const hasAnswered = answer !== null;
//   const shuffleArray = (array) => {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = 2;

//       [array[i], array[j]] = [array[j], array[i]];
//     }
//   };
//   shuffleArray(options);
//   return (
//     <div className="options">
//       {options.map((option, index) => (
//         <button
//           className={`btn btn-option ${
//             options[index] === answer ? "answer" : ""
//           } ${
//             hasAnswered
//               ? index === question.correctOption
//                 ? "correct"
//                 : "wrong"
//               : ""
//           }`}
//           key={option}
//           onClick={() =>
//             dispatch({ type: "newAnswer", payload: options[index] })
//           }
//         >
//           {option}
//         </button>
//       ))}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";

export default function Options({ question, dispatch, answer }) {
  const element = question.correct_answer;
  const [options, setOptions] = useState([]);

  // Shuffle array function (only shuffle once per question)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index
      [array[i], array[j]] = [array[j], array[i]]; // Swap the elements
    }
    return array;
  };

  useEffect(() => {
    // Prepare options (incorrect_answers + correct_answer) and shuffle them
    const shuffledOptions = shuffleArray([
      ...question.incorrect_answers,
      element,
    ]);
    setOptions(shuffledOptions);
  }, [question, element]); // Re-run only when the question changes

  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option ${option === answer ? "answer" : ""} ${
            hasAnswered
              ? option === question.correct_answer
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: option })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
