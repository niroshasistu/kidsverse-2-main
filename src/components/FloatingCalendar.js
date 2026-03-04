import React from "react";
import "./FloatingCalendar.css";

const FloatingCalendar = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();

  return (
    <div className="floating-calendar">
      <h2>{day}</h2>
      <p>{month}</p>
      <span>{year}</span>
    </div>
  );
};

export default FloatingCalendar;