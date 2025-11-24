import React, { useState } from "react";

export default function Admissions(){
  const [percent, setPercent] = useState('');
  const [result, setResult] = useState('');

  const check = ()=> {
    const n = Number(percent);
    if(!percent) return setResult('Enter 12th %');
    if(isNaN(n)) return setResult('Enter a valid number');
    setResult(n >= 60 ? 'Eligible for admission' : 'Not eligible — need 60%+');
  };

  return (
    <div className="card">
      <h2>Admissions</h2>

      <ol className="adm-list">
        <li>Fill application</li>
        <li>Shortlisting / Entrance</li>
        <li>Document verification</li>
        <li>Fee & confirmation</li>
      </ol>

      <div className="eligibility-row">
        <input type="number" placeholder="12th % (e.g. 78)" value={percent} onChange={(e)=> setPercent(e.target.value)} />
        <button className="cta-primary" onClick={check}>Check</button>
      </div>

      {result && <p style={{marginTop:12, fontWeight:700, color:'#114b63'}}>{result}</p>}
    </div>
  );
}
