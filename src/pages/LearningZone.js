// src/pages/LearningZone.js
import React, { useState, useEffect, useRef, useContext } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ check if logged in
import { useNavigate } from "react-router-dom";
import "./LearningZone.css";
import bg1 from "../assets/bg1.jpg";
import bg2 from "../assets/bg2.jpg";
import bg3 from "../assets/bg3.jpg";
import { ChildProgressContext } from "../context/ChildProgressContext";

// Data
const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const numbers = Array.from({ length: 1000 }, (_, i) => i + 1);
const tables = Array.from({ length: 20 }, (_, i) => i + 1);
const shapes = ["circle", "triangle", "square", "rectangle", "oval", "rhombus"];
const colors = ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink"];
const bgImages = [bg1, bg2, bg3];

// Generate math questions
const generateQuestion = (type) => {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  switch (type) {
    case "addition": return { question: `${a} + ${b}`, answer: a + b };
    case "subtraction": return { question: `${a + b} - ${a}`, answer: b };
    case "multiplication": return { question: `${a} × ${b}`, answer: a * b };
    case "division": return { question: `${a * b} ÷ ${a}`, answer: b };
    default: return { question: "0 + 0", answer: 0 };
  }
};

// SumPractice Component
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
    <div className="table-card">
      <h4>Question: {current.question} = ?</h4>
      <input
        type="number"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Your answer"
      />
      <div className="sum-buttons">
        <button onClick={checkAnswer}>Check</button>
        <button onClick={nextQuestion}>Next</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

// LearningZone Page
const LearningZone = () => {
  const { user } = useAuth(); // ✅ check login
  const navigate = useNavigate();
  const { progress, updateProgress } = useContext(ChildProgressContext);

  const [stage, setStage] = useState(null);
  const [currentBg, setCurrentBg] = useState(0);
  const [sumType, setSumType] = useState(null);

  const contentRef = useRef(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
      alert("Please login to access Learning Zone! 🌟");
    }
  }, [user, navigate]);

  // Background slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Voice
  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 1.2;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  // Choose stage
  const handleExplore = (value) => {
    setStage(value);
    updateProgress("stars", 1);
    setTimeout(() => contentRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
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
                  <button onClick={() => handleExplore(index + 1)}>Let's Learn</button>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="content-section" ref={contentRef}>
        <div className="stars-display">⭐⭐ {progress.stars} Stars Earned ⭐⭐</div>

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
            <h2>Numbers</h2>
            <div className="learning-grid">
              {numbers.slice(0, 100).map((num) => (
                <div
                  key={num}
                  className="learning-card"
                  onMouseEnter={() => speakText(num.toString())}
                >
                  {num}
                </div>
              ))}
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
                  <h4>Table of {num}</h4>
                  <ul>
                    {Array.from({ length: 10 }, (_, i) => (
                      <li key={i}>{num} × {i + 1} = {num * (i + 1)}</li>
                    ))}
                  </ul>
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
              {shapes.map((shape) => (
                <div
                  key={shape}
                  className="shape-card"
                  onMouseEnter={() => speakText(shape)}
                >
                  <div className={shape}></div>
                  <p>{shape}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Colors */}
        {stage === 5 && (
          <>
            <h2>Colors</h2>
            <div className="learning-grid">
              {colors.map((color) => (
                <div
                  key={color}
                  className="learning-card"
                  onMouseEnter={() => speakText(color)}
                >
                  <div
                    style={{
                      backgroundColor: color.toLowerCase(),
                      height: "60px",
                      width: "60px",
                      borderRadius: "10px",
                      margin: "auto",
                    }}
                  />
                  <p>{color}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Sums */}
        {stage === 6 && (
          <>
            <h2>Sums (Practice Time)</h2>
            <div className="learning-grid">
              {["addition", "subtraction", "multiplication", "division"].map((type) => (
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
              ))}
            </div>

            {sumType && <SumPractice type={sumType} updateProgress={updateProgress} />}
          </>
        )}
      </section>
    </>
  );
};

export default LearningZone;