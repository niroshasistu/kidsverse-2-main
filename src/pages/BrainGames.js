import React, { useState, useEffect } from "react";
import "./BrainGames.css";

/* ✅ Import Images (Professional Way) */
import alphabetImg from "../assets/braingames/alphabet.png";
import numberImg from "../assets/braingames/number.png";
import shapeImg from "../assets/braingames/shape.png";
import colorImg from "../assets/braingames/color.png";

/* ---------- Game Data ---------- */

const alphabetObjects = [
  { name: "Apple", emoji: "🍎", letter: "A" },
  { name: "Ball", emoji: "⚽", letter: "B" },
  { name: "Cat", emoji: "🐱", letter: "C" },
  { name: "Dog", emoji: "🐶", letter: "D" },
];

const numberObjects = [
  { count: 1, emoji: "🍎" },
  { count: 2, emoji: "🍌🍌" },
  { count: 3, emoji: "🍓🍓🍓" },
  { count: 4, emoji: "🍇🍇🍇🍇" },
];

const shapes = [
  { name: "Circle", symbol: "⚪" },
  { name: "Triangle", symbol: "🔺" },
  { name: "Square", symbol: "⬛" },
  { name: "Star", symbol: "⭐" },
];

const colors = [
  { name: "Red", hex: "#ff0000" },
  { name: "Yellow", hex: "#ffff00" },
  { name: "Blue", hex: "#0000ff" },
  { name: "Green", hex: "#00ff00" },
];

const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

const BrainGames = () => {
  const [game, setGame] = useState(null);
  const [task, setTask] = useState({});
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [animate, setAnimate] = useState(false);

  const generateTask = () => {
    let currentTask;
    let allOptions = [];
    let correctAnswer;

    switch (game) {
      case "alphabet":
        currentTask =
          alphabetObjects[Math.floor(Math.random() * alphabetObjects.length)];
        allOptions = alphabetObjects.map((o) => o.letter);
        correctAnswer = currentTask.letter;
        break;

      case "number":
        currentTask =
          numberObjects[Math.floor(Math.random() * numberObjects.length)];
        allOptions = numberObjects.map((o) => o.count);
        correctAnswer = currentTask.count;
        break;

      case "shape":
        currentTask = shapes[Math.floor(Math.random() * shapes.length)];
        allOptions = shapes.map((s) => s.name);
        correctAnswer = currentTask.name;
        break;

      case "color":
        currentTask = colors[Math.floor(Math.random() * colors.length)];
        allOptions = colors.map((c) => c.name);
        correctAnswer = currentTask.name;
        break;

      default:
        break;
    }

    const uniqueOptions = [...new Set(allOptions)];
    let finalOptions = shuffleArray(uniqueOptions).slice(0, 4);

    if (!finalOptions.includes(correctAnswer)) {
      finalOptions[0] = correctAnswer;
    }

    setTask(currentTask);
    setOptions(shuffleArray(finalOptions));
    setMessage("");
  };

  useEffect(() => {
    if (game) generateTask();
  }, [game]);

  const handleClick = (option) => {
    let correct = false;

    switch (game) {
      case "alphabet":
        correct = option === task.letter;
        break;
      case "number":
        correct = option === task.count;
        break;
      case "shape":
        correct = option === task.name;
        break;
      case "color":
        correct = option === task.name;
        break;
      default:
        break;
    }

    if (correct) {
      setMessage("✅ Correct!");
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
        generateTask();
      }, 800);
    } else {
      setMessage("❌ Try Again!");
    }
  };

  const goBack = () => {
    setGame(null);
    setMessage("");
  };

  return (
    <div className="brain-games-container">
      <h1>🧠 Brain Games</h1>

      {!game && (
        <div className="zigzag-cards">

          <div className="zigzag-card">
            <div className="card-text">
              <h3>Alphabet Game</h3>
              <p>Learn letters with fun images and recognition.</p>
              <button onClick={() => setGame("alphabet")}>
                Let's Play
              </button>
            </div>
            <div className="card-image">
              <img src={alphabetImg} alt="Alphabet" />
            </div>
          </div>

          <div className="zigzag-card reverse">
            <div className="card-image">
              <img src={numberImg} alt="Numbers" />
            </div>
            <div className="card-text">
              <h3>Number Game</h3>
              <p>Understand counting and basic numbers.</p>
              <button onClick={() => setGame("number")}>
                Let's Play
              </button>
            </div>
          </div>

          <div className="zigzag-card">
            <div className="card-text">
              <h3>Shape Game</h3>
              <p>Recognize shapes in the world around you.</p>
              <button onClick={() => setGame("shape")}>
                Let's Play
              </button>
            </div>
            <div className="card-image">
              <img src={shapeImg} alt="Shapes" />
            </div>
          </div>

          <div className="zigzag-card reverse">
            <div className="card-image">
              <img src={colorImg} alt="Colors" />
            </div>
            <div className="card-text">
              <h3>Color Game</h3>
              <p>Identify colors with real examples.</p>
              <button onClick={() => setGame("color")}>
                Let's Play
              </button>
            </div>
          </div>

        </div>
      )}

      {game && (
        <div className="game-area">
          <button className="back-btn" onClick={goBack}>
            ⬅ Back
          </button>

          <div className={`question ${animate ? "pop" : ""}`}>
            {game === "alphabet" && (
              <>
                <h2>{task.emoji}</h2>
                <p>What letter does {task.name} start with?</p>
              </>
            )}

            {game === "number" && (
              <>
                <h2>{task.emoji}</h2>
                <p>How many objects are there?</p>
              </>
            )}

            {game === "shape" && (
              <>
                <h2>{task.symbol}</h2>
                <p>What shape is this?</p>
              </>
            )}

            {game === "color" && (
              <>
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    background: task.hex,
                    margin: "20px auto",
                    borderRadius: "12px",
                  }}
                />
                <p>What color is this?</p>
              </>
            )}
          </div>

          <div className="options">
            {options.map((opt, index) => (
              <button key={index} onClick={() => handleClick(opt)}>
                {opt}
              </button>
            ))}
          </div>

          <p className="message">{message}</p>
        </div>
      )}
    </div>
  );
};

export default BrainGames;