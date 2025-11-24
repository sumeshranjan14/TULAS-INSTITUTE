import React from "react";
const LOGO = "/mnt/data/b1a74e76-92a2-40b1-a1ea-d447891afeeb.png";

export default function Home({ setCurrentPage }) {
  return (
    <section className="hero-card card">
      <div className="hero-left">
        <h1 className="hero-title">Learn. Build. Lead — at Tulas Institute</h1>
        <p className="hero-desc">Top-tier faculty, a modern campus in Dehradun, hands-on projects, and excellent placement support. Programs from undergraduate to postgraduate levels.</p>

        <div className="hero-cta">
          <button className="cta-primary" onClick={() => setCurrentPage("courses")}>Know More About Courses</button>
          <button className="cta-ghost" onClick={() => setCurrentPage("admissions")}>Admissions</button>
        </div>
      </div>

      <div className="hero-visual">
        <img src={LOGO} alt="campus" style={{width:'100%', height:'100%', objectFit:'cover'}} />
      </div>
    </section>
  );
}
