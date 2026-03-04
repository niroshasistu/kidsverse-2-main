import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/kidopia-logo.svg";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth(); // ✅ get logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Kidopia Logo" className="logo-img" />
        </Link>
      </div>

      {/* Hamburger menu */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Navbar Links */}
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/learningzone" onClick={() => setMenuOpen(false)}>Learning Zone</Link></li>
        <li><Link to="/braingames" onClick={() => setMenuOpen(false)}>Brain Games</Link></li>
        <li><Link to="/storyworld" onClick={() => setMenuOpen(false)}>Story World</Link></li>
        <li><Link to="/creativitystudio" onClick={() => setMenuOpen(false)}>Creativity Studio</Link></li>

        {/* Mobile auth buttons */}
        {!user ? (
          <>
            <li className="mobile-auth">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="login-btn">Login</Link>
            </li>
            <li className="mobile-auth">
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="signup-btn">Sign Up</Link>
            </li>
          </>
        ) : (
          <li className="mobile-auth">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>

      {/* Desktop auth buttons */}
      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;