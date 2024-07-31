import { createContext, useState, ReactNode, useCallback } from "react";
import type IngredientDetails from "../types/recipe/ingredientDetails";
import axios from "axios";
import useAuthContext from "../hooks/use-auth-context";

export interface IngredientContextType {
    ingredients: IngredientDetails[] | null,
    fetchIngredients: () => Promise<void>
    deleteIngredient: (id: number) => Promise<void>
    addIngredient: (ingredient: IngredientDetails) => Promise<void>
}

const IngredientContext = createContext<IngredientContextType | null>(null);

function IngredientProvider({children}: {children: ReactNode}){
    const [ingredients, setIngredients] = useState<IngredientDetails[]>([]);
    const authContext = useAuthContext();

    const fetchIngredients = useCallback(async(): Promise<void> => {
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
            const response = await axios.delete(`http://localhost:8282/ingredient/${id}`, {
                headers: {
                    'Authorization': `Bearer ${authContext?.userLogin?.token}`
                }
            });

            if(response.status === 200){
                const updatedIngredients = ingredients?.filter((ingredient) => {
                    return ingredient.id !== id; 
                });
                setIngredients(updatedIngredients);
            }
        } catch (error){
            if(error instanceof Error){
                console.log(error.message);
            } else {
                console.log(error);
            }
        } 
    };

    const addIngredient = async(ingredient: IngredientDetails): Promise<void> => {
        try{
            const response = await axios.post(`http://localhost:8282/ingredient`, ingredient, {
                headers: {
                    'Authorization': `Bearer ${authContext?.userLogin?.token}`
                }
            });

            if(response.status === 200){
                const updatedIngredients = [
                    ...ingredients,
                    response.data
                ];
                setIngredients(updatedIngredients);
            }

        } catch(error){
            if(error instanceof Error){
                console.log(error.message);
            } else {
                console.log(error);
            }
        }
    }

    return (
        <IngredientContext.Provider value={{ingredients, fetchIngredients, deleteIngredient, addIngredient}}>
            {children}
        </IngredientContext.Provider>
    );
}

export {IngredientContext, IngredientProvider}