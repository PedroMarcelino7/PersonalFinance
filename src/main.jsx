import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PotsProvider } from './contexts/potsContext.jsx'
import { BudgetsProvider } from './contexts/budgetsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PotsProvider>
      <BudgetsProvider>
        <App />
      </BudgetsProvider>
    </PotsProvider>
  </StrictMode>,
)
