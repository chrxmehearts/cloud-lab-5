import React, { useEffect, useState } from 'react';
import RadioPlayer from './RadioPlayer';
import PrivacyPopup from './PrivacyPopup';
import './App.css';

function App() {
  const [location, setLocation] = useState(null);
  const [browserInfo, setBrowserInfo] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation(pos.coords),
        (err) => console.warn("Brak zgody na lokalizację")
      );
    }
    setBrowserInfo({
      appName: navigator.appName,
      platform: navigator.platform,
      userAgent: navigator.userAgent
    });
  }, []);

  return (
    <div className="app">
      <header className="header"><h1>Radio Internetowe</h1></header>
      <main className="main-content">
        <RadioPlayer />
        {location && (
          <div className="info-box">
            <p>Twoja lokalizacja: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</p>
          </div>
        )}
        {browserInfo && (
          <div className="info-box">
            <p>System: {browserInfo.platform}</p>
            <p>Przeglądarka: {browserInfo.appName}</p>
          </div>
        )}
      </main>
      <footer className="footer"><p>&copy; 2026 Radio Internetowe.</p></footer>
      <PrivacyPopup />
    </div>
  );
}
export default App;