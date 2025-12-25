import React from 'react';

export default function Leaderboard({ isOpen, onClose, familyData, styles }) {
  if (!isOpen) return null;

  // Sort by total intake descending and take top 3
  const leaders = [...familyData]
    .sort((a, b) => (b.total || 0) - (a.total || 0))
    .slice(0, 3);

  const icons = ['🥇', '🥈', '🥉'];

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={{...styles.card, width: '90%', maxWidth: '400px'}} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: '#0D47A1' }}>🏆 Top Performers</h2>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        {leaders.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>No data for today yet!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {leaders.map((person, index) => (
              <div key={person.id} style={styles.leaderRow}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '24px' }}>{icons[index]}</span>
                  <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{person.name}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 'bold', color: '#0D47A1' }}>{person.total} ml</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Goal: {person.goal}ml</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}