// src/pages/CreativityStudio.js
import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ auth check
import { useNavigate } from "react-router-dom";
import apple from "../assets/coloring/apple.png";
import car from "../assets/coloring/car.png";
import cat from "../assets/coloring/cat.png";
import dog from "../assets/coloring/dog.png";
import tree from "../assets/coloring/tree.png";
import unicorn from "../assets/coloring/unicorn.png";
import sun from "../assets/coloring/sun.png";
import star from "../assets/coloring/star.png";
import butterfly from "../assets/coloring/butterfly.png";
import flower from "../assets/coloring/flower.png";
import rocket from "../assets/coloring/rocket.png";
import fish from "../assets/coloring/fish.png";
import teddy from "../assets/coloring/teddy.png";

const images = [
  { name: "Apple", src: apple },
  { name: "Car", src: car },
  { name: "Cat", src: cat },
  { name: "Dog", src: dog },
  { name: "Tree", src: tree },
  { name: "Unicorn", src: unicorn },
  { name: "Sun", src: sun },
  { name: "Star", src: star },
  { name: "Butterfly", src: butterfly },
  { name: "Flower", src: flower },
  { name: "Rocket", src: rocket },
  { name: "Fish", src: fish },
  { name: "Teddy Bear", src: teddy },
];

const colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3"];

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "20px",
  border: "none",
  backgroundColor: "#ff6b6b",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px",
};

const CreativityStudio = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const canvasRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#FF0000");
  const [brushSize, setBrushSize] = useState(5);
  const [showAll, setShowAll] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
      alert("Please login to access Creativity Studio! 🖌️");
    }
  }, [user, navigate]);

  // Load image to canvas
  useEffect(() => {
    if (!selectedImage) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = selectedImage;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [selectedImage]);

  const startDrawing = (e) => {
    if (!selectedImage) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    if (!selectedImage) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.src = selectedImage;
    img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  const eraseMode = () => setColor("#FFFFFF");

  const downloadDrawing = () => {
    if (!selectedImage) return;
    const link = document.createElement("a");
    link.download = "my_coloring.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const displayedImages = showAll ? images : images.slice(0, 4);

  return (
    <div style={{ textAlign: "center", padding: "120px 50px 50px 50px", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "42px", color: "#ff4da6", fontWeight: "bold", marginBottom: "60px" }}>
        🖌️ Coloring Book
      </h1>

      {/* Instructions */}
      <div style={{ margin: "20px auto", padding: "15px", background: "#fff7e6", borderRadius: "10px", maxWidth: "600px", border: "1px solid #ffd08a" }}>
        <h3>How to Use</h3>
        <p>1. Select an image</p>
        <p>2. Pick color & brush</p>
        <p>3. Start drawing</p>
        <p>4. Download your artwork</p>
      </div>

      {/* Image Selection */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px", marginBottom: "20px" }}>
        {displayedImages.map((img) => (
          <div key={img.name} style={{ border: "2px solid #eee", borderRadius: "15px", padding: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", background: "#fff", transition: "transform 0.2s" }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={() => setSelectedImage(img.src)}
          >
            <img src={img.src} alt={img.name} width={150} height={150} style={{ borderRadius: "12px", cursor: "pointer" }} />
            <p>{img.name}</p>
          </div>
        ))}
      </div>

      {!showAll && (
        <button style={buttonStyle} onClick={() => setShowAll(true)}>Explore More</button>
      )}

      {/* Controls */}
      {selectedImage && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }}>
          <label>Brush Size: </label>
          <select value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))}>
            <option value={2}>Small</option>
            <option value={5}>Medium</option>
            <option value={10}>Large</option>
          </select>

          {/* Colors */}
          {colors.map((c) => (
            <div key={c} style={{ width: "30px", height: "30px", borderRadius: "50%", backgroundColor: c, cursor: "pointer", border: color === c ? "3px solid #000" : "2px solid #ccc" }}
              onClick={() => setColor(c)} />
          ))}

          {/* Buttons */}
          <button style={buttonStyle} onClick={eraseMode}>Eraser</button>
          <button style={buttonStyle} onClick={clearCanvas}>Clear</button>
          <button style={buttonStyle} onClick={downloadDrawing}>Download</button>
        </div>
      )}

      {/* Canvas */}
      {selectedImage && (
        <canvas ref={canvasRef} width={1000} height={600} style={{ border: "2px dashed #ccc", cursor: "crosshair", borderRadius: "15px", maxWidth: "100%" }}
          onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} />
      )}
    </div>
  );
};

export default CreativityStudio;