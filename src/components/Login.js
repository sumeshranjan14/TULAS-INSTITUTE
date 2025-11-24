// src/components/Login.jsx
import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [role, setRole] = useState("Student");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter your name.");
    onLogin({ role, name: name.trim() });
  };

  return (
    <div className="card" style={{ maxWidth: 520, margin: "12px auto" }}>
      <h2>Login</h2>
      <p style={{ marginTop: 0, color: "var(--text-color)" }}>
        Select your role and enter your name to continue.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label style={{ fontWeight: 600 }}>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ padding: 10, borderRadius: 10, border: "1px solid var(--card-border)" }}>
          <option>Student</option>
          <option>Teacher</option>
          <option>Admin</option>
        </select>

        <label style={{ fontWeight: 600 }}>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          style={{ padding: 10, borderRadius: 10, border: "1px solid var(--card-border)" }}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit" className="cta-primary" style={{ flex: 1 }}>
            Login as {role}
          </button>

          <button type="button" className="cta-ghost" style={{ flex: 1 }} onClick={() => { setRole("Student"); setName(""); }}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
