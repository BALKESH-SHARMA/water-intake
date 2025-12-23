import React from 'react';

export default function ManualInput({ onAdd, onClose, styles }) {
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={{...styles.card, width: '85%', maxWidth: '350px'}} onClick={e => e.stopPropagation()}>
        <h3 style={{color: '#333', margin: '0 0 15px 0'}}>Custom Amount</h3>
        <input 
          type="number" 
          id="customAmount" 
          placeholder="e.g. 330" 
          style={styles.input} 
          autoFocus 
          onKeyPress={(e) => {
            if (e.key === 'Enter') onAdd(parseInt(e.target.value));
          }}
        />
        <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
          <button 
            onClick={() => onAdd(parseInt(document.getElementById('customAmount').value))} 
            style={styles.joinButton}
          >
            Add Water
          </button>
          <button onClick={onClose} style={{...styles.joinButton, backgroundColor: '#888'}}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}