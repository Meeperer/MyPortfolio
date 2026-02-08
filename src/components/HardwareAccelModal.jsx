import React, { useEffect, useState } from 'react';
import './HardwareAccelModal.css';

const STORAGE_KEY = 'hardware-accel-modal-dismissed';

export default function HardwareAccelModal() {
  const [visible, setVisible] = useState(false);
  const [showHowTo, setShowHowTo] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setVisible(true);
    }
    const handleShow = () => {
      setShowHowTo(false);
      setVisible(true);
    };
    window.addEventListener('show-hardware-accel-modal', handleShow);
    return () => window.removeEventListener('show-hardware-accel-modal', handleShow);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="hardware-accel-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hardware-accel-modal-title"
      onClick={(e) => e.target === e.currentTarget && dismiss()}
    >
      <div className="hardware-accel-modal" onClick={(e) => e.stopPropagation()}>
        <h2 id="hardware-accel-modal-title" className="hardware-accel-modal-title">
          For a better experience
        </h2>
        <p className="hardware-accel-modal-body">
          Turn on your browser’s hardware acceleration. If it’s not enabled, you may experience lagginess.
        </p>
        <button
          type="button"
          className="hardware-accel-modal-btn hardware-accel-modal-btn-secondary"
          onClick={() => setShowHowTo((v) => !v)}
          aria-expanded={showHowTo}
        >
          How to turn it on?
        </button>
        {showHowTo && (
          <div className="hardware-accel-modal-howto" role="region" aria-label="How to enable hardware acceleration">
            <ul className="hardware-accel-modal-howto-list">
              <li><strong>Chrome / Edge:</strong> Settings → System → turn on “Use hardware acceleration when available”.</li>
              <li><strong>Firefox:</strong> Settings → General → Performance → uncheck “Use recommended performance settings”, then check “Use hardware acceleration when available”.</li>
              <li><strong>Safari:</strong> Usually on by default; check Safari → Settings → Advanced → “Show features for web developers” if you use dev tools.</li>
            </ul>
          </div>
        )}
        <button
          type="button"
          className="hardware-accel-modal-btn"
          onClick={dismiss}
          aria-label="Dismiss"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
