import React from 'react';
import WaterCard from './watercard';

export default function History({ 
  viewDate, 
  onDateChange, 
  familyData, 
  expandedMember, 
  setExpandedMember, 
  onLogDelete, 
  currentUserId, 
  styles 
}) {
  const today = new Date().toISOString().split('T')[0];

  const handlePrev = () => {
    const d = new Date(viewDate);
    d.setDate(d.getDate() - 1);
    onDateChange(d.toISOString().split('T')[0]);
  };

  const handleNext = () => {
    if (viewDate === today) return;
    const d = new Date(viewDate);
    d.setDate(d.getDate() + 1);
    onDateChange(d.toISOString().split('T')[0]);
  };

  return (
    <div style={{ width: '100%' }}>
      <header style={styles.header}>
        <button onClick={handlePrev} style={styles.dateBtn}>◀</button>
        <div style={{ textAlign: 'center' }}>
          <h1 style={styles.title}>Family History</h1>
          <span style={styles.dateBadge}>
            {viewDate === today ? "Today" : viewDate}
          </span>
        </div>
        <button 
          onClick={handleNext} 
          style={{ ...styles.dateBtn, opacity: viewDate === today ? 0.3 : 1 }} 
          disabled={viewDate === today}
        >▶</button>
      </header>

      {familyData.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '40px', color: '#999' }}>
          No data recorded for this day.
        </p>
      ) : (
        familyData.map(member => (
          <WaterCard 
            key={member.id} 
            member={member} 
            isExpanded={expandedMember === member.id}
            onToggle={() => setExpandedMember(expandedMember === member.id ? null : member.id)}
            onLogDelete={onLogDelete}
            currentUserId={currentUserId}
            styles={styles}
          />
        ))
      )}
    </div>
  );
}