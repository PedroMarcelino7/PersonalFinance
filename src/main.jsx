import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PotsProvider } from './contexts/potsContext.jsx'
import { PeopleProvider } from './contexts/peopleContext.jsx'
import { TransactionsProvider } from './contexts/transactionsContext.jsx'
import { RecurringBillsProvider } from './contexts/recurringBillsContext.jsx'
import { BudgetsProvider } from './contexts/budgetsContext.jsx'
import { ThemesProvider } from './contexts/themesContext.jsx'
import Toast from './ui/toast/toast.jsx'
import { OverviewProvider } from './contexts/overviewContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PeopleProvider>
      <BudgetsProvider>
        <ThemesProvider>
          <PotsProvider>
            <TransactionsProvider>
              <RecurringBillsProvider>
                <OverviewProvider>
                  <App />

                  <Toast />
                </OverviewProvider>
              </RecurringBillsProvider>
            </TransactionsProvider>
          </PotsProvider>
        </ThemesProvider>
      </BudgetsProvider>
    </PeopleProvider>
  </StrictMode>,
)
