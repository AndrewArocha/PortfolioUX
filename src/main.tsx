import BootManager from './components/UI/BootManager';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.tsx'
import { InteractionProvider } from './context/InteractionContext';

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    <BootManager>
      <InteractionProvider>
        <App />
      </InteractionProvider>
    </BootManager>
  </React.StrictMode>
);
