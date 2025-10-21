import { createContext, useContext, useEffect, useState } from "react";

const OverviewContext = createContext();

export const OverviewProvider = ({ children }) => {
    const [summary, setSummary] = useState({
        current_balance: 0,
        available_balance: 0,
        month_expenses: 0,
    });

    const [loading, setLoading] = useState(true);

    const fetchOverview = async () => {
        try {
            const response = await fetch("http://localhost:3000/overview/summary");
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Erro ao buscar resumo");

            setSummary(data);
        } catch (error) {
            console.error("Erro ao buscar overview:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOverview();
    }, []);

    return (
        <OverviewContext.Provider value={{ summary, loading, refreshOverview: fetchOverview }}>
            {children}
        </OverviewContext.Provider>
    );
};

export const useOverview = () => useContext(OverviewContext);