import { createContext, useContext, useEffect, useReducer } from "react";

const BudgetsContext = createContext();

const budgetsReducer = (state, action) => {
    switch (action.type) {
        case "SET_BUDGETS":
            return action.payload;
        case "ADD_BUDGET":
            return [...state, action.payload];
        case "DELETE_BUDGET":
            return state.filter(budget => budget.id !== action.payload);
        default:
            return state;
    }
};

export const BudgetsProvider = ({ children }) => {
    const [budgets, dispatch] = useReducer(budgetsReducer, []);

    const fetchBudgets = async () => {
        try {
            const response = await fetch("http://localhost:3000/budgets");
            const data = await response.json();
            dispatch({ type: "SET_BUDGETS", payload: data });
        } catch (error) {
            console.error("Erro ao buscar budgets:", error);
        }
    };

    const refreshBudgets = async () => {
        console.log("🔄 Atualizando budgets...");
        await fetchBudgets();
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    return (
        <BudgetsContext.Provider value={{ budgets, refreshBudgets, dispatch }}>
            {children}
        </BudgetsContext.Provider>
    );
};

export const useBudgets = () => {
    return useContext(BudgetsContext);
};
