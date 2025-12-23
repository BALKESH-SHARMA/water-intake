import React from 'react';

export default function Setup({ onJoin, styles }) {
  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={{color: '#0D47A1', margin: '0 0 10px 0'}}>Family Water Tracker</h2>
          <p style={{color: '#666', fontSize: '14px'}}>Enter your name to join the family group.</p>
          <form onSubmit={(e) => {
            e.preventDefault();
            onJoin(e.target.name.value.trim());
          }} style={{marginTop: '20px'}}>
            <input name="name" placeholder="Your Name" required style={styles.input} />
            <button type="submit" style={styles.joinButton}>Join Family</button>
          </form>
        </div>
      </div>
    </div>
  );
}