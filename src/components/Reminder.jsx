import React from 'react';

export default function Reminder({ userName, show, onDismiss }) {
  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      backgroundColor: '#FFF9C4', color: '#F57F17',
      padding: '12px 20px', textAlign: 'center',
      fontSize: '14px', fontWeight: 'bold',
      borderBottom: '1px solid #FBC02D',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      gap: '10px', zIndex: 3000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      animation: 'slideDown 0.4s ease-out'
    }}>
      <span>🕒 Time to hydrate, {userName}! It's been a while.</span>
      <button 
        onClick={onDismiss}
        style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#F57F17' }}
      >✕</button>
    </div>
  );
}