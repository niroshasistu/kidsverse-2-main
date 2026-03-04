import React, { createContext, useState } from "react";

export const ChildProgressContext = createContext();

export const ChildProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    learningTime: 0,
    completion: 0,
    stars: 0,
    alphabetsCount: 0,
    numbersCount: 0,
    tablesCount: 0,
    shapesCount: 0,
    colorsCount: 0,
  });

  const updateProgress = (field, value) => {
    setProgress((prev) => ({
      ...prev,
      [field]: prev[field] + value,
    }));
  };

  return (
    <ChildProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </ChildProgressContext.Provider>
  );
};
