import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Components
import Navigator from './components/Navigator/Navigator'

// Pages
import Overview from './pages/Overview/Overview'
import Transactions from './pages/Transactions/Transactions'
import Budgets from './pages/Budgets/Budgets'
import Pots from './pages/Pots/Pots'
import RecurringBills from './pages/RecurringBills/RecurringBills'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navigator />

        <Routes>
          <Route path='*' element={<Overview />} />
          <Route path='/overview' element={<Overview />} />
          <Route path='/transactions' element={<Transactions />} />
          <Route path='/budgets' element={<Budgets />} />
          <Route path='/pots' element={<Pots />} />
          <Route path='/recurring-bills' element={<RecurringBills />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
