import './App.css'
import Sidebar from './components/sidebar/sidebar'
import Overview from './pages/overview/overview'
import Transactions from './pages/transactions/transactions'
import Budgets from './pages/budgets/budgets'
import Pots from './pages/pots/pots'
import FinishedPots from './pages/pots/finished/finishedPots'
import RecurringBills from './pages/recurringBills/recurringBills'

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Sidebar />

        <Routes>
          <Route path='/' element={<Overview />} />
          <Route path='/transactions' element={<Transactions />} />
          <Route path='/budgets' element={<Budgets />} />
          <Route path='/pots' element={<Pots />} />
          <Route path='/pots/finished' element={<FinishedPots />} />
          <Route path='/recurring-bills' element={<RecurringBills />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
