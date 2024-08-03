import { createContext, useState, ReactNode, useCallback } from "react";
import type IngredientDetails from "../types/recipe/ingredientDetails";
import useRecipeApi from "../hooks/use-recipe-api";

export interface IngredientContextType {
    ingredients: IngredientDetails[] | null,
    fetchIngredients: () => Promise<void>
    deleteIngredient: (id: number) => Promise<void>
    addIngredient: (ingredient: IngredientDetails) => Promise<void>
}

const IngredientContext = createContext<IngredientContextType | null>(null);

function IngredientProvider({children}: {children: ReactNode}){
    const [ingredients, setIngredients] = useState<IngredientDetails[]>([]);
    const recipeApi = useRecipeApi();

    const fetchIngredients = useCallback(async(): Promise<void> => { //do i need to have this if the api is using useMemo?
        const response = await recipeApi.get('/ingredient');
        setIngredients(response.data);
    }, [recipeApi]); //doesn't actually have a dependency on api, will do infinite loop if added here; add dependency if using authContext directly

    const deleteIngredient = async(id: number): Promise<void> => {
        const response = await recipeApi.delete(`/ingredient/${id}`);
        if(response.status === 200){
            const updatedIngredients = ingredients?.filter((ingredient) => {
                return ingredient.id !== id; 
            });
            setIngredients(updatedIngredients);
        }
    };

    const addIngredient = async(ingredient: IngredientDetails): Promise<void> => {
        const response = await recipeApi.post(`/ingredient`, ingredient);
        if(response.status === 200){
            const updatedIngredients = [
                ...ingredients,
                response.data
            ];
            setIngredients(updatedIngredients);
        }
    }

    return (
        <IngredientContext.Provider value={{ingredients, fetchIngredients, deleteIngredient, addIngredient}}>
            {children}
        </IngredientContext.Provider>
    );
}

export {IngredientContext, IngredientProvider}