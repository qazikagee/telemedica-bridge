
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Use deferred execution to allow the browser to handle critical rendering first
const startApp = () => {
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(<App />);
  }
};

// Check if the browser is idle, if supported
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(startApp);
} else {
  // Fallback to setTimeout
  setTimeout(startApp, 1);
}
