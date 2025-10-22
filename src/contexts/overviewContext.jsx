import { createContext, useContext, useEffect, useState } from "react";

const OverviewContext = createContext();

export const OverviewProvider = ({ children }) => {
    const [currentBalance, setCurrentBalance] = useState(0)
    const [availableBalance, setAvailableBalance] = useState(0)

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

    useEffect(() => {
        fetchCurrentBalance()
        fetchAvailableBalance()
    }, []);

    return (
        <OverviewContext.Provider value={{ currentBalance, availableBalance }}>
            {children}
        </OverviewContext.Provider>
    );
};

export const useOverview = () => useContext(OverviewContext);