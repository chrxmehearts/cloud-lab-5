import React, { useState } from 'react';

const PrivacyPopup = () => {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  return (
    <div className="privacy-popup" style={{position: 'fixed', bottom: 0, left: 0, right: 0, background: '#333', color: 'white', padding: '15px', textAlign: 'center'}}>
      <p>Ta strona używa plików cookie oraz geolokalizacji. <button onClick={() => setIsVisible(false)} style={{marginLeft: '10px', background: '#4CAF50', border: 'none', color: 'white', padding: '5px 10px', cursor: 'pointer'}}>Rozumiem</button></p>
    </div>
  );
};
export default PrivacyPopup;