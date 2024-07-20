import type IngredientDetails from "./ingredientDetails";
import type UnitDetails from "./unitDetails";

export default interface RecipeIngredientDetails {
    id: bigint,
    ingredient: IngredientDetails,
    unit: UnitDetails,
    quantity: number
}