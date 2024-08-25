import { createContext, useState, useCallback, ReactNode } from "react";
import type RecipeDetails from "../types/recipe/recipeDetails";
import useRecipeApi from "../hooks/use-recipe-api";

export interface RecipeContextType {
    recipe: RecipeDetails | null,
    recipeSummaries: RecipeDetails[],
    fetchRecipeById: (id: number) => Promise<void>,
    fetchSummaryRecipes: () => Promise<void>
}

const RecipeContext = createContext<RecipeContextType | null>(null);

function RecipeProvider({children}: {children: ReactNode}){
    const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
    const [recipeSummaries, setRecipeSummaries] = useState<RecipeDetails[]>([]);
    const recipeApi = useRecipeApi();

    const fetchSummaryRecipes = useCallback(async(): Promise<void> => {
        try{
            const response = await recipeApi.get("/recipe/summary");
            setRecipeSummaries(response.data);
        } catch (error) {
            //console.log(error);
        }
    }, [recipeApi]);

    const fetchRecipeById = async(id: number): Promise<void> => {
        try{
            const response = await recipeApi.get(`/recipe/${id}`);
            setRecipe(response.data);
        } catch (error) {
            //console.log(error);
        }
    }

    return (
        <RecipeContext.Provider value = {{recipe, recipeSummaries, fetchRecipeById, fetchSummaryRecipes}}>
            {children} 
        </RecipeContext.Provider>
    )
}

export {RecipeContext, RecipeProvider}