// src/App.js
import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Courses from "./components/Courses";
import Admissions from "./components/Admissions";
import CampusLife from "./components/CampusLife";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot"
import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Announcements from "./components/Announcements";


export default function App() {
  const themes = ["light", "dark", "aurora"];

  const getInitialTheme = () => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return systemPrefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme());
  const [currentPage, setCurrentPage] = useState("home");

  // auth-ish state (local)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: "", role: "" });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  //Auto-Insert Sample notices 
  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("notices"));
  if (!saved || saved.length === 0) {
    const sample = [
      { text: "📘 Mid-Semester Exams start from 10 March.", date: new Date().toLocaleString(), by: "Admin" },
      { text: "🗓️ Last date for Fee Payment: 28 February.", date: new Date().toLocaleString(), by: "Admin" },
      { text: "🎓 Registration for TechFest closes on 5 March.", date: new Date().toLocaleString(), by: "Admin" }
    ];
    localStorage.setItem("notices", JSON.stringify(sample));
  }
}, []);


  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : t === "dark" ? "aurora" : "light"));
  };

  const handleLogin = ({ role, name }) => {
    setUser({ name, role });
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ name: "", role: "" });
    setCurrentPage("home");
  };

  const renderPage = () => {
    if (isLoggedIn && currentPage === "dashboard") {
      if (user.role === "Student") return <StudentDashboard user={user} />;
      if (user.role === "Teacher") return <TeacherDashboard user={user} />;
      if (user.role === "Admin") return <AdminDashboard user={user} />;
    }

    switch (currentPage) {
      case "home": return <Home setCurrentPage={setCurrentPage} />;
      case "courses": return <Courses />;
      case "admissions": return <Admissions />;
      case "campus": return <CampusLife />;
      case "contact": return <Contact />;
      case "notices": return <Announcements user={user} />;
      case "login": return <Login onLogin={handleLogin} />;
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
          isLoggedIn={isLoggedIn}
          user={user}
          onLogout={handleLogout}
        />

        <main className="main-area">
          {currentPage === "home" ? (
            <>
              <Home setCurrentPage={setCurrentPage} />
              <section className="layout-grid">
               <Courses user={user} isLoggedIn={isLoggedIn} />

                <Admissions />
              </section>
              <section className="layout-grid">
                <CampusLife />
                <Contact />
              </section>
            </>
          ) : (
            <div style={{ marginTop: 12 }}>{renderPage()}</div>
          )}
        </main>

        <Footer />
        <Chatbot />

        <button className="floating-toggle" onClick={toggleTheme} aria-label="Change theme">
          {theme === "light" && "🌙"}
          {theme === "dark" && "🎨"}
          {theme === "aurora" && "☀️"}
        </button>
      </div>
    </div>
  );
}
