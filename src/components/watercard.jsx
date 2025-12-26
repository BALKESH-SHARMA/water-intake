import React from 'react';

export default function WaterCard({ member, isExpanded, onToggle, onLogDelete, currentUserId, styles }) {
  const goal = member.goal || 2000;
  const total = member.total || 0;
  const isGoalMet = total >= goal;
  const percentage = Math.min((total / goal) * 100, 100);

  return (
    <div style={styles.card} onClick={onToggle}>
      <div style={styles.cardHeader}>
        {/* AVATAR, NAME, AND STREAK WRAPPER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* PHOTO AVATAR CIRCLE */}
          <div style={{
            width: '44px', // Slightly larger for better tap target
            height: '44px',
            borderRadius: '50%',
            backgroundColor: '#f0f4f8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            border: '2px solid #fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            flexShrink: 0 // Prevents avatar from squishing
          }}>
            {member.avatar || '💧'}
          </div>

          {/* NAME AND STREAK COLUMN - FIXES ALIGNMENT */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', // Centers the group vertically
            minWidth: 0, // CRITICAL: Allows flex child to shrink below its content size
  flex: 1      // Takes up available middle space
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', // CRITICAL: Aligns Name and Fire emoji on the same baseline
              gap: '6px',
              flexWrap: 'wrap' // Allows streak to wrap on very small screens
            }}>
              <strong style={{
                color: isGoalMet ? '#2E7D32' : '#000', 
                fontSize: '17px',
                lineHeight: '1.2' // Prevents extra spacing
              }}>
                {member.name} {isGoalMet ? '✅' : ''}
              </strong>

              {member.streak > 0 && (
                <span style={{ 
                  backgroundColor: '#FFF3E0', 
                  color: '#E65100', 
                  padding: '2px 8px', 
                  borderRadius: '12px', 
                  fontSize: '11px', 
                  fontWeight: 'bold',
                  display: 'inline-flex',
                  alignItems: 'center', // Centers the 🔥 icon with the number
                  height: '20px' // Fixes the height of the badge
                }}>
                  🔥 {member.streak}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* TOTAL VS GOAL TEXT */}
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <span style={{color: '#444', fontWeight: '700', fontSize: '15px'}}>
            {total} <span style={{fontSize: '12px', fontWeight: '400', color: '#888'}}>/ {goal}ml</span>
          </span>
        </div>
      </div>
      
      {/* PROGRESS BAR */}
      <div style={styles.progressBg}>
        <div style={{ 
          ...styles.progressFill, 
          width: `${percentage}%`,
          backgroundColor: isGoalMet ? '#4CAF50' : '#2196F3' 
        }} />
      </div>

      {/* EXPANDED SECTION */}
      {isExpanded && (
        <div style={styles.detailsSection}>
          <h4 style={styles.detailsTitle}>Today's Activity:</h4>
          {member.logs ? Object.entries(member.logs).reverse().map(([logId, log]) => (
            <div key={logId} style={styles.logRow} onClick={(e) => e.stopPropagation()}>
              <span style={styles.logTime}>{log.time}</span>
              <span style={styles.logAmount}>+{log.amount}ml</span>
              {member.id === currentUserId && (
                <button onClick={() => onLogDelete(member.id, logId, log.amount)} style={styles.deleteBtn}>🗑️</button>
              )}
            </div>
          )) : <p style={{fontSize: '12px', color: '#999'}}>No logs today.</p>}
        </div>
      )}
      {!isExpanded && <p style={styles.tapHint}>Tap card for history</p>}
    </div>
  );
}