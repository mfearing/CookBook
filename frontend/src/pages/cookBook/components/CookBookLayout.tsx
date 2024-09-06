import { useState } from "react";
import useCookBookContext from "../../../hooks/use-cookbook-context";
import { CookBookContextType } from "../../../context/cookbook";
import CookBookRecipeCard from "./CookBookRecipeCard";
import { Box, Button, Grid, TextField} from "@mui/material";
import RecipeDetails from "../../../types/recipe/recipeDetails";
import SelectedRecipe from "./SelectedRecipe";

export default function CookBookLayout() {
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetails | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const {publishedRecipes, fetchPublishedRecipesByName} = useCookBookContext() as CookBookContextType;

    const handleSearchClick = (event: React.FormEvent) => {
        event.preventDefault();
        if(searchTerm !== ''){
            fetchPublishedRecipesByName(searchTerm);
        }
    };

    const handleRecipeCardClick = (id: number) => {
        const selected = publishedRecipes.find(r => r.id === id);
        if(selected){
            setSelectedRecipe(selected.recipeData);
        }
    }

    const cards = publishedRecipes.map((pr) => {
        return (
            <Grid item xs={4}> 
                <CookBookRecipeCard id={pr.id} 
                    author={pr.recipeData.author} 
                    name={pr.recipeData.name} 
                    description={pr.recipeData.description}
                    handleClick={handleRecipeCardClick}
                />
            </Grid>
        );
    });

    let recipe;
    if(selectedRecipe !== null){
        recipe = (
            <SelectedRecipe selectedRecipe={selectedRecipe} setSelectedRecipe={setSelectedRecipe} />
        );
    }

    return (
        <>
            <Box component='form' onSubmit={handleSearchClick} sx={{display: 'flex', alignItems:'center', width: 500, maxWidth: '100%', mt:2}} >
                <TextField id="search-term" label="Search By Recipe Name" 
                    variant="outlined" onChange={(event) => setSearchTerm(event.target.value)} 
                    required fullWidth onSubmit={handleSearchClick}
                />
                <Button variant='contained' sx={{ml: 2}} type="submit" >Search</Button>
            </Box>  
            <Grid container spacing={2} sx={{mt: 2}}>
                {selectedRecipe ? recipe : cards}
            </Grid>
        </>
    )
}