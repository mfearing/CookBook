import { createContext, useState, useCallback, ReactNode } from "react";
import useCookBookApi from "../hooks/use-cookbook-api";
import PublishedRecipeDetails from "../types/cookbook/publisedRecipeDetails";

export interface CookBookContextType {
    publishedRecipes: PublishedRecipeDetails[] | [],
    fetchPublishedRecipes: () => Promise<void>,
    fetchPublishedRecipesByName: (searchTerm: string) => Promise<void>
}

const CookBookContext = createContext<CookBookContextType | null>(null);

function CookBookProvider({children}: {children: ReactNode}){
    const [publishedRecipes, setPublishedRecipes] = useState<PublishedRecipeDetails[] | []>([]);
    const cookbookApi = useCookBookApi();

    const fetchPublishedRecipes = useCallback(async(): Promise<void> => { 
        try{
            const response = await cookbookApi.get('/published');
            setPublishedRecipes(response.data);
        } catch (error) {
            //console.log(error);
        }
    }, [cookbookApi]); //memeoized via useMemo in the api, so can add here without causing infinite loop

    const fetchPublishedRecipesByName = async(searchTerm: string): Promise<void> => {
        try{
            const response = await cookbookApi.get(`/published/search?searchTerm=${searchTerm}`);
            setPublishedRecipes(response.data);
        } catch(error){
            console.log(error);
        }
    }


    return (
        <CookBookContext.Provider value = {{publishedRecipes, fetchPublishedRecipes, fetchPublishedRecipesByName}}>
            {children}
        </CookBookContext.Provider>
    )    
}

export {CookBookContext, CookBookProvider}