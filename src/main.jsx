import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PotsProvider } from './contexts/potsContext.jsx'
import { BudgetsProvider } from './contexts/budgetsContext.jsx'
import { PeopleProvider } from './contexts/peopleContext.jsx'
import { TransactionsProvider } from './contexts/transactionsContext.jsx'
import { RecurringBillsProvider } from './contexts/recurringBillsContext.jsx'
import { CategoriesProvider } from './contexts/categoriesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PeopleProvider>
      <CategoriesProvider>
        <PotsProvider>
          <BudgetsProvider>
            <TransactionsProvider>
              <RecurringBillsProvider>
                <App />
              </RecurringBillsProvider>
            </TransactionsProvider>
          </BudgetsProvider>
        </PotsProvider>
      </CategoriesProvider>
    </PeopleProvider>
  </StrictMode>,
)
