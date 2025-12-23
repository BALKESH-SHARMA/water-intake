import React, { useState, useEffect } from 'react';
import { ref, onValue, update, increment, remove } from 'firebase/database';
import { db } from './firebase';
import Setup from './components/Setup';
import History from './components/History'; // Import the new component
import ManualInput from './components/ManualInput';
import { styles } from './styles';

function App() {
  const [familyData, setFamilyData] = useState([]);
  const [userName, setUserName] = useState(localStorage.getItem('water_name') || '');
  const [myGoal, setMyGoal] = useState(parseInt(localStorage.getItem('water_goal')) || 2000);
  const [showManual, setShowManual] = useState(false);
  const [expandedMember, setExpandedMember] = useState(null);
  
  // Track which date we are looking at
  const [viewDate, setViewDate] = useState(new Date().toISOString().split('T')[0]);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const dayRef = ref(db, `days/${viewDate}`);
    return onValue(dayRef, (snapshot) => {
      const data = snapshot.val();
      setFamilyData(data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : []);
    });
  }, [viewDate]); // Re-fetch when date changes

  const addWater = (amount) => {
    if (!userName || isNaN(amount) || amount <= 0) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userKey = userName.toLowerCase().trim();
    
    // We always log to TODAY, even if viewing history
    const updates = {};
    updates[`days/${today}/${userKey}/name`] = userName;
    updates[`days/${today}/${userKey}/total`] = increment(amount);
    updates[`days/${today}/${userKey}/goal`] = myGoal;
    updates[`days/${today}/${userKey}/logs/${Date.now()}`] = { amount, time };
    
    update(ref(db), updates);
    setShowManual(false);
    setViewDate(today); // Jump back to today to see the update
  };

  const deleteLog = (memberId, logId, amount) => {
    if (window.confirm("Delete this log?")) {
      remove(ref(db, `days/${viewDate}/${memberId}/logs/${logId}`));
      update(ref(db), { [`days/${viewDate}/${memberId}/total`]: increment(-amount) });
    }
  };

  if (!userName) return <Setup onJoin={(name) => { localStorage.setItem('water_name', name); setUserName(name); }} styles={styles} />;

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <History 
          viewDate={viewDate}
          onDateChange={setViewDate}
          familyData={familyData}
          expandedMember={expandedMember}
          setExpandedMember={setExpandedMember}
          onLogDelete={deleteLog}
          currentUserId={userName.toLowerCase()}
          styles={styles}
        />

        {/* Buttons are only useful if viewing TODAY */}
        {viewDate === today && (
          <div style={styles.fabContainer}>
            <button onClick={() => addWater(250)} style={styles.fab}>+250</button>
            <button onClick={() => addWater(500)} style={styles.fab}>+500</button>
            <button onClick={() => setShowManual(true)} style={{...styles.fab, backgroundColor: '#FF9800'}}>Custom</button>
          </div>
        )}

        {showManual && <ManualInput onAdd={addWater} onClose={() => setShowManual(false)} styles={styles} />}
      </div>
    </div>
  );
}

export default App;