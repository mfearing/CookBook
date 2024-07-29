import { createContext, useState, ReactNode } from "react";
import type IngredientDetails from "../types/recipe/ingredientDetails";
import axios from "axios";

export interface IngredientContextType {
    ingredients: IngredientDetails | null,
    fetchIngredients: () => Promise<IngredientDetails | void>
}

const IngredientContext = createContext<IngredientContextType | null>(null);

function IngredientProvider({children}: {children: ReactNode}){
    const [ingredients, setIngredients] = useState<null | IngredientDetails>(null);

    const fetchIngredients = async(): Promise<IngredientDetails | void> => {
        try{
            const response = await axios.get("http://localhost:8282/ingredients");
            setIngredients(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <IngredientContext.Provider value={{ingredients, fetchIngredients}}>
            {children}
        </IngredientContext.Provider>
    );
}

export {IngredientContext, IngredientProvider}