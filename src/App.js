// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// ---- Pages ----
import Home from "./pages/Home";
import LearningZone from "./pages/LearningZone";
import BrainGames from "./pages/BrainGames";
import StoryWorld from "./pages/StoryWorld";
import CreativityStudio from "./pages/CreativityStudio";
// import NotFound from "./pages/NotFound";

// ---- Components ----
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ChildProgressProvider } from "./context/ChildProgressContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  return (<AuthProvider>
    <ChildProgressProvider>
      <div className="app-container">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learningzone" element={<LearningZone />} />
            <Route path="/braingames" element={<BrainGames />} />
            <Route path="/storyworld" element={<StoryWorld />} />
            <Route path="/creativitystudio" element={<CreativityStudio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </ChildProgressProvider>
  </AuthProvider>);
}

export default App;
