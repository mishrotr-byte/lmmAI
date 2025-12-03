import React from 'react';
export default function Header({ onNavigate }){
  return (
    <div className="header">
      <div className="logo">
        <div className="dot"></div>
        <div>Mitrsht</div>
      </div>
      <div style={{display:'flex',gap:12}}>
        <button onClick={()=>onNavigate('home')} className="card" style={{padding:'8px 12px'}}>Home</button>
        <button onClick={()=>onNavigate('dashboard')} className="card" style={{padding:'8px 12px'}}>Dashboard</button>
        <button onClick={()=>onNavigate('profile')} className="card" style={{padding:'8px 12px'}}>Profile</button>
      </div>
    </div>
  );
}
