import React, { useState, useEffect, useRef, useContext } from "react";
import "./LearningZone.css";
import bg1 from "../assets/bg1.jpg";
import bg2 from "../assets/bg2.jpg";
import bg3 from "../assets/bg3.jpg";
import { ChildProgressContext } from "../context/ChildProgressContext";

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const numbers = Array.from({ length: 1000 }, (_, i) => i + 1);
const tables = Array.from({ length: 20 }, (_, i) => i + 1);

const bgImages = [bg1, bg2, bg3];

// Sum generators
const generateQuestion = (type) => {
  let a = Math.floor(Math.random() * 10) + 1;
  let b = Math.floor(Math.random() * 10) + 1;

  switch (type) {
    case "addition":
      return { question: `${a} + ${b}`, answer: a + b };
    case "subtraction":
      return { question: `${a + b} - ${a}`, answer: b };
    case "multiplication":
      return { question: `${a} × ${b}`, answer: a * b };
    case "division":
      return { question: `${a * b} ÷ ${a}`, answer: b };
    default:
      return { question: "0 + 0", answer: 0 };
  }
};

// Interactive Sum Practice
const SumPractice = ({ type, updateProgress }) => {
  const [current, setCurrent] = useState(generateQuestion(type));
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");

  const checkAnswer = () => {
    if (parseInt(userAnswer) === current.answer) {
      setMessage("🎉 Correct! Great Job!");
      updateProgress("stars", 1);
    } else {
      setMessage("❌ Try Again!");
    }
  };

  const nextQuestion = () => {
    setCurrent(generateQuestion(type));
    setUserAnswer("");
    setMessage("");
  };

  return (
    <div className="table-card" style={{ marginTop: "20px", textAlign: "center" }}>
      <h4>Question: {current.question} = ?</h4>

      <input
        type="number"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Your answer"
        style={{ padding: "8px", marginTop: "10px" }}
      />

      <div style={{ marginTop: "10px" }}>
        <button className="hero-card button" onClick={checkAnswer}>
          Check
        </button>
        <button className="hero-card button" onClick={nextQuestion}>
          Next
        </button>
      </div>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
};

const LearningZone = () => {
  const { progress, updateProgress } = useContext(ChildProgressContext);

  const [stage, setStage] = useState(null);
  const [currentBg, setCurrentBg] = useState(0);
  const contentRef = useRef(null);
  const [expandedTables, setExpandedTables] = useState([]);
  const [sumType, setSumType] = useState(null);
  const [numPage, setNumPage] = useState(0);
  const numbersPerPage = 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleExplore = (value) => {
    setStage(value);
    updateProgress("stars", 1);

    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const toggleTable = (num) => {
    setExpandedTables((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };
  // 🔊 Voice Function
  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 0.9;   // speed
    speech.pitch = 1.2;  // voice tone
    window.speechSynthesis.cancel(); // stop previous voice
    window.speechSynthesis.speak(speech);
  };
  return (
    <>
      {/* HERO SECTION */}
      <section
        className="learning-hero-section"
        style={{ backgroundImage: `url(${bgImages[currentBg]})` }}
      >
        <div className="hero-overlay">
          <h1>🎓 Welcome to Learning Zone</h1>
          <p>Choose what you want to learn today!</p>

          <div className="hero-cards">
            {["Alphabets", "Numbers", "Tables", "Shapes", "Colors", "Sums"].map(
              (item, index) => (
                <div className="hero-card" key={item}>
                  <h3>{item}</h3>
                  <button onClick={() => handleExplore(index + 1)}>
                    Let's Learn
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="content-section" ref={contentRef}>

        {/* ⭐ BIG GLOWING STARS */}
        <div className="stars-display">
          ⭐⭐ {progress.stars} Stars Earned ⭐⭐
        </div>

        {/* Alphabets */}
        {stage === 1 && (
          <>
            <h2>Alphabets</h2>
            <div className="learning-grid">
              {alphabets.map((letter) => (
                <div
                  key={letter}
                  className="learning-card"
                  onMouseEnter={() => speakText(letter)}
                >
                  {letter}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Numbers */}
        {stage === 2 && (
          <>
            <h2>Numbers (Page {numPage + 1})</h2>
            <div className="learning-grid">
              {numbers
                .slice(numPage * numbersPerPage, (numPage + 1) * numbersPerPage)
                .map((num) => (
                  <div
                    key={num}
                    className="learning-card"
                    onMouseEnter={() => speakText(num.toString())}
                  >
                    {num}
                  </div>
                ))}
            </div>

            <div style={{ marginTop: "20px" }}>
              <button
                className="hero-card button"
                disabled={numPage === 0}
                onClick={() => setNumPage((prev) => prev - 1)}
              >
                ◀ Previous
              </button>

              <button
                className="hero-card button"
                disabled={(numPage + 1) * numbersPerPage >= numbers.length}
                onClick={() => setNumPage((prev) => prev + 1)}
              >
                Next ▶
              </button>
            </div>
          </>
        )}

        {/* Tables */}
        {stage === 3 && (
          <>
            <h2>Multiplication Tables</h2>
            <div className="tables-grid">
              {tables.map((num) => (
                <div key={num} className="table-card">
                  <h4 onClick={() => toggleTable(num)}>
                    Table of {num} {expandedTables.includes(num) ? "▲" : "▼"}
                  </h4>
                  {expandedTables.includes(num) && (
                    <ul>
                      {Array.from({ length: 10 }, (_, i) => (
                        <li key={i}>
                          {num} × {i + 1} = {num * (i + 1)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Shapes */}
        {stage === 4 && (
          <>
            <h2>Shapes</h2>
            <div className="learning-grid">
              {["circle", "triangle", "square", "rectangle", "oval", "rhombus"].map(
                (shape) => (
                  <div
                    key={shape}
                    className="shape-card"
                    onMouseEnter={() => speakText(shape)}
                  >
                    <div className={shape}></div>
                    <p className="shape-name">{shape}</p>
                  </div>
                )
              )}
            </div>
          </>
        )}

        {/* Colors */}
        {stage === 5 && (
          <>
            <h2>Colors</h2>
            <div className="learning-grid">
              {["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink"].map(
                (color) => (
                  <div
                    key={color}
                    className="learning-card"
                    onMouseEnter={() => speakText(color)}
                  >
                    <div
                      style={{
                        backgroundColor: color.toLowerCase(),
                        height: "60px",
                        borderRadius: "10px",
                        width: "60px",
                        margin: "auto",
                      }}
                    ></div>
                    <p style={{ fontSize: "14px", marginTop: "8px" }}>{color}</p>
                  </div>
                )
              )}
            </div>
          </>
        )}

        {/* Sums */}
        {stage === 6 && (
          <>
            <h2>Sums (Practice Time)</h2>

            <div className="learning-grid">
              {["addition", "subtraction", "multiplication", "division"].map(
                (type) => (
                  <div
                    key={type}
                    className="learning-card"
                    onClick={() => setSumType(type)}
                  >
                    {type === "addition" && "➕ Addition"}
                    {type === "subtraction" && "➖ Subtraction"}
                    {type === "multiplication" && "✖️ Multiplication"}
                    {type === "division" && "➗ Division"}
                  </div>
                )
              )}
            </div>

            {sumType && (
              <SumPractice type={sumType} updateProgress={updateProgress} />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default LearningZone;