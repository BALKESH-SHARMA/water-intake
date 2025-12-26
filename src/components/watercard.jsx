import React from 'react';

export default function WaterCard({ member, isExpanded, onToggle, onLogDelete, currentUserId, styles }) {
  const goal = member.goal || 2000;
  const total = member.total || 0;
  const isGoalMet = total >= goal;

  return (
    <div style={styles.card} onClick={onToggle}>
      <div style={styles.cardHeader}>
        {/* NEW WRAPPER FOR AVATAR + NAME */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* PHOTO AVATAR CIRCLE */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#f0f4f8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            border: '2px solid #fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            {member.avatar || '💧'}
          </div>

          {/* NAME AND STREAK COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong style={{color: isGoalMet ? '#2E7D32' : '#000', fontSize: '18px'}}>
                {member.name} {isGoalMet ? '✅' : ''}
              </strong>

              {member.streak > 0 && (
                <span style={{ 
                  backgroundColor: '#FFF3E0', 
                  color: '#E65100', 
                  padding: '2px 8px', 
                  borderRadius: '12px', 
                  fontSize: '12px', 
                  fontWeight: 'bold'
                }}>
                  🔥 {member.streak}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <span style={{color: '#444', fontWeight: '600'}}>{total} / {goal}ml</span>
      </div>
      
      <div style={styles.progressBg}>
        <div style={{ 
          ...styles.progressFill, 
          width: `${Math.min((total / goal) * 100, 100)}%`,
          backgroundColor: isGoalMet ? '#4CAF50' : '#2196F3' 
        }} />
      </div>

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