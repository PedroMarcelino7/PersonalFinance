import { createContext, useContext, useEffect, useReducer } from "react";

const RecurringBillsContext = createContext();

const recurringBillsReducer = (state, action) => {
    switch (action.type) {
        case "SET_RECURRING_BILLS":
            return action.payload;
        case "ADD_RECURRING_BILL":
            return [...state, action.payload];
        case "DELETE_RECURRING_BILL":
            return state.filter(recurringBill => recurringBill.id !== action.payload);
        default:
            return state;
    }
};

export const RecurringBillsProvider = ({ children }) => {
    const [recurringBills, dispatch] = useReducer(recurringBillsReducer, []);

    const fetchRecurringBills = async () => {
        try {
            const response = await fetch("http://localhost:3000/recurring-bills");
            const data = await response.json();
            dispatch({ type: "SET_RECURRING_BILLS", payload: data });
        } catch (error) {
            console.error("Erro ao buscar recurringBills:", error);
        }
    };

    const refreshRecurringBills = async () => {
        console.log("🔄 Atualizando recurringBills...");
        await fetchRecurringBills();
    };

    useEffect(() => {
        fetchRecurringBills();
    }, []);

    return (
        <RecurringBillsContext.Provider value={{ recurringBills, refreshRecurringBills, dispatch }}>
            {children}
        </RecurringBillsContext.Provider>
    );
};

export const useRecurringBills = () => {
    return useContext(RecurringBillsContext);
};
