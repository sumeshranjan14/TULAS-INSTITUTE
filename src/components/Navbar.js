// src/components/Navbar.jsx
import React from "react";
import Logo from "../assets/tulas-logo.png"; // ensure file present at src/assets/tulas-logo.png

export default function Navbar({ currentPage, setCurrentPage, isLoggedIn, user, onLogout }) {
  const nav = ["home", "courses", "admissions", "campus", "contact", "notices", "login"];


  return (
    <header className="navbar">
      <div className="brand-panel">
        <div className="brand-logo"><img src={Logo} alt="Tulas Logo" /></div>
        <div className="brand-title">
          <div className="title">Tulas Institute</div>
          <div className="sub">Dehradun — Estd. 2006</div>
        </div>
      </div>

      <nav className="nav-pills">
        {nav.map((p) => {
          if (p === "login") {
            return isLoggedIn ? (
              <div key="logged" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ padding: "8px 12px", borderRadius: 10, background: "transparent", fontWeight: 700 }}>
                  {user.role} • {user.name}
                </div>
                <button key="logout" onClick={onLogout} className="pill">Logout</button>
              </div>
            ) : (
              <button key={p} className={currentPage === p ? "active" : ""} onClick={() => setCurrentPage("login")}>
                Login
              </button>
            );
            
          }

          return (
            <button key={p} className={currentPage === p ? "active" : ""} onClick={() => setCurrentPage(p)}>
             {p === "campus" ? "Campus Life" : p === "notices" ? "Notices" : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
