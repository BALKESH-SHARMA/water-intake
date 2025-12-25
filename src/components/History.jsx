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
  // Use the same IST logic here to match App.jsx
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  const handlePrev = () => {
    const d = new Date(viewDate);
    d.setDate(d.getDate() - 1);
    // Manual format to YYYY-MM-DD to keep en-CA style
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    onDateChange(`${year}-${month}-${day}`);
  };

  const handleNext = () => {
    if (viewDate === today) return;
    const d = new Date(viewDate);
    d.setDate(d.getDate() + 1);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    onDateChange(`${year}-${month}-${day}`);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Keeping the header here as requested */}
      <header style={styles.header}>
        <button onClick={handlePrev} style={styles.dateBtn}>◀</button>
        <div style={{ textAlign: 'center' }}>
          <h1 style={styles.title}>Family History</h1>
          <span style={styles.dateBadge}>
            {viewDate.trim() === today.trim() ? "Today" : viewDate}
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