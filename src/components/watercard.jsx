import React from 'react';

export default function WaterCard({ member, isExpanded, onToggle, onLogDelete, currentUserId, styles }) {
  const goal = member.goal || 2000;
  const total = member.total || 0;
  const isGoalMet = total >= goal;

  return (
    <div style={styles.card} onClick={onToggle}>
      <div style={styles.cardHeader}>
        <strong style={{color: isGoalMet ? '#2E7D32' : '#000', fontSize: '18px'}}>
          {member.name} {isGoalMet ? '✅' : ''}
        </strong>
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