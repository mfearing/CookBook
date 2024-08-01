import type RecipeIngredientDetails from "./recipeIngredientDetails";

export default interface RecipeDetails {
    id?: number,
    author: string,
    name: string,
    description: string,
    instructions: string,
    recipeIngredients: RecipeIngredientDetails[]
}