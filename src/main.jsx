import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PotsProvider } from './contexts/potsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PotsProvider>
      <App />
    </PotsProvider>
  </StrictMode>,
)
