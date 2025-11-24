import React, { useState, useEffect } from "react";

export default function Announcements({ user }) {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState("");

  // Load saved notices
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notices")) || [];
    setNotices(saved);
  }, []);

  // Save notices to localStorage
  const saveNotices = (updated) => {
    setNotices(updated);
    localStorage.setItem("notices", JSON.stringify(updated));
  };

  // Add new notice (Admin only)
  const addNotice = () => {
    if (!newNotice.trim()) return;
    const updated = [
      ...notices,
      {
        text: newNotice,
        date: new Date().toLocaleString(),
        by: user?.name || "Admin"
      }
    ];
    saveNotices(updated);
    setNewNotice("");
  };

  return (
    <div className="card">
      <h2>📢 Announcements / Notice Board</h2>

      {/* Admin control */}
      {user?.role === "Admin" && (
        <div style={{ marginBottom: 20 }}>
          <h3>Create New Notice</h3>
          <textarea
            rows={3}
            placeholder="Enter notice..."
            value={newNotice}
            onChange={(e) => setNewNotice(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              background: "rgba(255,255,255,0.2)",
              borderRadius: 12,
              border: "1px solid var(--card-border)",
              color: "var(--text-color)"
            }}
          ></textarea>

          <button className="cta-primary" onClick={addNotice} style={{ marginTop: 10 }}>
            Add Notice
          </button>
        </div>
      )}

      {/* Notice List */}
      <div style={{ marginTop: 10 }}>
        {notices.length === 0 ? (
          <p>No notices yet.</p>
        ) : (
          notices
            .slice()
            .reverse()
            .map((n, i) => (
              <div
                key={i}
                className="notice-item"
                style={{
                  marginBottom: 12,
                  padding: 14,
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  border: "1px solid var(--card-border)"
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 600 }}>{n.text}</div>
                <div style={{ opacity: 0.7, marginTop: 6, fontSize: 13 }}>
                  Posted on: {n.date}
                </div>
                <div style={{ opacity: 0.6, fontSize: 12 }}>By: {n.by}</div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
