import { createContext, useState, ReactNode, useCallback } from "react";
import type IngredientDetails from "../types/recipe/ingredientDetails";
import axios from "axios";
import useAuthContext from "../hooks/use-auth-context";

export interface IngredientContextType {
    ingredients: IngredientDetails[] | null,
    fetchIngredients: () => Promise<IngredientDetails[] | void>
}

const IngredientContext = createContext<IngredientContextType | null>(null);

function IngredientProvider({children}: {children: ReactNode}){
    const [ingredients, setIngredients] = useState<null | IngredientDetails[]>([]);
    const authContext = useAuthContext();

    const fetchIngredients = useCallback(async(): Promise<IngredientDetails[] | void> => {
        try{
            const response = await axios.get("http://localhost:8282/ingredient",{
                headers: {
                    'Authorization': `Bearer ${authContext?.userLogin?.token}`
                }
            });
            setIngredients(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [authContext]);

    return (
        <IngredientContext.Provider value={{ingredients, fetchIngredients}}>
            {children}
        </IngredientContext.Provider>
    );
}

export {IngredientContext, IngredientProvider}