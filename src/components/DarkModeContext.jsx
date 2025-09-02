/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";

// Context untuk Dark Mode
const DarkModeContext = createContext();

// Hook untuk menggunakan Dark Mode
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};

// Provider untuk Dark Mode
export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("darkMode");
      return saved ? JSON.parse(saved) : true; // Default dark mode aktif
    } catch (error) {
      return true;
    }
  });

  // Simpan preferensi ke localStorage setiap kali berubah
  useEffect(() => {
    try {
      localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    } catch (error) {
      console.warn("Gagal menyimpan preferensi dark mode");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Value yang dibagikan ke komponen lain
  const value = {
    isDarkMode,
    toggleDarkMode,
    getBackgroundClass: () =>
      isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900",
    getCardClass: () =>
      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
    getTextClass: () => (isDarkMode ? "text-white" : "text-gray-900"),
    getSecondaryTextClass: () =>
      isDarkMode ? "text-gray-300" : "text-gray-600",
    getHoverClass: () =>
      isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50",
    getBorderClass: () => (isDarkMode ? "border-gray-700" : "border-gray-200"),
  };

  return (
    <div className={isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}>
      <DarkModeContext.Provider value={value}>
        {children}
      </DarkModeContext.Provider>
    </div>
  );
};
