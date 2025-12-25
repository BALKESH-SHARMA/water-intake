import React, { useState, useEffect } from 'react';
import { ref, onValue, update, increment, remove } from 'firebase/database';
import { db } from './firebase';
import Setup from './components/Setup';
import History from './components/History'; // Import the new component
import ManualInput from './components/ManualInput';
import { styles } from './styles';
import Navigation from './components/Navigation';
const getISTDate = () => {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
  };
function App() {
  const [familyData, setFamilyData] = useState([]);
  const [userName, setUserName] = useState(localStorage.getItem('water_name') || '');
  const [myGoal, setMyGoal] = useState(() => {
    const saved = localStorage.getItem('water_goal');
    return saved ? Math.max(parseInt(saved), 2000) : 2000;
  });
  const [showManual, setShowManual] = useState(false);
  const [expandedMember, setExpandedMember] = useState(null);

  
  const today = getISTDate();
  // Track which date we are looking at
  const [viewDate, setViewDate] = useState(today);
  // const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const dayRef = ref(db, `days/${viewDate}`);
    return onValue(dayRef, (snapshot) => {
      const data = snapshot.val();
      setFamilyData(data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : []);
    });
  }, [viewDate]); // Re-fetch when date changes

  const addWater = (amount) => {
    if (!userName || isNaN(amount) || amount <= 0) return;
    // const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const time = new Date().toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
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

  const handleGoalUpdate = (newVal) => {
    setMyGoal(newVal);
    localStorage.setItem('water_goal', newVal);
    update(ref(db, `days/${today}/${userName.toLowerCase()}`), { goal: newVal });
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

      <Navigation
        myGoal={myGoal}
        onGoalUpdate={handleGoalUpdate}
        familyData={familyData}
        styles={styles}
      />
      <div style={styles.container}>
        <main style={styles.scrollContent}>
          {/* CRITICAL: This spacer prevents the overlap */}
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
        </main>

        {/* Buttons are only useful if viewing TODAY */}
        {viewDate === today && (
          <div style={styles.fabContainer}>
            <button onClick={() => addWater(250)} style={styles.fab}>+250</button>
            <button onClick={() => addWater(500)} style={styles.fab}>+500</button>
            <button onClick={() => setShowManual(true)} style={{ ...styles.fab, backgroundColor: '#FF9800' }}>Custom</button>
          </div>
        )}

        {showManual && <ManualInput onAdd={addWater} onClose={() => setShowManual(false)} styles={styles} />}
      </div>
    </div>
  );
}

export default App;