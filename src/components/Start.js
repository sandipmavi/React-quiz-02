import React from "react";

const cats = [
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Entertainment: Books" },
  { id: 11, name: "Entertainment: Film" },
  { id: 12, name: "Entertainment: Music" },
  { id: 13, name: "Entertainment: Musicals & Theatres" },
  { id: 14, name: "Entertainment: Television" },
  { id: 15, name: "Entertainment: Video Games" },
  { id: 16, name: "Entertainment: Board Games" },
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Science: Computers" },
  { id: 19, name: "Science: Mathematics" },
  { id: 20, name: "Mythology" },
  { id: 21, name: "Sports" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 24, name: "Politics" },
  { id: 25, name: "Art" },
  { id: 26, name: "Celebrities" },
  { id: 27, name: "Animals" },
  { id: 28, name: "Vehicles" },
  { id: 29, name: "Entertainment: Comics" },
  { id: 30, name: "Science: Gadgets" },
  { id: 31, name: "Entertainment: Japanese Anime & Manga" },
  { id: 32, name: "Entertainment: Cartoon & Animations" },
];

const difficulties = ["easy", "medium", "hard"];

const Start = ({ dispatch, category, difficulty }) => {
  const canStart = category === null || difficulty.length === 0;
  return (
    <div className="select1">
      <div className="creds">
        {/* Dropdown for Category Selection */}
        <label>Select Category:</label>
        <select
          onChange={(e) =>
            dispatch({ type: "setCategory", payload: e.target.value })
          }
        >
          <option value="">Select a category</option>
          {cats.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <br />

        {/* Dropdown for Difficulty Levels */}
        <label>Select Difficulty:</label>
        <select
          onChange={(e) =>
            dispatch({ type: "setDifficulty", payload: e.target.value })
          }
        >
          <option value="">Select difficulty</option>
          {difficulties.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
      <button
        disabled={canStart}
        className="btn start-quiz-btn"
        onClick={() => dispatch({ type: "start-quiz" })}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Start;
