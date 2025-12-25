import React, { useState } from 'react';

export default function GoalModal({ isOpen, onClose, currentGoal, onSave, styles }) {
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    const inputElement = document.getElementById('newGoalInput');
    const newVal = parseInt(inputElement.value);

    if (isNaN(newVal) || newVal < 2000) {
      setError('Goal must be at least 2000ml');
      inputElement.style.borderColor = 'red';
      return;
    }

    setError('');
    onSave(newVal);
    onClose();
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={{...styles.card, width: '85%', maxWidth: '350px'}} onClick={e => e.stopPropagation()}>
        <h3 style={{margin: '0 0 15px 0', color: '#333'}}>Update Daily Goal</h3>
        
        <p style={{fontSize: '14px', color: '#666', marginBottom: '10px'}}>
          Target amount (min 2000ml):
        </p>

        <input 
          type="number" 
          defaultValue={currentGoal}
          id="newGoalInput"
          style={{
            ...styles.input,
            borderColor: error ? '#ff4d4d' : '#ddd'
          }}
          placeholder="e.g. 2500"
          min="2000"
          autoFocus
        />

        {error && (
          <p style={{color: '#ff4d4d', fontSize: '12px', marginTop: '5px', fontWeight: 'bold'}}>
            {error}
          </p>
        )}

        <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
          <button style={styles.joinButton} onClick={handleSave}>Save</button>
          <button 
            style={{...styles.joinButton, backgroundColor: '#888'}} 
            onClick={() => { setError(''); onClose(); }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}