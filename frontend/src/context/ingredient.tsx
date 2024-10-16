import { createContext, useState, ReactNode, useCallback } from "react";
import type IngredientDetails from "../types/recipe/ingredientDetails";
import useApi from "../hooks/use-api";

export interface IngredientContextType {
    ingredients: IngredientDetails[] | [],
    fetchIngredients: () => Promise<void>
    deleteIngredient: (id: number) => Promise<void>
    addIngredient: (ingredient: IngredientDetails) => Promise<void>
}

const uri = '/v1/rcp';

const IngredientContext = createContext<IngredientContextType | null>(null);

function IngredientProvider({children}: {children: ReactNode}){
    const [ingredients, setIngredients] = useState<IngredientDetails[]>([]);
    const api = useApi();

    const fetchIngredients = useCallback(async(): Promise<void> => { //do i need to have this if the api is using useMemo?
        try{
            const response = await api.get(`${uri}/ingredients`);
            setIngredients(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [api]); //memeoized via useMemo in the api, so can add here without causing infinite loop

    const deleteIngredient = async(id: number): Promise<void> => {
        try{
            const response = await api.delete(`${uri}/ingredients/${id}`);
            if(response.status === 200){
                const updatedIngredients = ingredients?.filter((ingredient) => {
                    return ingredient.id !== id; 
                });
                setIngredients(updatedIngredients);
            }
        }catch(error){
            console.log(error);        
        }
    };

    const addIngredient = async(ingredient: IngredientDetails): Promise<void> => {
        try{
            const response = await api.post(`${uri}/ingredients`, ingredient);
            if(response.status === 201){
                const updatedIngredients = [
                    ...ingredients,
                    response.data
                ];
                setIngredients(updatedIngredients);
            }
        } catch(error){
           // console.log(error);
        }
    }

    return (
        <IngredientContext.Provider value={{ingredients, fetchIngredients, deleteIngredient, addIngredient}}>
            {children}
        </IngredientContext.Provider>
    );
}

export {IngredientContext, IngredientProvider}