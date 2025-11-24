import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Courses from "./components/Courses";
import Admissions from "./components/Admissions";
import CampusLife from "./components/CampusLife";
import Contact from "./components/Contact";

export default function App() {
  const themes = ["light", "dark", "aurora"];

  // Load preferred theme
  const getInitialTheme = () => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;

    // Auto-detect OS theme
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return systemPrefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme());
  const [currentPage, setCurrentPage] = useState("home");

  // Apply theme + store
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Cycle through themes
  const toggleTheme = () => {
    const next = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(next);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home": return <Home setCurrentPage={setCurrentPage} />;
      case "courses": return <Courses />;
      case "admissions": return <Admissions />;
      case "campus": return <CampusLife />;
      case "contact": return <Contact />;
      default: return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app-root">
      <div className="background-blob" />

      <div className="container">
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <main className="main-area">
          {currentPage === "home" ? (
            <>
              <Home setCurrentPage={setCurrentPage} />
              <section className="layout-grid">
                <Courses />
                <Admissions />
              </section>
              <section className="layout-grid">
                <CampusLife />
                <Contact />
              </section>
            </>
          ) : (
            <div className="single-page-wrap">{renderPage()}</div>
          )}
        </main>

        {/* Floating Theme Toggle */}
        <button className="floating-toggle" onClick={toggleTheme}>
          {theme === "light" && "🌙"}
          {theme === "dark" && "🎨"}
          {theme === "aurora" && "☀️"}
        </button>

      </div>
    </div>
  );
}
