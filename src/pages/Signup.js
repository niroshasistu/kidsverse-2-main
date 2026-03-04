import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth,email,password);
      alert("Signup Successful 🎉");
      navigate("/");
    } 
    catch (err) {
      setError(err.message);
    }
  };

  return (

    <div className="signup-container">

      {/* Clouds */}
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>

      {/* Stars */}
      <div className="star" style={{top:"15%",left:"10%"}}>⭐</div>
      <div className="star" style={{top:"35%",right:"20%"}}>⭐</div>
      <div className="star" style={{bottom:"25%",left:"25%"}}>⭐</div>

      {/* Teddy */}
      <div className="teddy t1">🧸</div>
      <div className="teddy t2">🧸</div>

      {/* Balloons */}
      <div className="balloon balloon1"></div>
      <div className="balloon balloon2"></div>

      <div className="signup-card">

        <h2>Create Account ✨</h2>

        <form onSubmit={handleSignup}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            className="signup-input"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            className="signup-input"
          />

          <button type="submit" className="signup-button">
            Sign Up
          </button>

          {error && <p className="error-text">{error}</p>}

        </form>

        <p style={{marginTop:"15px"}}>
          Already have an account?{" "}
          <Link to="/login" style={{color:"#ff6b6b",fontWeight:"bold"}}>
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;