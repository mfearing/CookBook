import { createContext, useState, useCallback, ReactNode } from "react";
import type RecipeDetails from "../types/recipe/recipeDetails";
import useRecipeApi from "../hooks/use-recipe-api";
import useAuthContext from "../hooks/use-auth-context";
import { AuthContextType } from "./auth";

export interface RecipeContextType {
    recipe: RecipeDetails | null,
    recipeSummaries: RecipeDetails[],
    fetchRecipeById: (id: number) => Promise<void>,
    createNewRecipe: () => Promise<void>,
    deleteRecipe: (id: number | null) => Promise<void>,
    fetchSummaryRecipes: () => Promise<void>,
    patchRecipe: (name: string, description: string, instructions: string) => Promise<void>
    deleteRecipeIngredient: (recipeId: number, ingredientId: number) => Promise<void>,
    createRecipeIngredient: (recipeId: number, ingredientId: number, unitId: number, quantity: number) => Promise<void>
}

const RecipeContext = createContext<RecipeContextType | null>(null);

function RecipeProvider({children}: {children: ReactNode}){
    const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
    const [recipeSummaries, setRecipeSummaries] = useState<RecipeDetails[]>([]);
    const recipeApi = useRecipeApi();

    const {userLogin} = useAuthContext() as AuthContextType;

    const fetchSummaryRecipes = useCallback(async(): Promise<void> => {
        try{
            const response = await recipeApi.get("/recipe/summary");
            setRecipeSummaries(response.data);
        } catch (error) {
            //console.log(error);
        }
    }, [recipeApi]);

    const createNewRecipe = async(): Promise<void> => {
        try{
            if(!userLogin || !userLogin.login){
                throw new Error("Not logged in");
            }

            const newRecipe: RecipeDetails = {
                author: userLogin?.login,
                description: '',
                instructions: '',
                name: "Change Me!",
                recipeIngredients: []
            }

            const response = await recipeApi.post(`/recipe`, newRecipe);
            fetchSummaryRecipes();
            setRecipe(response.data);

        }  catch (error) {
            console.log(error);
        }
    }

    const deleteRecipe = async(id: number | null): Promise<void> => {
        try{
            if(id != null){
                await recipeApi.delete(`/recipe/${id}`);
                fetchSummaryRecipes();
                setRecipe(null);
            }
        }catch(error){
            console.log(error);
        }
    }


    const fetchRecipeById = async(id: number): Promise<void> => {
        try{
            const response = await recipeApi.get(`/recipe/${id}`);
            setRecipe({...response.data});
        } catch (error) {
            //console.log(error);
        }
    }

    const patchRecipe = async(name: string, description: string, instructions: string): Promise<void> => {
        try{
            if(!recipe || !recipe.id){
                throw new Error("Must select a recipe to patch.");
            }

            const recipePatch: RecipeDetails = {
                id: recipe?.id,
                author: recipe?.author,
                name: name ? name : recipe?.name,
                description: description ? description : recipe?.description,
                instructions: instructions ? instructions : recipe?.instructions,
                recipeIngredients: recipe.recipeIngredients
            }

            const response = await recipeApi.patch(`/recipe/${recipe.id}`, recipePatch);
            fetchSummaryRecipes();
            setRecipe(response.data);

        }  catch (error) {
            console.log(error);
        }
    }

    const createRecipeIngredient = async(recipeId: number, ingredientId: number, unitId: number, quantity: number): Promise<void> => {

        const ri = [{
            recipeId: recipeId,
            ingredient: {id: ingredientId},
            unit: {id: unitId},
            quantity: quantity
        }]

        try{
            await recipeApi.post(`recipe/${recipeId}/ingredients`, ri);
            const response = await recipeApi.get(`/recipe/${recipeId}`);
            setRecipe(response.data); //refreshes recipe due to change in ingredients
        } catch (error) {
            console.log(error);
        }
    }

    const deleteRecipeIngredient = async(recipeId: number, ingredientId: number): Promise<void> => {
        try{
            await recipeApi.delete(`/recipe/${recipeId}/ingredients/${ingredientId}`);
            const response = await recipeApi.get(`/recipe/${recipeId}`);
            setRecipe(response.data); //refreshes recipe due to change in ingredients
        } catch(error){
            //console.log(error);
        }
    }

    return (
        <RecipeContext.Provider value = {{recipe, recipeSummaries, fetchRecipeById, createNewRecipe, deleteRecipe,
            fetchSummaryRecipes, patchRecipe, deleteRecipeIngredient, createRecipeIngredient}}
        >
            {children} 
        </RecipeContext.Provider>
    )
}

export {RecipeContext, RecipeProvider}