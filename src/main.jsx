import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Tailwind and custom styles
import App from './App.jsx';
import './index.css';
import AuthProvider from './context/AuthProvider.jsx';

// Local storage clearing for debugging (optional)
// localStorage.clear();

function Preloader() {
  return (
    <div id="preloader">
      <div className="preloader-text">
        <span className="word">Core</span>
        <span className="word">Staff</span>

      </div>
    </div>
  );
}

function RootApp() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time of 4 seconds before transitioning
    setTimeout(() => {
      setLoading(false);
    }, 4000); // Adjust the time based on animation duration
  }, []);

  return (
    <>
      {loading ? <Preloader /> : null}
      <div className={loading ? "hidden" : "block"}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
);
