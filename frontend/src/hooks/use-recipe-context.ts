import { useContext } from "react";
import { RecipeContext } from "../context/recipe";

export default function useRecipeContext(){
    return useContext(RecipeContext);
}