import { createContext, useState, useCallback, ReactNode } from "react";
import type RecipeDetails from "../types/recipe/recipeDetails";
import useAuthContext from "../hooks/use-auth-context";
import { AuthContextType } from "./auth";
import useApi from "../hooks/use-api";

export interface RecipeContextType {
    recipe: RecipeDetails | null,
    recipeSummaries: RecipeDetails[],
    fetchRecipeById: (id: number) => Promise<void>,
    createNewRecipe: () => Promise<void>,
    deleteRecipe: (id: number | null) => Promise<void>,
    publishRecipe: (id: number) => Promise<void>,
    fetchSummaryRecipes: () => Promise<void>,
    patchRecipe: (name: string, description: string, instructions: string) => Promise<void>
    deleteRecipeIngredient: (recipeId: number, ingredientId: number) => Promise<void>,
    createRecipeIngredient: (recipeId: number, ingredientId: number, unitId: number, quantity: number) => Promise<void>
}

const uri = '/v1/rcp';

const RecipeContext = createContext<RecipeContextType | null>(null);

function RecipeProvider({children}: {children: ReactNode}){
    const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
    const [recipeSummaries, setRecipeSummaries] = useState<RecipeDetails[]>([]);
    const api = useApi();

    const {userLogin} = useAuthContext() as AuthContextType;

    const fetchSummaryRecipes = useCallback(async(): Promise<void> => {
        try{
            const response = await api.get(`${uri}/recipes/summary`);
            setRecipeSummaries(response.data);
        } catch (error) {
            //console.log(error);
        }
    }, [api]);

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

            const response = await api.post(`${uri}/recipes`, newRecipe);
            fetchSummaryRecipes();
            setRecipe(response.data);

        }  catch (error) {
            console.log(error);
        }
    }

    const deleteRecipe = async(id: number | null): Promise<void> => {
        try{
            if(id != null){
                await api.delete(`${uri}/recipes/${id}`);
                fetchSummaryRecipes();
                setRecipe(null);
            }
        }catch(error){
            console.log(error);
        }
    }

    const publishRecipe = async(id: number): Promise<void> => {
        try{
            await api.get(`${uri}/recipes/${id}/publish`);
        } catch (error){
            console.log(error);
        }
    }

    const fetchRecipeById = async(id: number): Promise<void> => {
        try{
            const response = await api.get(`${uri}/recipes/${id}`);
            setRecipe({...response.data});
        } catch (error) {
            console.log(error);
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

            const response = await api.patch(`${uri}/recipes/${recipe.id}`, recipePatch);
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
            await api.post(`${uri}/recipes/${recipeId}/ingredients`, ri);
            const response = await api.get(`${uri}/recipes/${recipeId}`);
            setRecipe(response.data); //refreshes recipe due to change in ingredients
        } catch (error) {
            console.log(error);
        }
    }

    const deleteRecipeIngredient = async(recipeId: number, ingredientId: number): Promise<void> => {
        try{
            await api.delete(`${uri}/recipes/${recipeId}/ingredients/${ingredientId}`);
            const response = await api.get(`${uri}/recipes/${recipeId}`);
            setRecipe(response.data); //refreshes recipe due to change in ingredients
        } catch(error){
            console.log(error);
        }
    }

    return (
        <RecipeContext.Provider value = {{recipe, recipeSummaries, 
            fetchRecipeById, createNewRecipe, deleteRecipe, publishRecipe,
            fetchSummaryRecipes, patchRecipe, deleteRecipeIngredient, createRecipeIngredient}}
        >
            {children} 
        </RecipeContext.Provider>
    )
}

export {RecipeContext, RecipeProvider}