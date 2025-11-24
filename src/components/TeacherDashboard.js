// src/components/TeacherDashboard.jsx
import React, { useEffect, useState } from "react";

const ENROLL_KEY = "enrollments";

function loadEnrollments() {
  try {
    return JSON.parse(localStorage.getItem(ENROLL_KEY)) || [];
  } catch {
    return [];
  }
}

// If you want to associate courses with teachers, we assume sample course list
const SAMPLE_COURSES = [
  { id: "cse-btech", name: "B.Tech — Computer Science", teacher: "Dr. A. Kumar" },
  { id: "ece-btech", name: "B.Tech — Electronics", teacher: "Dr. S. Verma" },
  { id: "mba", name: "MBA — Business Administration", teacher: "Prof. R. Gupta" },
  { id: "mca", name: "MCA — Computer Applications", teacher: "Dr. N. Sharma" },
];

export default function TeacherDashboard({ user }) {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const all = loadEnrollments();
    setEnrollments(all);
  }, []);

  // Filter courses for which this teacher is responsible (optional mapping)
  // If your courses have teacher names, match by user.name
  const myCourses = SAMPLE_COURSES.filter((c) => c.teacher === user.name);

  // If teacher name doesn't match sample, show all courses and students
  const coursesToShow = myCourses.length > 0 ? myCourses : SAMPLE_COURSES;

  return (
    <div className="card">
      <h2>Teacher Dashboard</h2>
      <p>Welcome, <strong>{user.name}</strong></p>

      <div style={{ marginTop: 12 }}>
        <h4>Enrolled Students</h4>

        {coursesToShow.map((course) => {
          const students = enrollments.filter((e) => e.courseId === course.id);
          return (
            <div key={course.id} style={{ marginBottom: 14, padding: 12, borderRadius: 10, background: "rgba(255,255,255,0.03)" }}>
              <strong>{course.name}</strong> {course.teacher ? <span style={{ opacity: 0.7 }}> — {course.teacher}</span> : null}
              {students.length === 0 ? (
                <div style={{ marginTop: 8, color: "var(--text-color)" }}>No students enrolled yet.</div>
              ) : (
                <ul style={{ marginTop: 8 }}>
                  {students.map((s) => (
                    <li key={s.id}>{s.studentName} — Enrolled on {s.enrolledAt}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
