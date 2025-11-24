import React, { useState } from "react";

export default function CampusLife() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    { q: "Does the college have hostels?", a: "Yes — well-maintained hostels with WiFi & mess." },
    { q: "Are sports available?", a: "Multiple outdoor & indoor courts and a gym." },
    { q: "What about fests?", a: "Annual tech & cultural fests with large participation." },
  ];

  return (
    <div className="card">
      <h2>Campus Life</h2>

      <ul style={{ lineHeight: "1.9", marginLeft: "18px", color: "var(--text-color)" }}>
        <li>Hostel Facilities</li>
        <li>Library & Study Zones</li>
        <li>Sports & Fitness Areas</li>
        <li>Tech Fests & Cultural Events</li>
      </ul>

      <div className="campus-faq">
        <h3 style={{ marginTop: 16 }}>FAQ</h3>
        {faqs.map((f, i) => (
          <div key={i} style={{ marginTop: 8 }}>
            <div
              className="faq-question"
              onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              role="button"
              tabIndex={0}
            >
              <strong>{f.q}</strong>
              <span className={`faq-toggle ${openFAQ === i ? "open" : ""}`}>▸</span>
            </div>

            {openFAQ === i && (
              <div className="faq-answer">
                <p style={{ opacity: 0.9 }}>{f.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
