import React, { useState } from 'react';
import { updateUserLocation } from "../services/loactionService";

export default function LocationButton({ onLocationUpdate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const locationData = { latitude, longitude, timestamp: Date.now() };

        // 1. Save to Local Storage
        localStorage.setItem('user_location', JSON.stringify(locationData));

        try {
          // 2. Send to Backend
          await updateUserLocation(latitude, longitude);
          if (onLocationUpdate) onLocationUpdate(locationData);
          alert('Location saved successfully!');
        } catch (err) {
          setError('Saved locally, but failed to sync with server.');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLoading(false);
        setError(err.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="location-container">
      <button onClick={handleGetLocation} disabled={loading}>
        {loading ? 'Finding Location...' : '📍 Use Current Location'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}