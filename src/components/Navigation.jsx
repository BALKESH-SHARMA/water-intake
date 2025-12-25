import React, { useState } from 'react';
import GoalModal from './GoalModal';
import Leaderboard from './Leaderboard';

export default function Navigation({ myGoal, onGoalUpdate, familyData, styles }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <>
      <nav style={styles.navBar}>
        <button onClick={() => setShowDrawer(!showDrawer)} style={styles.menuBtn}>
          {showDrawer ? '✕' : '☰'}
        </button>
        <h1 style={styles.navTitle}>Water Tracker</h1>
        <div style={{ width: '44px' }} />
      </nav>

      {showDrawer && (
        <div style={styles.drawerOverlay} onClick={() => setShowDrawer(false)}>
          <div style={styles.drawerContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.drawerHeader}>
              <h3 style={{ margin: 0 }}>Menu</h3>
              <button onClick={() => setShowDrawer(false)} style={styles.closeBtn}>✕</button>
            </div>
            
            <button 
              style={styles.drawerItem} 
              onClick={() => { setShowLeaderboard(true); setShowDrawer(false); }}
            >
              🏆 Leaderboard
            </button>

            <button 
              style={styles.drawerItem} 
              onClick={() => { setShowGoalModal(true); setShowDrawer(false); }}
            >
              🎯 Set Daily Goal
            </button>
          </div>
        </div>
      )}

      <Leaderboard 
        isOpen={showLeaderboard} 
        onClose={() => setShowLeaderboard(false)} 
        familyData={familyData} 
        styles={styles} 
      />

      <GoalModal
        isOpen={showGoalModal}
        onClose={() => setShowGoalModal(false)}
        currentGoal={myGoal}
        onSave={onGoalUpdate}
        styles={styles}
      />
    </>
  );
}