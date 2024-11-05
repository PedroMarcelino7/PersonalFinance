import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navigator from "./components/Navigator/Navigator";

// Pages
import Overview from "./pages/Overview/Overview";
import Transactions from "./pages/Transactions/Transactions";
import Budgets from "./pages/Budgets/Budgets";
import Pots from "./pages/Pots/Pots";
import RecurringBills from "./pages/RecurringBills/RecurringBills";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Success from "./components/Toasts/FormValidationToast/Success";

function App() {
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="App">
      <BrowserRouter>
        {!isAuthPage && <Navigator />}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/pots" element={<Pots />} />
          <Route path="/recurring-bills" element={<RecurringBills />} />
        </Routes>
      </BrowserRouter>
      <Success title="Teste" description="Usuário Pedro Marcelino logado com sucesso!" />
    </div>
  );
}

export default App;
