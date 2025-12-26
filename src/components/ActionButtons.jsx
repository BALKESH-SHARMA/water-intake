import React from 'react';

export default function ActionButtons({ onAdd, onShowManual, styles }) {
  return (
    <div style={styles.fabContainer}>
      <button onClick={() => onAdd(250)} style={styles.fab}>+250</button>
      <button onClick={() => onAdd(500)} style={styles.fab}>+500</button>
      <button 
        onClick={onShowManual} 
        style={{ ...styles.fab, backgroundColor: '#FF9800' }}
      >
        Custom
      </button>
    </div>
  );
}