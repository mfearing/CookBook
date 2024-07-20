import type RecipeIngredientDetails from "./recipeIngredientDetails";

export default interface RecipeDetails {
    id: bigint,
    author: string,
    name: string,
    description: string,
    instructions: string,
    recipeIngredients: RecipeIngredientDetails[]
}