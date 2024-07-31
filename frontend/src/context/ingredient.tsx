import { createContext, useState, ReactNode, useCallback } from "react";
import type IngredientDetails from "../types/recipe/ingredientDetails";
import axios from "axios";
import useAuthContext from "../hooks/use-auth-context";

export interface IngredientContextType {
    ingredients: IngredientDetails[] | null,
    fetchIngredients: () => Promise<IngredientDetails[] | void>
    deleteIngredient: (id: number) => Promise<void>
}

const IngredientContext = createContext<IngredientContextType | null>(null);

function IngredientProvider({children}: {children: ReactNode}){
    const [ingredients, setIngredients] = useState<IngredientDetails[]>([]);
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

    const deleteIngredient = async(id: number): Promise<void> => {
        
        try {
            await axios.delete(`http://localhost:8282/ingredient/${id}`, {
                headers: {
                    'Authorization': `Bearer ${authContext?.userLogin?.token}`
                }
            });
        } catch (error){
            if(error instanceof Error){
                console.log(error.message);
            } else {
                console.log(error);
            }
            return;
        } 
        
        const updatedIngredients = ingredients?.filter((ingredient) => {
            return ingredient.id !== id; 
        });
        setIngredients(updatedIngredients);
        
    };

    return (
        <IngredientContext.Provider value={{ingredients, fetchIngredients, deleteIngredient}}>
            {children}
        </IngredientContext.Provider>
    );
}

export {IngredientContext, IngredientProvider}