import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerLocalIcons } from './components/icon';
import App from './App.tsx'

await registerLocalIcons();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
