import { createContext, useContext, useEffect, useReducer } from "react";

const CategoriesContext = createContext();

const categoriesReducer = (state, action) => {
    switch (action.type) {
        case "SET_CATEGORIES":
            return action.payload;
        case "ADD_CATEGORY":
            return [...state, action.payload];
        case "DELETE_CATEGORY":
            return state.filter(category => category.id !== action.payload);
        default:
            return state;
    }
};

export const CategoriesProvider = ({ children }) => {
    const [categories, dispatch] = useReducer(categoriesReducer, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch("http://localhost:3000/categories");
            const data = await response.json();
            dispatch({ type: "SET_CATEGORIES", payload: data });
        } catch (error) {
            console.error("Erro ao buscar categories:", error);
        }
    };

    const refreshCategories = async () => {
        console.log("🔄 Atualizando categories...");
        await fetchCategories();
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoriesContext.Provider value={{ categories, refreshCategories, dispatch }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategories = () => {
    return useContext(CategoriesContext);
};
