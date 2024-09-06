import { Button, Card, CardContent, CardHeader, Grid, List, ListItem, ListItemIcon, Stack, Typography } from "@mui/material";
import RecipeDetails from "../../../types/recipe/recipeDetails";
import RecipeIngredientDetails from "../../../types/recipe/recipeIngredientDetails";
import { Circle } from "@mui/icons-material";

export interface SelectedRecipeProps{
    selectedRecipe: RecipeDetails,
    setSelectedRecipe: (recipe: RecipeDetails | null) => void
}

export default function SelectedRecipe({selectedRecipe, setSelectedRecipe}: SelectedRecipeProps){

    const recipeIngredients = selectedRecipe.recipeIngredients.map((ri: RecipeIngredientDetails) => {
        const ingredient = ri.quantity + " " + ri.unit.name + " " + ri.ingredient.name;
        return(
            <ListItem key={ri.id} sx={{display: 'flex', alignItems:'center', width: 500, maxWidth: '100%'}}>
                <ListItemIcon><Circle /></ListItemIcon>
                <Typography>{ingredient}</Typography>
            </ListItem>
        );
    })

    return(
        <>
            <Grid item xs={1} >
                <Stack >
                    <Button sx={{mb:1}} variant="contained" onClick={() => {setSelectedRecipe(null)}} >
                        Return
                    </Button>
                    <Button variant="contained">Clone</Button>
                </Stack>
            </Grid>
            <Grid item xs={11} >
                <Card>
                <CardHeader
                        title={selectedRecipe.name}
                        subheader={`Author: ${selectedRecipe.author}`}
                    />
                    <CardContent>
                        <List>
                            {recipeIngredients}
                        </List>
                    </CardContent>
                    <CardContent>
                        <Typography>Description: </Typography>
                        <Typography>{selectedRecipe.description}</Typography>
                    </CardContent>
                    <CardContent>
                        <Typography>Instructions: </Typography>
                        <Typography>{selectedRecipe.instructions}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
}