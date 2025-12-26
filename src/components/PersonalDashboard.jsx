import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';

const getLast7Days = () => {
  return [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(d);
  }).reverse(); // Order from oldest to newest
};
export default function PersonalDashboard({ userName, db, styles }) {
  const [weeklyData, setWeeklyData] = useState([]);
  const userKey = userName.toLowerCase().trim();

  useEffect(() => {
    const fetchData = async () => {
      const dates = getLast7Days();
      const results = await Promise.all(
        dates.map(async (date) => {
          const snapshot = await get(ref(db, `days/${date}/${userKey}`));
          const val = snapshot.val();
          return {
            date: date.split('-').slice(1).join('/'), // Format MM/DD
            total: val?.total || 0,
            goal: val?.goal || 2000,
            met: val?.total >= (val?.goal || 2000)
          };
        })
      );
      setWeeklyData(results);
    };
    fetchData();
  }, [userName, db]);

  return (
    <div style={{ ...styles.card, cursor: 'default' }}>
      <h3 style={{ color: '#0D47A1', marginTop: 0 }}>Weekly Performance</h3>
      
      {/* 1. Consistency Score (Checkboxes) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {weeklyData.map((d, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: '#888', marginBottom: '4px' }}>{d.date}</div>
            <div style={{ fontSize: '18px' }}>{d.met ? '✅' : '❌'}</div>
          </div>
        ))}
      </div>

      {/* 2. Simple CSS Bar Chart */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-end', 
        justifyContent: 'space-between', 
        height: '120px', 
        paddingTop: '20px' 
      }}>
        {weeklyData.map((d, i) => {
          const height = Math.min((d.total / d.goal) * 100, 100);
          return (
            <div key={i} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ 
                height: `${height}px`, 
                backgroundColor: d.met ? '#4CAF50' : '#2196F3',
                margin: '0 4px',
                borderRadius: '4px 4px 0 0',
                transition: 'height 0.5s ease'
              }} />
              <div style={{ fontSize: '9px', color: '#666', marginTop: '5px' }}>{d.total}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}