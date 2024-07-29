import { useContext } from "react";
import { IngredientContext } from "../context/ingredient";

export default function useIngredientContext(){
    return useContext(IngredientContext);
}