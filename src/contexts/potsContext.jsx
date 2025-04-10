import { createContext, useContext, useEffect, useReducer } from "react";

const PotsContext = createContext();

const potsReducer = (state, action) => {
    switch (action.type) {
        case "SET_POTS":
            return action.payload;
        case "ADD_POT":
            return [...state, action.payload];
        case "DELETE_POT":
            return state.filter(pot => pot.id !== action.payload);
        default:
            return state;
    }
};

export const PotsProvider = ({ children }) => {
    const [pots, dispatch] = useReducer(potsReducer, []);

    const fetchPots = async () => {
        try {
            const response = await fetch("http://localhost:3000/pots");
            const data = await response.json();
            dispatch({ type: "SET_POTS", payload: data });
        } catch (error) {
            console.error("Erro ao buscar pots:", error);
        }
    };

    const refreshPots = async () => {
        console.log("🔄 Atualizando pots...");
        await fetchPots();
    };

    useEffect(() => {
        fetchPots();
    }, []);

    return (
        <PotsContext.Provider value={{ pots, refreshPots, dispatch }}>
            {children}
        </PotsContext.Provider>
    );
};

export const usePots = () => {
    return useContext(PotsContext);
};
