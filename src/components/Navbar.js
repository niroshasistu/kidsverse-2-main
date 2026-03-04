import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/kidopia-logo.svg";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useAuth(); // ✅ check login state
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("👋 Logged out successfully!");
      navigate("/login");
      setMenuOpen(false);
    } catch (err) {
      console.error(err);
      alert("❌ Logout failed!");
    }
  };

  return (
    <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Kidopia Logo" className="logo-img" />
        </Link>
      </div>

      {/* Hamburger for mobile */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Links + Auth buttons */}
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/learningzone" onClick={() => setMenuOpen(false)}>Learning Zone</Link></li>
        <li><Link to="/braingames" onClick={() => setMenuOpen(false)}>Brain Games</Link></li>
        <li><Link to="/storyworld" onClick={() => setMenuOpen(false)}>Story World</Link></li>
        <li><Link to="/creativitystudio" onClick={() => setMenuOpen(false)}>Creativity Studio</Link></li>

        {/* ✅ Mobile auth buttons */}
        {!currentUser ? (
          <>
            <li className="mobile-auth">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="login-btn">
                Login
              </Link>
            </li>
            <li className="mobile-auth">
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="signup-btn">
                Sign Up
              </Link>
            </li>
          </>
        ) : (
          <li className="mobile-auth">
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </li>
        )}
      </ul>

      {/* Desktop auth buttons */}
      <div className="nav-right">
        {!currentUser ? (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;