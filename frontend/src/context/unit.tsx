import { createContext, useState, ReactNode, useCallback } from "react";
import type UnitDetails from "../types/recipe/unitDetails";
import useRecipeApi from "../hooks/use-recipe-api";

export interface UnitContextType {
    units: UnitDetails[] | [],
    fetchUnits: () => Promise<void>
    deleteUnit: (id: number) => Promise<void>
    addUnit: (unit: UnitDetails) => Promise<void>
}

const UnitContext = createContext<UnitContextType | null>(null);

function UnitProvider({children}: {children: ReactNode}){
    const [units, setUnits] = useState<UnitDetails[]>([]);
    const recipeApi = useRecipeApi();

    const fetchUnits = useCallback(async(): Promise<void> => {
        try{
            const response = await recipeApi.get("/unit");
            setUnits(response.data);
        } catch (error){
            // console.log(error);
        }
    }, [recipeApi]);

    const deleteUnit = async(id: number): Promise<void> => {
        try{
            const response = await recipeApi.delete(`/unit/${id}`);
            if(response.status === 200){
                const updatedUnits = units?.filter((unit) => {
                    return unit.id !== id; 
                });
                setUnits(updatedUnits);
            }
        }catch(error){
            //console.log(error);
        }
    };

    const addUnit = async(unit: UnitDetails): Promise<void> => {
        try{
            const response = await recipeApi.post(`/unit`, unit);
            if(response.status === 200){
                const updatedUnits = [
                    ...units,
                    response.data
                ];
                setUnits(updatedUnits);
            }
        } catch (error){
            //console.log(error);
        }
    }

    return (
        <UnitContext.Provider value={{units, fetchUnits, deleteUnit, addUnit}}>
            {children}
        </UnitContext.Provider>
    );
}

export {UnitContext, UnitProvider}