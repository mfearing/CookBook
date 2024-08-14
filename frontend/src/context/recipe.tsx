import { createContext, useState, useCallback, ReactNode } from "react";
import type RecipeDetails from "../types/recipe/recipeDetails";
import useRecipeApi from "../hooks/use-recipe-api";

export interface RecipeContextType {
    recipes: RecipeDetails[] | null,
    fetchRecipes: () => Promise<void>
}

const RecipeContext = createContext<RecipeContextType | null>(null);

function RecipeProvider({children}: {children: ReactNode}){
    const [recipes, setRecipes] = useState<RecipeDetails[]>([]);
    const recipeApi = useRecipeApi();

    const fetchRecipes = useCallback(async(): Promise<void> => {
        try{
            const response = await recipeApi.get("/recipe");
            setRecipes(response.data);
        } catch (error){
            // console.log(error);
        }
    }, [recipeApi]);

    return (
        <RecipeContext.Provider value = {{recipes, fetchRecipes}}>
            {children}
        </RecipeContext.Provider>
    )
}

export {RecipeContext, RecipeProvider}