import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <h3>KidsVerse 🌈</h3>
      <p>Learn • Play • Grow</p>

      <div className="footer-links">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Explore</a>
        <a href="#">FAQ</a>
      </div>

      <div className="footer-bottom">
        © 2026 KidsVerse. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;   // 👈 VERY IMPORTANT