import { useEffect, useState } from "react";
import useCookBookContext from "../../../hooks/use-cookbook-context";
import { CookBookContextType } from "../../../context/cookbook";
import CookBookRecipeCard from "./CookBookRecipeCard";
import { Box, Button, Grid, TextField} from "@mui/material";
//import RecipeDetails from "../../../types/recipe/recipeDetails";

export default function CookBookLayout() {
    //const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetails | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const {publishedRecipes, fetchPublishedRecipesByName} = useCookBookContext() as CookBookContextType;

    useEffect(() => {
        //fetchPublishedRecipes();
    }, []);

    const handleSearchClick = () => {
        if(searchTerm !== ''){
            fetchPublishedRecipesByName(searchTerm);
        }
    };

    const cards = publishedRecipes.map((pr) => {
        return (
            <Grid item xs={4}> 
                <CookBookRecipeCard id={pr.id} 
                    author={pr.recipeData.author} 
                    name={pr.recipeData.name} 
                    description={pr.recipeData.description}
                    
                />
            </Grid>
        );
    });

    return (
        <>
            <Box sx={{display: 'flex', alignItems:'center', width: 500, maxWidth: '100%', mt:2}}>
                <TextField id="search-term" label="Search By Recipe Name" 
                    variant="outlined" onChange={(event) => setSearchTerm(event.target.value)} 
                    required fullWidth
                />
                <Button variant='contained' sx={{ml: 2}} onClick={handleSearchClick} >Search</Button>
            </Box>  
            <Grid container spacing={2} sx={{mt: 2}}>
                {cards}
            </Grid>
        </>
    )
}