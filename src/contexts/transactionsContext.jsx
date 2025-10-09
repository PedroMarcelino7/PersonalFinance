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

    const fetchTransactions = async (sort = 'newest') => {
        try {
            const response = await fetch(`http://localhost:3000/transactions?sort=${sort}`);
            const data = await response.json();
            dispatch({ type: "SET_TRANSACTIONS", payload: data });
        } catch (error) {
            console.error("Erro ao buscar transactions:", error);
        }
    };

    const searchTransactions = async (term, sort = 'newest') => {
        try {
            const query = term ? `$search=${term}` : ''

            const response = await fetch(`http://localhost:3000/transactions?sort=${sort}${query}`)
            const data = await response.json()

            dispatch({ type: "SET_TRANSACTIONS", payload: data })
        } catch (error) {
            console.error("Erro ao buscar transactions:", error);
        }
    }

    const refreshTransactions = async (sort = 'newest') => {
        console.log("🔄 Atualizando transactions...");
        await fetchTransactions(sort);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <TransactionsContext.Provider value={{ transactions, refreshTransactions, searchTransactions, dispatch }}>
            {children}
        </TransactionsContext.Provider>
    );
};

export const useTransactions = () => {
    return useContext(TransactionsContext);
};
