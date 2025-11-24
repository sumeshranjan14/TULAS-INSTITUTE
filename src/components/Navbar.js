import React from "react";
import Logo from "../assets/tulas-logo.png";

export default function Navbar({ currentPage, setCurrentPage }) {
  const nav = ["home", "courses", "admissions", "campus", "contact"];

  return (
    <header className="navbar">
      <div className="brand-panel">
        <div className="brand-logo">
          <img src={Logo} alt="Tula's Institute Logo" />
        </div>

        <div className="brand-title">
          <div className="title">Tula’s Institute</div>
          <div className="sub">Dehradun — Estd. 2006</div>
        </div>
      </div>

      <nav className="nav-pills">
        {nav.map((p) => (
          <button
            key={p}
            className={currentPage === p ? "active" : ""}
            onClick={() => setCurrentPage(p)}
          >
            {p === "campus" ? "Campus Life" : p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </nav>
    </header>
  );
}
