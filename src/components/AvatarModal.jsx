import React from 'react';

export default function AvatarModal({ isOpen, onClose, onSelect, styles }) {
  if (!isOpen) return null;

  const avatars = ['💧', '🥤', '🌊', '🐳', '🐧', '🌵', '❄️', '🥥', '🍉', '🍋', '⚽', '🌟'];

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Choose Your Avatar</h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '12px',
          padding: '10px 0' 
        }}>
          {avatars.map(a => (
            <button
              key={a}
              onClick={() => {
                onSelect(a);
                onClose();
              }}
              style={{
                fontSize: '28px',
                padding: '10px',
                background: '#F5F7F9',
                border: '1px solid #E0E0E0',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'transform 0.1s'
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {a}
            </button>
          ))}
        </div>
        
        <button 
          onClick={onClose} 
          style={{ ...styles.button, backgroundColor: '#666', marginTop: '15px' }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}