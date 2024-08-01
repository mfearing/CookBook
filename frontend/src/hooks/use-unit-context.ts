import { useContext } from "react";
import { UnitContext } from "../context/unit";

export default function useUnitContext(){
    return useContext(UnitContext);
}