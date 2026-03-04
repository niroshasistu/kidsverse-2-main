import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import kid from "../assets/kid.svg";
import cloud from "../assets/cloud.png";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Email Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Welcome to KidsVerse 🎉");
      navigate("/");
    } catch (err) {
      setError("Invalid Email or Password");
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      setError("Google Login Failed");
    }
  };

  return (
    <div className="login-container">

      {/* Sparkles */}
      <div className="sparkle s1">✨</div>
      <div className="sparkle s2">✨</div>
      <div className="sparkle s3">✨</div>

      {/* Teddy Bears */}
      <div className="teddy t1">🧸</div>
      <div className="teddy t2">🧸</div>
      <div className="teddy t3">🧸</div>

      <div className="rainbow"></div>
      <div className="balloon balloon1"></div>
      <div className="balloon balloon2"></div>
      <div className="balloon balloon3"></div>

      {/* Clouds */}
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>

      {/* Stars */}
      <div className="star" style={{ top: "20%", left: "15%" }}>⭐</div>
      <div className="star" style={{ top: "40%", left: "80%" }}>⭐</div>
      <div className="star" style={{ top: "70%", left: "25%" }}>⭐</div>

      {/* Bubbles */}
      <div className="bubble" style={{ left: "10%" }}></div>
      <div className="bubble" style={{ left: "40%" }}></div>
      <div className="bubble" style={{ left: "70%" }}></div>

      {/* Login Card */}
      <div className="login-card">

        <img src={kid} alt="Kids Character" className="kid-image" />

        <h2>🧸 KidsVerse Login</h2>
        <p className="welcome-text">Welcome Little Explorer!</p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />

          <button type="submit" className="login-button">
            🚀 Login
          </button>

          {error && <p className="error-text">{error}</p>}

        </form>

        <p className="divider">or continue with</p>

        <button className="google-btn" onClick={handleGoogleLogin}>
          Login with Google
        </button>

        {/* ✅ Sign Up link with bouncing teddy emoji */}
        <p className="signup-prompt">
          Don’t have an account?{" "}
          <span
            className="signup-link"
            onClick={() => navigate("/signup")}
            style={{
              color: "#ff6b6b",
              fontWeight: "bold",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            🧸 Sign Up
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;