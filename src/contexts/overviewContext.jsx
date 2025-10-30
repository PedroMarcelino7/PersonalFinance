import { createContext, useContext, useEffect, useState } from "react";

const OverviewContext = createContext();

export const OverviewProvider = ({ children }) => {
    const [currentBalance, setCurrentBalance] = useState(0)
    const [availableBalance, setAvailableBalance] = useState(0)
    const [monthExpenses, setMonthExpenses] = useState(0)

    const fetchCurrentBalance = async () => {
        try {
            const response = await fetch("http://localhost:3000/overview/current-balance");
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Erro ao buscar resumo");

            setCurrentBalance(data.current_balance);
        } catch (error) {
            console.error("Erro ao buscar current balance:", error);
        }
    };

    const fetchAvailableBalance = async () => {
        try {
            const response = await fetch("http://localhost:3000/overview/available-balance");
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Erro ao buscar resumo");

            setAvailableBalance(data.available_balance);
        } catch (error) {
            console.error("Erro ao buscar available balance:", error);
        }
    }

    const fetchMonthExpenses = async () => {
        try {
            const response = await fetch("http://localhost:3000/overview/month-expenses");
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Erro ao buscar resumo");

            setMonthExpenses(data.month_expenses);
        } catch (error) {
            console.error("Erro ao buscar month expenses:", error);
        }
    }

    useEffect(() => {
        fetchCurrentBalance()
        fetchAvailableBalance()
        fetchMonthExpenses()
    }, []);

    return (
        <OverviewContext.Provider value={{ currentBalance, availableBalance, monthExpenses }}>
            {children}
        </OverviewContext.Provider>
    );
};

export const useOverview = () => useContext(OverviewContext);