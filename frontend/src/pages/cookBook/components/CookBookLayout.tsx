import { useState } from "react";
import useCookBookContext from "../../../hooks/use-cookbook-context";
import { CookBookContextType } from "../../../context/cookbook";
import CookBookRecipeCard from "./CookBookRecipeCard";
import { Box, Button, Grid, TextField} from "@mui/material";
import SelectedRecipe from "./SelectedRecipe";
import PublishedRecipeDetails from "../../../types/cookbook/publisedRecipeDetails";

export default function CookBookLayout() {
    const [selectedRecipe, setSelectedRecipe] = useState<PublishedRecipeDetails | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const {publishedRecipes, fetchPublishedRecipesByName, clonePublishedRecipe} = useCookBookContext() as CookBookContextType;
   

    const handleSearchClick = (event: React.FormEvent) => {
        event.preventDefault();
        if(searchTerm !== ''){
            fetchPublishedRecipesByName(searchTerm);
        }
    };

    const handleRecipeCardClick = (id: number) => {
        const selected = publishedRecipes.find(r => r.id === id);
        if(selected){
            setSelectedRecipe(selected);
        }
    }

    const handleCloneClick = async() => {
        if(selectedRecipe && selectedRecipe.id){
            const cloned = await clonePublishedRecipe(selectedRecipe.id);
            if(cloned){
                window.alert("This recipe has been cloned to your account"); //This needs to be shown only when response comes back positive
            } else {
                window.alert("Clone failed.");
            }
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
            <SelectedRecipe selectedRecipe={selectedRecipe} setSelectedRecipe={setSelectedRecipe} cloneRecipe={handleCloneClick} />
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