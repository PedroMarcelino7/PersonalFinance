import { createContext, useContext, useEffect, useReducer } from "react";

const ThemesContext = createContext();

const themesReducer = (state, action) => {
    switch (action.type) {
        case "SET_THEMES":
            return action.payload;
        case "ADD_THEME":
            return [...state, action.payload];
        case "DELETE_THEME":
            return state.filter(theme => theme.id !== action.payload);
        default:
            return state;
    }
};

export const ThemesProvider = ({ children }) => {
    const [themes, dispatch] = useReducer(themesReducer, []);

    const fetchThemes = async () => {
        try {
            const response = await fetch("http://localhost:3000/themes");
            const data = await response.json();
            dispatch({ type: "SET_THEMES", payload: data });
        } catch (error) {
            console.error("Erro ao buscar themes:", error);
        }
    };

    const refreshThemes = async () => {
        console.log("🔄 Atualizando themes...");
        await fetchThemes();
    };

    useEffect(() => {
        fetchThemes();
    }, []);

    return (
        <ThemesContext.Provider value={{ themes, refreshThemes, dispatch }}>
            {children}
        </ThemesContext.Provider>
    );
};

export const useThemes = () => {
    return useContext(ThemesContext);
};
