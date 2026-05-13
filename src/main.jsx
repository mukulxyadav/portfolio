import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root');

if (container) {
  if (!window.reactRoot) {
    window.reactRoot = createRoot(container);
  }
  
  window.reactRoot.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
