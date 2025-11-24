// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from "react";

const ENROLL_KEY = "enrollments";

function loadEnrollments() {
  try {
    return JSON.parse(localStorage.getItem(ENROLL_KEY)) || [];
  } catch {
    return [];
  }
}

function saveEnrollments(list) {
  localStorage.setItem(ENROLL_KEY, JSON.stringify(list));
}

export default function AdminDashboard({ user }) {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    setEnrollments(loadEnrollments());
  }, []);

  const removeEnrollment = (id) => {
    if (!confirm("Remove this enrollment?")) return;
    const updated = enrollments.filter((e) => e.id !== id);
    setEnrollments(updated);
    saveEnrollments(updated);
  };

  return (
    <div className="card">
      <h2>Admin Dashboard</h2>
      <p>Welcome, <strong>{user.name}</strong></p>

      <div style={{ marginTop: 12 }}>
        <h4>All Enrollments</h4>

        {enrollments.length === 0 ? (
          <p>No enrollments yet.</p>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {enrollments.slice().reverse().map((e) => (
              <div key={e.id} style={{ padding: 12, borderRadius: 10, background: "rgba(255,255,255,0.03)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{e.courseName}</div>
                  <div style={{ fontSize: 13, opacity: 0.8 }}>{e.studentName} — {e.enrolledAt}</div>
                </div>
                <div>
                  <button className="pill" onClick={() => removeEnrollment(e.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
