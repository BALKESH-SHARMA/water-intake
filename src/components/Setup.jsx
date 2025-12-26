import React, { useState } from 'react';

export default function Setup({ onJoin, styles }) {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('💧');
  
  const avatars = ['💧', '🥤', '🌊', '🐳', '🐧', '🌵', '❄️', '🥥'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onJoin(name.trim(), selectedAvatar);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f7f9',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#0D47A1', marginBottom: '10px' }}>Welcome!</h1>
        <p style={{ color: '#666', marginBottom: '25px', fontSize: '14px' }}>
          Pick an avatar and enter your name to start tracking.
        </p>
        
        <form onSubmit={handleSubmit}>
          {/* Avatar Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '12px', 
            marginBottom: '25px' 
          }}>
            {avatars.map(a => (
              <button
                key={a}
                type="button"
                onClick={() => setSelectedAvatar(a)}
                style={{
                  fontSize: '24px',
                  height: '60px',
                  borderRadius: '12px',
                  border: selectedAvatar === a ? '2px solid #2196F3' : '1px solid #eee',
                  backgroundColor: selectedAvatar === a ? '#E3F2FD' : '#fcfcfc',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {a}
              </button>
            ))}
          </div>

          <input
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '12px',
              border: '1px solid #ddd',
              marginBottom: '20px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box' // Essential for proper width
            }}
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            required
          />
          {/* Optional: Visual counter */}
<div style={{ fontSize: '10px', color: '#999', textAlign: 'right', marginTop: '4px' }}>
  {name.length}/20
</div>
          
          <button type="submit" style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Join Family
          </button>
        </form>
      </div>
    </div>
  );
}