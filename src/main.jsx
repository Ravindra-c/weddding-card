import React from 'react';
import ReactDOM from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import App from './App.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { MusicProvider } from './context/MusicContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* reducedMotion="user" → Framer Motion disables transform animations if the OS asks for reduced motion */}
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <MusicProvider>
          <App />
        </MusicProvider>
      </LanguageProvider>
    </MotionConfig>
  </React.StrictMode>
);
