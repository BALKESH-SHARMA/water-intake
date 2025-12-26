export const styles = {
  pageWrapper: { 
    display: 'flex', 
    justifyContent: 'center', 
    backgroundColor: '#f0f8ff', 
    minHeight: '100vh', 
    width: '100vw' 
  },
  container: { 
    padding: '20px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
    width: '100%', 
    maxWidth: '500px', 
    paddingBottom: '120px' 
  },
  title: { 
    textAlign: 'center', 
    color: '#0D47A1', 
    fontSize: '26px', 
    marginBottom: '10px',
    fontWeight: '800'
  },
  dateBadge: { 
    display: 'block',
    textAlign: 'center',
    fontSize: '12px', 
    color: '#666', 
    background: '#e0e0e0', 
    padding: '4px 12px', 
    borderRadius: '12px',
    width: 'fit-content',
    margin: '0 auto 20px auto'
  },
  settingsCard: { 
    background: '#fff', 
    padding: '15px', 
    borderRadius: '16px', 
    marginBottom: '20px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)' 
  },
  label: { color: '#555', fontSize: '15px', fontWeight: '500' },
  goalInput: { 
    width: '80px', 
    padding: '8px', 
    borderRadius: '8px', 
    border: '1px solid #ddd', 
    fontSize: '16px', 
    textAlign: 'center', 
    color: '#000', 
    backgroundColor: '#fff',
    outline: 'none'
  },
  card: { 
    background: '#fff', 
    padding: '20px', 
    borderRadius: '20px', 
    marginBottom: '15px', 
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)', 
    cursor: 'pointer',
    transition: 'transform 0.1s ease'
  },
  cardHeader: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '12px' 
  },
  progressBg: { 
    background: '#e9ecef', 
    height: '16px', 
    borderRadius: '10px', 
    overflow: 'hidden' 
  },
  progressFill: { 
    height: '100%', 
    transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)' 
  },
  tapHint: { 
    fontSize: '11px', 
    color: '#aaa', 
    textAlign: 'center', 
    marginTop: '12px', 
    fontStyle: 'italic' 
  },
  detailsSection: { 
    marginTop: '15px', 
    borderTop: '1px solid #f0f0f0', 
    paddingTop: '15px' 
  },
  detailsTitle: { 
    fontSize: '13px', 
    color: '#888', 
    marginBottom: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  logRow: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '10px 0', 
    borderBottom: '1px solid #f9f9f9' 
  },
  logTime: { fontSize: '14px', color: '#333' },
  logAmount: { fontSize: '14px', fontWeight: 'bold', color: '#2196F3' },
  deleteBtn: { 
    background: '#fee2e2', 
    border: 'none', 
    borderRadius: '8px', 
    padding: '6px 10px', 
    cursor: 'pointer',
    fontSize: '14px'
  },
  fabContainer: { 
    position: 'fixed', 
    bottom: '0', 
    left: '50%', 
    transform: 'translateX(-50%)', 
    width: '100%', 
    maxWidth: '500px', 
    display: 'flex', 
    gap: '12px', 
    padding: '25px 20px', 
    boxSizing: 'border-box', 
    backgroundColor: 'rgba(240,248,255,0.95)', 
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid rgba(0,0,0,0.05)',
    zIndex: 100
  },
  fab: { 
    flex: 1, 
    padding: '18px 0', 
    borderRadius: '18px', 
    border: 'none', 
    backgroundColor: '#2196F3', 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: '16px', 
    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
    cursor: 'pointer',
    active: { transform: 'scale(0.95)' }
  },
  modalOverlay: { 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    backgroundColor: 'rgba(0,0,0,0.7)', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 2000,
    backdropFilter: 'blur(4px)'
  },
  input: { 
    padding: '14px', 
    fontSize: '16px', 
    borderRadius: '10px', 
    border: '1px solid #ddd', 
    width: '100%', 
    boxSizing: 'border-box', 
    backgroundColor: '#fff', 
    color: '#000',
    outline: 'none'
  },
  joinButton: { 
    flex: 1, 
    padding: '14px', 
    background: '#2196F3', 
    color: 'white', 
    border: 'none', 
    borderRadius: '10px', 
    fontWeight: 'bold',
    marginTop: '10px',
    cursor: 'pointer'
  },
  header: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  width: '100%'
},
dateBtn: {
  background: '#fff',
  border: 'none',
  borderRadius: '50%',
  width: '45px',
  height: '45px',
  fontSize: '20px',
  color: '#2196F3',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.1s active'
},
// drawer styles
menuBtn: {
  position: 'fixed',
  top: '20px',
  left: '20px',
  fontSize: '24px',
  background: 'none',
  border: 'none',
  color: '#0D47A1',
  cursor: 'pointer',
  zIndex: 10
},
drawerOverlay: {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 100,
  display: 'flex'
},
drawerContent: {
  width: '280px',
  height: '100%',
  backgroundColor: '#fff',
  padding: '30px 20px',
  boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
  animation: 'slideIn 0.3s ease-out'
},
drawerHeader: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px',
  borderBottom: '1px solid #eee',
  paddingBottom: '10px'
},
closeBtn: {
  background: 'none',
  border: 'none',
  fontSize: '20px',
  color: '#999',
  cursor: 'pointer'
},
drawerSection: {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
},
drawerLabel: {
  fontSize: '14px',
  color: '#666',
  fontWeight: '600'
},
drawerInput: {
  padding: '12px',
  fontSize: '18px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  textAlign: 'center'
},
drawerItem: {
  width: '100%',
  padding: '15px',
  textAlign: 'left',
  backgroundColor: '#f0f7ff', // Explicitly set background
  color: '#0D47A1',           // Explicitly set text color
  border: 'none',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  
  /* --- iOS SPECIFIC FIXES --- */
  WebkitAppearance: 'none',   // Removes default iOS button styling
  appearance: 'none',         // Standard property to remove styling
  WebkitTapHighlightColor: 'transparent', // Removes the grey box when tapping
  },
