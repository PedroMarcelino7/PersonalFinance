import { createContext, useContext, useEffect, useReducer } from "react";

const TransactionsContext = createContext();

const transactionsReducer = (state, action) => {
    switch (action.type) {
        case "SET_TRANSACTIONS":
            return action.payload;
        case "ADD_TRANSACTION":
            return [...state, action.payload];
        case "DELETE_TRANSACTION":
            return state.filter(transaction => transaction.id !== action.payload);
        default:
            return state;
    }
};

export const TransactionsProvider = ({ children }) => {
    const [transactions, dispatch] = useReducer(transactionsReducer, []);

    const fetchTransactions = async () => {
        try {
            const response = await fetch("http://localhost:3000/transactions");
            const data = await response.json();
            dispatch({ type: "SET_TRANSACTIONS", payload: data });
        } catch (error) {
            console.error("Erro ao buscar transactions:", error);
        }
    };

    const refreshTransactions = async () => {
        console.log("🔄 Atualizando transactions...");
        await fetchTransactions();
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <TransactionsContext.Provider value={{ transactions, refreshTransactions, dispatch }}>
            {children}
        </TransactionsContext.Provider>
    );
};

export const useTransactions = () => {
    return useContext(TransactionsContext);
};
