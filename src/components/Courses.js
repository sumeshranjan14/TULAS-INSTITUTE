// src/components/Courses.jsx
import React, { useEffect, useState } from "react";

/*
  Props:
    user: { name, role }
    isLoggedIn: boolean
*/

const SAMPLE_COURSES = [
  { id: "cse-btech", name: "B.Tech — Computer Science", duration: "4 yrs", type: "UG", teacher: "Dr. A. Kumar" },
  { id: "ece-btech", name: "B.Tech — Electronics", duration: "4 yrs", type: "UG", teacher: "Dr. S. Verma" },
  { id: "mba", name: "MBA — Business Administration", duration: "2 yrs", type: "PG", teacher: "Prof. R. Gupta" },
  { id: "mca", name: "MCA — Computer Applications", duration: "2 yrs", type: "PG", teacher: "Dr. N. Sharma" },
];

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

export default function Courses({ user, isLoggedIn }) {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("All");
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    // seed courses (only client-side; could be fetched)
    setCourses(SAMPLE_COURSES);
    setEnrollments(loadEnrollments());
  }, []);

  const filtered =
    filter === "All" ? courses : courses.filter((c) => c.type === filter);

  const isEnrolled = (courseId) => {
    if (!user || !user.name) return false;
    return enrollments.some((e) => e.courseId === courseId && e.studentName === user.name);
  };

  const enroll = (course) => {
    if (!isLoggedIn) {
      alert("Please login as a Student to enroll.");
      return;
    }
    if (!user || user.role !== "Student") {
      alert("Only users with Student role can enroll in courses.");
      return;
    }
    if (isEnrolled(course.id)) {
      alert("You are already enrolled in this course.");
      return;
    }

    const newEnrollment = {
      id: `${course.id}_${user.name}_${Date.now()}`,
      courseId: course.id,
      courseName: course.name,
      studentName: user.name,
      studentRole: user.role,
      enrolledAt: new Date().toLocaleString(),
    };

    const updated = [...enrollments, newEnrollment];
    setEnrollments(updated);
    saveEnrollments(updated);

    alert(`Enrolled successfully in ${course.name}`);
  };

  return (
    <div className="card">
      <h2>Programs & Courses</h2>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          {["All", "UG", "PG"].map((f) => (
            <button
              key={f}
              className={`pill ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
              style={{ marginRight: 8 }}
            >
              {f}
            </button>
          ))}
        </div>

        <div style={{ fontSize: 13, color: "var(--text-color)" }}>
          {isLoggedIn ? `Signed in as ${user.name} (${user.role})` : "Not signed in"}
        </div>
      </div>

      <table className="courses-table" style={{ borderRadius: 10, overflow: "hidden" }}>
        <thead>
          <tr>
            <th>Program</th>
            <th>Duration</th>
            <th>Type</th>
            <th>Teacher</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.duration}</td>
              <td>{c.type}</td>
              <td>{c.teacher || "-"}</td>
              <td style={{ textAlign: "center" }}>
                {isEnrolled(c.id) ? (
                  <button className="pill" style={{ cursor: "default" }} disabled>
                    Enrolled
                  </button>
                ) : (
                  <button
                    className="cta-primary"
                    onClick={() => enroll(c)}
                  >
                    Enroll
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
