import { Button, Card, CardContent, CardHeader, Grid, List, ListItem, ListItemIcon, Stack, Typography } from "@mui/material";
import RecipeIngredientDetails from "../../../types/recipe/recipeIngredientDetails";
import { Circle } from "@mui/icons-material";
import PublishedRecipeDetails from "../../../types/cookbook/publisedRecipeDetails";
import useAuthContext from "../../../hooks/use-auth-context";
import { AuthContextType } from "../../../context/auth";

export interface SelectedRecipeProps{
    selectedRecipe: PublishedRecipeDetails,
    setSelectedRecipe: (recipe: PublishedRecipeDetails | null) => void
    cloneRecipe: () => void
}

export default function SelectedRecipe({selectedRecipe, setSelectedRecipe, cloneRecipe}: SelectedRecipeProps){
    const {userLogin} = useAuthContext() as AuthContextType;

    const recipeData = selectedRecipe.recipeData;

    const recipeIngredients = recipeData.recipeIngredients.map((ri: RecipeIngredientDetails) => {
        const ingredient = ri.quantity + " " + ri.unit.name + " " + ri.ingredient.name;
        return(
            <ListItem key={ri.id} sx={{display: 'flex', alignItems:'center', width: 500, maxWidth: '100%'}}>
                <ListItemIcon><Circle /></ListItemIcon>
                <Typography>{ingredient}</Typography>
            </ListItem>
        );
    });

    return(
        <>
            <Grid item xs={1} >
                <Stack >
                    <Button sx={{mb:1}} variant="contained" onClick={() => {setSelectedRecipe(null)}} >
                        Return
                    </Button>
                    <Button disabled={!userLogin} variant="contained" onClick={cloneRecipe}>Clone</Button>
                </Stack>
            </Grid>
            <Grid item xs={11} >
                <Card>
                <CardHeader
                        title={recipeData.name}
                        subheader={`Author: ${recipeData.author}`}
                    />
                    <CardContent>
                        <List>
                            {recipeIngredients}
                        </List>
                    </CardContent>
                    <CardContent>
                        <Typography>Description: </Typography>
                        <Typography>{recipeData.description}</Typography>
                    </CardContent>
                    <CardContent>
                        <Typography>Instructions: </Typography>
                        <Typography>{recipeData.instructions}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
}