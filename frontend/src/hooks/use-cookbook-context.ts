import { useContext } from "react";
import { CookBookContext } from "../context/cookbook";

export default function useCookBookContext(){
    return useContext(CookBookContext);
}