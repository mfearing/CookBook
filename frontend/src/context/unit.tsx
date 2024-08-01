import { createContext, useState, ReactNode, useCallback } from "react";
import type UnitDetails from "../types/recipe/unitDetails";
import axios from "axios";
import useAuthContext from "../hooks/use-auth-context";

export interface UnitContextType {
    units: UnitDetails[] | null,
    fetchUnits: () => Promise<void>
    deleteUnit: (id: number) => Promise<void>
    addUnit: (unit: UnitDetails) => Promise<void>
}

const UnitContext = createContext<UnitContextType | null>(null);

function UnitProvider({children}: {children: ReactNode}){
    const [units, setUnits] = useState<UnitDetails[]>([]);
    const authContext = useAuthContext();

    const fetchUnits = useCallback(async(): Promise<void> => {
        try{
            const response = await axios.get("http://localhost:8282/unit",{
                headers: {
                    'Authorization': `Bearer ${authContext?.userLogin?.token}`
                }
            });
            setUnits(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [authContext]);

    const deleteUnit = async(id: number): Promise<void> => {
        try {
            const response = await axios.delete(`http://localhost:8282/unit/${id}`, {
                headers: {
                    'Authorization': `Bearer ${authContext?.userLogin?.token}`
                }
            });

            if(response.status === 200){
                const updatedUnits = units?.filter((unit) => {
                    return unit.id !== id; 
                });
                setUnits(updatedUnits);
            }
        } catch (error){
            if(error instanceof Error){
                console.log(error.message);
            } else {
                console.log(error);
            }
        } 
    };

    const addUnit = async(unit: UnitDetails): Promise<void> => {
        try{
            const response = await axios.post(`http://localhost:8282/unit`, unit, {
                headers: {
                    'Authorization': `Bearer ${authContext?.userLogin?.token}`
                }
            });

            if(response.status === 200){
                const updatedUnits = [
                    ...units,
                    response.data
                ];
                setUnits(updatedUnits);
            }

        } catch(error){
            if(error instanceof Error){
                console.log(error.message);
            } else {
                console.log(error);
            }
        }
    }

    return (
        <UnitContext.Provider value={{units, fetchUnits, deleteUnit, addUnit}}>
            {children}
        </UnitContext.Provider>
    );
}

export {UnitContext, UnitProvider}