import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import kid from "../assets/kid.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ new state for success messages

  const navigate = useNavigate();

  // Email Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Login Successful 🎉"); // show success on page
      setEmail("");
      setPassword("");

      // Optional: redirect after 2 seconds
      setTimeout(() => {
        navigate("/"); // redirect to home/dashboard
      }, 2000);
    } catch (err) {
      setError("Invalid Email or Password");
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setError("");
    setSuccess("");

    try {
      await signInWithPopup(auth, provider);
      setSuccess("Login Successful 🎉");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError("Google Login Failed");
    }
  };

  return (
    <div className="login-container">
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

          {/* ✅ Display messages */}
          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}
        </form>

        <p className="divider">or continue with</p>

        <button className="google-btn" onClick={handleGoogleLogin}>
          Login with Google
        </button>

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
