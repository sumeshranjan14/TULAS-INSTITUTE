import React, { useState } from "react";

export default function Courses(){
  const courses = [
    { name: "B.Tech — Computer Science", dur:"4 yrs", type:"UG" },
    { name: "B.Tech — Electronics", dur:"4 yrs", type:"UG" },
    { name: "BCA — Computer Applications", dur:"3 yrs", type:"UG" },
    { name: "MBA — Business Administration", dur:"2 yrs", type:"PG" },
    { name: "MCA — Computer Applications", dur:"2 yrs", type:"PG" },
  ];

  const [filter, setFilter] = useState("All");
  const filtered = filter==="All" ? courses : courses.filter(c=> c.type===filter);

  return (
    <div className="card">
      <h2>Programs & Courses</h2>

      <div className="filter-row">
        {["All","UG","PG"].map(f=>(
          <button key={f} className={`pill ${filter===f? 'active':''}`} onClick={()=> setFilter(f)}>{f}</button>
        ))}
      </div>

      <table className="courses-table">
        <thead>
          <tr><th>Program</th><th>Duration</th><th>Level</th></tr>
        </thead>
        <tbody>
          {filtered.map((c,i)=>(
            <tr key={i}>
              <td>{c.name}</td>
              <td>{c.dur}</td>
              <td>{c.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
