import React, { useState, useEffect } from 'react';
import { ref, onValue, update, increment, remove } from 'firebase/database';
import { db } from './firebase';
import Setup from './components/Setup';
import History from './components/History'; // Import the new component
import ManualInput from './components/ManualInput';
import { styles } from './styles';
import Navigation from './components/Navigation';
import AvatarModal from './components/AvatarModal';
const getISTDate = () => {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
};
const getYesterdayIST = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
};
function App() {
  const [familyData, setFamilyData] = useState([]);
  const [userName, setUserName] = useState(localStorage.getItem('water_name') || '');
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [myGoal, setMyGoal] = useState(() => {
    const saved = localStorage.getItem('water_goal');
    return saved ? Math.max(parseInt(saved), 2000) : 2000;
  });
  const [showManual, setShowManual] = useState(false);
  const [expandedMember, setExpandedMember] = useState(null);
  const [showReminder, setShowReminder] = useState(false);



  const today = getISTDate();
  // Track which date we are looking at
  const [viewDate, setViewDate] = useState(today);
  // const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    setLoading(true);
    const dayRef = ref(db, `days/${viewDate}`);
    return onValue(dayRef, (snapshot) => {
      const data = snapshot.val();
      setFamilyData(data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : []);
      setLoading(false);
    });
  }, [viewDate]); // Re-fetch when date changes

  useEffect(() => {
  if (!userName || familyData.length === 0) return;

  const userKey = userName.toLowerCase().trim();
  const myData = familyData.find(m => m.id === userKey);
  
  // MOVE THIS UP so it's available everywhere in this effect
  const hour = new Date().getHours();
  const isDaytime = hour >= 8 && hour <= 22;

  if (myData && myData.logs) {
    const logTimestamps = Object.keys(myData.logs).map(Number);
    const lastLogTime = Math.max(...logTimestamps);

    const threeHours = 3 * 60 * 60 * 1000; // Reset to 3 hours
    const timeSinceLastLog = Date.now() - lastLogTime;

    if (timeSinceLastLog > threeHours && isDaytime && myData.total < myData.goal) {
      setShowReminder(true);
    } else {
      setShowReminder(false);
    }
  } else if (isDaytime) {
    // This now works because isDaytime is defined above
    setShowReminder(true);
  }
}, [familyData, userName]);

  const calculateStreak = (userKey) => {
  return new Promise((resolve) => {
    const yesterday = getYesterdayIST();
    const yesterdayRef = ref(db, `days/${yesterday}/${userKey}`);
    
    // Safety: If Firebase takes too long or doesn't find the user, return 0
    const timeout = setTimeout(() => resolve(0), 1500);

    onValue(yesterdayRef, (snapshot) => {
      clearTimeout(timeout);
      const data = snapshot.val();
      
      // Check if data exists AND the user met their goal yesterday
      if (data && data.total >= (data.goal || 2000)) {
        resolve(data.streak || 0);
      } else {
        resolve(0);
      }
    }, { onlyOnce: true });
  });
};

  const addWater = async (amount) => {
    if (!userName || isNaN(amount) || amount <= 0) return;

    try {
      const userKey = userName.toLowerCase().trim();
      const time = new Date().toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true
      });

      const currentMember = familyData.find(m => m.id === userKey);
      const currentTotal = (currentMember?.total || 0) + amount;
      const goal = currentMember?.goal || myGoal;

      // 1. Fetch yesterday's base streak
      const yesterdayStreak = await calculateStreak(userKey);

      // 2. Logic: If currentTotal >= goal, today's streak is Yesterday + 1
      // Otherwise, it's just the yesterday streak (or 0)
      let todayStreak = currentTotal >= goal ? yesterdayStreak + 1 : yesterdayStreak;

      const updates = {};
      updates[`days/${today}/${userKey}/name`] = userName;
      updates[`days/${today}/${userKey}/total`] = increment(amount);
      updates[`days/${today}/${userKey}/goal`] = myGoal;
      updates[`days/${today}/${userKey}/streak`] = todayStreak;
      updates[`days/${today}/${userKey}/avatar`] = localStorage.getItem('water_avatar') || '💧'; // Pre-empting Avatars
      updates[`days/${today}/${userKey}/logs/${Date.now()}`] = { amount, time };


      await update(ref(db), updates);
      setShowManual(false);
    } catch (error) {
      console.error("Error adding water:", error);
    }
  };

  const handleGoalUpdate = (newVal) => {
    setMyGoal(newVal);
    localStorage.setItem('water_goal', newVal);
    update(ref(db, `days/${today}/${userName.toLowerCase()}`), { goal: newVal });
  };

  const deleteLog = async (memberId, logId, amount) => {
    if (window.confirm("Delete this log?")) {
      const userKey = memberId.toLowerCase().trim();

      // 1. Find the current member's data to get current total and goal
      const member = familyData.find(m => m.id === userKey);
      const newTotal = (member?.total || 0) - amount;
      const goal = member?.goal || 2000;

      // 2. Fetch yesterday's streak base
      const yesterdayStreak = await calculateStreak(userKey);

      // 3. Determine the corrected streak
      // If the new total is still above goal, keep the incremented streak.
      // If it's now below goal, revert to yesterday's streak.
      let correctedStreak = yesterdayStreak;
      if (newTotal >= goal) {
        correctedStreak = yesterdayStreak + 1;
      }

      // 4. Perform the updates
      const updates = {};
      updates[`days/${viewDate}/${userKey}/logs/${logId}`] = null; // Remove the log
      updates[`days/${viewDate}/${userKey}/total`] = increment(-amount);
      updates[`days/${viewDate}/${userKey}/streak`] = correctedStreak; // Correct the streak

      update(ref(db), updates);
    }
  };

  const handleAvatarChange = (newAvatar) => {
    // 1. Save locally so it persists on refresh
    localStorage.setItem('water_avatar', newAvatar);

    // 2. Sync with Firebase so others see the change
    const userKey = userName.toLowerCase().trim();
    update(ref(db, `days/${today}/${userKey}`), { avatar: newAvatar });
  };

  if (!userName) return (
    <Setup
      onJoin={(name, avatar) => {
        localStorage.setItem('water_name', name);
        localStorage.setItem('water_avatar', avatar || '💧'); // Save avatar
        setUserName(name);
      }}
      styles={styles}
    />
  );

  return (
    <div style={styles.pageWrapper}>
      {showReminder && (
  <div style={{
    position: 'fixed',      // Fixes it to the top of the viewport
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF9C4',
    color: '#F57F17',
    padding: '12px 20px',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    borderBottom: '1px solid #FBC02D',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    zIndex: 3000,           // Higher than Nav and Modals
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    animation: 'slideDown 0.4s ease-out' // Use the slideDown animation
  }}>
    <span>🕒 Time to hydrate, {userName}! It's been a while.</span>
    <button 
      onClick={() => setShowReminder(false)}
      style={{ 
        background: 'none', 
        border: 'none', 
        fontSize: '18px', 
        cursor: 'pointer',
        color: '#F57F17',
        marginLeft: '10px'
      }}
    >
      ✕
    </button>
  </div>
)}
      <Navigation
        onOpenAvatar={() => setShowAvatarModal(true)}
        myGoal={myGoal}
        onGoalUpdate={handleGoalUpdate}
        familyData={familyData}
        styles={styles}
      />
      {showAvatarModal && (
        <AvatarModal
          isOpen={showAvatarModal}
          onClose={() => setShowAvatarModal(false)}
          onSelect={handleAvatarChange}
          styles={styles}
        />
      )}
      <div style={styles.container}>
        <main style={styles.scrollContent}>
          {/* CRITICAL: This spacer prevents the overlap */}
          {loading ? (
            <div style={styles.loadingOverlay}>
              <div style={styles.spinner}></div>
              <p style={{ color: '#0D47A1', marginTop: '10px', fontWeight: '500' }}>
                Fetching logs...
              </p>
            </div>
          ) : (
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
          )}
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