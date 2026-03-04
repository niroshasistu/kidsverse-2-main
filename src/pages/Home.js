import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { useAuth } from "../context/AuthContext";
import FloatingCalendar from "../components/FloatingCalendar";
const features = [
  { icon: "🔤", title: "Learning Zone", path: "/learningzone" },
  { icon: "🧠", title: "Brain Games", path: "/braingames" },
  { icon: "📚", title: "Story World", path: "/storyworld" },
  { icon: "🎨", title: "Creativity Studio", path: "/creativitystudio" },
];

const Home = () => {
  const { currentUser } = useAuth();   // get logged-in user
  const navigate = useNavigate();

  const handleFeatureClick = (path) => {
    if (!currentUser) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="home-wrapper">

   {/* HERO SECTION */}
<section className="hero-section">
  <div className="hero-content">
    <h1>Welcome to kidopia🌈</h1>
    <p>Learn • Play • Grow</p>

    {/* Explore Now button with auth check */}
    <button
      className="explore-btn"
      onClick={() => {
        if (!currentUser) {
          // Cute popup alert
          alert("👋 Oops! Please login first to explore KidsVerse!");
          navigate("/login"); // redirect to login
        } else {
          navigate("/learningzone"); // navigate to the Learning page
        }
      }}
      style={{
        padding: "12px 24px",
        fontSize: "16px",
        borderRadius: "15px",
        border: "none",
        background: "linear-gradient(135deg, #f6d365, #fda085)",
        color: "#333",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.3s",
      }}
      onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
    >
      Explore Now
    </button>
  </div>
</section>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="about-container">
          <h2>🌟 About KidsVerse</h2>
          <p className="about-description">
            KidsVerse is a joyful learning platform designed especially for children.
            We combine education, creativity, and fun to help kids learn while playing.
          </p>

          <div className="about-grid">
            <div className="about-card">
              <h3>🎯 Our Mission</h3>
              <p>
                To make learning interactive and exciting through stories,
                brain games, and creative activities.
              </p>
            </div>

            <div className="about-card">
              <h3>🌈 Our Vision</h3>
              <p>
                To build a safe and inspiring digital world where every child
                can explore and grow confidently.
              </p>
            </div>

            <div className="about-card">
              <h3>💡 What Makes Us Special</h3>
              <p>
                Fun learning modules, health tracking, eco awareness,
                and a talent showcase platform for kids.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section id="features" className="features-section">
        <h2>Explore Our World ✨</h2>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              onClick={() => handleFeatureClick(feature.path)}
              style={{ cursor: "pointer" }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section">
        <h2>Frequently Asked Questions ❓</h2>

        <div className="faq-container">
          <div className="faq-item">
            <h3>Is KidsVerse free to use?</h3>
            <p>Yes! KidsVerse provides free learning activities and games for children.</p>
          </div>

          <div className="faq-item">
            <h3>Is KidsVerse safe for children?</h3>
            <p>Absolutely. We provide a safe and friendly learning environment for kids.</p>
          </div>

          <div className="faq-item">
            <h3>What age group is KidsVerse for?</h3>
            <p>KidsVerse is designed for children between 4 to 12 years old.</p>
          </div>

          <div className="faq-item">
            <h3>Do we need to create an account?</h3>
            <p>You can explore many features without login, but account gives extra benefits.</p>
          </div>
        </div>
      </section>
      <FloatingCalendar />
    </div>
  );
};

export default Home;