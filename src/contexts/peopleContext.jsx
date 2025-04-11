import { createContext, useContext, useEffect, useReducer } from "react";

const PeopleContext = createContext();

const peopleReducer = (state, action) => {
    switch (action.type) {
        case "SET_PEOPLE":
            return action.payload;
        case "ADD_PERSON":
            return [...state, action.payload];
        case "DELETE_PERSON":
            return state.filter(person => person.id !== action.payload);
        default:
            return state;
    }
};

export const PeopleProvider = ({ children }) => {
    const [people, dispatch] = useReducer(peopleReducer, []);

    const fetchPeople = async () => {
        try {
            const response = await fetch("http://localhost:3000/people");
            const data = await response.json();
            dispatch({ type: "SET_PEOPLE", payload: data });
        } catch (error) {
            console.error("Erro ao buscar people:", error);
        }
    };

    const refreshPeople = async () => {
        console.log("🔄 Atualizando people...");
        await fetchPeople();
    };

    useEffect(() => {
        fetchPeople();
    }, []);

    return (
        <PeopleContext.Provider value={{ people, refreshPeople, dispatch }}>
            {children}
        </PeopleContext.Provider>
    );
};

export const usePeople = () => {
    return useContext(PeopleContext);
};
