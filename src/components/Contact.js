import React, { useState } from "react";

export default function Contact(){
  const [form, setForm] = useState({name:'', email:'', message:''});
  const [submitted, setSubmitted] = useState(false);

  const submit = (e)=> { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="card contact">
      <h2>Contact</h2>
      <div className="info contact-info">
        <div style={{fontWeight:700}}>Tulas Institute — Dehradun</div>
        <div style={{marginTop:6}}>Dhoolkot, Dehradun</div>
        <div>+91 12345 67890 • info@tulas.edu.in</div>
      </div>

      {submitted ? (
        <div style={{padding:12, borderRadius:8, background:'linear-gradient(90deg,#f0fbff,#f7f8ff)'}}>Thanks — we've received your message and will respond soon.</div>
      ) : (
        <form onSubmit={submit} style={{display:'flex', flexDirection:'column', gap:10, marginTop:8}}>
          <input placeholder="Name" value={form.name} onChange={(e)=> setForm({...form, name:e.target.value})} />
          <input placeholder="Email" value={form.email} onChange={(e)=> setForm({...form, email:e.target.value})} />
          <textarea rows={4} placeholder="Message" value={form.message} onChange={(e)=> setForm({...form, message:e.target.value})} />
          <button className="cta-primary" type="submit">Send Message</button>
        </form>
      )}
    </div>
  );
}
