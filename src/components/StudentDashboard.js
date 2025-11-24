// src/components/StudentDashboard.jsx
import React, { useEffect, useState } from "react";

const ENROLL_KEY = "enrollments";

function loadEnrollments() {
  try {
    return JSON.parse(localStorage.getItem(ENROLL_KEY)) || [];
  } catch {
    return [];
  }
}

export default function StudentDashboard({ user }) {
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    if (!user) return;
    const all = loadEnrollments();
    const mine = all.filter((e) => e.studentName === user.name);
    setMyCourses(mine);
  }, [user]);

  return (
    <div className="card">
      <h2>Student Dashboard</h2>
      <p>Welcome, <strong>{user.name}</strong></p>

      <div style={{ marginTop: 12 }}>
        <h4>Your Enrolled Courses</h4>
        {myCourses.length === 0 ? (
          <p>You have not enrolled in any courses yet.</p>
        ) : (
          <ul>
            {myCourses.map((c) => (
              <li key={c.id}>
                <strong>{c.courseName}</strong> — Enrolled on {c.enrolledAt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
