// src/context/CharacterContext.tsx

import React, { createContext, useContext, ReactNode } from "react";
import { ICharacterApiResponse } from "../Interfaces/apiRespose";

// Define the shape of the context
interface CharacterContextType {
    character: ICharacterApiResponse;
}

// Create the context
const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

// Custom hook to use the context
export const useCharacterContext = () => {
    const context = useContext(CharacterContext);
    if (!context) {
        throw new Error("useCharacterContext must be used within a CharacterProvider");
    }
    return context;
};

// Context provider component
export const CharacterProvider = ({
    children,
    character,
}: {
    children: ReactNode;
    character: ICharacterApiResponse;
}) => {
    return <CharacterContext.Provider value={{ character }}> {children} </CharacterContext.Provider>;
}
