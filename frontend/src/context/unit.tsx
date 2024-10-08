import { createContext, useState, ReactNode, useCallback } from "react";
import type UnitDetails from "../types/recipe/unitDetails";
import useApi from "../hooks/use-api";

export interface UnitContextType {
    units: UnitDetails[] | [],
    fetchUnits: () => Promise<void>
    deleteUnit: (id: number) => Promise<void>
    addUnit: (unit: UnitDetails) => Promise<void>
}

const uri = '/v1/rcp';

const UnitContext = createContext<UnitContextType | null>(null);

function UnitProvider({children}: {children: ReactNode}){
    const [units, setUnits] = useState<UnitDetails[]>([]);
    const api = useApi();

    const fetchUnits = useCallback(async(): Promise<void> => {
        try{
            const response = await api.get(`${uri}/units`);
            setUnits(response.data);
        } catch (error){
            // console.log(error);
        }
    }, [api]);

    const deleteUnit = async(id: number): Promise<void> => {
        try{
            const response = await api.delete(`${uri}/units/${id}`);
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
            const response = await api.post(`${uri}/units`, unit);
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