navBar: {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '60px', // Header height
  backgroundColor: '#fff',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 15px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  boxSizing: 'border-box'
},
scrollContent: {
  flex: 1,
  paddingTop: '80px', // THIS IS THE FIX: 80px is more than 60px navBar
  paddingBottom: '120px', 
  width: '100%',
  maxWidth: '500px',
  margin: '0 auto',
  boxSizing: 'border-box',
  overflowY: 'auto'
},
navSpacer: {
  height: '80px', // Increased this to give more room below the navBar
  width: '100%'
},
navTitle: {
  fontSize: '18px',
  color: '#0D47A1',
  fontWeight: 'bold',
  margin: 0,
  flex: 1,            // Helps center the title
  textAlign: 'center'
},
menuBtn: {
  fontSize: '28px',    // Larger for easier tapping
  background: 'none',
  border: 'none',
  color: '#0D47A1',
  cursor: 'pointer',
  padding: '10px',     // Bigger tap target area
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 600,         // Higher than the navBar background
  pointerEvents: 'auto' // Ensures it captures the click
},
// Ensure your container doesn't have its own fixed top padding that clashes
container: {
  padding: '0 20px 120px 20px', // Ensure 0 top padding here
  fontFamily: '-apple-system, sans-serif',
  width: '100%',
  maxWidth: '500px',
  display: 'flex',
  flexDirection: 'column'
},
// Leaderboard styles
leaderRow: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px',
  backgroundColor: '#ffffff', // Explicitly white background
  borderRadius: '12px',
  border: '1px solid #eee',
  marginBottom: '10px',
  
  /* --- iOS Color Fixes --- */
  color: '#333333',            // Force text to be dark grey/black
  WebkitAppearance: 'none',    // Removes iOS button/div defaults
  appearance: 'none',
},
//loading spinner
loadingOverlay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
    width: '100%',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #0D47A1',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  }
};
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);